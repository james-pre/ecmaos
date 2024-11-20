/**
 * Protocol handling types and interfaces
 */

import type { Kernel } from './kernel.ts'

/**
 * Options for configuring protocol handling
 */
export interface ProtocolOptions {
  /** Reference to kernel instance */
  kernel: Kernel
  /** Optional protocol schema */
  schema?: string
}

/**
 * Interface for protocol handling functionality
 */
export interface Protocol {
  /** Get the kernel instance */
  readonly kernel: Kernel

  /**
   * Open a URI with the protocol handler
   * @param uri - URI to open
   */
  open(uri: string): void
} 