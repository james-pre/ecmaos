import { bench, describe } from 'vitest'

import { Intervals } from '#intervals.ts'

describe('Intervals', () => {
  bench('Create Interval Manager', () => {
    new Intervals()
  })
})
