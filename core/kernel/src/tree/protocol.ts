import type { Kernel, ProtocolOptions } from '@ecmaos/types'

export class Protocol {
  public readonly kernel: Kernel

  constructor(options: ProtocolOptions) {
    this.kernel = options.kernel

    globalThis.navigator.registerProtocolHandler(
      import.meta.env.VITE_APP_PROTOCOL || options.schema || 'web+ecmaos',
      `${import.meta.env.VITE_APP_URL || window.location.origin}?protocol=%s`
    )
  }

  open(uri: string) {
    this.kernel.terminal.writeln(`Opening ${uri}`)
  }
}
