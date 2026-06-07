import { db } from '@/lib/db';
import type { Note, Folder } from '@/types';
import { encryptText, decryptText } from '@/lib/crypto';

export interface StorageLayer {
  loadNotes(encryptionKey: CryptoKey | null): Promise<{ notes: Note[]; lockedNotes: Record<string, Note> }>;
  getNote(id: string): Promise<Note | null>;
  saveNote(note: Note, encryptionKey: CryptoKey | null, encryptionEnabled: boolean): Promise<void>;
  deleteNote(id: string): Promise<void>;
  
  loadFolders(): Promise<Folder[]>;
  saveFolder(folder: Folder): Promise<void>;
  deleteFolder(folderId: string, childIds: string[]): Promise<void>;
  
  loadSettings(): Promise<Record<string, any>>;
  saveSetting(key: string, value: any): Promise<void>;
}

export const isTauri = typeof window !== 'undefined' && (!!(window as any).__TAURI__ || !!(window as any).__TAURI_INTERNALS__);

// Helper to parse YAML-like frontmatter
export function parseFrontmatter(fileContent: string): { metadata: any; body: string } {
  const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(regex);
  if (match) {
    const yamlText = match[1];
    const body = match[2];
    const metadata: any = {};
    yamlText.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        if (val === 'true') metadata[key] = true;
        else if (val === 'false') metadata[key] = false;
        else if (val === 'null') metadata[key] = null;
        else if (!isNaN(Number(val)) && val !== '') metadata[key] = Number(val);
        else if (val.startsWith('[') && val.endsWith(']')) {
          metadata[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
        } else {
          metadata[key] = val.replace(/^['"]|['"]$/g, '');
        }
      }
    });
    return { metadata, body };
  }
  return { metadata: {}, body: fileContent };
}

export function stringifyFrontmatter(metadata: any, body: string): string {
  let yaml = '---\n';
  Object.entries(metadata).forEach(([k, v]) => {
    if (v === null) yaml += `${k}: null\n`;
    else if (Array.isArray(v)) yaml += `${k}: [${v.map(s => `"${s}"`).join(', ')}]\n`;
    else yaml += `${k}: ${v}\n`;
  });
  yaml += '---\n';
  return yaml + body;
}

// ── INDEXEDDB IMPLEMENTATION ──
class IndexedDbStorageLayer implements StorageLayer {
  async loadNotes(encryptionKey: CryptoKey | null): Promise<{ notes: Note[]; lockedNotes: Record<string, Note> }> {
    const allDbNotes = await db.notes.toArray();
    const decryptedNotes: Note[] = [];
    const lockedNotes: Record<string, Note> = {};

    for (const dbNote of allDbNotes) {
      if (dbNote.encryptedWith === 'vault') {
        if (encryptionKey) {
          try {
            const decryptedContent = await decryptText(
              dbNote.content,
              dbNote.iv || '',
              encryptionKey
            );
            decryptedNotes.push({
              ...dbNote,
              content: decryptedContent,
            });
          } catch (err) {
            console.error(`Failed to decrypt note ${dbNote.id}:`, err);
            lockedNotes[dbNote.id] = dbNote;
            decryptedNotes.push({
              ...dbNote,
              content: '🔒 This note is encrypted. Please enter passphrase to unlock.',
            });
          }
        } else {
          lockedNotes[dbNote.id] = dbNote;
          decryptedNotes.push({
            ...dbNote,
            content: '🔒 This note is encrypted. Please enter passphrase to unlock.',
          });
        }
      } else {
        decryptedNotes.push(dbNote);
      }
    }
    return { notes: decryptedNotes, lockedNotes };
  }

  async getNote(id: string): Promise<Note | null> {
    return (await db.notes.get(id)) || null;
  }

