<template>
  <main :class="['editor-panel', { 'focus-mode': uiStore.isFocusMode }]" @click="focusEditor">
    <!-- Unselected / Empty State -->
    <div v-if="!noteId" class="editor-empty font-ui">
      <div class="empty-branding">
        <span class="empty-aether font-display">Aether</span>
        <span class="empty-notes font-ui">Notes</span>
      </div>
      <p class="empty-tagline font-body">"Think simply."</p>
      <div class="empty-shortcuts font-ui">
        <div class="shortcut-row">
          <span class="shortcut-label">New Note</span>
          <kbd class="shortcut-key">⌘N</kbd>
        </div>
        <div class="shortcut-row">
          <span class="shortcut-label">Search Notes</span>
          <kbd class="shortcut-key">⌘K</kbd>
        </div>
        <div class="shortcut-row">
          <span class="shortcut-label">Toggle Sidebar</span>
          <kbd class="shortcut-key">⌘\</kbd>
        </div>
      </div>
    </div>

    <!-- Encrypted / Locked Note State -->
    <div v-else-if="isLocked" class="editor-locked">
      <div class="lock-card font-ui animate-slide-down">
        <div class="lock-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h3 class="lock-title font-display">Encrypted Note</h3>
        <p class="lock-message font-body">This note is encrypted. Enter your passphrase to decrypt it.</p>

        <div class="passphrase-entry">
          <input v-model="passphrase" type="password" class="passphrase-input" placeholder="Passphrase"
            @keydown.enter="unlockNote" />
          <button class="unlock-btn" @click="unlockNote">Unlock</button>
        </div>
        <p v-if="unlockError" class="unlock-error">Incorrect passphrase or decryption failed.</p>
      </div>
    </div>

    <!-- Active Editor State -->
    <div v-else class="editor-active-container">
      <div class="editor-active">
        <!-- Concurrency Conflict Banner -->
        <div v-if="hasConflict" class="conflict-banner font-ui">
          <div class="conflict-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="conflict-icon">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>This note has been modified in another session. Please resolve the conflict.</span>
          </div>
          <div class="conflict-actions">
            <button class="conflict-btn overwrite-btn" @click="resolveConflictOverwrite">Keep Local & Save</button>
            <button class="conflict-btn discard-btn" @click="resolveConflictDiscard">Discard & Sync</button>
          </div>
        </div>

        <!-- Floating selection bubble toolbar -->
        <EditorToolbar :editor="editor" />

        <!-- Scrollable editor container -->
        <div class="editor-scroll-container">
          <EditorContent :editor="editor" class="editor-content-wrapper" />
        </div>
      </div>

      <!-- Outline / Table of Contents Sidebar -->
      <aside v-if="headings.length > 0 && uiStore.isOutlineOpen" class="editor-toc" @click.stop>
        <div class="toc-header">
          <h5 class="toc-title font-ui">Outline</h5>
          <button class="toc-close-btn" @click="uiStore.toggleOutline" title="Collapse Outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>
        <nav class="toc-items">
          <button v-for="(heading, index) in headings" :key="heading.id"
            :class="['toc-item', `level-${heading.level}`, 'font-ui']" @click="scrollToHeading(index)">
            {{ heading.text || 'Untitled' }}
          </button>
        </nav>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import { Markdown } from 'tiptap-markdown';


// Custom extensions
import TagHighlight from '@/extensions/TagHighlight';
import MarkdownShortcuts from '@/extensions/MarkdownShortcuts';

// Core stores & composables
import { useNotesStore } from '@/stores/notes';
import { useUiStore } from '@/stores/ui';
import { useSettingsStore } from '@/stores/settings';
import { useAutoSave } from '@/composables/useAutoSave';
import { deriveKey, hexToBuf, resetDecryptionError } from '@/lib/crypto';

// Subcomponents
import EditorToolbar from './EditorToolbar.vue';

const route = useRoute();
const notesStore = useNotesStore();
const uiStore = useUiStore();
const settingsStore = useSettingsStore();
const autoSave = useAutoSave();

const passphrase = ref('');
const unlockError = ref(false);

const hasConflict = computed(() => {
  return noteId.value ? !!notesStore.concurrencyConflicts[noteId.value] : false;
});

async function resolveConflictOverwrite() {
  if (!noteId.value) return;
  try {
    await notesStore.resolveConflict(noteId.value, 'overwrite');
  } catch (err) {
    console.error('Failed to resolve conflict with overwrite:', err);
  }
}

