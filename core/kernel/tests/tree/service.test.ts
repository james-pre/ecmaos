import { beforeAll, describe, expect, it } from 'vitest'

import { Kernel } from '#kernel.ts'
import { Service } from '#service.ts'
import { DefaultFilesystemOptionsTest } from '#filesystem.ts'

import { TestDomOptions, TestLogOptions } from './fixtures/kernel.fixtures'

describe('Service', () => {
  let kernel: Kernel

  beforeAll(() => {
    kernel = new Kernel({ dom: TestDomOptions, filesystem: DefaultFilesystemOptionsTest, log: TestLogOptions })
  })

  it('should instantiate', () => {
    const instance = new Service({ kernel })
    expect(instance).toBeInstanceOf(Service)
  })
})
