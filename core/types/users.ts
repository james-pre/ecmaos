/**
 * User management types and interfaces
 */

import type { Kernel } from './kernel.ts'

/** User ID type */
export type UID = number

/** Group ID type */
export type GID = number

/**
 * Options for configuring user management
 */
export interface UsersOptions {
  /** Reference to kernel instance */
  kernel: Kernel
}

/**
 * Interface representing a user
 */
export interface User {
  /** Home directory path */
  home: string
  /** Group IDs */
  gid: number[]
  /** Username */
  username: string
  /** Shell path */
  shell: string
  /** Password hash */
  password: string
  /** User ID */
  uid: number
  /** Optional keypair for authentication */
  keypair?: {
    /** Private key (may be encrypted) */
    privateKey?: JsonWebKey | string
    /** Public key */
    publicKey: JsonWebKey
  }
}

/**
 * Options for adding a new user
 */
export interface AddUserOptions {
  /** Skip password hashing */
  noHash?: boolean
  /** Skip home directory creation */
  noHome?: boolean
  /** Skip writing to passwd file */
  noWrite?: boolean
}

/**
 * Interface for user management functionality
 */
export interface Users {
  /** Get all users */
  readonly all: Map<UID, User>

  /**
   * Add a new user
   * @param user - User to add
   * @param options - Options for adding user
   */
  add(user: Partial<User>, options?: AddUserOptions): Promise<void>

  /**
   * Get a user by ID
   * @param uid - User ID
   */
  get(uid: UID): User | undefined

  /**
   * Load users from storage
   */
  load(): Promise<void>

  /**
   * Login with credentials
   * @param username - Username
   * @param password - Password
   */
  login(username: string, password: string): Promise<{ cred: { uid: number, gid: number } }>

  /**
   * Change a user's password
   * @param oldPassword - Current password
   * @param newPassword - New password
   */
  password(oldPassword: string, newPassword: string): Promise<void>

  /**
   * Remove a user
   * @param uid - User ID to remove
   */
  remove(uid: UID): Promise<void>

  /**
   * Update a user
   * @param uid - User ID to update
   * @param updates - User properties to update
   */
  update(uid: UID, updates: Partial<User>): Promise<void>
} 