/**
 * @experimental
 * Handles authentication features
 */

import type { PasswordCredentialInit } from '@ecmaos/types';

export const passkey = {
	// Create a new credential
	create: async (options: PublicKeyCredentialCreationOptions): Promise<Credential | null> => {
		try {
			return await navigator.credentials.create({ publicKey: options });
		} catch (error) {
			console.error('Error creating credential:', error);
			return null;
		}
	},

	// Get an existing credential
	get: async (options: PublicKeyCredentialRequestOptions): Promise<Credential | null> => {
		try {
			return await navigator.credentials.get({ publicKey: options });
		} catch (error) {
			console.error('Error getting credential:', error);
			return null;
		}
	},

	// Check if WebAuthn is supported in the current browser
	isSupported: (): boolean => {
		return !!window.PublicKeyCredential;
	},

	// Register a new credential
	register: async (credential: Credential): Promise<void> => {
		await navigator.credentials.store(credential);
	},

	// Full test of passkey functionality
	fullTest: async (): Promise<void> => {
		const credential = await passkey.create({
			challenge: new Uint8Array(32),
			rp: { name: 'Example RP' },
			user: { id: new Uint8Array(16), name: 'example@example.com', displayName: 'Example User' },
			pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
		});

		console.log(credential);
	},
};

export const password = {
	create: async (options: PasswordCredentialInit): Promise<Credential | null> => {
		// @ts-expect-error - typescript does not accept password param, but it is valid
		return await navigator.credentials.create({ password: options });
	},
};
