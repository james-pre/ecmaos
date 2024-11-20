import type { IntervalMap } from '@ecmaos/types'

export class Intervals {
  private _intervals: IntervalMap = new Map()

  get(name: string) {
    return this._intervals.get(name)
  }

  set(name: string, callback: () => void, interval: number) {
    const intervalId = setInterval(callback, interval)
    this._intervals.set(name, intervalId)
    return intervalId
  }

  clear(name: string) {
    const interval = this._intervals.get(name)
    if (interval) {
      clearInterval(interval)
      this._intervals.delete(name)
    }
  }
}
