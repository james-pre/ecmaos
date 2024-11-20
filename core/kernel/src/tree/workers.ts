import type { Workers as IWorkers } from '@ecmaos/types'

export class Workers implements IWorkers {
  private _workers: {
    dedicated: Worker[]
    shared: SharedWorker[]
  }

  constructor() {
    this._workers = {
      dedicated: [],
      shared: []
    }
  }

  create(blob: Blob) {
    if (!globalThis.Worker) throw new Error('Workers are not supported in this environment')
    const worker = new Worker(URL.createObjectURL(blob))
    this._workers.dedicated.push(worker)
    return worker
  }

  createShared(blob: Blob) {
    if (!globalThis.SharedWorker) throw new Error('SharedWorkers are not supported in this environment')
    const worker = new SharedWorker(URL.createObjectURL(blob))
    this._workers.shared.push(worker)
    return worker
  }
}
