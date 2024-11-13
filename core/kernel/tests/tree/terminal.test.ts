import { describe, expect, it } from 'vitest'

import { Kernel } from '#kernel.ts'
import { DefaultFilesystemOptionsTest } from '#filesystem.ts'

import { TestDomOptions, TestLogOptions } from './fixtures/kernel.fixtures'

describe('Terminal', () => {
  it('should initialize', async () => {
    const kernel = new Kernel({ dom: TestDomOptions, filesystem: DefaultFilesystemOptionsTest, log: TestLogOptions })
    await kernel.boot()
    expect(kernel.terminal).toBeDefined()
  })
})
