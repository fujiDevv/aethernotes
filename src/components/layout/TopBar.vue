<template>
  <header class="topbar">
    <div class="topbar-left">
      <!-- On mobile and viewing a note detail or settings, show Back button. Otherwise show Sidebar toggle. -->
      <IconButton
        v-if="isMobile && (route.name === 'note-detail' || route.name === 'settings')"
        @click="goBack"
        aria-label="Back to Notes"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </IconButton>
      <IconButton
        v-else
        @click="uiStore.toggleSidebar"
        aria-label="Toggle Sidebar"
        :active="uiStore.isSidebarOpen"
      >
        <!-- Sidebar Toggle Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </IconButton>

      <router-link to="/" class="logo-link">
        <svg class="logo-icon" width="16" height="24" viewBox="0 0 333 510" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M169.501 0.264499C172.368 1.7765 172.368 1.7765 175.376 3.9525C175.928 4.3495 176.479 4.7465 177.048 5.1555C184.435 10.5545 191.478 16.4055 198.501 22.2645C199.1 22.7635 199.699 23.2615 200.316 23.7755C207.52 29.7815 214.58 35.9325 221.501 42.2645C222.473 43.1435 223.445 44.0225 224.446 44.9285C230.736 50.6455 236.855 56.5165 242.876 62.5145C243.857 63.4885 243.857 63.4885 244.857 64.4815C249.274 68.9125 253.424 73.5215 257.501 78.2645C258.451 79.3475 259.401 80.4295 260.353 81.5105C268.153 90.4535 275.435 99.7325 282.501 109.264C283.267 110.29 283.267 110.29 284.048 111.338C303.4 137.42 317.147 166.227 326.501 197.264C326.901 198.537 326.901 198.538 327.31 199.837C331.76 214.815 333.003 230.045 332.892 245.598C332.876 248.263 332.892 250.927 332.911 253.592C332.931 268.923 331.561 284.231 326.376 298.764C326.076 299.628 325.776 300.493 325.467 301.383C319.813 317.191 312.186 331.57 302.501 345.264C302.082 345.86 301.662 346.456 301.23 347.07C289.864 362.949 275.363 376.926 259.501 388.264C258.945 388.67 258.389 389.077 257.815 389.495C243.751 399.681 227.9 408.134 211.708 414.397C209.493 415.217 209.493 415.217 207.478 416.35C203.897 418.006 200.336 418.035 196.501 417.264C192.918 414.266 191.727 412.32 190.751 407.764C191.587 403.862 192.792 402.125 195.958 399.71C199.706 397.58 203.704 396.269 207.759 394.854C246.528 380.894 278.606 349.579 298.501 314.264C299.055 313.305 299.61 312.346 300.181 311.358C315.676 282.776 316.739 246.493 310.501 215.264C310.356 214.527 310.212 213.792 310.063 213.033C306.91 197.399 301.785 181.481 294.501 167.264C294.342 168.45 294.184 169.636 294.021 170.858C291.881 186.032 288.798 200.133 280.501 213.264C279.989 214.08 279.477 214.897 278.95 215.738C270.259 228.826 258.403 240.112 246.501 250.264C244.209 252.221 241.917 254.18 239.626 256.139C239.02 256.657 238.414 257.176 237.789 257.71C233.378 261.49 229.036 265.339 224.739 269.249C222.629 271.15 220.478 272.99 218.313 274.827C202.638 288.516 190.998 308.149 184.876 327.889C184.577 328.842 184.278 329.795 183.969 330.776C181.496 338.859 179.712 346.898 178.501 355.264C178.328 356.376 178.156 357.489 177.978 358.635C177.234 364.682 177.357 370.753 177.359 376.837C177.356 378.198 177.353 379.559 177.349 380.919C177.341 383.836 177.336 386.752 177.332 389.669C177.326 394.283 177.31 398.898 177.291 403.512C177.285 405.096 177.278 406.679 177.272 408.263C177.269 409.055 177.266 409.848 177.262 410.664C177.22 421.397 177.187 432.131 177.175 442.865C177.167 450.12 177.144 457.374 177.106 464.629C177.086 468.464 177.074 472.299 177.079 476.133C177.083 479.736 177.069 483.339 177.042 486.943C177.031 488.891 177.041 490.837 177.051 492.785C176.936 503.535 176.936 503.535 172.501 508.264C169.316 509.857 165.968 509.655 162.501 509.264C159.265 507.521 158.677 506.792 157.501 503.264C157.405 501.487 157.368 499.706 157.363 497.926C157.358 496.818 157.352 495.71 157.346 494.568C157.345 493.351 157.344 492.134 157.343 490.88C157.335 488.912 157.328 486.945 157.32 484.977C157.312 482.857 157.307 480.737 157.302 478.618C157.291 474.18 157.271 469.743 157.249 465.305C157.187 452.683 157.133 440.059 157.1 427.438C157.081 420.469 157.052 413.5 157.012 406.531C156.991 402.854 156.975 399.177 156.973 395.5C156.956 374.874 156.594 354.156 150.501 334.264C150.307 333.605 150.112 332.946 149.912 332.267C145.582 317.722 139.504 304.561 130.501 292.264C130.001 291.56 129.501 290.857 128.985 290.132C119.766 277.88 108.14 266.767 96.0825 257.339C92.4925 254.455 89.1425 251.337 85.7685 248.205C83.0565 245.689 80.3175 243.224 77.5005 240.826C58.5075 224.203 42.8205 203.067 40.2945 177.15C40.1135 173.505 40.2065 169.899 40.5005 166.264C39.8405 166.264 39.1805 166.264 38.5005 166.264C38.1295 167.44 37.7575 168.615 37.3755 169.826C36.0035 173.98 34.3785 177.98 32.6885 182.014C19.6855 213.939 16.9285 248.455 23.5005 282.264C23.7055 283.371 23.9105 284.48 24.1215 285.62C29.8615 312.039 46.3305 335.094 65.1175 353.882C66.4945 355.259 67.8565 356.651 69.1765 358.081C85.0605 375.028 108.1 389.006 130.148 396.15C134.945 397.772 137.998 399.681 141.501 403.264C142.534 406.703 142.278 409.773 141.501 413.264C139.439 415.889 139.439 415.889 136.501 417.264C112.542 418.969 81.7195 395.128 64.5005 380.264C63.7435 379.617 62.9875 378.97 62.2075 378.303C45.9995 364.078 32.2655 349.05 21.5005 330.264C21.1355 329.641 20.7705 329.017 20.3955 328.375C11.5945 313.222 5.52752 296.551 2.50052 279.264C2.29652 278.105 2.09352 276.947 1.88352 275.753C-7.02148 214.457 16.6115 155.859 52.4775 107.28C56.3245 102.135 60.3335 97.1535 64.5005 92.2645C65.4445 91.1465 66.3885 90.0275 67.3325 88.9095C77.4735 76.9375 88.1135 65.5595 99.1885 54.4525C99.9345 53.7015 99.9345 53.7015 100.696 52.9365C106.452 47.1575 112.303 41.5685 118.501 36.2645C120.046 34.8515 121.588 33.4355 123.126 32.0145C128.805 26.8855 134.817 22.2265 140.863 17.5425C143.161 15.7495 145.424 13.9135 147.689 12.0765C149.29 10.8025 150.894 9.5315 152.501 8.2645C153.441 7.5155 154.38 6.7665 155.349 5.9945C156.306 5.2585 157.264 4.5225 158.251 3.7645C159.112 3.0945 159.973 2.4235 160.86 1.7335C164.113 -0.0765007 165.826 -0.278501 169.501 0.264499Z" fill="currentColor"/>
        </svg>
        <span class="logo-aether">Aether</span>
        <span class="logo-notes">Notes</span>
      </router-link>
    </div>

    <div class="topbar-right">
      <!-- Search Cmd+K Trigger -->
      <button class="search-trigger" @click="uiStore.toggleSearch" aria-label="Search">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span class="search-placeholder font-ui">Search notes...</span>
        <kbd class="shortcut font-ui">⌘K</kbd>
      </button>

      <!-- Theme Switcher -->
      <IconButton @click="toggleTheme" aria-label="Toggle Theme">
        <!-- System Theme Icon -->
        <svg v-if="settingsStore.theme === 'system'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
        <!-- Dark Theme Icon -->
        <svg v-else-if="settingsStore.theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <!-- Light Theme Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </IconButton>

      <!-- Toggle Outline Sidebar -->
      <IconButton
        v-if="route.name !== 'settings'"
        @click="uiStore.toggleOutline"
        aria-label="Toggle Outline"
        :active="uiStore.isOutlineOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      </IconButton>

      <!-- Settings Panel Shortcut -->
      <IconButton @click="navigateToSettings" aria-label="Settings" :active="route.name === 'settings'">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </IconButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconButton from '@/components/shared/IconButton.vue';
