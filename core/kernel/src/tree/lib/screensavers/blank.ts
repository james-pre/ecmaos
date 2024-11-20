import type { Terminal } from '@ecmaos/types'

export default async function ({ terminal }: { terminal: Terminal }) {
  if (document.getElementById('screensaver')) return false

  const canvas = document.createElement('canvas')
  canvas.id = 'screensaver'
  canvas.width = globalThis.innerWidth
  canvas.height = globalThis.innerHeight
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = '1000000'

  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) return false
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  canvas.addEventListener('click', () => exit(canvas, terminal))
  document.addEventListener('click', () => exit(canvas, terminal))
  document.addEventListener('mousemove', () => exit(canvas, terminal))
  document.addEventListener('keydown', () => exit(canvas, terminal))
}

export async function exit (canvas: HTMLCanvasElement, terminal: Terminal) {
  canvas.remove()
  terminal.listen()
  terminal.focus()
}
