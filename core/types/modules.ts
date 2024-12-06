export type KernelModules = Map<string, KernelModule>

export interface KernelModule {
  author: { value: string }
  cleanup(): number
  description: { value: string }
  disable(): number
  enable(): number
  init(kernelId: string): number
  name: { value: string }
  version: { value: string }
}
