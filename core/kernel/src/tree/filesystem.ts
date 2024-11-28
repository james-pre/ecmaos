/**
 * The filesystem module provides filesystem capabilities to the ecmaOS kernel with ZenFS.
 */

import { TFunction } from 'i18next';
import { configure as _configure, fs, InMemory, DeviceFS, credentials } from '@zenfs/core';
import { WebStorage } from '@zenfs/dom';

import type { ConfigMounts } from '@zenfs/core';

import type { FilesystemConfigMounts, FilesystemOptions } from '@ecmaos/types';

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
	},
};

export const defaultOptions: FilesystemOptions<FilesystemConfigMounts> = {
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
		'/tmp': { backend: InMemory, name: 'tmpfs' },
	},
};

/**
 * The Filesystem class provides a virtual filesystem for the ecmaOS kernel.
 *
 * @see {@link https://github.com/zen-fs/core ZenFS}
 */

/**
 * {FilesystemOptions} The filesystem options.
 */
export let config: FilesystemOptions<ConfigMounts> = defaultOptions;

/**
 * @returns {DeviceFS} The device filesystem.
 */
export function devfs() {
	return fs.mounts.get('/dev') as DeviceFS;
}

const promises = fs.promises;

export { promises, credentials };

/**
 * {ZenFS.fs} The synchronous ZenFS filesystem instance.
 */
export const fsSync = fs;

/**
 * {ZenFS.mounts} The mounted filesystems.
 */

/**
 * Configures the filesystem with the given options.
 * @param {FilesystemOptions} options - The options for the filesystem.
 * @returns {Promise<void>} A promise that resolves when the filesystem is configured.
 */
export async function configure(options: Partial<FilesystemOptions<ConfigMounts>>) {
	if (!options) return;
	config = options as FilesystemOptions<ConfigMounts>;
	await _configure(options);
}

/**
 * Checks if a file or directory exists at the given path.
 * @param {string} path - The path to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the path exists, false otherwise.
 *
 * @remarks A shortcut for `kernel.filesystem.fs.exists`
 */
export async function exists(path: string) {
	return await fs.promises.exists(path);
}

/**
 * Returns the default filesystem options with the given extensions.
 * @param {Partial<FilesystemOptions>} extensions - The extensions to apply to the default options.
 * @returns {FilesystemOptions} The filesystem options with the given extensions.
 *
 */
export function options<T extends ConfigMounts>(extensions?: Partial<FilesystemOptions<T>>) {
	return {
		...defaultOptions,
		...(extensions || {}),
	};
}

// Descriptions for common filesystem entries
export const descriptions = (t?: TFunction | ((key: string) => string)) => {
	if (!t)
		t = (k: string) => {
			return k;
		};

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
		['.wat', t('WebAssembly Text Format')],
	]);
};
