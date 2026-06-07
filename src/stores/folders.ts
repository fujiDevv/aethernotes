import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { storage } from '@/lib/storage';
import type { Folder } from '@/types';
import { nanoid } from '@/lib/nanoid';
import { useNotesStore } from './notes';

export interface FolderNode extends Folder {
  children: FolderNode[];
}

export const useFoldersStore = defineStore('folders', () => {
  const folders = ref<Folder[]>([]);
  const isLoading = ref<boolean>(false);

  const folderTree = computed(() => {
    const nodeMap = new Map<string, FolderNode>();
    
    // Sort folders by sortOrder then alphabetically
    const sortedFolders = [...folders.value].sort(
      (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
    );

    // First pass: create nodes
    sortedFolders.forEach(folder => {
      nodeMap.set(folder.id, { ...folder, children: [] });
    });

    const rootNodes: FolderNode[] = [];

    // Second pass: construct parent-child relationships
    sortedFolders.forEach(folder => {
      const node = nodeMap.get(folder.id)!;
      if (folder.parentId && nodeMap.has(folder.parentId)) {
        const parentNode = nodeMap.get(folder.parentId)!;
        parentNode.children.push(node);
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  });

  async function loadFolders() {
    isLoading.value = true;
    try {
      folders.value = await storage.loadFolders();
    } catch (err) {
      console.error('Failed to load folders:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function createFolder(name: string, parentId: string | null = null, color: string | null = null): Promise<Folder> {
    const parentFolder = folders.value.find(f => f.id === parentId);
    const parentPath = parentFolder ? parentFolder.path : '';
    const fullPath = parentPath ? `${parentPath}/${name}` : name;

    const newFolder: Folder = {
      id: nanoid(),
      name,
      path: fullPath,
      parentId,
      color,
      sortOrder: folders.value.filter(f => f.parentId === parentId).length,
    };

    folders.value.push(newFolder);
    await storage.saveFolder(newFolder);
    return newFolder;
  }

  async function updateFolder(id: string, updates: Partial<Folder>) {
    const index = folders.value.findIndex(f => f.id === id);
    if (index === -1) return;

    const folder = folders.value[index];
    const updatedFolder = {
      ...folder,
      ...updates,
    };

    // Recompute path if folder parent or name is updated
    if (updates.name !== undefined || updates.parentId !== undefined) {
      const parentFolder = folders.value.find(f => f.id === updatedFolder.parentId);
      const parentPath = parentFolder ? parentFolder.path : '';
      updatedFolder.path = parentPath ? `${parentPath}/${updatedFolder.name}` : updatedFolder.name;
    }

    folders.value[index] = updatedFolder;
    await storage.saveFolder(updatedFolder);

    // Recursively update descendants if parent path changed
    if (folder.path !== updatedFolder.path) {
      await updateDescendantPaths(updatedFolder.id, updatedFolder.path);
    }
  }

  async function updateDescendantPaths(parentId: string, parentPath: string) {
    const children = folders.value.filter(f => f.parentId === parentId);
    for (const child of children) {
      const newChildPath = `${parentPath}/${child.name}`;
      const childIndex = folders.value.findIndex(f => f.id === child.id);
      if (childIndex !== -1) {
        folders.value[childIndex].path = newChildPath;
        await storage.saveFolder(folders.value[childIndex]);
        await updateDescendantPaths(child.id, newChildPath);
      }
    }
  }

  async function deleteFolder(id: string) {
    const notesStore = useNotesStore();
    
    // Find all subfolder IDs recursively
    const getDescendantIds = (folderId: string): string[] => {
      const children = folders.value.filter(f => f.parentId === folderId);
      return [folderId, ...children.flatMap(child => getDescendantIds(child.id))];
    };

    const idsToDelete = getDescendantIds(id);

    // Remove from state
    folders.value = folders.value.filter(f => !idsToDelete.includes(f.id));

    // Remove from storage
    const childIds = idsToDelete.filter(cid => cid !== id);
    await storage.deleteFolder(id, childIds);

    // Set note folder reference to null for any notes inside these folders
    notesStore.notes.forEach(note => {
      if (note.folder && idsToDelete.includes(note.folder)) {
        notesStore.updateNote(note.id, { folder: null });
      }
    });
  }

  return {
    folders,
    isLoading,
    folderTree,
    loadFolders,
    createFolder,
    updateFolder,
    deleteFolder,
  };
});
