import type { Kernel, Shell, Terminal } from '@ecmaos/types'

declare global {
  var kernel: Kernel | undefined // eslint-disable-line no-var
  var kernels: Map<string, Kernel> | undefined // eslint-disable-line no-var
  var shells: Map<string, Shell> | undefined // eslint-disable-line no-var
  var terminals: Map<string, Terminal> | undefined // eslint-disable-line no-var

  interface Navigator {
    userAgentData: NavigatorUAData | null
  }
}

export type Timer = ReturnType<typeof setInterval>