  async saveNote(note: Note, encryptionKey: CryptoKey | null, encryptionEnabled: boolean): Promise<void> {
    let dbNote = { ...note };
    if (encryptionEnabled && encryptionKey) {
      try {
        const { ciphertext, iv } = await encryptText(note.content, encryptionKey);
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

  async deleteNote(id: string): Promise<void> {
    await db.notes.delete(id);
  }

  async loadFolders(): Promise<Folder[]> {
    return await db.folders.toArray();
  }

  async saveFolder(folder: Folder): Promise<void> {
    await db.folders.put(folder);
  }

  async deleteFolder(folderId: string, childIds: string[]): Promise<void> {
    await db.folders.delete(folderId);
    for (const cid of childIds) {
      await db.folders.delete(cid);
    }
  }

  async loadSettings(): Promise<Record<string, any>> {
    const all = await db.settings.toArray();
    return Object.fromEntries(all.map(s => [s.key, s.value]));
  }

  async saveSetting(key: string, value: any): Promise<void> {
    await db.settings.put({ key, value });
  }
}

// ── TAURI FILESYSTEM IMPLEMENTATION ──
class TauriFsStorageLayer implements StorageLayer {
  private workspacePath: string | null = null;
  private foldersCache: Folder[] = [];
  
  // Dynamically imports tauri modules to prevent loading errors in non-tauri environments
  private async getFs() {
    const { exists, mkdir, writeTextFile, readTextFile, remove, rename, readDir, BaseDirectory } = await import('@tauri-apps/plugin-fs');
    const { documentDir, join } = await import('@tauri-apps/api/path');
    return { exists, mkdir, writeTextFile, readTextFile, remove, rename, readDir, BaseDirectory, documentDir, join };
  }

  async getWorkspace(): Promise<string> {
    if (this.workspacePath) return this.workspacePath;
    const { documentDir, join, mkdir, exists } = await this.getFs();
    const doc = await documentDir();
    const workspace = await join(doc, 'Aether Notes');
    
    if (!(await exists(workspace))) {
      await mkdir(workspace, { recursive: true });
    }
    this.workspacePath = workspace;
    return workspace;
  }

  // Resolves the folder hierarchy relative path
  private getFolderRelativePath(folderId: string | null): string {
    if (!folderId) return '';
    const folder = this.foldersCache.find(f => f.id === folderId);
    if (!folder) return '';
    return folder.path;
  }

  async loadFolders(): Promise<Folder[]> {
    const { exists, readTextFile, join } = await this.getFs();
    const ws = await this.getWorkspace();
    const metaFile = await join(ws, '.aether-folders.json');

    if (await exists(metaFile)) {
      try {
        const text = await readTextFile(metaFile);
        this.foldersCache = JSON.parse(text);
        return this.foldersCache;
      } catch (err) {
        console.error('Failed to parse folder metadata json, reverting:', err);
      }
    }
    
    // Default to empty array if metadata is not found or corrupted
    this.foldersCache = [];
    return [];
  }

  async saveFolder(folder: Folder): Promise<void> {
    const { mkdir, writeTextFile, join } = await this.getFs();
    const ws = await this.getWorkspace();

    // 1. Ensure directory exists physically on disk
    const physicalDir = await join(ws, folder.path);
    await mkdir(physicalDir, { recursive: true });

    // 2. Update memory cache and write metadata
    const idx = this.foldersCache.findIndex(f => f.id === folder.id);
    if (idx !== -1) {
      const oldFolder = this.foldersCache[idx];
      if (oldFolder.path !== folder.path) {
        const { rename } = await this.getFs();
        const oldPhysical = await join(ws, oldFolder.path);
        const newPhysical = await join(ws, folder.path);
        try {
          await rename(oldPhysical, newPhysical);
        } catch (err) {
          console.error(`Failed to physically rename folder directory from ${oldFolder.path} to ${folder.path}:`, err);
        }
      }
      this.foldersCache[idx] = { ...folder };
    } else {
      this.foldersCache.push({ ...folder });
    }

    const metaFile = await join(ws, '.aether-folders.json');
    await writeTextFile(metaFile, JSON.stringify(this.foldersCache, null, 2));
  }

  async deleteFolder(folderId: string, childIds: string[]): Promise<void> {
    const { remove, writeTextFile, join } = await this.getFs();
    const ws = await this.getWorkspace();
    const ids = [folderId, ...childIds];

    for (const id of ids) {
      const folder = this.foldersCache.find(f => f.id === id);
      if (folder) {
        const physical = await join(ws, folder.path);
        try {
          await remove(physical, { recursive: true });
        } catch (err) {
          console.warn(`Physical directory remove failed for folder ${folder.path}:`, err);
        }
      }
    }

    // Filter out deleted ids from cache and save
    this.foldersCache = this.foldersCache.filter(f => !ids.includes(f.id));
    const metaFile = await join(ws, '.aether-folders.json');
    await writeTextFile(metaFile, JSON.stringify(this.foldersCache, null, 2));
  }

  async loadNotes(encryptionKey: CryptoKey | null): Promise<{ notes: Note[]; lockedNotes: Record<string, Note> }> {
    const { readDir, readTextFile, join } = await this.getFs();
    const ws = await this.getWorkspace();
    const notesList: Note[] = [];
    const lockedNotes: Record<string, Note> = {};

    // First load folder metadata to satisfy getFolderRelativePath
    await this.loadFolders();

    // Helper function to read files recursively
    const scanDir = async (dirPath: string, relativeDir: string) => {
      const entries = await readDir(dirPath);
      for (const entry of entries) {
        // Skip hidden files/directories (starting with .)
        if (entry.name.startsWith('.')) continue;

        const entryPath = await join(dirPath, entry.name);
        
        if (entry.isDirectory) {
          await scanDir(entryPath, relativeDir ? `${relativeDir}/${entry.name}` : entry.name);
        } else if (entry.name.endsWith('.md')) {
          try {
            const rawText = await readTextFile(entryPath);
            const { metadata, body } = parseFrontmatter(rawText);

            // Construct Note object
            if (metadata.id) {
              const noteObj: Note = {
                id: metadata.id,
                title: metadata.title || entry.name.slice(0, -3),
                content: body,
                folder: metadata.folder || null,
                tags: metadata.tags || [],
                isPinned: !!metadata.isPinned,
                isFavorite: !!metadata.isFavorite,
                isTrashed: !!metadata.isTrashed,
                createdAt: Number(metadata.createdAt) || Date.now(),
                updatedAt: Number(metadata.updatedAt) || Date.now(),
                encryptedWith: metadata.encryptedWith || null,
                iv: metadata.iv,
              };

              // Decrypt content if it is encrypted
              if (noteObj.encryptedWith === 'vault') {
                if (encryptionKey) {
                  try {
                    const decrypted = await decryptText(body, noteObj.iv || '', encryptionKey);
                    noteObj.content = decrypted;
                    notesList.push(noteObj);
                  } catch (err) {
                    console.error(`Failed to decrypt note file ${entry.name}:`, err);
                    lockedNotes[noteObj.id] = { ...noteObj };
                    noteObj.content = '🔒 This note is encrypted. Please enter passphrase to unlock.';
                    notesList.push(noteObj);
                  }
                } else {
                  lockedNotes[noteObj.id] = { ...noteObj };
                  noteObj.content = '🔒 This note is encrypted. Please enter passphrase to unlock.';
                  notesList.push(noteObj);
                }
              } else {
                notesList.push(noteObj);
              }
            }
          } catch (err) {
            console.error(`Failed to read/parse note file ${entry.name}:`, err);
          }
        }
      }
    };

    await scanDir(ws, '');
    return { notes: notesList, lockedNotes };
  }

  async getNote(id: string): Promise<Note | null> {
    const { join, readTextFile } = await this.getFs();
    const ws = await this.getWorkspace();
    let foundNote: Note | null = null;

    const scanDir = async (dirPath: string) => {
      const { readDir } = await this.getFs();
      const entries = await readDir(dirPath);
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const entryPath = await join(dirPath, entry.name);
        if (entry.isDirectory) {
          await scanDir(entryPath);
          if (foundNote) return;
        } else if (entry.name.endsWith('.md')) {
          try {
            const rawText = await readTextFile(entryPath);
            const { metadata, body } = parseFrontmatter(rawText);
            if (metadata.id === id) {
              foundNote = {
                id: metadata.id,
                title: metadata.title || entry.name.slice(0, -3),
                content: body,
                folder: metadata.folder || null,
                tags: metadata.tags || [],
                isPinned: !!metadata.isPinned,
                isFavorite: !!metadata.isFavorite,
                isTrashed: !!metadata.isTrashed,
                createdAt: Number(metadata.createdAt) || Date.now(),
                updatedAt: Number(metadata.updatedAt) || Date.now(),
                encryptedWith: metadata.encryptedWith || null,
                iv: metadata.iv,
              };
              return;
            }
          } catch (err) {
            // Ignore
          }
        }
      }
    };

    await scanDir(ws);
    return foundNote;
  }

  async saveNote(note: Note, encryptionKey: CryptoKey | null, encryptionEnabled: boolean): Promise<void> {
    const { writeTextFile, remove, join, exists, mkdir, readTextFile } = await this.getFs();
    const ws = await this.getWorkspace();

    // Prepare note content for serialization
    let contentToWrite = note.content;
    let writeIv = note.iv;
    let writeEncryptedWith = note.encryptedWith;

    if (encryptionEnabled && encryptionKey && note.content && note.content.indexOf('🔒') === -1) {
      try {
        const { ciphertext, iv } = await encryptText(note.content, encryptionKey);
        contentToWrite = ciphertext;
        writeIv = iv;
        writeEncryptedWith = 'vault';
      } catch (err) {
        console.error(`Failed to encrypt note content during save:`, err);
      }
    }

    const metadata = {
      id: note.id,
      title: note.title,
      folder: note.folder,
      isPinned: note.isPinned,
      isFavorite: note.isFavorite,
      isTrashed: note.isTrashed,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      tags: note.tags,
      encryptedWith: writeEncryptedWith,
      iv: writeIv
    };

    const serializedContent = stringifyFrontmatter(metadata, contentToWrite);

    // Determine target path based on folder and note title
    const relativeFolder = this.getFolderRelativePath(note.folder);
    const sanitizedTitle = note.title.replace(/[^a-zA-Z0-9\s-_]/g, '').trim() || 'Untitled';
    const folderDir = await join(ws, relativeFolder);
    if (!(await exists(folderDir))) {
      await mkdir(folderDir, { recursive: true });
    }

    const targetPath = await join(folderDir, `${sanitizedTitle}.md`);

    // Clean up older file names or folder moves if the file was saved somewhere else
    const cleanOldInstances = async (dirPath: string) => {
      const { readDir } = await this.getFs();
      const entries = await readDir(dirPath);
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const entryPath = await join(dirPath, entry.name);
        if (entry.isDirectory) {
          await cleanOldInstances(entryPath);
        } else if (entry.name.endsWith('.md')) {
          try {
            const rawText = await readTextFile(entryPath);
            const { metadata: meta } = parseFrontmatter(rawText);
            if (meta.id === note.id && entryPath !== targetPath) {
              await remove(entryPath);
            }
          } catch (err) {
            // Ignored
          }
        }
      }
    };

    await cleanOldInstances(ws);

    // Save/write the new file
    await writeTextFile(targetPath, serializedContent);
  }

  async deleteNote(id: string): Promise<void> {
    const { remove, join, readTextFile } = await this.getFs();
    const ws = await this.getWorkspace();

    // Scan recursively and remove the file matching the note ID
    const removeInstance = async (dirPath: string) => {
      const { readDir } = await this.getFs();
      const entries = await readDir(dirPath);
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const entryPath = await join(dirPath, entry.name);
        if (entry.isDirectory) {
          await removeInstance(entryPath);
        } else if (entry.name.endsWith('.md')) {
          try {
            const rawText = await readTextFile(entryPath);
            const { metadata } = parseFrontmatter(rawText);
            if (metadata.id === id) {
              await remove(entryPath);
              break;
            }
          } catch (err) {
            // Ignored
          }
        }
      }
    };

    await removeInstance(ws);
  }

