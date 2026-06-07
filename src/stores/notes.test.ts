import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

// Create a local in-memory mock store for Dexie table
let mockDbNotes: Record<string, any> = {};

vi.mock('@/lib/db', () => {
  return {
    db: {
      notes: {
        clear: async () => { mockDbNotes = {}; },
        get: async (id: string) => mockDbNotes[id] || null,
        put: async (note: any) => { mockDbNotes[note.id] = { ...note }; return note.id; },
        delete: async (id: string) => { delete mockDbNotes[id]; },
        toArray: async () => Object.values(mockDbNotes),
        update: async (id: string, updates: any) => {
          if (mockDbNotes[id]) {
            mockDbNotes[id] = { ...mockDbNotes[id], ...updates };
            return 1;
          }
          return 0;
        }
      },
      settings: {
        toArray: async () => [],
        put: async () => {},
        delete: async () => {}
      }
    },
    default: {
      notes: {}
    }
  };
});

// Import useNotesStore AFTER vi.mock
import { useNotesStore } from './notes';
import { db } from '@/lib/db';

// Polyfill window.crypto if not present in the test environment
beforeAll(() => {
  if (typeof window !== 'undefined' && !window.crypto) {
    // @ts-ignore
    window.crypto = globalThis.crypto;
  }
});

describe('Notes Store - Optimistic Locking', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    // Clear database before each test
    await db.notes.clear();
  });

  it('should detect concurrency conflicts and throw error', async () => {
    const store = useNotesStore();

    // 1. Create a note
    const note = await store.createNote();
    const noteId = note.id;

    // Simulate loading the note in the current session
    await store.loadNotes();

    // Verify it is loaded
    expect(store.notes.length).toBe(1);
    const inMemoryNote = store.notes[0];
    expect(inMemoryNote.id).toBe(noteId);

    // 2. Simulate another tab/session modifying the note in DB
    // We update the DB version directly and advance its updatedAt timestamp
    const updatedTimestamp = inMemoryNote.updatedAt + 5000;
    await db.notes.update(noteId, {
      title: 'Modified in Tab B',
      content: 'Hello from Tab B',
      updatedAt: updatedTimestamp
    });

    // 3. Attempt to update the note in our local store
    // This should trigger the concurrency check and throw the error
    await expect(
      store.updateNote(noteId, { content: 'Trying to update from Tab A' })
    ).rejects.toThrow('CONCURRENCY_CONFLICT');

    // Verify that the conflict is registered in store state
    expect(store.concurrencyConflicts[noteId]).toBe(true);

    // 4. Resolve the conflict by overwriting
    await store.resolveConflict(noteId, 'overwrite');
    expect(store.concurrencyConflicts[noteId]).toBeUndefined();

    // Verify database was overwritten
    const dbNote = await db.notes.get(noteId);
    expect(dbNote?.content).toBe('Trying to update from Tab A');
  });

  it('should resolve conflict by discarding local changes and syncing from DB', async () => {
    const store = useNotesStore();
    const note = await store.createNote();
    const noteId = note.id;

    await store.loadNotes();

    // Modify in DB
    const dbTimestamp = note.updatedAt + 10000;
    await db.notes.update(noteId, {
      content: 'Latest database content',
      updatedAt: dbTimestamp
    });

    // Cause a conflict
    await expect(
      store.updateNote(noteId, { content: 'Unsaved local change' })
    ).rejects.toThrow('CONCURRENCY_CONFLICT');

    expect(store.concurrencyConflicts[noteId]).toBe(true);

    // Resolve by discarding
    await store.resolveConflict(noteId, 'discard');
    expect(store.concurrencyConflicts[noteId]).toBeUndefined();

    // Verify local store was updated to latest DB content
    const updatedInMemoryNote = store.notes.find(n => n.id === noteId);
    expect(updatedInMemoryNote?.content).toBe('Latest database content');
    expect(updatedInMemoryNote?.updatedAt).toBe(dbTimestamp);
  });
});
