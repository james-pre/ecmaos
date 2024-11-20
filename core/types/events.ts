/**
 * Event handling types and interfaces
 */

/**
 * Callback function type for event handlers
 */
export type EventCallback<T = unknown> = (data: T) => void

/**
 * Interface for event handling functionality
 */
export interface Events {
  /**
   * Clear all event listeners
   */
  clear(): void

  /**
   * Dispatch an event with data
   * @param event - Event name
   * @param data - Event data
   */
  dispatch: <T>(event: string, data: T) => void

  /**
   * Alias for dispatch
   * @param event - Event name
   * @param data - Event data
   */
  emit: <T>(event: string, data: T) => void

  /**
   * Alias for on
   * @param event - Event name
   * @param callback - Event handler
   */
  listen: <T>(event: string, callback: EventCallback<T>) => void

  /**
   * Add an event listener
   * @param event - Event name
   * @param callback - Event handler
   */
  on: <T>(event: string, callback: EventCallback<T>) => void

  /**
   * Remove an event listener
   * @param event - Event name
   * @param callback - Event handler
   */
  off: <T>(event: string, callback: EventCallback<T>) => void

  /**
   * Alias for off
   * @param event - Event name
   * @param callback - Event handler
   */
  unlisten: <T>(event: string, callback: EventCallback<T>) => void
}
