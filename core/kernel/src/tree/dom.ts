import type { DomOptions } from '@ecmaos/types'

export const DefaultDomOptions: DomOptions = { topbar: true }

export class Dom {
  private _document: Document = globalThis.document
  private _window: Window = globalThis.window
  private _topbar: boolean = false
  private _topbarShow: boolean = false

  get document() { return this._document }
  get window() { return this._window }

  constructor(_options: DomOptions = DefaultDomOptions) {
    const options = { ...DefaultDomOptions, ..._options }
    this._topbar = options.topbar ?? true
  }

  async topbar(show?: boolean) {
    if (!this._topbar) return
    const { default: topbar } = await import('topbar')
    this._topbarShow = show ?? !this._topbarShow
    // @ts-ignore
    if (this._topbarShow) topbar.show()
    else topbar.hide()
  }
}