async function resolveConflictDiscard() {
  if (!noteId.value) return;
  try {
    await notesStore.resolveConflict(noteId.value, 'discard');
    loadActiveNoteContent();
  } catch (err) {
    console.error('Failed to resolve conflict with discard:', err);
  }
}

watch(hasConflict, (val) => {
  if (editor.value) {
    editor.value.setEditable(!isTrashed.value && !val, false);
  }
});

const noteId = computed(() => {
  if (route.name === 'note-detail') {
    return route.params.id as string;
  }
  return null;
});

const activeNote = computed(() => {
  if (!noteId.value) return null;
  return notesStore.notes.find(n => n.id === noteId.value) || null;
});

const isTrashed = computed(() => {
  return activeNote.value?.isTrashed || false;
});

const isLocked = computed(() => {
  if (!noteId.value) return false;
  return notesStore.lockedNotes[noteId.value] !== undefined;
});





// Setup Editor (handles placeholder, slash commands, and toolbar integrations)
const editor = useEditor({
  content: '',
  extensions: [
    StarterKit.configure({
      codeBlock: false, // Override with CodeBlockLowlight
      link: {
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      },
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading' && node.attrs.level === 1) {
          return 'Title';
        }
        return `Start writing or type '/' for blocks...`;
      },
      emptyEditorClass: 'is-editor-empty',
    }),
    Typography,
    TextStyle,
    Color,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
    TaskList,
    TaskItem.configure({
      nested: true,
      HTMLAttributes: {
        class: 'task-list-item',
      },
    }),
    Highlight.configure({
      multicolor: true,
    }),

    Image.configure({
      inline: true,
    }),
    Markdown.configure({
      html: true,
      tightLists: true,
      transformPastedText: true,
    }),
    TagHighlight,
    MarkdownShortcuts,
  ],
  editorProps: {
    attributes: {
      class: 'tiptap-editor',
    },
  },
  onUpdate({ editor }) {
    if (!noteId.value || isTrashed.value) return;

    // Ensure empty content starts with an H1 title heading
    if (editor.isEmpty && editor.state.doc.firstChild?.type.name !== 'heading') {
      editor.commands.setContent('<h1></h1>', { emitUpdate: false });
    }

    // Update stats reactively
    const text = editor.getText();
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const chars = text.length;

    uiStore.wordCount = words;
    uiStore.charCount = chars;

    // Update Outline TOC
    updateHeadings();

    // Auto-save triggers
    uiStore.saveStatus = 'saving';
    const mdContent = (editor.storage as any).markdown.getMarkdown();
    autoSave.save(noteId.value, mdContent, settingsStore.autoSaveDelay);
  },
});

// Sync saveStatus back to UI store
watch(autoSave.saveStatus, (status) => {
  uiStore.saveStatus = status;
});

const loadedNoteId = ref<string | null>(null);

// Handle note navigation switches immediately and when dependencies are loaded
watch(
  [noteId, editor, activeNote],
  async ([newId, newEditor, newNote], oldValues) => {
    const [oldId] = oldValues || [null];

    // Flush any pending auto-saves before switching
    const previousId = oldId || loadedNoteId.value;
    if (previousId && previousId !== newId && editor.value && !isTrashed.value) {
      const mdContent = (editor.value.storage as any).markdown.getMarkdown();
      await autoSave.flush(previousId, mdContent);
    }

    if (!newId) {
      editor.value?.commands.clearContent();
      uiStore.wordCount = 0;
      uiStore.charCount = 0;
      loadedNoteId.value = null;
      headings.value = [];
      return;
    }

    if (!newEditor || !newNote) {
      return;
    }

    if (isLocked.value) {
      passphrase.value = '';
      unlockError.value = false;
      loadedNoteId.value = null;
      return;
    }

    // Load new note content if not already loaded for this note
    if (loadedNoteId.value !== newId) {
      loadActiveNoteContent();
      loadedNoteId.value = newId;
    }
  },
  { immediate: true }
);

// Watch key recovery updates (e.g. settings store key unlocked elsewhere)
watch(isLocked, (locked) => {
  if (!locked && noteId.value && editor.value) {
    loadActiveNoteContent();
    loadedNoteId.value = noteId.value;
  }
});

const headings = ref<{ text: string; level: number; id: string }[]>([]);

