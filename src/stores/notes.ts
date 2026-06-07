import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/lib/db';
import type { Note } from '@/types';
import { nanoid } from '@/lib/nanoid';
import { useSettingsStore } from './settings';
import { encryptText, decryptText } from '@/lib/crypto';

export function extractTags(content: string): string[] {
  const tags: string[] = [];
  const regex = /(?:^|\s)@([a-zA-Z][a-zA-Z0-9_-]*)/g;
  let match;
  // Make sure we strip any markdown-like code block snippets if needed, 
  // but a simple regex is standard.
  while ((match = regex.exec(content)) !== null) {
    tags.push(match[1].toLowerCase());
  }
  return Array.from(new Set(tags));
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([]);
  const isLoading = ref<boolean>(false);
  const lockedNotes = ref<Record<string, Note>>({}); // Cache notes that couldn't be decrypted yet
  const concurrencyConflicts = ref<Record<string, boolean>>({});

  const settingsStore = useSettingsStore();

  const allNotes = computed(() => notes.value);
  
  const activeNotes = computed(() => 
    notes.value.filter(n => !n.isTrashed)
  );

  const trashedNotes = computed(() => 
    notes.value.filter(n => n.isTrashed)
  );

  const favoriteNotes = computed(() => 
    activeNotes.value.filter(n => n.isFavorite)
  );

  const tagsList = computed(() => {
    const counts: Record<string, number> = {};
    activeNotes.value.forEach(note => {
      note.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  });

  async function loadNotes() {
    isLoading.value = true;
    try {
      const allDbNotes = await db.notes.toArray();
      const decryptedNotes: Note[] = [];
      const locked: Record<string, Note> = {};

      for (const dbNote of allDbNotes) {
        if (dbNote.encryptedWith === 'vault') {
          if (settingsStore.encryptionKey) {
            try {
              const decryptedContent = await decryptText(
                dbNote.content,
                dbNote.iv || '',
                settingsStore.encryptionKey
              );
              decryptedNotes.push({
                ...dbNote,
                content: decryptedContent,
              });
            } catch (err) {
              console.error(`Failed to decrypt note ${dbNote.id}:`, err);
              locked[dbNote.id] = dbNote;
              decryptedNotes.push({
                ...dbNote,
                content: '🔒 This note is encrypted. Please enter passphrase to unlock.',
              });
            }
          } else {
            locked[dbNote.id] = dbNote;
            decryptedNotes.push({
              ...dbNote,
              content: '🔒 This note is encrypted. Please enter passphrase to unlock.',
            });
          }
        } else {
          decryptedNotes.push(dbNote);
        }
      }

      notes.value = decryptedNotes;
      lockedNotes.value = locked;
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function decryptAllNotes(key: CryptoKey) {
    const updatedNotes = [...notes.value];
    const newLocked = { ...lockedNotes.value };

    for (const [id, lockedNote] of Object.entries(newLocked)) {
      try {
        const decryptedContent = await decryptText(
          lockedNote.content,
          lockedNote.iv || '',
          key
        );
        const index = updatedNotes.findIndex(n => n.id === id);
        const decryptedNote = {
          ...lockedNote,
          content: decryptedContent,
        };
        if (index !== -1) {
          updatedNotes[index] = decryptedNote;
        } else {
          updatedNotes.push(decryptedNote);
        }
        delete newLocked[id];
      } catch (err) {
        console.error(`Decryption failed for note ${id}:`, err);
      }
    }

    notes.value = updatedNotes;
    lockedNotes.value = newLocked;
  }

  async function createNote(folderId: string | null = null): Promise<Note> {
    const newNote: Note = {
      id: nanoid(),
      title: 'Untitled Note',
      content: '',
      folder: folderId,
      tags: [],
      isPinned: false,
      isFavorite: false,
      isTrashed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      encryptedWith: null,
    };

    notes.value.unshift(newNote);
    await saveNoteToDb(newNote);
    return newNote;
  }

  async function updateNote(id: string, updates: Partial<Note>) {
    const index = notes.value.findIndex(n => n.id === id);
    if (index === -1) return;

    const note = notes.value[index];

    // Check if there are actual changes to prevent redundant database writes and sorting updates
    let hasChanges = false;
    for (const key of Object.keys(updates) as Array<keyof Partial<Note>>) {
      if (updates[key] !== note[key]) {
        hasChanges = true;
        break;
      }
    }

    if (!hasChanges) {
      return;
    }

    // Optimistic Concurrency Check
    const dbNote = await db.notes.get(id);
    if (dbNote && dbNote.updatedAt > note.updatedAt) {
      concurrencyConflicts.value[id] = true;
      // Keep local in-memory edits so they can be recovered/overwritten
      notes.value[index] = {
        ...note,
        ...updates
      };
      throw new Error('CONCURRENCY_CONFLICT');
    }
    
    // Automatically extract tags if content is updated
    if (updates.content !== undefined) {
      updates.tags = extractTags(updates.content);
      
      // Auto-update title based on first line ONLY if it's currently default/empty,
      // or if it matches the previous first line of the content (still in sync).
      const oldLines = note.content.trim().split('\n');
      let oldFirstLine = 'Untitled Note';
      if (oldLines.length > 0 && oldLines[0]) {
        oldFirstLine = oldLines[0].replace(/^#\s+/, '').trim() || 'Untitled Note';
      }

      const newLines = updates.content.trim().split('\n');
      let newFirstLine = 'Untitled Note';
      if (newLines.length > 0 && newLines[0]) {
        newFirstLine = newLines[0].replace(/^#\s+/, '').trim() || 'Untitled Note';
      }

      if (!note.title || note.title === 'Untitled Note' || note.title === oldFirstLine) {
        updates.title = newFirstLine;
      }
    }

    const updatedNote = {
      ...note,
      ...updates,
      updatedAt: Date.now(),
    };

    notes.value[index] = updatedNote;
    await saveNoteToDb(updatedNote);
  }

  async function deleteNote(id: string) {
    await updateNote(id, { isTrashed: true });
  }

  async function restoreNote(id: string) {
    await updateNote(id, { isTrashed: false });
  }

  async function permanentlyDeleteNote(id: string) {
    notes.value = notes.value.filter(n => n.id !== id);
    if (lockedNotes.value[id]) {
      delete lockedNotes.value[id];
    }
    await db.notes.delete(id);
  }

  async function emptyTrash() {
    const toDelete = trashedNotes.value.map(n => n.id);
    notes.value = notes.value.filter(n => !n.isTrashed);
    for (const id of toDelete) {
      if (lockedNotes.value[id]) {
        delete lockedNotes.value[id];
      }
      await db.notes.delete(id);
    }
  }

  async function purgeOldTrash(days = 30) {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const toDelete = trashedNotes.value.filter(n => n.updatedAt < cutoff);
    for (const note of toDelete) {
      await permanentlyDeleteNote(note.id);
    }
  }

  async function saveNoteToDb(note: Note) {
    let dbNote = { ...note };

    // Handle Encryption
    if (settingsStore.encryptionEnabled && settingsStore.encryptionKey) {
      try {
        const { ciphertext, iv } = await encryptText(note.content, settingsStore.encryptionKey);
        dbNote.content = ciphertext;
        dbNote.iv = iv;
        dbNote.encryptedWith = 'vault';
      } catch (err) {
        console.error(`Failed to encrypt note ${note.id}:`, err);
      }
    } else {
      dbNote.encryptedWith = null;
      dbNote.iv = undefined;
    }

    await db.notes.put(dbNote);
  }

  // Toggles encryption for all existing notes (e.g. when setting/removing key)
  async function toggleEncryptionForAllNotes(enable: boolean, key: CryptoKey | null) {
    for (const note of notes.value) {
      // Don't re-encrypt locked notes (they are already encrypted in DB)
      if (lockedNotes.value[note.id]) continue;
      
      if (enable && key) {
        try {
          const { ciphertext, iv } = await encryptText(note.content, key);
          await db.notes.update(note.id, {
            content: ciphertext,
            iv: iv,
            encryptedWith: 'vault',
            updatedAt: Date.now()
          });
        } catch (err) {
          console.error(`Encryption conversion failed for note ${note.id}:`, err);
        }
      } else {
        await db.notes.update(note.id, {
          content: note.content,
          iv: undefined,
          encryptedWith: null,
          updatedAt: Date.now()
        });
      }
    }
    // Reload state from DB
    await loadNotes();
  }

  async function resolveConflict(id: string, action: 'overwrite' | 'discard') {
    if (action === 'discard') {
      const dbNote = await db.notes.get(id);
      if (dbNote) {
        const index = notes.value.findIndex(n => n.id === id);
        if (index !== -1) {
          if (dbNote.encryptedWith === 'vault' && settingsStore.encryptionKey) {
            try {
              const decryptedContent = await decryptText(
                dbNote.content,
                dbNote.iv || '',
                settingsStore.encryptionKey
              );
              notes.value[index] = {
                ...dbNote,
                content: decryptedContent,
              };
            } catch (err) {
              console.error('Failed to decrypt note during conflict resolution:', err);
              notes.value[index] = dbNote;
            }
          } else {
            notes.value[index] = dbNote;
          }
        }
      }
    } else if (action === 'overwrite') {
      const dbNote = await db.notes.get(id);
      const index = notes.value.findIndex(n => n.id === id);
      if (index !== -1 && dbNote) {
        // Force write: update our local copy's updatedAt to match the database version,
        // so that the concurrency check passes, and then write.
        notes.value[index].updatedAt = dbNote.updatedAt;
        await saveNoteToDb(notes.value[index]);
        // Also write current timestamp to mark our force write
        notes.value[index].updatedAt = Date.now();
        await db.notes.update(id, { updatedAt: notes.value[index].updatedAt });
      }
    }
    delete concurrencyConflicts.value[id];
  }

  return {
    notes,
    isLoading,
    lockedNotes,
    concurrencyConflicts,
    allNotes,
    activeNotes,
    trashedNotes,
    favoriteNotes,
    tagsList,
    loadNotes,
    decryptAllNotes,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    permanentlyDeleteNote,
    emptyTrash,
    purgeOldTrash,
    saveNoteToDb,
    toggleEncryptionForAllNotes,
    resolveConflict
  };
});
