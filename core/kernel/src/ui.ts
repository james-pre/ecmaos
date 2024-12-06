import { Kernel } from '#kernel.ts'
import './ui.css'

declare global {
  var kernel: Kernel | undefined // eslint-disable-line no-var
  var kernels: Map<string, Kernel> | undefined // eslint-disable-line no-var
}

const username = import.meta.env.VITE_AUTOLOGIN_USERNAME
const password = import.meta.env.VITE_AUTOLOGIN_PASSWORD
const socket = import.meta.env.VITE_METAL_SOCKET

const kernel = new Kernel({
  credentials: (username && password) ? { username, password } : undefined,
  dom: { topbar: import.meta.env.NODE_ENV !== 'test' },
  log: { name: `ecmaos:${import.meta.env.NODE_ENV || 'kernel'}` },
  socket: socket ? new WebSocket(socket) : undefined
})

globalThis.kernels = globalThis.kernels || new Map()
globalThis.kernels.set(kernel.id, kernel)

const primaryKernel = globalThis.kernels.values().next().value
globalThis.kernel = primaryKernel

kernel.terminal.mount(document.getElementById('terminal') as HTMLElement)
kernel.boot({ silent: import.meta.env.NODE_ENV === 'test', figletFontRandom: false })
