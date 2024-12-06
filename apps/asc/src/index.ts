import 'assemblyscript/dist/web.js'
import asc from 'assemblyscript/asc'

import type { Kernel } from '@ecmaos/types'

export class App {
  constructor(private readonly kernel: Kernel) {
    this.kernel.log?.info('App initialized', asc)
  }
}