import { useUiStore } from '@/stores/ui';
import { useSettingsStore } from '@/stores/settings';
import { useRouter, useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

const uiStore = useUiStore();
const settingsStore = useSettingsStore();
const router = useRouter();
const route = useRoute();

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

function toggleTheme() {
  const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
  const nextIdx = (themes.indexOf(settingsStore.theme) + 1) % themes.length;
  settingsStore.setSetting('theme', themes[nextIdx]);
}

function navigateToSettings() {
  if (route.name === 'settings') {
    router.push('/note');
  } else {
    router.push('/settings');
  }
}

function goBack() {
  router.push('/note');
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--topbar-height);
  padding: 0 var(--space-md);
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border);
  z-index: 50;
  user-select: none;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo-icon {
  height: 15px;
  width: auto;
  color: var(--text-primary);
  flex-shrink: 0;
  margin-bottom: 2px;
}

.logo-aether {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 20px;
  font-style: italic;
  color: var(--text-primary);
}

.logo-notes {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.search-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  padding: 0;
  border: none;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.search-trigger:hover {
  background: var(--bg-sunken);
}

.search-icon {
  margin-right: 0;
  color: var(--text-muted);
  flex-shrink: 0;
}

.search-placeholder,
.shortcut {
  display: none;
}

@media (min-width: 768px) {
  .search-trigger {
    width: 180px;
    padding: 0 var(--space-sm) 0 var(--space-md);
    background: var(--bg-sunken);
    border: 1px solid var(--border);
    justify-content: flex-start;
  }

  .search-trigger:hover {
    border-color: var(--text-muted);
    color: var(--text-secondary);
  }

  .search-icon {
    margin-right: var(--space-sm);
  }

  .search-placeholder {
    display: block;
    font-size: 11px;
    text-align: left;
    flex: 1;
  }

  .shortcut {
    display: inline-block;
    font-size: 10px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 4px;
    color: var(--text-secondary);
    margin-left: var(--space-xs);
    flex-shrink: 0;
  }
}
</style>
