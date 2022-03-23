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
  workers: WorkerClass[] = []
  taskPromiseResolves: Record<number, (value: object | PromiseLike<object>) => void> = {}

  taskQueue: Array<Task> = []
  availableWorkers: number[] = []
  terminationTimeouts: number[] = []
  terminateWorkersWhenFree: boolean = true
  terminationLatency: number = 1000

  constructor(terminateWorkersWhenFree: boolean) {
    this.terminateWorkersWhenFree = terminateWorkersWhenFree
  }

  addTask(taskData: object, transferables: Array<Transferable>): Promise<object> {
    return this.addTaskCallback(() => {
      return {
        taskData,
        transferables,
      }
    })
  }

  addTaskCallback(dataFactory: (workerId: number) => TaskData): Promise<object> {
    taskCounter++
    const taskId = taskCounter
    return new Promise<object>(async (resolve) => {
      this.taskPromiseResolves[taskId] = resolve
      // @ts-ignore
      this.taskQueue.push({
        taskId,
        dataFactory,
      })

      const numCores = SystemDesc.hardwareConcurrency - 1 // always leave one main thread code spare.
      if (this.availableWorkers.length > 0) {
        this.consumeTask()
      } else if (this.workers.length < numCores - 1) {
        await this.addWorker()
        this.consumeTask()
      }
    })
  }

  consumeTask() {
    const workerId = this.availableWorkers.pop()
    if (this.terminationTimeouts[workerId] != -1) {
      clearTimeout(this.terminationTimeouts[workerId])
      this.terminationTimeouts[workerId] = -1
    }
    // Note: a new worker can be allocated, but another worker
    // consumes the task before the new worker picks up the task.
    if (this.taskQueue.length == 0) {
      if (this.terminateWorkersWhenFree) this.scheduleWorkerTermination(workerId)
      else this.availableWorkers.push(workerId)
      return
    }
    const task = this.taskQueue.pop()
    const { taskData, transferables } = task.dataFactory(workerId)
    // @ts-ignore
    taskData.taskId = task.taskId
    // @ts-ignore
    this.workers[workerId].postMessage(taskData, transferables)
  }

  async addWorker(): Promise<void> {
    const worker = await this.constructWorker()
    // @ts-ignore
    worker.onmessage = (event: Record<string, any>) => {
      if (event.data.taskId in this.taskPromiseResolves) {
        const taskId = <number>event.data.taskId
        delete event.data.taskId
        this.taskPromiseResolves[taskId](event.data)
        delete this.taskPromiseResolves[taskId]
      }
      if (this.taskQueue.length > 0) {
        this.availableWorkers.push(workerId)
        this.consumeTask()
      } else {
        if (this.terminateWorkersWhenFree) {
          this.scheduleWorkerTermination(workerId)
        } else {
          this.availableWorkers.push(workerId)
        }
      }
    }
    const workerId = this.workers.length
    this.workers.push(worker)
    this.terminationTimeouts[workerId] = -1
    this.availableWorkers.push(workerId)
  }

  scheduleWorkerTermination(workerId: number): void {
    // @ts-ignore
    this.terminationTimeouts[workerId] = setTimeout(() => {
      this.terminateWorker(workerId)
    }, this.terminationLatency)
  }

  abstract constructWorker(): Promise<WorkerClass>

  terminateWorker(workerId: number): void {
    // @ts-ignore
    this.workers[workerId].terminate()
    this.workers[workerId] = null
  }

  messageWorker(workerId: number, message: object): Promise<object> {
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
