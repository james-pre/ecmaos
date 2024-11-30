import type { Kernel, WasmOptions, Wasm as IWasm } from '@ecmaos/types'

// TODO: I don't like how heavy wabt.js is, but I want to keep experimenting with it - move WABT support to a separate package
// import wabt, { WasmFeatures, WasmModule, ReadWasmOptions } from 'wabt'

// interface WabtModule {
//   /** Parses a WebAssembly text format source to a module. */
//   parseWat(filename: string, buffer: string | Uint8Array, options?: WasmFeatures): WasmModule;
//   /** Reads a WebAssembly binary to a module. */
//   readWasm(buffer: Uint8Array, options: ReadWasmOptions & WasmFeatures): WasmModule;
// }

export class Wasm implements IWasm {
  private _kernel: Kernel
  // private _wabt?: WabtModule

  constructor(options: WasmOptions) {
    this._kernel = options.kernel
    // wabt().then((w: WabtModule) => this._wabt = w)
  }

  /**
   * Load an emscripten JS file compiled using -sSINGLE_FILE
   */
  async loadEmscripten(path: string) {
    const contents = await this._kernel.filesystem.fs.readFile(path, 'utf-8')
    const script = document.createElement('script')
    script.textContent = contents
    document.head.appendChild(script)
  }
}
