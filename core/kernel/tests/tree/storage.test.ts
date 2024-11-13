import { beforeAll, describe, it, expect } from 'vitest'

import { Kernel } from '#kernel.ts'
import { Storage } from '#storage.ts'
import { DefaultFilesystemOptionsTest } from '#filesystem.ts'

import { TestDomOptions, TestLogOptions } from './fixtures/kernel.fixtures'

describe('Storage', () => {
  let kernel: Kernel

  beforeAll(() => {
    kernel = new Kernel({
      dom: TestDomOptions,
      log: TestLogOptions,
      filesystem: DefaultFilesystemOptionsTest
    })
  })

  it('should set and get items from local storage', () => {
    expect(kernel.storage).toBeInstanceOf(Storage)

    kernel.storage.local.setItem('test', 'test')
    expect(kernel.storage.local.getItem('test')).toBe('test')
  })

  it('should set and get items from session storage', () => {
    expect(kernel.storage).toBeInstanceOf(Storage)
    kernel.storage.session.setItem('test', 'test')
    expect(kernel.storage.session.getItem('test')).toBe('test')
  })

  it('should set and get items from indexed db', async () => {
    expect(kernel.storage).toBeInstanceOf(Storage)
    await new Promise(resolve => setTimeout(resolve, 100)) // wait for connection
    if (!kernel.storage.db) throw new Error('IndexedDB connection failed')

    const store = kernel.storage.db.transaction('ecmaos:storage', 'readwrite').objectStore('ecmaos:storage')
    const request = store.add({ data: 'test' })

    request.onsuccess = () => {
      expect(request?.result).toBe(1)
      store.index('data').get('test').onsuccess = (event) => {
        const target = event.target as IDBRequest;
        expect(target.result?.data).toBe('test');
      }
    }

    request.onerror = () => expect(request?.result).toBe(1)
  })
})

