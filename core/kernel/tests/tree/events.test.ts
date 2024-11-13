import { describe, it, expect, vi } from 'vitest'
import { Events } from '#events.ts'

describe('Events', () => {
  it('should dispatch and receive events', () => {
    const events = new Events()
    const callback = vi.fn()
    events.on('test', callback)
    events.dispatch('test', { data: 'test' })
    expect(callback).toHaveBeenCalledWith({ data: 'test' })
  })

  it('should remove event listeners', () => {
    const events = new Events()
    const callback = vi.fn()
    events.on('test', callback)
    events.dispatch('test', { data: 'test' })
    expect(callback).toHaveBeenCalledWith({ data: 'test' })
    events.off('test', callback)
    events.dispatch('test', { data: 'test' })
    expect(callback).toHaveBeenCalledOnce()
  })
})
