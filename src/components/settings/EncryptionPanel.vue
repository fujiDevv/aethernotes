<template>
  <div class="encryption-panel font-ui">
    <div class="setting-group">
      <div class="setting-header">
        <label class="setting-label">Vault Encryption</label>
        <span class="setting-desc">
          Encrypt your notes locally before writing them to IndexedDB.
        </span>
      </div>

      <!-- State 1: Unencrypted Vault -->
      <div v-if="!settingsStore.encryptionEnabled" class="status-box unencrypted">
        <p class="status-msg">
          ⚠ Your vault is currently unencrypted. Notes are stored in plaintext inside IndexedDB.
        </p>
        
        <div class="setup-form">
          <input
            v-model="passphrase"
            type="password"
            class="vault-input"
            placeholder="Enter passphrase"
          />
          <input
            v-model="confirmPassphrase"
            type="password"
            class="vault-input"
            placeholder="Confirm passphrase"
          />
          <button
            class="action-btn enable-btn"
            :disabled="!isValidSetup"
            @click="enableVault"
          >
            {{ isWorking ? 'Encrypting...' : 'Enable Encryption' }}
          </button>
        </div>
        <p class="error-msg" v-if="errorText">{{ errorText }}</p>
      </div>

      <!-- State 2: Encrypted & Unlocked Vault -->
      <div v-else-if="settingsStore.encryptionKey" class="status-box unlocked">
        <p class="status-msg">
          ✓ Your vault is encrypted and unlocked in memory.
        </p>
        <div class="actions-row">
          <button class="action-btn lock-btn" @click="lockVault">
            Lock Vault
          </button>
          <button class="action-btn disable-btn" @click="disableVault">
            {{ isWorking ? 'Decrypting...' : 'Disable Encryption' }}
          </button>
        </div>
      </div>

      <!-- State 3: Encrypted & Locked Vault -->
      <div v-else class="status-box locked">
        <p class="status-msg">
          🔒 Your vault is encrypted and locked.
        </p>
        <div class="unlock-form">
          <input
            v-model="passphrase"
            type="password"
            class="vault-input"
            placeholder="Enter passphrase to unlock"
            @keydown.enter="unlockVault"
          />
          <button class="action-btn unlock-btn" @click="unlockVault">
            {{ isWorking ? 'Unlocking...' : 'Unlock Vault' }}
          </button>
        </div>
        <p class="error-msg" v-if="errorText">{{ errorText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useNotesStore } from '@/stores/notes';
import { deriveKey, generateSalt, bufToHex, hexToBuf, resetDecryptionError } from '@/lib/crypto';
import { db } from '@/lib/db';

const settingsStore = useSettingsStore();
const notesStore = useNotesStore();

const passphrase = ref('');
const confirmPassphrase = ref('');
const errorText = ref('');
const isWorking = ref(false);

const isValidSetup = computed(() => {
  return passphrase.value.length >= 6 && passphrase.value === confirmPassphrase.value;
});

async function enableVault() {
  if (!isValidSetup.value) return;
  isWorking.value = true;
  errorText.value = '';

  try {
    resetDecryptionError();
    // Generate salt if not exists
    let saltHex = settingsStore.encryptionSalt;
    if (!saltHex) {
      const newSalt = generateSalt();
      saltHex = bufToHex(newSalt.buffer as ArrayBuffer);
      await db.settings.put({ key: 'encryptionSalt', value: saltHex });
      settingsStore.encryptionSalt = saltHex;
    }

    const saltBytes = hexToBuf(saltHex);
    const key = await deriveKey(passphrase.value, saltBytes);

    // Save key in memory
    settingsStore.setEncryptionKey(key);
    await settingsStore.setSetting('encryptionEnabled', true);

    // Encrypt all existing notes
    await notesStore.toggleEncryptionForAllNotes(true, key);

    passphrase.value = '';
    confirmPassphrase.value = '';
  } catch (err) {
    console.error('Failed to enable encryption:', err);
    errorText.value = 'Failed to enable encryption. Try again.';
    resetDecryptionError();
  } finally {
    isWorking.value = false;
  }
}

function lockVault() {
  settingsStore.setEncryptionKey(null);
  // Re-read notes from DB to lock them
  notesStore.loadNotes();
}

async function unlockVault() {
  const code = passphrase.value.trim();
  if (!code || !settingsStore.encryptionSalt) return;
  
  isWorking.value = true;
  errorText.value = '';

  try {
    resetDecryptionError();
    const saltBytes = hexToBuf(settingsStore.encryptionSalt);
    const key = await deriveKey(code, saltBytes);
    
    // Decrypt notes to verify key
    await notesStore.decryptAllNotes(key);
    
    // If current lockedNotes is empty or any unlocked note loads successfully
    if (Object.keys(notesStore.lockedNotes).length === 0 || notesStore.notes.some(n => n.encryptedWith === null || n.content.indexOf('🔒') === -1)) {
      settingsStore.setEncryptionKey(key);
      errorText.value = '';
      passphrase.value = '';
    } else {
      errorText.value = 'Incorrect passphrase.';
      resetDecryptionError();
    }
  } catch (err) {
    console.error('Decryption failed:', err);
    errorText.value = 'Unlock failed. Incorrect passphrase.';
    resetDecryptionError();
  } finally {
    isWorking.value = false;
  }
}

async function disableVault() {
  if (!settingsStore.encryptionKey) return;
  isWorking.value = true;
  errorText.value = '';

  try {
    resetDecryptionError();
    // Decrypt and write all notes in plaintext format
    await notesStore.toggleEncryptionForAllNotes(false, null);
    
    // Disable in settings
    settingsStore.setEncryptionKey(null);
    await settingsStore.setSetting('encryptionEnabled', false);
    
    passphrase.value = '';
    confirmPassphrase.value = '';
  } catch (err) {
    console.error('Failed to disable encryption:', err);
    errorText.value = 'Decryption process failed.';
    resetDecryptionError();
  } finally {
    isWorking.value = false;
  }
}
</script>

<style scoped>
.encryption-panel {
  display: flex;
  flex-direction: column;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.setting-header {
  display: flex;
  flex-direction: column;
}

.setting-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
}

.setting-desc {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

.status-box {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-md);
  background: var(--bg-sunken);
}

.status-msg {
  font-size: 12px;
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.unencrypted .status-msg {
  color: var(--accent);
}

.unencrypted {
  border-color: var(--accent-subtle);
}

.setup-form,
.unlock-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 280px;
}

.vault-input {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px var(--space-sm);
  background: var(--bg-elevated);
  color: var(--text-primary);
  font-size: 12px;
}

.vault-input:focus {
  border-color: var(--accent);
}

.action-btn {
  height: 32px;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.enable-btn,
.unlock-btn {
  background: var(--accent);
  color: var(--bg-elevated);
}

.enable-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.actions-row {
  display: flex;
  gap: var(--space-sm);
}

.lock-btn {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: 0 var(--space-md);
}

.lock-btn:hover {
  background: var(--bg-sunken);
}

.disable-btn {
  background: var(--accent-subtle);
  color: var(--accent);
  padding: 0 var(--space-md);
}

.disable-btn:hover {
  background: var(--accent);
  color: var(--bg-elevated);
}

.error-msg {
  font-size: 11px;
  color: var(--accent);
  margin-top: var(--space-xs);
}
</style>
