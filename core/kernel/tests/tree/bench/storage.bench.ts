import { beforeAll, describe, it, expect } from 'vitest'

import { Kernel } from '#kernel.ts'
import { DefaultFilesystemOptionsTest } from '#filesystem.ts'
import { Storage } from '#storage.ts'

import { TestDomOptions, TestLogOptions } from '../fixtures/kernel.fixtures'

describe('Storage', () => {
  let kernel: Kernel

  beforeAll(() => {
    kernel = new Kernel({
      dom: TestDomOptions,
      filesystem: DefaultFilesystemOptionsTest,
      log: TestLogOptions,
    })
  })

  it('instantiation', () => {
    const instance = new Storage({ kernel })
    expect(instance).toBeInstanceOf(Storage)
  })
})
