import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref<boolean>(true);
  const isFocusMode = ref<boolean>(false);
  const isSearchOpen = ref<boolean>(false);
  const isOutlineOpen = ref<boolean>(true);
  const activeFolderId = ref<string | null>(null);
  const activeTag = ref<string | null>(null);
  const isDocsOpen = ref<boolean>(false);
  
  // Editor status
  const wordCount = ref<number>(0);
  const charCount = ref<number>(0);
  const saveStatus = ref<'saved' | 'saving' | 'error'>('saved');

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function toggleFocusMode() {
    isFocusMode.value = !isFocusMode.value;
  }

  function toggleSearch() {
    isSearchOpen.value = !isSearchOpen.value;
  }

  function toggleOutline() {
    isOutlineOpen.value = !isOutlineOpen.value;
  }

  function selectFolder(folderId: string | null) {
    activeFolderId.value = folderId;
    activeTag.value = null; // Clear tag filter when selecting folder
  }

  function selectTag(tag: string | null) {
    activeTag.value = tag;
    activeFolderId.value = null; // Clear folder filter when selecting tag
  }


  return {
    isSidebarOpen,
    isFocusMode,
    isSearchOpen,
    isOutlineOpen,
    activeFolderId,
    activeTag,
    isDocsOpen,
    wordCount,
    charCount,
    saveStatus,
    toggleSidebar,
    toggleFocusMode,
    toggleSearch,
    toggleOutline,
    selectFolder,
    selectTag
  };
});
