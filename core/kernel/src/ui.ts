import * as kernel from '#kernel.ts'
import './ui.css'

declare global {
	var kernel?: typeof kernel // eslint-disable-line no-var
}

kernel.init({
  // credentials: { username: 'root', password: 'root' },
  dom: { topbar: import.meta.env.NODE_ENV !== 'test' },
  log: { name: `ecmaos:${import.meta.env.NODE_ENV || 'kernel'}` },
  socket: import.meta.env.NODE_ENV !== 'test' ? new WebSocket('ws://localhost:30445/socket') : undefined
})

globalThis.kernel = kernel;

globalThis.kernel.terminal.mount(document.getElementById('terminal') as HTMLElement)
globalThis.kernel.boot({ figletFontRandom: false })
