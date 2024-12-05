import { Kernel } from '#kernel.ts'
import './ui.css'

declare global {
  var kernel: Kernel | undefined // eslint-disable-line no-var
}

const username = import.meta.env.VITE_AUTOLOGIN_USERNAME
const password = import.meta.env.VITE_AUTOLOGIN_PASSWORD
const socket = import.meta.env.VITE_METAL_SOCKET

globalThis.kernel = new Kernel({
  credentials: (username && password) ? { username, password } : undefined,
  dom: { topbar: import.meta.env.NODE_ENV !== 'test' },
  log: { name: `ecmaos:${import.meta.env.NODE_ENV || 'kernel'}` },
  socket: socket ? new WebSocket(socket) : undefined
})

globalThis.kernel.terminal.mount(document.getElementById('terminal') as HTMLElement)
globalThis.kernel.boot({ silent: import.meta.env.NODE_ENV === 'test', figletFontRandom: false })
