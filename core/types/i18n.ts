/**
 * Internationalization types and interfaces
 */

import type { InitOptions, TFunction } from 'i18next'
import type i18next from 'i18next'

/**
 * Interface for internationalization functionality
 */
export interface I18n {
  /** Get the i18next instance */
  readonly i18next: typeof i18next
  /** Get the current language */
  readonly language: string
  /** Get the translation function */
  readonly t: TFunction
}

/**
 * Options for configuring internationalization
 */
export interface I18nOptions extends InitOptions {
  /** Resources for translations */
  resources?: Record<string, Record<string, Record<string, string>>>
  /** Default language */
  lng?: string
  /** Fallback language */
  fallbackLng?: string
  /** Namespaces */
  ns?: string[]
  /** Default namespace */
  defaultNS?: string
  /** Interpolation options */
  interpolation?: {
    escapeValue?: boolean
  }
} 