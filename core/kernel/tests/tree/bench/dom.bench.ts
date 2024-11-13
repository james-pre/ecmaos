import { bench, describe } from 'vitest'

import { Dom } from '#dom.ts'

describe('Dom', () => {
  bench('Create Dom Manager', () => {
    new Dom()
  })
})
