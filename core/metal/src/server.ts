import fs from 'fs'
import { createNodeWebSocket } from '@hono/node-ws'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { spawn } from 'node-pty'
import * as jose from 'jose'

import pkg from '../package.json' with { type: 'json' }

const versions = ['v1']
const latestVersion = versions[versions.length - 1]

const authorizedKeys = JSON.parse(fs.readFileSync('./authorized_keys.json', 'utf8'))

if (!fs.existsSync('./server.key')) {
  const serverPrivateKey = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-384' }, true, ['sign', 'verify'])
  const serverPublicKey = await crypto.subtle.exportKey('jwk', serverPrivateKey.publicKey)
  fs.writeFileSync('./server.key', JSON.stringify({ privateKey: serverPrivateKey, publicKey: serverPublicKey }))
}

const serverKey = JSON.parse(fs.readFileSync('./server.key', 'utf8'))

const app = new Hono()
const processes = new Map<string, any>()
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.use('*', cors())
app.get('/', (c) => c.json({ name: pkg.name, version: pkg.version, versions, latestVersion }))
app.get('/server.key', (c) => c.json(serverKey.publicKey))
for (const version of versions) app.route(`/${version}`, (await import(`./${version}/${version}.ts`)).default)

// @ts-expect-error
app.get('/socket', upgradeWebSocket(() => {
  return {
    onOpen: (event: Event, ws: WebSocket & { id: string }) => {
      ws.id = crypto.randomUUID()
      ws.send(`${pkg.name}:${pkg.version}:${ws.id}:${btoa(JSON.stringify(serverKey.publicKey))}`)
      console.log(`${ws.id} connected`)
    },
    onClose: (event: CloseEvent, ws: WebSocket & { id: string }) => {
      console.log(`${ws.id} closed`)
      processes.delete(ws.id)
    },
    onMessage: (message: MessageEvent, ws: WebSocket & { id: string }) => {
      if (processes.has(ws.id)) return processes.get(ws.id).write(message.data)

      const encryptedJWT = message.data
      
      try {
        jose.importJWK(serverKey.privateKey, 'ES384')
          .then(async privateKey => {
            const decryptedResult = await jose.compactDecrypt(encryptedJWT, privateKey)
            console.log(decryptedResult)
          })

        // const decryptionKey = await crypto.subtle.generateKey(
        //   { name: 'AES-GCM', length: 256 },
        //   true,
        //   ['encrypt', 'decrypt']
        // )

        // const decryptedJWT = await new jose.CompactDecrypt(
        //   encryptedJWT,
        //   decryptionKey
        // ).decrypt()

        // const jwt = new TextDecoder().decode(decryptedJWT.plaintext)

        // const publicKey = await jose.importJWK(serverKey.publicKey, 'ES384')
        // const { payload } = await jose.jwtVerify(jwt, publicKey, {
        //   issuer: /^urn:ecmaos:kernel:.+$/,
        //   audience: /^urn:ecmaos:user:.+$/
        // })

        // const command = payload['urn:ecmaos:metal:command']
        // const args = payload['urn:ecmaos:metal:args']
        // const rows = payload['urn:ecmaos:metal:rows'] 
        // const cols = payload['urn:ecmaos:metal:cols']
        // const username = payload['urn:ecmaos:metal:user']
        // const userKey = payload['urn:ecmaos:metal:key']
        // const timestamp = payload['urn:ecmaos:metal:timestamp']

        // // TODO: Handle the decrypted command
        // console.log('Decrypted command:', { command, args, rows, cols, username, userKey, timestamp })

      } catch {}
    },
    onMessageOld: (message: MessageEvent, ws: WebSocket & { id: string }) => {
      if (processes.has(ws.id)) return processes.get(ws.id).write(message.data)

      try {
        const exec = JSON.parse(decodeURIComponent(message.data))

        switch (exec.command) {
          case 'auth':
            // generate a challenge
            break
          case 'ping':
            ws.send('pong\n')
            break
          case 'echo':
            ws.send(`${exec.args}\n`)
            break
          case 'charstream':
            let interval: any
            let point = 0
            interval = setInterval(() => {
              if (point > 65535) point = 0
              ws.send(String.fromCodePoint(point))
              point++
            }, 10)
            break
          case 'run':
            console.log(`Spawning ${exec.args[0].trim()} with ${exec.args.slice(1).join(' ')}`)

            const username = exec.user
            const publicKey = exec.key
            const userKeys = authorizedKeys[username]
            if (!userKeys) return ws.send(JSON.stringify({ error: 'Unauthorized' }))

            const authorizedKey = userKeys.find((key: any) => key.alg === publicKey.alg && key.use === publicKey.use && key.kid === publicKey.kid && key.kty === publicKey.kty && key.x === publicKey.x && key.y === publicKey.y)
            if (!authorizedKey) return ws.send(JSON.stringify({ error: 'Unauthorized' }))

            const pty = spawn(exec.args[0].trim(), exec.args.slice(1), {
              name: 'xterm-256color',
              cols: exec.cols || 80,
              rows: exec.rows || 24,
              cwd: exec.cwd || process.env.HOME,
              env: exec.env || process.env
            })

            processes.set(ws.id, pty)

            pty.onData((data) => {
              ws.send(data)
            })

            pty.onExit((code) => {
              processes.delete(ws.id)
              console.log(`Process from client ${ws.id} exited with code ${code?.exitCode ?? 'unknown'}`)
              ws.send(`Process from client ${ws.id} exited with code ${code?.exitCode ?? 'unknown'}\n`)
            })

            break
        }
      } catch {}
    }
  }
}))

// Don't expose to any network
const server = serve({ hostname: 'localhost', port: Number(process.env.PORT) || 30445, fetch: app.fetch })
injectWebSocket(server)
