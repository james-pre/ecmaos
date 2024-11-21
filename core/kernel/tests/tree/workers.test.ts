import { beforeAll, describe, it, expect } from 'vitest'

// import { Kernel } from '#kernel.ts'
import { Workers } from '#workers.ts'
// import { DefaultFilesystemOptionsTest } from '#filesystem.ts'

// import { TestDomOptions, TestLogOptions } from './fixtures/kernel.fixtures'

describe('Workers', () => {
  beforeAll(() => {
    // kernel = new Kernel({ dom: TestDomOptions, filesystem: DefaultFilesystemOptionsTest, log: TestLogOptions })
  })

  it('should instantiate', () => {
    const instance = new Workers()
    expect(instance).toBeInstanceOf(Workers)
  })
})
