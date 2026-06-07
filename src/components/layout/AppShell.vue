<template>
  <!-- Cryptographic Decryption Recovery Screen (Isolated State) -->
  <div v-if="decryptionError && decryptionError.hasError" class="recovery-container font-ui">
    <div class="recovery-card animate-slide-down">
      <div class="recovery-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 class="recovery-title font-display">Cryptographic Recovery Mode</h2>
      <p class="recovery-desc font-body">
        Aether Notes encountered a critical error during database decryption. This is typically caused by a missing, mismatched, or corrupted cryptographic salt or vault key.
      </p>
      
      <div class="error-details">
        <strong>Error details:</strong>
        <p class="error-message">{{ decryptionError.message }}</p>
      </div>

      <div class="recovery-actions">
        <button class="recovery-btn reset-btn" @click="resetEncryptionSettings">Reset Vault Settings</button>
        <button class="recovery-btn reload-btn" @click="reloadApp">Reload Application</button>
      </div>
    </div>
  </div>

  <div
    v-else
    :class="[
      'app-shell',
      {
        'sidebar-closed': !uiStore.isSidebarOpen,
        'focus-mode-active': uiStore.isFocusMode
      }
    ]"
  >
    <!-- Organic Noise Overlay -->
    <div class="noise-overlay"></div>

    <!-- Topbar Header Navigation -->
    <TopBar />

    <!-- Three/Two/One Pane Layout Grid -->
    <div class="layout-body">
      <!-- Sidebar Pane -->
      <Sidebar class="pane-sidebar" />

      <!-- Note Selection List Pane -->
      <NoteList v-if="showNoteList" class="pane-notelist" />

      <!-- Main Content Editor/Settings Pane -->
      <div v-if="showContent" class="pane-content">
        <router-view v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </div>

    <!-- Footer Status info -->
    <StatusBar />

    <!-- Command Palette (Ctrl/Cmd+K Search Modal) -->
    <CommandPalette />

    <!-- PWA Installation Prompt Dialog -->
    <PwaInstallPrompt />

    <!-- Documentation Dialog -->
    <DocsDialog v-if="uiStore.isDocsOpen" @close="uiStore.isDocsOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { useNotesStore } from '@/stores/notes';
import { useFoldersStore } from '@/stores/folders';
import { useSettingsStore } from '@/stores/settings';
import { useTheme } from '@/composables/useTheme';
import { useKeyboard } from '@/composables/useKeyboard';
import { useWindowSize } from '@vueuse/core';
import { decryptionError, resetDecryptionError } from '@/lib/crypto';
import { db } from '@/lib/db';

import TopBar from './TopBar.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import NoteList from '@/components/note-list/NoteList.vue';
import StatusBar from './StatusBar.vue';
import CommandPalette from '@/components/search/CommandPalette.vue';
import PwaInstallPrompt from './PwaInstallPrompt.vue';
import DocsDialog from './DocsDialog.vue';

const route = useRoute();
const uiStore = useUiStore();
const notesStore = useNotesStore();
const foldersStore = useFoldersStore();
const settingsStore = useSettingsStore();

// Register hooks
useTheme();
useKeyboard();

async function resetEncryptionSettings() {
  try {
    // 1. Delete salt from IndexedDB
    await db.settings.delete('encryptionSalt');
    
    // 2. Disable encryption settings
    settingsStore.setEncryptionKey(null);
    await settingsStore.setSetting('encryptionEnabled', false);
    settingsStore.encryptionSalt = null;

    // 3. Clear locked cache in notes store and reload plain notes
    notesStore.lockedNotes = {};
    await notesStore.loadNotes();

    // 4. Reset decryption error state
    resetDecryptionError();
  } catch (err) {
    console.error('Failed to reset encryption settings:', err);
  }
}

function reloadApp() {
  window.location.reload();
}

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

