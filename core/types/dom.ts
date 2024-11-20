/**
 * DOM types and interfaces
 */

/**
 * Options for configuring DOM features
 */
export interface DomOptions {
  /** Whether to show the topbar */
  topbar?: boolean
}

/**
 * Interface for DOM functionality
 */
export interface Dom {
  /** Get the document instance */
  readonly document: Document
  /** Get the window instance */
  readonly window: Window

  /**
   * Toggle or set the topbar visibility
   * @param show - Optional boolean to set visibility state
   */
  topbar(show?: boolean): Promise<void>
} 