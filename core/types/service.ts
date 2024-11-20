/**
 * Service worker types and interfaces
 */

declare global {
  interface BackgroundFetchManager {
    fetch(id: string, urls: string[], options: object): Promise<BackgroundFetchRegistration>
  }

  interface BackgroundFetchRegistration extends EventTarget {
    readonly id: string;
    readonly uploadTotal: number;
    readonly uploaded: number;
    readonly downloadTotal: number;
    readonly downloaded: number;
    readonly result: unknown;
    readonly failureReason: unknown;
  
    match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response | undefined>;
    matchAll(): Promise<Response[]>;
    onprogress: ((this: BackgroundFetchRegistration, ev: ProgressEvent<BackgroundFetchRegistration>) => unknown) | null;
  }
}

import type { Kernel } from './kernel.ts'

/**
 * Options for configuring the service worker
 */
export interface ServiceOptions {
  /** Reference to kernel instance */
  kernel?: Kernel
  /** Path to service worker file */
  path?: string
  /** Whether to register the service worker */
  register?: boolean
}

/**
 * Interface for service worker functionality
 */
export interface Service {
  /** Get background fetches */
  readonly fetches: Record<string, BackgroundFetchRegistration>
  /** Get service options */
  readonly options: ServiceOptions
  /** Get service worker registration */
  readonly registration?: ServiceWorkerRegistration & {
    backgroundFetch: BackgroundFetchManager
  }

  /**
   * Fetch resources in the background
   * @param id - Fetch ID
   * @param urls - URLs to fetch
   * @param options - Fetch options
   */
  fetch(id: string, urls: string[], options: object): Promise<BackgroundFetchRegistration>

  /**
   * Send a message to the service worker
   * @param message - Message to send
   */
  message(message: string): Promise<void>

  /**
   * Register the service worker
   */
  register(): Promise<ServiceWorkerRegistration>

  /**
   * Unregister the service worker
   */
  unregister(): Promise<void>

  /**
   * Update the service worker
   */
  update(): Promise<void>
} 