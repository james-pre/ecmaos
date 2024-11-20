/**
 * WebAssembly management types and interfaces
 */

import type { Kernel } from './kernel.ts'

/**
 * Options for configuring WebAssembly management
 */
export interface WasmOptions {
  /** Reference to kernel instance */
  kernel: Kernel
}

/**
 * Interface for WebAssembly management functionality
 */
export interface Wasm {
  /**
   * Load an emscripten JS file compiled using -sSINGLE_FILE
   * @param path - Path to the emscripten JS file
   */
  loadEmscripten(path: string): Promise<void>
} 