function updateHeadings() {
  if (!editor.value) return;
  const list: { text: string; level: number; id: string }[] = [];

  editor.value.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const text = node.textContent;
      const level = node.attrs.level;
      const id = `heading-${pos}`;
      list.push({ text, level, id });
    }
  });

  headings.value = list;
}

function scrollToHeading(index: number) {
  const headingElements = document.querySelectorAll('.tiptap-editor h1, .tiptap-editor h2, .tiptap-editor h3');
  if (headingElements[index]) {
    headingElements[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function loadActiveNoteContent() {
  if (!editor.value || !activeNote.value) return;

  let content = activeNote.value.content;
  if (!content || content.trim() === '') {
    content = '<h1></h1>';
  }

  editor.value.commands.setContent(content, {
    emitUpdate: false,
  });

  // Set editable based on trash state and conflict state
  editor.value.setEditable(!isTrashed.value && !hasConflict.value, false);

  // Update counts
  const text = editor.value.getText();
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const chars = text.length;
  uiStore.wordCount = words;
  uiStore.charCount = chars;

  // Scroll to active tag if there is one
  scrollToActiveTag();

  // Update Outline TOC
  nextTick(() => {
    updateHeadings();
    applyEditorPreferences();
  });
}

async function scrollToActiveTag() {
  const tag = uiStore.activeTag;
  if (!tag) return;

  await nextTick();
  // Try to find the tag element
  let el = document.querySelector(`.inline-tag-highlight[data-tag="${tag.toLowerCase()}"]`);
  if (!el) {
    // Wait a tiny bit more for ProseMirror to finish rendering decorations
    await new Promise((resolve) => setTimeout(resolve, 50));
    el = document.querySelector(`.inline-tag-highlight[data-tag="${tag.toLowerCase()}"]`);
  }

  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Watch for active tag change to scroll to it
watch(() => uiStore.activeTag, (newTag) => {
  if (newTag) {
    scrollToActiveTag();
  }
});

function applyEditorPreferences() {
  if (!editor.value) return;

  const dom = editor.value.view.dom;

  // 1. Spellcheck
  dom.setAttribute('spellcheck', settingsStore.spellcheck ? 'true' : 'false');

  // 2. Line Wrapping
  if (!settingsStore.lineWrapping) {
    dom.classList.add('no-wrapping');
  } else {
    dom.classList.remove('no-wrapping');
  }

  // 3. Line Numbers
  if (settingsStore.showLineNumbers) {
    dom.classList.add('show-line-numbers');
  } else {
    dom.classList.remove('show-line-numbers');
  }

  // 4. Typography (Font Family & Size)
  const family = settingsStore.fontFamily;
  const size = settingsStore.fontSize;

  const fontFamilyValue =
    family === 'sans' ? 'system-ui, -apple-system, sans-serif' :
      family === 'mono' ? "'JetBrains Mono', monospace" :
        "'Source Serif 4', Georgia, serif"; // default 'serif'

  const headingFontValue =
    family === 'sans' ? 'system-ui, -apple-system, sans-serif' :
      family === 'mono' ? "'JetBrains Mono', monospace" :
        "'Instrument Serif', Georgia, serif";

  dom.style.setProperty('--editor-font-size', `${size}px`);
  dom.style.setProperty('--editor-font-family', fontFamilyValue);
  dom.style.setProperty('--editor-font-heading', headingFontValue);
}

// Watch editor settings and apply preferences dynamically
watch(
  [
    () => settingsStore.fontFamily,
    () => settingsStore.fontSize,
    () => settingsStore.lineWrapping,
    () => settingsStore.spellcheck,
    () => settingsStore.showLineNumbers
  ],
  () => {
    applyEditorPreferences();
  }
);

// Locked note decryption handler
async function unlockNote() {
  const code = passphrase.value.trim();
  if (!code || !settingsStore.encryptionSalt) return;

  try {
    resetDecryptionError();
    const saltBytes = hexToBuf(settingsStore.encryptionSalt);
    const key = await deriveKey(code, saltBytes);

    // Attempt to decrypt locked note
    await notesStore.decryptAllNotes(key);

    // Check if decryption succeeded for the current note
    if (!isLocked.value) {
      settingsStore.setEncryptionKey(key);
      settingsStore.setSetting('encryptionEnabled', true);
      unlockError.value = false;
      passphrase.value = '';
    } else {
      unlockError.value = true;
      resetDecryptionError();
    }
  } catch (err) {
    console.error('Decryption fail:', err);
    unlockError.value = true;
    resetDecryptionError();
  }
}

function focusEditor() {
  if (!isTrashed.value && !isLocked.value && editor.value) {
    editor.value.commands.focus();
  }
}



onBeforeUnmount(async () => {
  // Final flush on unmount
  if (noteId.value && editor.value && !isTrashed.value) {
    const mdContent = (editor.value.storage as any).markdown.getMarkdown();
    await autoSave.flush(noteId.value, mdContent);
  }
});
</script>

<style scoped>
.editor-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: var(--bg);
  overflow: hidden;
  position: relative;
}

.editor-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  user-select: none;
}

.empty-branding {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  margin-bottom: var(--space-xs);
}

.empty-aether {
  font-size: 32px;
  font-style: italic;
  color: var(--text-primary);
}

.empty-notes {
  font-size: 13px;
  color: var(--accent);
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.empty-tagline {
  font-size: 14px;
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: var(--space-2xl);
}

.empty-shortcuts {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 220px;
}

.shortcut-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.shortcut-label {
  color: var(--text-secondary);
}

.shortcut-key {
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  color: var(--text-primary);
}

/* Locked state */
.editor-locked {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--space-lg);
}

.lock-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-xl);
  max-width: 340px;
  width: 100%;
  text-align: center;
}

