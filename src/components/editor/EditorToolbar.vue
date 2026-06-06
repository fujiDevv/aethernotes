<template>
  <BubbleMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 150, interactive: true, placement: 'top' }"
    :should-show="shouldShowMenu" class="bubble-menu-wrapper font-ui" @click.stop @mousedown.stop>
    <!-- Emoji Picker Popover (Above the toolbar) -->
    <div v-show="showEmojiPicker" class="emoji-popover-container" @click.stop @mousedown.stop>
      <EmojiPicker :theme="currentTheme" @select="handleEmojiSelect" />
    </div>

    <!-- Color Popover (Above the toolbar) -->
    <div v-show="showColorMenu" class="color-popover" @click.stop @mousedown.stop>
      <div class="color-options-title font-ui">Text Color</div>
      <div class="color-picker-grid">
        <button v-for="color in labelColors" :key="color.name" class="color-dot"
          :style="{ backgroundColor: color.hex || 'var(--text-primary)' }" :title="color.name"
          @mousedown.prevent.stop="applyColor(color.hex)"></button>
      </div>
    </div>

    <!-- Link Input Popover (Above the toolbar) -->
    <div v-show="showLinkInput" class="link-popover" @click.stop @mousedown.stop>
      <input ref="linkInputRef" v-model="linkUrl" type="text" placeholder="Paste or type link..." class="link-input"
        @keydown.enter="submitLink" @keydown.esc="cancelLink" @keydown.stop @keypress.stop @keyup.stop @paste.stop
        @copy.stop @cut.stop @beforeinput.stop />
      <button type="button" class="link-submit-btn" @click.prevent.stop="submitLink" title="Confirm Link">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
      <button type="button" class="link-cancel-btn" @click.prevent.stop="cancelLink" title="Cancel">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" x2="6" y1="6" y2="18" />
          <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Main Formatting Toolbar -->
    <div class="bubble-menu" @click.stop @mousedown.stop>
      <!-- Text Type Toggles -->
      <button :class="['menu-btn', { 'is-active': editor.isActive('paragraph') }]" @click="formatBlock('paragraph')"
        title="Paragraph">
        <span class="btn-text">P</span>
      </button>
      <button :class="['menu-btn', { 'is-active': editor.isActive('heading', { level: 1 }) }]"
        @click="formatBlock('h1')" title="Heading 1">
        <span class="btn-text">H1</span>
      </button>
      <button :class="['menu-btn', { 'is-active': editor.isActive('heading', { level: 2 }) }]"
        @click="formatBlock('h2')" title="Heading 2">
        <span class="btn-text">H2</span>
      </button>
      <button :class="['menu-btn', { 'is-active': editor.isActive('heading', { level: 3 }) }]"
        @click="formatBlock('h3')" title="Heading 3">
        <span class="btn-text">H3</span>
      </button>

      <div class="menu-divider"></div>

      <!-- Bold -->
      <button :class="['menu-btn', { 'is-active': editor.isActive('bold') }]"
        @click="deleteSlashThen(() => editor!.chain().focus().toggleBold().run())" title="Bold (Cmd+B)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 12a4 4 0 0 0 0-8H6v8" />
          <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
        </svg>
      </button>

      <!-- Italic -->
      <button :class="['menu-btn', { 'is-active': editor.isActive('italic') }]"
        @click="deleteSlashThen(() => editor!.chain().focus().toggleItalic().run())" title="Italic (Cmd+I)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" x2="10" y1="4" y2="4" />
          <line x1="14" x2="5" y1="20" y2="20" />
          <line x1="15" x2="9" y1="4" y2="20" />
        </svg>
      </button>

      <!-- Strikethrough -->
      <button :class="['menu-btn', { 'is-active': editor.isActive('strike') }]"
        @click="deleteSlashThen(() => editor!.chain().focus().toggleStrike().run())"
        title="Strikethrough (Cmd+Shift+X)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4H9a3 3 0 0 0-2.83 4 4 4 0 0 0 3.71 3h7.24a4 4 0 0 1 3.71 3 3 3 0 0 1-2.83 4H7" />
          <line x1="4" x2="20" y1="12" y2="12" />
        </svg>
      </button>

      <!-- Inline Code -->
      <button :class="['menu-btn', { 'is-active': editor.isActive('code') }]"
        @click="deleteSlashThen(() => editor!.chain().focus().toggleCode().run())" title="Inline Code (Cmd+E)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </button>

      <!-- Highlight -->
      <button :class="['menu-btn', { 'is-active': editor.isActive('highlight') }]"
        @click="deleteSlashThen(() => editor!.chain().focus().toggleHighlight().run())" title="Highlight (Cmd+Shift+H)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="m12 3-1.912 5.886a2 2 0 0 1-1.236 1.236L3 12l5.886 1.912a2 2 0 0 1 1.236 1.236L12 21l1.912-5.886a2 2 0 0 1 1.236-1.236L21 12l-5.886-1.912a2 2 0 0 1-1.236-1.236Z" />
        </svg>
      </button>

      <!-- Text Color Button -->
      <button type="button" :class="['menu-btn', { 'is-active': editor.isActive('textStyle') || showColorMenu }]"
        @mousedown.prevent.stop="toggleColorMenu" title="Text Color">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 17L12 4l5 13" />
          <path d="M9 13h6" />
          <path d="M4 21h16" :style="{ stroke: currentColor ? currentColor : 'currentColor' }" stroke-width="4" />
        </svg>
      </button>

      <!-- Emoji Picker Button -->
      <button type="button" :class="['menu-btn', { 'is-active': showEmojiPicker }]"
        @mousedown.prevent.stop="toggleEmojiPicker" title="Insert Emoji">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </button>

      <!-- Link Toggle — only shown when text is selected, not in slash mode -->
      <button v-if="!isSlashMode" type="button"
        :class="['menu-btn', { 'is-active': editor.isActive('link') || showLinkInput }]"
        @mousedown.prevent.stop="toggleLink" title="Add Link">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Editor } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import EmojiPicker from 'vue3-emoji-picker';
