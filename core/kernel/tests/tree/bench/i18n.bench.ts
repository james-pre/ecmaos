import { bench, describe } from 'vitest'

import { I18n } from '#i18n.ts'

describe('I18n', () => {
  bench('Translate', () => {
    const i18n = new I18n()
    i18n.t('test')
  })
})
