import i18next from 'i18next'
import resources from 'virtual:i18next-loader'

import type { InitOptions } from 'i18next'

export const DefaultI18nOptions: InitOptions = {
  resources,
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'kernel'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false
  }
}

export class I18n {
  private _i18next: typeof i18next

  get i18next() { return this._i18next as typeof i18next }
  get language() { return this._i18next.language }
  get t() { return this._i18next.t as typeof i18next.t }

  constructor(_options?: InitOptions) {
    const options = { ...DefaultI18nOptions, ..._options }
    this._i18next = i18next
    i18next.init(options)
  }
}
