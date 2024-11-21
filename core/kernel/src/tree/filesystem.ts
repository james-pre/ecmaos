/**
 * The filesystem module provides filesystem capabilities to the ecmaOS kernel with ZenFS.
*/

import { TFunction } from 'i18next'
import { configure, fs, InMemory, DeviceFS, credentials } from '@zenfs/core'
import { WebStorage } from '@zenfs/dom'

import type { ConfigMounts } from '@zenfs/core'

import type {
  FilesystemConfigMounts,
  FilesystemOptions
} from '@ecmaos/types'

export const DefaultFilesystemOptionsTest: FilesystemOptions<FilesystemConfigMounts> = {
  uid: 0,
  gid: 0,
  addDevices: false,
  cacheStats: false,
  cachePaths: false,
  disableAccessChecks: false,
  disableUpdateOnRead: false,
  onlySyncOnClose: false,
  mounts: {
    '/bin': { backend: InMemory, name: 'bin' },
    // '/etc': ({ backend: InMemory, name: 'etc' }),
    // '/home': ({ backend: InMemory, name: 'home' }),
    // '/lib': ({ backend: InMemory, name: 'lib' }),
    // '/media': ({ backend: InMemory, name: 'media' }),
    // '/mnt': ({ backend: InMemory, name: 'mnt' }),
    // '/opt': ({ backend: InMemory, name: 'opt' }),
    // '/proc': ({ backend: InMemory, name: 'proc' }),
    // '/root': ({ backend: InMemory, name: 'root' }),
    // '/tmp': ({ backend: InMemory, name: 'tmp' })
  }
}

export const DefaultFilesystemOptions: FilesystemOptions<FilesystemConfigMounts> = {
  uid: 0,
  gid: 0,
  addDevices: true,
  cachePaths: false,
  cacheStats: false,
  disableAccessChecks: false,
  disableUpdateOnRead: false,
  onlySyncOnClose: false,
  mounts: {
    // '/': { backend: IndexedDB, storeName: 'root' },
    '/': WebStorage, // I would prefer to use IndexedDB, but there are issues with accessing files after write
    '/media': { backend: InMemory, name: 'media' },
    '/mnt': { backend: InMemory, name: 'mnt' },
    '/proc': { backend: InMemory, name: 'procfs' },
    '/tmp': { backend: InMemory, name: 'tmpfs' }
  }
}

/**
 * The Filesystem class provides a virtual filesystem for the ecmaOS kernel.
 * 
 * @see {@link https://github.com/zen-fs/core ZenFS}
 */
export class Filesystem {
  private _config: FilesystemOptions<ConfigMounts> = DefaultFilesystemOptions
  private _fs: typeof fs = fs

  /**
   * @returns {FilesystemOptions} The filesystem options.
   */
  get config() { return this._config }

  /**
   * @returns {ZenFS.constants} Constants related to the filesystem.
   */
  get constants() { return this._fs.constants }

  /**
   * @returns {ZenFS.credentials} The filesystem credentials.
   */
  get credentials() { return credentials }

  /**
   * @returns {DeviceFS} The device filesystem.
   */
  get devfs() { return this._fs.mounts.get('/dev') as DeviceFS }

  /**
   * @returns {ZenFS.fs.promises} The asynchronous ZenFS filesystem instance.
   */
  get fs() { return this._fs.promises }

  /**
   * @returns {ZenFS.fs} The synchronous ZenFS filesystem instance.
   */
  get fsSync() { return this._fs }

  /**
   * @returns {ZenFS.mounts} The mounted filesystems.
   */
  get mounts() { return this._fs.mounts }

  /**
   * Configures the filesystem with the given options.
   * @param {FilesystemOptions} options - The options for the filesystem.
   * @returns {Promise<void>} A promise that resolves when the filesystem is configured.
   */
  async configure(options: Partial<FilesystemOptions<ConfigMounts>>) {
    if (!options) return
    this._config = options as FilesystemOptions<ConfigMounts>
    await configure(options)
  }

  /**
   * Checks if a file or directory exists at the given path.
   * @param {string} path - The path to check.
   * @returns {Promise<boolean>} A promise that resolves to true if the path exists, false otherwise.
   * 
   * @remarks A shortcut for `kernel.filesystem.fs.exists`
   */
  async exists(path: string) {
    return await this.fs.exists(path)
  }

  /**
   * Returns the default filesystem options with the given extensions.
   * @param {Partial<FilesystemOptions>} extensions - The extensions to apply to the default options.
   * @returns {FilesystemOptions} The filesystem options with the given extensions.
   *
   */
  static options<T extends ConfigMounts>(extensions?: Partial<FilesystemOptions<T>>) {
    return {
      ...DefaultFilesystemOptions,
      ...(extensions || {})
    }
  }

  // Descriptions for common filesystem entries
  descriptions = (t?: TFunction | ((key: string) => string)) => {
    if (!t) t = (k: string) => { return k }

    return new Map([
      ['/bin', t('User Programs')],
      ['/boot', t('Boot files')],
      ['/dev', t('Device files')],
      ['/etc', t('Configuration files')],
      ['/home', t('User home directories')],
      ['/lib', t('Library files')],
      ['/mnt', t('Temporary mount point')],
      ['/opt', t('Optional applications')],
      ['/proc', t('Process/system information')],
      ['/root', t('Root user home directory')],
      ['/run', t('Runtime data')],
      ['/sbin', t('System programs')],
      ['/sys', t('System files')],
      ['/tmp', t('Temporary files')],
      ['/usr', t('User data')],
      ['/var', t('Variable data')],

      ['/proc/connection', t('Network Connection Data')],
      ['/proc/host', t('Hostname')],
      ['/proc/language', t('Language Information')],
      ['/proc/memory', t('Memory Information')],
      ['/proc/platform', t('Platform Information')],
      ['/proc/querystring', t('Query String')],
      ['/proc/userAgent', t('User Agent')],
      ['/proc/userAgentData', t('User Agent Data')],
      ['/proc/version', t('Kernel Version')],

      ['.bmp', t('Bitmap Image')],
      ['.gif', t('GIF Image')],
      ['.jpg', t('JPEG Image')],
      ['.jpeg', t('JPEG Image')],
      ['.js', t('JavaScript File')],
      ['.json', t('JSON Data')],
      ['.md', t('Markdown Document')],
      ['.pdf', t('PDF Document')],
      ['.png', t('PNG Image')],
      ['.sixel', t('Sixel Graphics')],
      ['.txt', t('Text File')],
      ['.wasm', t('WebAssembly Module')],
      ['.wat', t('WebAssembly Text Format')]
    ])
  }
}