import { useSettingsStore } from '@/stores/settings';

const props = defineProps<{
  editor: Editor | null | undefined;
}>();

const settingsStore = useSettingsStore();

const showLinkInput = ref(false);
const linkUrl = ref('');
const linkInputRef = ref<HTMLInputElement | null>(null);
const savedRange = ref<{ from: number; to: number } | null>(null);
const showColorMenu = ref(false);
const showEmojiPicker = ref(false);

const labelColors = [
  { name: 'Default', hex: null },
  { name: 'Grey', hex: 'var(--notion-grey)' },
  { name: 'Brown', hex: 'var(--notion-brown)' },
  { name: 'Orange', hex: 'var(--notion-orange)' },
  { name: 'Yellow', hex: 'var(--notion-yellow)' },
  { name: 'Green', hex: 'var(--notion-green)' },
  { name: 'Blue', hex: 'var(--notion-blue)' },
  { name: 'Purple', hex: 'var(--notion-purple)' },
  { name: 'Pink', hex: 'var(--notion-pink)' },
  { name: 'Red', hex: 'var(--notion-red)' }
];

const currentColor = computed(() => {
  if (!props.editor) return null;
  return props.editor.getAttributes('textStyle').color || null;
});

const currentTheme = computed(() => {
  if (settingsStore.theme === 'system') {
    const isDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? 'dark' : 'light';
  }
  return settingsStore.theme;
});

/**
 * True when the bubble menu is open because the user typed '/' followed by search text.
 * False when triggered by text selection or double-click.
 * Used to hide the link button in slash-command mode.
 */
const isSlashMode = computed(() => {
  if (!props.editor) return false;
  const { selection } = props.editor.state;
  if (!selection.empty) return false; // text is selected → not slash mode
  const { $from } = selection;
  const textBeforeCursor = $from.parent.textContent.slice(0, $from.parentOffset);
  return /\/\w*$/.test(textBeforeCursor);
});

function toggleColorMenu() {
  if (showLinkInput.value) {
    showLinkInput.value = false;
    props.editor?.view.dom.classList.remove('hide-selection');
  }
  showEmojiPicker.value = false;
  showColorMenu.value = !showColorMenu.value;
}

