import { SystemDesc } from '../SystemDesc'

interface Task {
  taskId: number
  dataFactory: (workerId: number) => object
}

let taskCounter = 0
export class WorkerPool<WorkerClass> {
  workers: WorkerClass[] = []
  taskPromiseResolves: Record<number, (value: object | PromiseLike<object>) => void> = {}

  taskQueue: Array<Task> = []
  availableWorkers: number[] = []
  terminateWorkersWhenFree: boolean = true

  constructor(terminateWorkersWhenFree: boolean) {
    this.terminateWorkersWhenFree = terminateWorkersWhenFree
  }

  addTask(taskData: object): Promise<object> {
    return this.addTaskCallback(() => taskData)
  }

  addTaskCallback(dataFactory: (workerId: number) => object): Promise<object> {
    taskCounter++
    const taskId = taskCounter
    // console.log('addTask:', taskId)
    return new Promise<object>(async (resolve) => {
      this.taskPromiseResolves[taskId] = resolve
      // @ts-ignore
      this.taskQueue.push({
        taskId,
        dataFactory,
      })

      const numCores = SystemDesc.hardwareConcurrency - 1 // always leave one main thread code spare.
      if (this.workers.length < numCores - 1) {
        await this.addWorker()
        this.consumeTask()
      } else if (this.availableWorkers.length > 0) {
        this.consumeTask()
      }
    })
  }

  consumeTask() {
    const workerId = this.availableWorkers.pop()
    const task = this.taskQueue.pop()
    const taskData = task.dataFactory(workerId)
    // @ts-ignore
    taskData.taskId = task.taskId
    // @ts-ignore
    this.workers[workerId].postMessage(taskData)
  }

  async addWorker(): Promise<void> {
    const worker = await this.constructWorker()
    const workerId = this.workers.length
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
        if (this.terminateWorkersWhenFree) this.terminateWorker(workerId)
        else this.availableWorkers.push(workerId)
      }
    }
    this.workers.push(worker)
    this.availableWorkers.push(workerId)
  }

  constructWorker(): WorkerClass {
    return null
  }

  terminateWorker(workerId: number): void {
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
