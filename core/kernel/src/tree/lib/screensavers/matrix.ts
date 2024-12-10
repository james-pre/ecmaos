/* Inspired by https://codepen.io/yaclive/pen/EayLYO */

import type { Terminal, Timer } from '@ecmaos/types'

export default async function ({ terminal }: { terminal: Terminal }) {
  if (document.getElementById('screensaver')) return false

  const canvas = document.createElement('canvas')
  canvas.id = 'screensaver'
  canvas.width = globalThis.innerWidth
  canvas.height = globalThis.innerHeight
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = Number.MAX_SAFE_INTEGER.toString()

  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  const fontSize = 14
  const columns = Math.floor(canvas.width / fontSize)
  const drops = Array(columns).fill(1)
  const chars = '01~!#$%^&*()_+=-[]{}\\|;:",./<>?ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'.split('')
  if (!ctx) return false
  ctx.font = ctx.font.replace(/\d+px/, `${fontSize}px`)

  const animatrix = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (const [x, y] of drops.entries()) {
      ctx.fillStyle = '#0f0'
      const char = chars[Math.floor(Math.random() * chars.length)]
      if (!char) continue
      ctx.fillText(char, x * fontSize, y * fontSize)
      drops[x]++
      if (y * fontSize > canvas.height && Math.random() > 0.95) drops[x] = 0
    }
  }

  terminal.unlisten()
  const interval = setInterval(animatrix, 33)
  document.addEventListener('click', () => exit(interval, canvas, terminal))
  document.addEventListener('mousemove', () => exit(interval, canvas, terminal))
  document.addEventListener('keydown', () => exit(interval, canvas, terminal))
}

export async function exit (interval: Timer, canvas: HTMLCanvasElement, terminal: Terminal) {
  clearInterval(interval)
  canvas.remove()
  terminal.listen()
  terminal.focus()
}
