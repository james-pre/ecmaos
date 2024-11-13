import { bench, describe } from 'vitest'

import { Filesystem } from '#filesystem.ts'

describe('Filesystem', () => {
  const filesystem = new Filesystem()

  bench('Write file', () => {
    filesystem.fsSync.writeFileSync('/test.txt', crypto.randomUUID())
  })

  bench('Read file', () => {
    filesystem.fsSync.readFileSync('/test.txt')
  })
})
