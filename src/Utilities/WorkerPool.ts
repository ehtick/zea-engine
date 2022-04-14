import { SystemDesc } from '../SystemDesc'

interface TaskData {
  taskData: object
  transferables: Array<Transferable>
}
interface Task {
  taskId: number
  dataFactory: (workerId: number) => TaskData
}

let taskCounter = 0
export abstract class WorkerPool<WorkerClass> {
  poolSize: number = Math.max(1, SystemDesc.hardwareConcurrency - 1) // always leave one main thread code spare.
  workers: WorkerClass[] = []
  workerTaskCount: number[] = []
  taskPromiseResolves: Record<number, (value: object | PromiseLike<object>) => void> = {}

  taskQueue: Array<Task> = []
  availableWorkers: number[] = []
  terminationTimeouts: number[] = []
  terminateWorkersWhenFree: boolean = true
  terminationLatency: number = 2000

  constructor(terminateWorkersWhenFree: boolean) {
    this.terminateWorkersWhenFree = terminateWorkersWhenFree
  }

  public addTask(taskData: object, transferables: Array<Transferable>): Promise<object> {
    return this.addTaskCallback(() => {
      return {
        taskData,
        transferables,
      }
    })
  }

  public addTaskCallback(dataFactory: (workerId: number) => TaskData): Promise<object> {
    taskCounter++
    const taskId = taskCounter
    return new Promise<object>(async (resolve) => {
      this.taskPromiseResolves[taskId] = resolve
      // @ts-ignore
      this.taskQueue.push({
        taskId,
        dataFactory,
      })

      if (this.availableWorkers.length > 0) {
        this.consumeTask()
      } else if (this.workers.length < this.poolSize) {
        await this.addWorker()
        this.consumeTask()
      }
    })
  }

  private async consumeTask() {
    const workerId = this.availableWorkers.pop()
    if (this.workerTaskCount[workerId] > 0) {
      return
    }
    if (this.terminationTimeouts[workerId] != -1) {
      clearTimeout(this.terminationTimeouts[workerId])
      this.terminationTimeouts[workerId] = -1
    } else if (!this.workers[workerId]) {
      // Workers get terminated, and we need to restart them.
      await this.allocWorker(workerId)
    }
    if (this.taskQueue.length == 0) {
      // Multiple consumeTask were issued, and all tasks have been consumed.
      return
    }
    const task = this.taskQueue.pop()
    const { taskData, transferables } = task.dataFactory(workerId)
    // @ts-ignore
    taskData.taskId = task.taskId
    this.workerTaskCount[workerId]++
    // @ts-ignore
    this.workers[workerId].postMessage(taskData, transferables)
  }

  private addWorker(): Promise<void> {
    const workerId = this.workers.length
    this.workers.push(null)
    return this.allocWorker(workerId)
  }

  private allocWorker(workerId: number): Promise<void> {
    // Note: This function immediately adds the worker to the list
    // and then asynchronously creates it.
    return new Promise<void>((resolve) => {
      this.constructWorker().then((worker: WorkerClass) => {
        // @ts-ignore
        worker.onmessage = (event: Record<string, any>) => {
          if (event.data.taskId in this.taskPromiseResolves) {
            const taskId = <number>event.data.taskId
            delete event.data.taskId
            this.taskPromiseResolves[taskId](event.data)
            delete this.taskPromiseResolves[taskId]
            this.workerTaskCount[workerId]--
            if (this.workerTaskCount[workerId] > 0) {
              // Another task is already sent to this worker.
              // Let it complete.
              return
            }
            // Check that we are not already on the available list.
            // This happens if multiple tasks get issued to the same worker.
            if (this.availableWorkers.indexOf(workerId) == -1) {
              this.availableWorkers.push(workerId)
            }
            if (this.taskQueue.length > 0) {
              this.consumeTask()
            } else {
              if (this.terminateWorkersWhenFree) {
                this.scheduleWorkerTermination(workerId)
              }
            }
          }
        }

        this.workers[workerId] = worker
        this.terminationTimeouts[workerId] = -1
        this.workerTaskCount[workerId] = 0
        this.availableWorkers.push(workerId)

        resolve()
      })
    })
  }

  private scheduleWorkerTermination(workerId: number): void {
    // @ts-ignore
    this.terminationTimeouts[workerId] = setTimeout(() => {
      this.terminateWorker(workerId)
      this.terminationTimeouts[workerId] = -1
    }, this.terminationLatency)
  }

  abstract constructWorker(): Promise<WorkerClass>

  protected terminateWorker(workerId: number): void {
    // @ts-ignore
    this.workers[workerId].terminate()
    this.workers[workerId] = null
  }

  public messageWorker(workerId: number, message: object): Promise<object> {
    taskCounter++
    const taskId = taskCounter
    // console.log('addTask:', taskId)
    return new Promise<object>((resolve) => {
      this.taskPromiseResolves[taskId] = resolve

      // @ts-ignore
      message.taskId = taskId
      // @ts-ignore
      this.workers[workerId].postMessage(message)
    })
  }
}
