import { beforeAll, describe, it, expect } from 'vitest'

import { Kernel } from '#kernel.ts'
import { Workers } from '#workers.ts'
import { DefaultFilesystemOptionsTest } from '#filesystem.ts'

import { TestDomOptions, TestLogOptions } from './fixtures/kernel.fixtures'

describe('Workers', () => {
  let kernel: Kernel

  beforeAll(() => {
    kernel = new Kernel({ dom: TestDomOptions, filesystem: DefaultFilesystemOptionsTest, log: TestLogOptions })
  })

  it('should instantiate', () => {
    const instance = new Workers({ kernel })
    expect(instance).toBeInstanceOf(Workers)
  })
})
