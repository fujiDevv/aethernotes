import { ref } from 'vue';

export const decryptionError = ref<{
  hasError: boolean;
  message: string;
  isMissingSalt: boolean;
} | null>(null);

export function resetDecryptionError() {
  decryptionError.value = null;
}

/**
 * Generates a cryptographically random 16-byte salt.
 */
export function generateSalt(): Uint8Array<ArrayBuffer> {
  return globalThis.crypto.getRandomValues(new Uint8Array(16)) as Uint8Array<ArrayBuffer>;
}

/**
 * Converts an ArrayBuffer to a lowercase hex string.
 */
export function bufToHex(buffer: ArrayBuffer): string {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x: number) => ('00' + x.toString(16)).slice(-2))
    .join('');
}

/**
 * Converts a hex string to a Uint8Array<ArrayBuffer>.
 */
export function hexToBuf(hexString: string): Uint8Array<ArrayBuffer> {
  const cleanHex = hexString.replace(/[^0-9a-fA-F]/g, '');
  const buffer = new ArrayBuffer(cleanHex.length / 2);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes as Uint8Array<ArrayBuffer>;
}

/**
 * Derives a 256-bit AES-GCM key from a passphrase and a salt using PBKDF2.
 */
export async function deriveKey(passphrase: string, salt: Uint8Array<ArrayBuffer> | null | undefined): Promise<CryptoKey> {
  if (!salt || salt.byteLength === 0) {
    const err = new Error('Cryptographic salt is missing or invalid.');
    decryptionError.value = {
      hasError: true,
      message: err.message,
      isMissingSalt: true
    };
    throw err;
  }

  const enc = new TextEncoder();
  try {
    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(passphrase),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    return await globalThis.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  } catch (err: any) {
    console.error('deriveKey failed:', err);
    if (!decryptionError.value) {
      decryptionError.value = {
        hasError: true,
        message: err.message || 'Key derivation failed',
        isMissingSalt: false
      };
    }
    throw err;
  }
}

/**
 * Encrypts cleartext string using AES-GCM 256-bit with the derived key.
 */
export async function encryptText(text: string, key: CryptoKey): Promise<{ ciphertext: string; iv: string }> {
  const enc = new TextEncoder();
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12)) as Uint8Array<ArrayBuffer>; // 12-byte IV for GCM

  const ciphertextBuffer = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(text)
  );

  return {
    ciphertext: bufToHex(ciphertextBuffer),
    iv: bufToHex(iv.buffer),
  };
}

/**
 * Decrypts ciphertext hex string using AES-GCM 256-bit with the derived key.
 */
export async function decryptText(ciphertextHex: string, ivHex: string, key: CryptoKey): Promise<string> {
  try {
    const dec = new TextDecoder();
    const ciphertext = hexToBuf(ciphertextHex);
    const iv = hexToBuf(ivHex);

    const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    return dec.decode(decryptedBuffer);
  } catch (err: any) {
    console.error('decryptText failed:', err);
    decryptionError.value = {
      hasError: true,
      message: err.message || 'Decryption failed (mismatched key/salt)',
      isMissingSalt: false
    };
    throw err;
  }
}
