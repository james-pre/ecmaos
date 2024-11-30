/**
 * Core kernel types and interfaces
 */

import type { BIOSModule } from '@ecmaos/bios'
import type { DeviceDriver } from '@zenfs/core'
import type { InitOptions } from 'i18next'
import type { Notyf } from 'notyf'
import type Module from 'node:module'

import type {
  Auth,
  Components,
  Dom,
  DomOptions,
  KernelDevice,
  EventCallback,
  Events,
  Filesystem,
  FilesystemConfigMounts,
  FilesystemOptions,
  I18n,
  Intervals,
  Keyboard,
  Log,
  LogOptions,
  Memory,
  ProcessManager,
  Protocol,
  Service,
  ServiceOptions,
  Shell,
  StorageProvider,
  Terminal,
  Users,
  Wasm,
  Windows,
  Workers,
} from './index.ts'

/**
 * @alpha
 * @author Jay Mathis <code@mathis.network> (https://github.com/mathiscode)
 *
 * @remarks
 * The Kernel class is the core of the ecmaOS system.
 * It manages the system's resources and provides a framework for system services.
 *
 */
export interface Kernel {
  readonly id: string
  readonly name: string
  readonly version: string
  readonly state: KernelState
  readonly options: KernelOptions
  readonly terminal: Terminal
  readonly shell: Shell
  readonly log: Log | null

  // Core services
  readonly auth: Auth
  bios?: BIOSModule
  readonly channel: BroadcastChannel
  readonly components: Components
  readonly dom: Dom
  readonly devices: Map<string, { device: KernelDevice, drivers?: DeviceDriver[] }>
  readonly events: Events
  readonly filesystem: Filesystem
  readonly i18n: I18n
  readonly intervals: Intervals
  readonly keyboard: Keyboard
  readonly memory: Memory
  readonly packages: Map<string, Module>
  readonly processes: ProcessManager
  readonly protocol: Protocol
  readonly screensavers: Map<string, {
    default: (options: { terminal: Terminal }) => Promise<void>
    exit: () => Promise<void>
  }>
  readonly service: Service
  readonly storage: StorageProvider
  readonly toast: Notyf
  readonly users: Users
  readonly wasm: Wasm
  readonly windows: Windows
  readonly workers: Workers

  // Event handling aliases
  addEventListener: (event: KernelEvents, listener: EventCallback) => void
  removeEventListener: (event: KernelEvents, listener: EventCallback) => void

  // Core methods
  boot(options?: BootOptions): Promise<void>
  configure(options: KernelOptions): Promise<void>
  execute(options: KernelExecuteOptions): Promise<number>
  notify(title: string, options?: object): Promise<Notification | void>
  on(event: KernelEvents, listener: EventCallback): void
  off(event: KernelEvents, listener: EventCallback): void
  reboot(): Promise<void>
  shutdown(): Promise<void>
}

/**
 * Kernel events
 */
export enum KernelEvents {
  BOOT = 'kernel:boot',
  EXECUTE = 'kernel:execute',
  PANIC = 'kernel:panic',
  REBOOT = 'kernel:reboot',
  SHUTDOWN = 'kernel:shutdown',
  UPLOAD = 'kernel:upload'
}

/**
 * Kernel states
 */
export enum KernelState {
  BOOTING = 'booting',
  PANIC = 'panic',
  RUNNING = 'running',
  SHUTDOWN = 'shutdown'
}

/**
 * Options for configuring the kernel
 */
export interface KernelOptions {
  blacklist?: {
    commands?: string[]
  }
  credentials?: {
    username: string
    password: string
  }
  dom?: DomOptions
  filesystem?: FilesystemOptions<FilesystemConfigMounts>
  i18n?: InitOptions
  log?: LogOptions
  service?: ServiceOptions
  socket?: WebSocket
  toast?: object
}

/**
 * Options for booting the kernel
 */
export interface BootOptions {
  figletFont?: string
  figletFontRandom?: boolean
  figletColor?: string
  silent?: boolean
}

/**
 * Options for executing commands
 */
export interface KernelExecuteOptions {
  command: string
  args?: string[]
  kernel?: Kernel
  shell: Shell
  terminal?: Terminal
  stdin?: ReadableStream<Uint8Array>
  stdout?: WritableStream<Uint8Array>
  stderr?: WritableStream<Uint8Array>
}

/**
 * Event interfaces
 */
export interface KernelExecuteEvent {
  command: string
  args?: string[]
  exitCode: number
}

export interface KernelPanicEvent {
  error: Error
}

export interface KernelShutdownEvent {
  data: Record<string, unknown>
}

export interface KernelUploadEvent {
  file: string
  path: string
}
