declare const self: ServiceWorkerGlobalScope

import { Hono } from 'hono'
import { handle } from 'hono/service-worker'
import { faker } from '@faker-js/faker'

import pkg from './package.json'

const pendingFileRequests = new Map<string, {
  resolve: (value: any) => void
  reject: (reason?: any) => void
  timeout: NodeJS.Timeout
}>()

const app = new Hono().basePath('/swapi')

app.get('/', (c) => c.json({ name: pkg.name, version: pkg.version }))

app.get('/fake/:namespace/:func', (c) => {
  const { namespace, func } = c.req.param()
  return c.json(faker[namespace][func]())
})

app.get('/fs/:file{.*}', async (c) => {
  const file = c.req.param('file')
  const clients = await self.clients.matchAll()

  const fileDataPromise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingFileRequests.delete(file)
      reject(new Error('File request timed out'))
    }, 5000)

    pendingFileRequests.set(file, { resolve, reject, timeout })
  })

  // TODO: target client by kernelId?
  clients.forEach(client => client.postMessage({ type: 'fs', file }))

  try {
    const fileData = await fileDataPromise
    const extensions = {
      'js': 'application/javascript',
      'wasm': 'application/wasm',
      'txt': 'text/plain',
      'md': 'text/markdown',
      'css': 'text/css',
      'html': 'text/html'
    }

    const mimeType = c.req.query('mime') || extensions[file.split('.').pop() as keyof typeof extensions] || 'application/octet-stream'
    const response = new Response(fileData as BodyInit, {
      status: 200,
      headers: { 'Content-Type': mimeType }
    })

    return response
  } catch (error) {
    return c.json({ error: error.message }, 500)
  }
})

self.addEventListener('message', (event) => {
  switch (event.data.type) {
    case 'fs':
      const { file, data, error } = event.data
      const pending = pendingFileRequests.get(file)

      if (pending) {
        clearTimeout(pending.timeout)
        pendingFileRequests.delete(file)
        if (error) pending.reject(error)
        else pending.resolve(data)
      }

      break
  }
})

self.addEventListener('activate', (event) => {
  self.skipWaiting()
  event.waitUntil(
    (async () => {
      await self.clients.claim()
      const clients = await self.clients.matchAll()
      clients.forEach(client => {
        client.postMessage({
          type: 'log',
          message: `SWAPI ${pkg.version} is active`
        })
      })
    })()
  )
})

self.addEventListener('fetch', handle(app))
