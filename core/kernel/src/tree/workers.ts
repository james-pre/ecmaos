import type { Kernel } from '#kernel.ts'

export class Workers {
  private _kernel: Kernel
  private _workers: {
    dedicated: Worker[]
    shared: SharedWorker[]
  }

  get kernel() { return this._kernel }

  constructor(options: WorkersOptions) {
    this._kernel = options.kernel
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

export interface WorkersOptions {
  kernel: Kernel
}
