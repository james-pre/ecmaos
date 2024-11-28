import KernelWasm from './kernel'

export async function initKernel() {
  try {
    const kernel = await KernelWasm.init()
    
    // Basic usage example
    const state = kernel._init()
    const version = kernel._get_version()
    
    console.log(`Kernel initialized in state: ${state}`)
    console.log(`Kernel version: ${version}`)
    
    return kernel
  } catch (err) {
    console.error('Failed to initialize WASM kernel:', err)
    throw err
  }
} 