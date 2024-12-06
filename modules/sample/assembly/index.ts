export const author = 'Jay Mathis <code@mathis.network>'
export const description = 'A sample module for ecmaOS'
export const name = '@ecmaos/module-sample'
export const version = '0.1.0'

export let enabled: boolean = false

export function init(kernelId: string): i32 {
  console.log(`[${name}] Kernel ID: ${kernelId}`)
  enable()
  return 0
}

export function cleanup(): i32 {
  return 0
}

export function enable(): i32 {
  enabled = true
  return 0
}

export function disable(): i32 {
  enabled = false
  return 0
}
