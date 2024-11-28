declare module KernelWasm {
  export enum KernelState {
    BOOTING = 0,
    RUNNING = 1,
    PANIC = 2,
    SHUTDOWN = 3
  }

  export interface KernelModule extends EmscriptenModule {
    ccall: typeof ccall
    cwrap: typeof cwrap
    _init(): number
    _get_version(): string
    _execute(command: string): number
  }

  export function init(): Promise<KernelModule>
}

export default KernelWasm 