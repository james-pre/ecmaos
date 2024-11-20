/**
 * @experimental
 * Authentication types and interfaces
 */

export type PasswordCredentialInit = {
  iconUrl?: string
  id: string
  name?: string
  origin: string
  password: string
}

export interface Auth {
  passkey: {
    create: (options: PublicKeyCredentialCreationOptions) => Promise<Credential | null>
    get: (options: PublicKeyCredentialRequestOptions) => Promise<Credential | null>
    isSupported: () => boolean
  }
}
