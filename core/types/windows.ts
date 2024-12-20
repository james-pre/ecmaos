/**
 * Window management types and interfaces
 */

import type WinBox from 'winbox'

/** Window identifier type */
export type WindowId = string | number

/**
 * Options for configuring windows
 */
export interface WindowOptions extends WinBox.Params {
  /** Window icon */
  icon?: URL | string
}

/**
 * Interface for window management functionality
 */
export interface Windows {
  /**
   * Get all windows
   */
  all(): IterableIterator<[WindowId, WinBox]>

  /**
   * Close a window
   * @param id - Window ID
   */
  close(id: WindowId): void

  /**
   * Create a new window
   * @param options - Window configuration options
   */
  create(options: WindowOptions): WinBox

  /**
   * Create a dialog window
   * @param options - Dialog configuration options
   */
  dialog(options: WindowOptions): WinBox

  /**
   * Get a window by ID
   * @param id - Window ID
   */
  get(id: WindowId): WinBox | undefined

  /**
   * Remove a window
   * @param id - Window ID
   */
  remove(id: WindowId): void
} 