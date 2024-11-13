import { describe, it, expect } from 'vitest'

import { Kernel } from '#kernel.ts'

describe('Protocol', () => {
  it('should be defined', () => {
    const kernel = new Kernel()
    expect(kernel.protocol).toBeDefined()
  })
})
