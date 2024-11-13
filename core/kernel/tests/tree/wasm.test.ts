import { describe, it, expect, beforeAll } from 'vitest'

import { Wasm } from '#wasm.ts'
import { Kernel } from '#kernel.ts'

describe('Wasm', () => {
  let kernel: Kernel

  beforeAll(() => {
    kernel = new Kernel()
  })

  it('should instantiate', () => {
    const instance = new Wasm({ kernel })
    expect(instance).toBeInstanceOf(Wasm)
  })
})
