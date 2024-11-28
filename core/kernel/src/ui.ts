import { Kernel } from '#kernel.ts'
import './ui.css'

declare global {
  var kernel: Kernel | undefined // eslint-disable-line no-var
}

globalThis.kernel = new Kernel({
  credentials: { username: 'root', password: 'root' },
  dom: { topbar: import.meta.env.NODE_ENV !== 'test' },
  log: { name: `ecmaos:${import.meta.env.NODE_ENV || 'kernel'}` },
  socket: import.meta.env.NODE_ENV !== 'test' ? new WebSocket('ws://localhost:30445/socket') : undefined
})

globalThis.kernel.terminal.mount(document.getElementById('terminal') as HTMLElement)
globalThis.kernel.boot({ silent: import.meta.env.NODE_ENV === 'test', figletFontRandom: false })
