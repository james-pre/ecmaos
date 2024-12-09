/**
 * Process management types and interfaces
 */

import type { Kernel } from './kernel.ts'
import type { Shell } from './shell.ts'
import type { Terminal } from './terminal.ts'

/** Process status type */
export type ProcessStatus = 'running' | 'paused' | 'stopped' | 'exited'

/** Map of process IDs to processes */
export type ProcessesMap = Map<number, Process>

/**
 * Options for configuring processes
 */
export interface ProcessOptions {
  /** User ID */
  uid: number
  /** Group ID */
  gid: number
  /** Command line arguments */
  args?: string[]
  /** Exit code */
  code?: number
  /** Command name */
  command?: string
  /** Working directory */
  cwd?: string
  /** Process entry point */
  entry?: (params: ProcessEntryParams) => Promise<number | undefined | void>
  /** Reference to kernel instance */
  kernel?: Kernel
  /** Parent process ID */
  parent?: number
  /** Reference to shell instance */
  shell?: Shell
  /** Process status */
  status?: ProcessStatus
  /** Standard error stream */
  stderr?: WritableStream<Uint8Array>
  /** Standard input stream */
  stdin?: ReadableStream<Uint8Array>
  /** Standard output stream */
  stdout?: WritableStream<Uint8Array>
  /** Reference to terminal instance */
  terminal?: Terminal
}

/**
 * Parameters passed to process entry point
 */
export interface ProcessEntryParams {
  /** Process ID */
  pid: number
  /** User ID */
  uid: number
  /** Group ID */
  gid: number
  /** Command line arguments */
  args: string[]
  /** Command name */
  command: string
  /** Working directory */
  cwd: string
  /** Process instance */
  instance: Process
  /** Reference to kernel instance */
  kernel: Kernel
  /** Reference to shell instance */
  shell: Shell
  /** Reference to terminal instance */
  terminal: Terminal
  /** Standard input stream */
  stdin?: ReadableStream<Uint8Array>
  /** Standard output stream */
  stdout?: WritableStream<Uint8Array>
  /** Standard error stream */
  stderr?: WritableStream<Uint8Array>
}

/**
 * Process events
 */
export enum ProcessEvents {
  EXIT = 'exit',
  PAUSE = 'pause',
  RESUME = 'resume',
  START = 'start',
  STOP = 'stop'
}

/**
 * Process event interfaces
 */
export interface ProcessExitEvent {
  pid: number
  code: number
}

export interface ProcessStartEvent {
  pid: number
}

export interface ProcessStopEvent {
  pid: number
}

export interface ProcessPauseEvent {
  pid: number
}

export interface ProcessResumeEvent {
  pid: number
}

/**
 * Interface for process functionality
 */
export interface Process {
  /** Get command line arguments */
  readonly args: string[]
  /** Get exit code */
  readonly code?: number
  /** Get command name */
  readonly command: string
  /** Get working directory */
  readonly cwd: string
  /** Get process entry point */
  readonly entry: (params: ProcessEntryParams) => Promise<number | undefined | void>
  /** Get event emitter */
  readonly events: any
  /** Get group ID */
  readonly gid: number
  /** Get kernel instance */
  readonly kernel: Kernel
  /** Get process ID */
  readonly pid: number
  /** Get shell instance */
  readonly shell: Shell
  /** Get process status */
  readonly status: ProcessStatus
  /** Get standard error stream */
  readonly stderr: WritableStream<Uint8Array>
  /** Get standard input stream */
  readonly stdin: ReadableStream<Uint8Array>
  /** Get standard output stream */
  readonly stdout: WritableStream<Uint8Array>
  /** Get terminal instance */
  readonly terminal: Terminal
  /** Get user ID */
  readonly uid: number

  /** Get/set parent process ID */
  parent?: number

  /** Clean up process resources */
  cleanup(): Promise<void>
  /** Exit process */
  exit(exitCode?: number): Promise<void>
  /** Pause process */
  pause(): void
  /** Resume process */
  resume(): void
  /** Start process */
  start(): Promise<number>
  /** Stop process */
  stop(exitCode?: number): Promise<void>
  /** Restart process */
  restart(): void
}

/**
 * Interface for process manager functionality
 */
export interface ProcessManager {
  /** Get all processes */
  readonly all: ProcessesMap

  /**
   * Add a process
   * @param process - Process to add
   */
  add(process: Process): number

  /**
   * Create a process
   * @param options - Process options
   */
  create(options: ProcessOptions): Process

  /**
   * Get a process by ID
   * @param pid - Process ID
   */
  get(pid: number): Process | undefined

  /**
   * Get next available process ID
   */
  pid(): number

  /**
   * Remove a process
   * @param pid - Process ID
   */
  remove(pid: number): void

  /**
   * Spawn a child process
   * @param parent - Parent process ID
   * @param process - Process to spawn
   */
  spawn(parent: number, process: Process): number
} 