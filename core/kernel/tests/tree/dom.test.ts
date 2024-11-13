import { describe, it, expect } from 'vitest'
import { Kernel } from '#kernel.ts'

describe('Dom', () => {
  it('should have a document and a window', () => {
    const kernel = new Kernel({
      dom: { topbar: false }
    })

    expect(kernel.dom.document).toBeDefined()
    expect(kernel.dom.window).toBeDefined()
  })
})
