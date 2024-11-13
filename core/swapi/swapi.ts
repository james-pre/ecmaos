declare const self: ServiceWorkerGlobalScope

import { Hono } from 'hono'
import { handle } from 'hono/service-worker'
import { faker } from '@faker-js/faker'

import pkg from './package.json'

const app = new Hono().basePath('/swapi')

app.get('/', (c) => c.json({ name: pkg.name, version: pkg.version }))

app.get('/fake/:namespace/:func', (c) => {
  const { namespace, func } = c.req.param()
  return c.json(faker[namespace][func]())
})

self.addEventListener('fetch', handle(app))
