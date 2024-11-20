import { bench, describe } from 'vitest'

import { Kernel } from '#kernel.ts'

describe('Kernel', () => {
  let kernel: Kernel

  bench('Boot kernel', async () => {
    kernel = new Kernel({ dom: { topbar: false }, log: false })
    await kernel.boot({ silent: true })
  })

  // TODO: This benchmark runs into an error in zenfs:
  // Size mismatch in buffer
  // bench('Boot kernel', async () => {
    // await kernel.boot({ silent: true })
    // kernel.shutdown()
  // })

  bench('Execute command', async () => {
    await kernel.execute({ command: '/bin/echo', shell: kernel.shell })
  })
})
