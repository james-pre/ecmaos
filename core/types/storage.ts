/**
 * Storage types and interfaces
 */

import type { Kernel } from './kernel.ts'

/**
 * Options for configuring storage
 */
export interface StorageOptions {
  /** Reference to kernel instance */
  kernel: Kernel
  /** IndexedDB configuration */
  indexed?: {
    /** Database name */
    name: string
    /** Database version */
    version: number
  }
}

/**
 * Interface for storage functionality
 */
export interface StorageProvider {
  /** Get the IndexedDB database instance */
  readonly db: IDBDatabase | null
  /** Get the kernel instance */
  readonly kernel: Kernel

  /** IndexedDB interface */
  readonly indexed: IDBFactory
  /** LocalStorage interface */
  readonly local: Storage
  /** SessionStorage interface */
  readonly session: Storage

  /** Get storage usage */
  usage(): Promise<StorageEstimate | null>
} 