.lock-icon {
  color: var(--accent);
  margin-bottom: var(--space-md);
  display: inline-flex;
}

.lock-title {
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.lock-message {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}

.passphrase-entry {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.passphrase-input {
  flex: 1;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px var(--space-sm);
  background: var(--bg-sunken);
  color: var(--text-primary);
  font-size: 13px;
}

.passphrase-input:focus {
  border-color: var(--accent);
}

.unlock-btn {
  background: var(--accent);
  color: var(--bg-elevated);
  padding: 8px 16px;
  border-radius: var(--radius);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.unlock-btn:hover {
  opacity: 0.9;
}

.unlock-error {
  font-size: 11px;
  color: var(--accent);
  margin-top: var(--space-sm);
}

/* Active State */
.editor-active-container {
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.editor-active {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.editor-scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md) var(--space-lg) var(--space-2xl);
}

.editor-content-wrapper {
  max-width: var(--editor-max-width);
  margin: 0 auto;
  min-height: 200px;
  cursor: text;
}

/* Outline / Table of Contents Sidebar Styling */
.editor-toc {
  width: 350px;
  border-left: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  padding: var(--space-lg) var(--space-md);
  display: none;
  /* Hidden by default on mobile/tablet */
  flex-direction: column;
  gap: var(--space-md);
  overflow-y: auto;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .editor-toc {
    display: flex;
  }
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
}

.toc-title {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
}

.toc-close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: all var(--duration-fast) var(--ease-out);
}

.toc-close-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.toc-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.toc-item {
  display: block;
  text-align: left;
  font-size: 12px;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px var(--space-xs);
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--ease-out);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-item:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
  padding-left: calc(var(--space-xs) + 4px);
}

.toc-item.level-1 {
  font-weight: 500;
}

.toc-item.level-2 {
  padding-left: var(--space-md);
}

.toc-item.level-2:hover {
  padding-left: calc(var(--space-md) + 4px);
}

.toc-item.level-3 {
  padding-left: var(--space-xl);
  font-size: 11px;
  color: var(--text-muted);
}

.toc-item.level-3:hover {
  padding-left: calc(var(--space-xl) + 4px);
  color: var(--text-primary);
}

/* Focus Mode Overlay */
.focus-mode .editor-empty,
.focus-mode .editor-locked {
  display: none;
}

/* Conflict Banner */
.conflict-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  padding: 10px var(--space-lg);
  background: var(--accent-subtle);
  border-bottom: 1px solid var(--accent);
  color: var(--text-primary);
  font-size: 12px;
  animation: slideDown var(--duration-base) var(--ease-out);
}

.conflict-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  line-height: 1.4;
}

.conflict-icon {
  color: var(--accent);
  flex-shrink: 0;
}

.conflict-actions {
  display: flex;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.conflict-btn {
  height: 28px;
  padding: 0 var(--space-sm);
  font-size: 11px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.overwrite-btn {
  background: var(--accent);
  color: var(--bg-elevated);
  border: none;
}

.overwrite-btn:hover {
  opacity: 0.9;
}

.discard-btn {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  color: var(--text-primary);
}

.discard-btn:hover {
  background: var(--bg-sunken);
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
