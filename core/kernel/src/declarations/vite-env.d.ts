/// <reference types="vite/client" />
/// <reference types="user-agent-data-types" />

// https://vitejs.dev/guide/api-hmr.html
interface ViteHotContext {
  readonly data: unknown

  // accept(): void
  accept(cb?: (mod: ModuleNamespace | undefined) => void): void
  accept(dep: string, cb: (mod: ModuleNamespace | undefined) => void): void
  accept(deps: readonly string[], cb: (mods: Array<ModuleNamespace | undefined>) => void): void

  dispose(cb: (data: unknown) => void): void
  decline(): void
  invalidate(): void

  // `InferCustomEventPayload` provides types for built-in Vite events
  on<T extends string>(event: T, cb: (payload: InferCustomEventPayload<T>) => void): void
  send<T extends string>(event: T, data?: InferCustomEventPayload<T>): void
}

// Allow for virtual module imports
// https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention
declare module 'virtual:*'
