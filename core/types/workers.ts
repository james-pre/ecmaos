/**
 * Worker management types and interfaces
 */

/**
 * Interface for worker management functionality
 */
export interface Workers {
  /**
   * Create a new worker from a Blob
   * @param blob - Worker script Blob
   */
  create(blob: Blob): Worker

  /**
   * Create a new shared worker from a Blob
   * @param blob - Shared worker script Blob
   */
  createShared(blob: Blob): SharedWorker
} 