function toggleEmojiPicker() {
  if (showLinkInput.value) {
    showLinkInput.value = false;
    props.editor?.view.dom.classList.remove('hide-selection');
  }
  showColorMenu.value = false;
  showEmojiPicker.value = !showEmojiPicker.value;
}

function applyColor(color: string | null) {
  if (!props.editor) return;
  deleteSlashIfPresent();
  if (color) {
    props.editor.chain().focus().setColor(color).run();
  } else {
    props.editor.chain().focus().unsetColor().run();
  }
  showColorMenu.value = false;
}

/**
 * Checks if the bubble menu was triggered by a trailing slash command and deletes it,
 * then runs the given callback. Safe to call from any button action.
 */
function deleteSlashIfPresent(): boolean {
  if (!props.editor) return false;
  const { selection } = props.editor.state;
  const { $from } = selection;
  const textBeforeCursor = $from.parent.textContent.slice(0, $from.parentOffset);
  const match = textBeforeCursor.match(/\/(\w*)$/);
  if (match) {
    const pos = selection.from;
    const commandLength = match[0].length;
    props.editor.chain().focus().deleteRange({ from: pos - commandLength, to: pos }).run();
    return true;
  }
  return false;
}

function deleteSlashThen(action: () => void) {
  deleteSlashIfPresent();
  action();
}

function handleEmojiSelect(emoji: any) {
  if (emoji && emoji.i) {
    insertEmoji(emoji.i);
  }
}

function insertEmoji(char: string) {
  if (!props.editor) return;
  deleteSlashIfPresent();
  props.editor.chain().focus().insertContent(char).run();
  showEmojiPicker.value = false;
}

