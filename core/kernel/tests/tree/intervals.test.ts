import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Intervals } from '#intervals.ts'

describe('Intervals', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('should set and clear intervals', () => {
    const callback = vi.fn()
    const intervals = new Intervals()
    const intervalId = intervals.set('test', callback, 100)
    expect(intervalId).toBeDefined()
    expect(intervals.get('test')).toBeDefined()
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(100)
    expect(callback).toHaveBeenCalledTimes(2)
    intervals.clear('test')
    expect(intervals.get('test')).toBeUndefined()
  })
})
