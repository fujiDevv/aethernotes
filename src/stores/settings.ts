import { defineStore } from 'pinia';
import { ref } from 'vue';
import { storage } from '@/lib/storage';
import type { Settings } from '@/types';
import { generateSalt, bufToHex } from '@/lib/crypto';

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Settings['theme']>('system');
  const fontSize = ref<number>(16);
  const fontFamily = ref<Settings['fontFamily']>('serif');
  const editorWidth = ref<Settings['editorWidth']>('medium');
  const spellcheck = ref<boolean>(true);
  const lineWrapping = ref<boolean>(true);
  const autoSave = ref<boolean>(true);
  const autoSaveDelay = ref<number>(300);
  const showLineNumbers = ref<boolean>(false);
  const defaultNoteFormat = ref<Settings['defaultNoteFormat']>('markdown');
  
  // Encryption state
  const encryptionEnabled = ref<boolean>(false);
  const encryptionKey = ref<CryptoKey | null>(null);
  const encryptionSalt = ref<string | null>(null);

  async function loadSettings() {
    const settingsMap = new Map(Object.entries(await storage.loadSettings()));

    if (settingsMap.has('theme')) theme.value = settingsMap.get('theme');
    if (settingsMap.has('fontSize')) fontSize.value = Number(settingsMap.get('fontSize'));
    if (settingsMap.has('fontFamily')) fontFamily.value = settingsMap.get('fontFamily');
    if (settingsMap.has('editorWidth')) editorWidth.value = settingsMap.get('editorWidth');
    if (settingsMap.has('spellcheck')) spellcheck.value = settingsMap.get('spellcheck');
    if (settingsMap.has('lineWrapping')) lineWrapping.value = settingsMap.get('lineWrapping');
    if (settingsMap.has('autoSave')) autoSave.value = settingsMap.get('autoSave');
    if (settingsMap.has('autoSaveDelay')) autoSaveDelay.value = Number(settingsMap.get('autoSaveDelay'));
    if (settingsMap.has('showLineNumbers')) showLineNumbers.value = settingsMap.get('showLineNumbers');
    if (settingsMap.has('encryptionEnabled')) encryptionEnabled.value = settingsMap.get('encryptionEnabled');
    
    if (settingsMap.has('encryptionSalt')) {
      encryptionSalt.value = settingsMap.get('encryptionSalt');
    } else {
      const newSalt = generateSalt();
      const saltHex = bufToHex(newSalt.buffer as ArrayBuffer);
      await storage.saveSetting('encryptionSalt', saltHex);
      encryptionSalt.value = saltHex;
    }
  }

  async function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    if (key === 'theme') theme.value = value as any;
    else if (key === 'fontSize') fontSize.value = Number(value);
    else if (key === 'fontFamily') fontFamily.value = value as any;
    else if (key === 'editorWidth') editorWidth.value = value as any;
    else if (key === 'spellcheck') spellcheck.value = value as any;
    else if (key === 'lineWrapping') lineWrapping.value = value as any;
    else if (key === 'autoSave') autoSave.value = value as any;
    else if (key === 'autoSaveDelay') autoSaveDelay.value = Number(value);
    else if (key === 'showLineNumbers') showLineNumbers.value = value as any;
    else if (key === 'encryptionEnabled') encryptionEnabled.value = value as any;

    await storage.saveSetting(key, value);
  }

  function setEncryptionKey(key: CryptoKey | null) {
    encryptionKey.value = key;
  }

  return {
    theme,
    fontSize,
    fontFamily,
    editorWidth,
    spellcheck,
    lineWrapping,
    autoSave,
    autoSaveDelay,
    showLineNumbers,
    defaultNoteFormat,
    encryptionEnabled,
    encryptionKey,
    encryptionSalt,
    loadSettings,
    setSetting,
    setEncryptionKey,
  };
});