const shouldShowMenu = ({ state, editor }: { state: any; editor: any }) => {
  if (!editor) return false;

  const { selection } = state;
  const { empty, $from } = selection;

  // If the link input is open, keep the bubble menu visible UNLESS the user clicked away
  if (showLinkInput.value) {
    if (savedRange.value) {
      const { from, to } = selection;
      // If the selection has changed from when we opened the link input, the user clicked somewhere else
      if (from !== savedRange.value.from || to !== savedRange.value.to) {
        showLinkInput.value = false;
        editor.view.dom.classList.remove('hide-selection');
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  // If the color menu is open, keep the bubble menu visible
  if (showColorMenu.value) {
    return true;
  }

  // If the emoji picker is open, keep the bubble menu visible
  if (showEmojiPicker.value) {
    return true;
  }

  const show = (() => {
    // 1. If text is highlighted, show bubble menu
    if (!empty) {
      return true;
    }

    // 2. If selection is empty, show bubble menu only if text immediately before cursor ends with '/' (or slash commands)
    // and we are NOT on the first block (first child of the document)
    const isFirstBlock = $from.depth >= 1 && $from.start(1) === 1;
    if (isFirstBlock) {
      return false;
    }

    const currentBlockText = $from.parent.textContent;
    const cursorPosInBlock = $from.parentOffset;
    const textBeforeCursor = currentBlockText.slice(0, cursorPosInBlock);

    return /\/\w*$/.test(textBeforeCursor);
  })();

  if (!show) {
    showLinkInput.value = false;
    showColorMenu.value = false;
    showEmojiPicker.value = false;
  }
  return show;
};

function formatBlock(type: 'paragraph' | 'h1' | 'h2' | 'h3') {
  if (!props.editor) return;

  const { selection } = props.editor.state;
  const { $from } = selection;
  const currentBlockText = $from.parent.textContent;
  const cursorPosInBlock = $from.parentOffset;
  const textBeforeCursor = currentBlockText.slice(0, cursorPosInBlock);

  let chain = props.editor.chain().focus();

  // If the text before cursor ends with '/' or a slash command, delete it
  const match = textBeforeCursor.match(/\/(\w*)$/);
  if (match) {
    const pos = selection.from;
    const commandLength = match[0].length;
    chain = chain.deleteRange({ from: pos - commandLength, to: pos });
  }

  if (type === 'paragraph') {
    chain.setParagraph().run();
  } else if (type === 'h1') {
    chain.toggleHeading({ level: 1 }).run();
  } else if (type === 'h2') {
    chain.toggleHeading({ level: 2 }).run();
  } else if (type === 'h3') {
    chain.toggleHeading({ level: 3 }).run();
  }
}

function toggleLink() {
  if (!props.editor) return;

  if (showLinkInput.value) {
    showLinkInput.value = false;
    props.editor.view.dom.classList.remove('hide-selection');
    return;
  }

  showEmojiPicker.value = false;
  showColorMenu.value = false;

  // Delete '/' if present before saving the selection
  deleteSlashIfPresent();

  // Save the current selection range before editor blurs
  const { selection } = props.editor.state;
  savedRange.value = { from: selection.from, to: selection.to };

  const previousUrl = props.editor.getAttributes('link').href || '';
  linkUrl.value = previousUrl;
  showLinkInput.value = true;
  props.editor.view.dom.classList.add('hide-selection');

  setTimeout(() => {
    if (linkInputRef.value) {
      linkInputRef.value.focus();
      linkInputRef.value.select();
    }
  }, 10);
}

function submitLink() {
  if (!props.editor) return;

  const trimmedUrl = linkUrl.value.trim();
  let chain = props.editor.chain().focus();

  // Restore selection range
  if (savedRange.value) {
    chain = chain.setTextSelection(savedRange.value);
  }

  if (trimmedUrl === '') {
    chain.unsetLink().run();
  } else {
    // Auto-add https:// if not present and doesn't look like mailto or absolute URL
    const urlPattern = /^(http:\/\/|https:\/\/|mailto:)/;
    const finalUrl = urlPattern.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
    chain.setLink({ href: finalUrl }).run();
  }

  showLinkInput.value = false;
  props.editor.view.dom.classList.remove('hide-selection');
  linkUrl.value = '';
  savedRange.value = null;
}

function cancelLink() {
  showLinkInput.value = false;
  if (props.editor) {
    props.editor.view.dom.classList.remove('hide-selection');
  }
  linkUrl.value = '';

  if (props.editor && savedRange.value) {
    props.editor.chain().focus().setTextSelection(savedRange.value).run();
  }
  savedRange.value = null;
}
</script>

<style>
@import '../../../node_modules/vue3-emoji-picker/dist/style.css';
</style>

<style scoped>

.bubble-menu-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.link-popover {
  display: flex;
  align-items: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  padding: 4px;
  gap: 4px;
}

.bubble-menu {
  display: flex;
  align-items: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  padding: 3px;
  gap: 2px;
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.menu-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.menu-btn.is-active {
  background: var(--accent-subtle);
  color: var(--accent);
}

.btn-text {
  font-size: 10px;
  font-weight: 700;
}

.menu-divider {
  width: 1px;
  height: 16px;
  background: var(--border);
  align-self: center;
  margin: 0 4px;
}

.color-popover {
  display: flex;
  flex-direction: column;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.color-options-title {
  font-size: 10px;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 6px 8px 2px;
  letter-spacing: 0.5px;
}

.color-picker-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  padding: 6px 8px 8px;
}

.color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--border);
  cursor: pointer;
  padding: 0;
  transition: transform var(--duration-fast) var(--ease-out);
}

.color-dot:hover {
  transform: scale(1.2);
}

.link-input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 11px;
  color: var(--text-primary);
  padding: 0 8px;
  width: 180px;
  height: 24px;
}

.link-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.link-submit-btn,
.link-cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  background: transparent;
  border: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.link-submit-btn:hover {
  background: var(--bg-sunken);
  color: var(--notion-green);
}

.link-cancel-btn:hover {
  background: var(--bg-sunken);
  color: var(--notion-red);
}

.emoji-popover-container {
  display: flex;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  z-index: 100;
}

:deep(.v3-emoji-picker) {
  --v3-picker-bg: var(--bg-elevated);
  --v3-picker-fg: var(--text-primary);
  --v3-picker-border: var(--border-subtle);
  --v3-picker-input-bg: var(--bg-sunken);
  --v3-picker-input-border: var(--border);
  --v3-picker-input-focus-border: var(--accent);
  --v3-picker-emoji-hover: var(--hover-bg);

  box-shadow: none;
  border: none;
}

:deep(.v3-emoji-picker.v3-color-theme-dark) {
  --v3-group-image-filter: invert(1);
}
</style>
