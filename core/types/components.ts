/**
 * Component types and interfaces
 */

export type ComponentListener = (...args: unknown[]) => void

export interface Components {
  define: (name: string, component: CustomElementConstructor) => void
}
