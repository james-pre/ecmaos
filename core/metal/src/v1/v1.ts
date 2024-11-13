import { faker } from '@faker-js/faker'
import { Hono } from 'hono'

const v1 = new Hono()

v1.get('/fake/:namespace/:func', (c) => {
  const { namespace, func } = c.req.param()
  if (namespace in faker && typeof faker[namespace as keyof typeof faker] === 'object' && func in faker[namespace as keyof typeof faker]) {
    return c.json((faker[namespace as keyof typeof faker] as any)[func]())
  }

  return c.json({ error: 'Invalid namespace or function' }, 400)
})

export default v1
