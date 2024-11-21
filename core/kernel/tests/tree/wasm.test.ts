import { describe, it, expect, beforeAll } from 'vitest'

import { Wasm } from '#wasm.ts'
import { Kernel } from '#kernel.ts'

import { Kernel as IKernel } from '@ecmaos/types'

describe('Wasm', () => {
  let kernel: IKernel

  beforeAll(() => {
    kernel = new Kernel()
  })

  it('should instantiate', () => {
    const instance = new Wasm({ kernel })
    expect(instance).toBeInstanceOf(Wasm)
  })
})
