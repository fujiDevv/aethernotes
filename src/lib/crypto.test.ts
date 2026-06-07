import { describe, it, expect, beforeAll } from 'vitest';
import { generateSalt, bufToHex, hexToBuf, deriveKey, encryptText, decryptText, decryptionError, resetDecryptionError } from './crypto';

// Polyfill window.crypto if not present in the test environment
beforeAll(() => {
  if (typeof window !== 'undefined' && !window.crypto) {
    // @ts-ignore
    window.crypto = globalThis.crypto;
  }
});

describe('Crypto Library', () => {
  it('should generate a 16-byte salt', () => {
    const salt = generateSalt();
    expect(salt).toBeInstanceOf(Uint8Array);
    expect(salt.length).toBe(16);
  });

  it('should convert buffer to hex and back', () => {
    const originalText = 'Hello Aether';
    const encoder = new TextEncoder();
    const buffer = encoder.encode(originalText).buffer;
    
    const hex = bufToHex(buffer);
    const decodedBuf = hexToBuf(hex);
    
    const decoder = new TextDecoder();
    const decodedText = decoder.decode(decodedBuf);
    
    expect(decodedText).toBe(originalText);
  });

  it('should derive a key, encrypt text, and decrypt it back', async () => {
    const passphrase = 'my-super-secret-vault-key';
    const salt = generateSalt();
    const text = 'This is some confidential note content.';

    // 1. Derive key
    const key = await deriveKey(passphrase, salt);
    expect(key).toBeDefined();
    expect(key.type).toBe('secret');

    // 2. Encrypt
    const { ciphertext, iv } = await encryptText(text, key);
    expect(ciphertext).toBeDefined();
    expect(iv).toBeDefined();
    expect(ciphertext).not.toBe(text);

    // 3. Decrypt
    const decrypted = await decryptText(ciphertext, iv, key);
    expect(decrypted).toBe(text);
  });

  it('should fail decryption if key is derived with different passphrase', async () => {
    const salt = generateSalt();
    const text = 'Private note content.';

    const key = await deriveKey('correct-passphrase', salt);
    const { ciphertext, iv } = await encryptText(text, key);

    const wrongKey = await deriveKey('wrong-passphrase', salt);

    await expect(decryptText(ciphertext, iv, wrongKey)).rejects.toThrow();
  });

  it('should throw and set decryptionError if salt is missing', async () => {
    resetDecryptionError();
    expect(decryptionError.value).toBeNull();

    await expect(deriveKey('passphrase', null as any)).rejects.toThrow();
    expect(decryptionError.value).not.toBeNull();
    expect(decryptionError.value?.hasError).toBe(true);
    expect(decryptionError.value?.isMissingSalt).toBe(true);
  });

  it('should set decryptionError on decryption failure', async () => {
    resetDecryptionError();
    const salt = generateSalt();
    const key = await deriveKey('correct-passphrase', salt);
    const { ciphertext, iv } = await encryptText('Secret message', key);
    const wrongKey = await deriveKey('wrong-passphrase', salt);

    await expect(decryptText(ciphertext, iv, wrongKey)).rejects.toThrow();
    expect(decryptionError.value).not.toBeNull();
    expect(decryptionError.value?.hasError).toBe(true);
    expect(decryptionError.value?.isMissingSalt).toBe(false);
  });
});
