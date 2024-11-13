import { bench, describe } from 'vitest'

import { Events } from '#events.ts'

describe('Events', () => {
  bench('Processed Events', () => {
    const events = new Events()
    events.on('test', () => {})
    events.dispatch('test', { data: 'test' })
  })
})