// Show list for note views and trash
const showNoteList = computed(() => {
  if (isMobile.value) {
    return route.name === 'note-empty' || route.name === 'trash';
  }
  return route.name !== 'settings';
});

const showContent = computed(() => {
  if (isMobile.value) {
    return route.name === 'note-detail' || route.name === 'settings';
  }
  return true;
});

let handlePwaPrompt: ((e: any) => void) | null = null;

onMounted(async () => {
  // Load preferences first (critical for encryption setup and theme)
  await settingsStore.loadSettings();

  // Load folders and notes
  await foldersStore.loadFolders();
  await notesStore.loadNotes();

  // Clean old trashed items automatically
  await notesStore.purgeOldTrash(30);

  // Sync captured prompt
  if ((window as any).deferredPrompt) {
    uiStore.setPwaInstallPrompt((window as any).deferredPrompt);
  }

  // Listen for beforeinstallprompt in case it fires later
  handlePwaPrompt = (e: any) => {
    e.preventDefault();
    (window as any).deferredPrompt = e;
    uiStore.setPwaInstallPrompt(e);
  };
  window.addEventListener('beforeinstallprompt', handlePwaPrompt);
});

onBeforeUnmount(() => {
  if (handlePwaPrompt) {
    window.removeEventListener('beforeinstallprompt', handlePwaPrompt);
  }
});
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg);
}

.layout-body {
  display: flex;
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}

/* Default Mobile: Sidebar is absolute overlay drawer */
.pane-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: transform var(--duration-base) var(--ease-out);
}

.sidebar-closed .pane-sidebar {
  transform: translateX(-100%);
}

.pane-notelist {
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.pane-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Responsive Overrides (breakpoints, desktop first or mobile first?) -> We use mobile first, so min-width */
@media (min-width: 768px) {
  .pane-sidebar {
    position: relative;
    left: auto;
    top: auto;
    bottom: auto;
    z-index: 10;
    transition: transform var(--duration-base) var(--ease-out), margin var(--duration-base) var(--ease-out);
  }

  .sidebar-closed .pane-sidebar {
    transform: translateX(-100%);
    margin-right: calc(-1 * var(--sidebar-width));
  }

  /* Focus Mode Layout overrides */
  .focus-mode-active .pane-sidebar {
    transform: translateX(-100%);
    margin-right: calc(-1 * var(--sidebar-width));
    pointer-events: none;
  }

  .pane-notelist {
    width: var(--note-list-width);
    transition: transform var(--duration-base) var(--ease-out), margin var(--duration-base) var(--ease-out);
  }

  .focus-mode-active .pane-notelist {
    transform: translateX(-100%);
    margin-right: calc(-1 * var(--note-list-width));
    pointer-events: none;
  }

  .pane-content {
    flex: 1;
    width: auto;
  }
}

/* Recovery Container */
.recovery-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
}

.recovery-card {
  max-width: 440px;
  width: 90%;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-xl);
  text-align: center;
}

.recovery-icon {
  color: var(--accent);
  margin-bottom: var(--space-md);
  display: inline-flex;
}

.recovery-title {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.recovery-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.error-details {
  text-align: left;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-md);
  font-size: 11px;
  margin-bottom: var(--space-lg);
}

.error-message {
  color: var(--accent);
  font-family: monospace;
  margin-top: 4px;
  word-break: break-all;
}

.recovery-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
}

.recovery-btn {
  height: 36px;
  padding: 0 var(--space-md);
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.reset-btn {
  background: var(--accent);
  color: var(--bg-elevated);
  border: none;
}

.reset-btn:hover {
  opacity: 0.9;
}

.reload-btn {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.reload-btn:hover {
  background: var(--bg-sunken);
}

@media (min-width: 768px) and (max-width: 1279px) {
  /* Tablet layout: Collapsible list becomes sheet or collapses */
  .sidebar-closed .pane-notelist {
    margin-left: 0;
  }
}
</style>
