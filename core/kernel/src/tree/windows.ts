import 'winbox'
import 'winbox/dist/css/winbox.min.css'
// @ts-expect-error
import WinBox from 'winbox/src/js/winbox.js'

declare const WinBox: WinBox.WinBoxConstructor;

declare module 'winbox' {
  interface WinBoxConstructor {
    stack(): WinBox[];
  }
}

const DefaultWindowOptions: WinBox.Params = {
  background: 'black',
  border: 1,
  class: 'ecmaos-window',
  height: 300,
  title: 'Untitled',
  width: 300,
  x: 'center',
  y: 'center'
}

const DefaultDialogOptions: WinBox.Params = {
  ...DefaultWindowOptions,
  modal: true,
  width: 320,
  height: 200,
}

export class Windows {
  private _manager: Map<WindowId, WinBox> = new Map()
  get stack() { return WinBox.stack() }

  all() {
    return this._manager.entries()
  }

  close(id: WindowId) {
    this._manager.get(id)?.close()
    this.remove(id)
  }
  
  create(_options: WinBox.Params = DefaultWindowOptions) {
    const options = { ...DefaultWindowOptions, ..._options }
    const id = options.id || Math.random().toString(36).substring(2, 8)
    const win = new WinBox(options)
    this._manager.set(id, win)
    return win
  }

  dialog(options: WinBox.Params = DefaultDialogOptions) {
    return this.create({ ...DefaultDialogOptions, ...options })
  }

  get(id: WindowId) {
    return this._manager.get(id)
  }

  remove(id: WindowId) {
    this._manager.delete(id)
  }
}

// --- Types ---

export type WindowId = string | number

export interface WindowOptions {
  id?: WindowId
  html?: string
  width?: number
  height?: number
  maximized?: boolean
  title?: string
}
