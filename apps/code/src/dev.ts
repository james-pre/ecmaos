import { InMemory } from '@zenfs/core'
import { Kernel } from '@ecmaos/kernel'

import '@ecmaos/kernel/ui.css'
import main from './main.ts'

declare global {
  var kernel: Kernel | undefined // eslint-disable-line no-var
}

const kernel = globalThis.kernel = new Kernel({
  credentials: { username: 'root', password: 'root' },
  filesystem: {
    mounts: {
      // @ts-expect-error
      '/': InMemory
    }
  }
})

kernel.terminal.mount(document.getElementById('terminal')!)
await kernel.boot({ silent: true })

const instance = kernel.processes.create({
  args: ['/bin/ls'],
  command: '/usr/bin/code',
  cwd: '/tmp',
  gid: 0,
  kernel,
  shell: kernel.shell,
  terminal: kernel.terminal,
  uid: 0
})

const params = {
  args: ['/tmp/test.js'],
  command: '/usr/bin/code',
  cwd: '/tmp',
  gid: 0,
  instance,
  kernel,
  pid: 1,
  shell: kernel.shell,
  terminal: kernel.terminal,
  uid: 0
}

main(params)