  async loadSettings(): Promise<Record<string, any>> {
    const { exists, readTextFile, join } = await this.getFs();
    const ws = await this.getWorkspace();
    const settingsFile = await join(ws, '.aether-settings.json');

    if (await exists(settingsFile)) {
      try {
        const text = await readTextFile(settingsFile);
        return JSON.parse(text);
      } catch (err) {
        console.error('Failed to parse settings json:', err);
      }
    }
    return {};
  }

  async saveSetting(key: string, value: any): Promise<void> {
    const { writeTextFile, join } = await this.getFs();
    const ws = await this.getWorkspace();
    const settingsFile = await join(ws, '.aether-settings.json');

    const currentSettings = await this.loadSettings();
    currentSettings[key] = value;
    await writeTextFile(settingsFile, JSON.stringify(currentSettings, null, 2));
  }
}

// Export the active storage layer dynamically to prevent initialization timing race conditions
let tauriFsInstance: TauriFsStorageLayer | null = null;
let indexedDbInstance: IndexedDbStorageLayer | null = null;

export const storage = {
  get active(): StorageLayer {
    const checkIsTauri = typeof window !== 'undefined' && (!!(window as any).__TAURI__ || !!(window as any).__TAURI_INTERNALS__);
    if (checkIsTauri) {
      if (!tauriFsInstance) tauriFsInstance = new TauriFsStorageLayer();
      return tauriFsInstance;
    } else {
      if (!indexedDbInstance) indexedDbInstance = new IndexedDbStorageLayer();
      return indexedDbInstance;
    }
  },
  
  loadNotes(encryptionKey: CryptoKey | null) {
    return this.active.loadNotes(encryptionKey);
  },
  getNote(id: string) {
    return this.active.getNote(id);
  },
  saveNote(note: Note, encryptionKey: CryptoKey | null, encryptionEnabled: boolean) {
    return this.active.saveNote(note, encryptionKey, encryptionEnabled);
  },
  deleteNote(id: string) {
    return this.active.deleteNote(id);
  },
  loadFolders() {
    return this.active.loadFolders();
  },
  saveFolder(folder: Folder) {
    return this.active.saveFolder(folder);
  },
  deleteFolder(folderId: string, childIds: string[]) {
    return this.active.deleteFolder(folderId, childIds);
  },
  loadSettings() {
    return this.active.loadSettings();
  },
  saveSetting(key: string, value: any) {
    return this.active.saveSetting(key, value);
  }
};

