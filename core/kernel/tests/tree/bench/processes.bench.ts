import { describe, it, expect } from 'vitest'

import { ProcessManager } from '#processes.ts'

describe('Process Manager', () => {
  it('instantiation', () => {
    const instance = new ProcessManager()
    expect(instance).toBeInstanceOf(ProcessManager)
  })
})
