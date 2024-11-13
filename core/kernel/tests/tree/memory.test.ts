import { describe, expect, it } from 'vitest'

import { Memory } from '#memory.ts'

describe('Heap', () => {
  const memory = new Memory()
  expect(memory).toBeDefined()

  it('should allocate memory', () => {
    const address = memory.allocate(10)
    expect(address).toBe(0)
  })

  it('should read memory', () => {
    const address = memory.allocate(10)
    const value = memory.read(address)
    expect(value).toEqual(new Uint8Array(10))
  })

  it('should write memory', () => {
    const address = memory.allocate(10)
    memory.write(address, new Uint8Array(10))
    const value = memory.read(address)
    expect(value).toEqual(new Uint8Array(10))
  })

  it('should free memory', () => {
    const address = memory.allocate(10)
    memory.free(address)
    const value = memory.read(address)
    expect(value).toBeUndefined()
  })

  it('should search memory', () => {
    const address = memory.allocate(10)
    memory.write(address, new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    const value = memory.search(new Uint8Array([5, 6]))
    expect(value).toBe(3)

    const value2 = memory.search(new Uint8Array([11, 12, 13]))
    expect(value2).toBe(-1)
  })

  it('should compare memory', () => {
    const address1 = memory.allocate(10)
    const address2 = memory.allocate(10)
    memory.write(address1, new Uint8Array(10))
    memory.write(address2, new Uint8Array(10))
    const value = memory.compare(address1, address2)
    expect(value).toBe(true)
  })

  it('should copy memory', () => {
    const address = memory.allocate(10)
    const address2 = memory.allocate(10)
    memory.write(address, new Uint8Array(10))
    memory.copy(address, address2)
    const value = memory.compare(address, address2)
    expect(value).toBe(true)
  })

  it('should move memory', () => {
    const address = memory.allocate(10)
    const address2 = memory.allocate(10)
    memory.write(address, new Uint8Array(10))
    memory.move(address, address2)
    expect(() => memory.compare(address, address2)).toThrow('Invalid memory addresses')
    expect(memory.read(address)).toBeUndefined()
    expect(memory.read(address2)).toEqual(new Uint8Array(10))
  })

  it('should fail to copy to invalid address', () => {
    const address = memory.allocate(10)
    expect(() => memory.copy(address, Infinity)).toThrow('Invalid memory addresses')
  })
})

describe('Stack', () => {
  const memory = new Memory()
  expect(memory).toBeDefined()

  it('should push and pop', () => {
    memory.push({ a: 1, b: 2 })
    const value = memory.pop()
    expect(value).toEqual({ a: 1, b: 2 })
  })

  it('should push and pop multiple values', () => {
    memory.push({ a: 1, b: 2 })
    memory.push({ c: 3, d: 4 })
    const value = memory.pop()
    expect(value).toEqual({ c: 3, d: 4 })
  })

  it('should peek', () => {
    memory.push({ a: 1, b: 2 })
    memory.push({ c: 3, d: 4 })
    const value = memory.peek()
    expect(value).toEqual({ c: 3, d: 4 })
  })
})

describe('Config', () => {
  const memory = new Memory()
  expect(memory).toBeDefined()

  it('should get bootTime', () => {
    const value = memory.config.get('bootTime')
    expect(value).toBeGreaterThan(0)
  })

  it('should set and get', () => {
    memory.config.set('a', 1)
    const value = memory.config.get('a')
    expect(value).toBe(1)
  })

  it('should delete', () => {
    memory.config.set('a', 1)
    memory.config.delete('a')
    const value = memory.config.get('a')
    expect(value).toBeUndefined()
  })

  it('should has', () => {
    memory.config.set('a', 1)
    const value = memory.config.has('a')
    expect(value).toBe(true)
  })

  it('should clear', () => {
    memory.config.set('a', 1)
    memory.config.clear()
    const value = memory.config.get('a')
    expect(value).toBeUndefined()
  })
})

describe('Collection', () => {
  const memory = new Memory()
  expect(memory).toBeDefined()

  it('should add and get', () => {
    memory.collection.add(1)
    memory.collection.add(2)
    memory.collection.add(3)
    const iterator = memory.collection.values()
    for (let i = 0; i < 3; i++) {
      const { value } = iterator.next()
      expect(value).toBe(i + 1)
    }
  })

  it('should has', () => {
    memory.collection.add(1)
    memory.collection.add(2)
    memory.collection.add(3)
    const value = memory.collection.has(2)
    expect(value).toBe(true)
  })

  it('should delete', () => {
    memory.collection.add(1)
    memory.collection.add(2)
    memory.collection.add(3)
    memory.collection.delete(2)
    const value = memory.collection.has(2)
    expect(value).toBe(false)
  })

  it('should clear', () => {
    memory.collection.add(1)
    memory.collection.add(2)
    memory.collection.add(3)
    memory.collection.clear()
    const value = memory.collection.has(1)
    expect(value).toBe(false)
  })
})
