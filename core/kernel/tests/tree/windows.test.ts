import { describe, it, expect } from 'vitest'
import { Windows } from '#windows.ts'

describe('Windows', () => {
  it('should create a new window', () => {
    const windows = new Windows()
    const win = windows.create()
    expect(win).toBeDefined()
  })

  it('should create a new window with a custom id', () => {
    const windows = new Windows()
    const win = windows.create({ id: 'test' })
    expect(win).toBeDefined()
    expect(win.id).toBe('test')
  })

  it('should create a new window with a custom title', () => {
    const windows = new Windows()
    const win = windows.create({ title: 'Test' })
    expect(win).toBeDefined()
    expect(win.title).toBe('Test')
  })

  it('should close a window', () => {
    const windows = new Windows()
    const win = windows.create()
    expect(win).toBeDefined()
    windows.close(win.id)
    expect(windows.get(win.id)).toBeUndefined()
  })
})
