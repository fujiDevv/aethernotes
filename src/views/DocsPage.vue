<template>
  <div class="docs-page">

    <!-- Top Bar -->
    <header class="docs-header font-ui">
      <div class="docs-header-inner">
        <div class="docs-logo-container">
          <!-- Sidebar Toggle Button (visible only on mobile) -->
          <button class="sidebar-toggle" @click="toggleSidebar" :aria-expanded="sidebarOpen"
            aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          <router-link to="/" class="docs-logo">
            <svg class="logo-icon" width="14" height="20" viewBox="0 0 333 510" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M169.501 0.264499C172.368 1.7765 172.368 1.7765 175.376 3.9525C175.928 4.3495 176.479 4.7465 177.048 5.1555C184.435 10.5545 191.478 16.4055 198.501 22.2645C199.1 22.7635 199.699 23.2615 200.316 23.7755C207.52 29.7815 214.58 35.9325 221.501 42.2645C222.473 43.1435 223.445 44.0225 224.446 44.9285C230.736 50.6455 236.855 56.5165 242.876 62.5145C243.857 63.4885 243.857 63.4885 244.857 64.4815C249.274 68.9125 253.424 73.5215 257.501 78.2645C258.451 79.3475 259.401 80.4295 260.353 81.5105C268.153 90.4535 275.435 99.7325 282.501 109.264C283.267 110.29 283.267 110.29 284.048 111.338C303.4 137.42 317.147 166.227 326.501 197.264C326.901 198.537 326.901 198.538 327.31 199.837C331.76 214.815 333.003 230.045 332.892 245.598C332.876 248.263 332.892 250.927 332.911 253.592C332.931 268.923 331.561 284.231 326.376 298.764C326.076 299.628 325.776 300.493 325.467 301.383C319.813 317.191 312.186 331.57 302.501 345.264C302.082 345.86 301.662 346.456 301.23 347.07C289.864 362.949 275.363 376.926 259.501 388.264C258.945 388.67 258.389 389.077 257.815 389.495C243.751 399.681 227.9 408.134 211.708 414.397C209.493 415.217 209.493 415.217 207.478 416.35C203.897 418.006 200.336 418.035 196.501 417.264C192.918 414.266 191.727 412.32 190.751 407.764C191.587 403.862 192.792 402.125 195.958 399.71C199.706 397.58 203.704 396.269 207.759 394.854C246.528 380.894 278.606 349.579 298.501 314.264C299.055 313.305 299.61 312.346 300.181 311.358C315.676 282.776 316.739 246.493 310.501 215.264C310.356 214.527 310.212 213.792 310.063 213.033C306.91 197.399 301.785 181.481 294.501 167.264C294.342 168.45 294.184 169.636 294.021 170.858C291.881 186.032 288.798 200.133 280.501 213.264C279.989 214.08 279.477 214.897 278.95 215.738C270.259 228.826 258.403 240.112 246.501 250.264C244.209 252.221 241.917 254.18 239.626 256.139C239.02 256.657 238.414 257.176 237.789 257.71C233.378 261.49 229.036 265.339 224.739 269.249C222.629 271.15 220.478 272.99 218.313 274.827C202.638 288.516 190.998 308.149 184.876 327.889C184.577 328.842 184.278 329.795 183.969 330.776C181.496 338.859 179.712 346.898 178.501 355.264C178.328 356.376 178.156 357.489 177.978 358.635C177.234 364.682 177.357 370.753 177.359 376.837C177.356 378.198 177.353 379.559 177.349 380.919C177.341 383.836 177.336 386.752 177.332 389.669C177.326 394.283 177.31 398.898 177.291 403.512C177.285 405.096 177.278 406.679 177.272 408.263C177.269 409.055 177.266 409.848 177.262 410.664C177.22 421.397 177.187 432.131 177.175 442.865C177.167 450.12 177.144 457.374 177.106 464.629C177.086 468.464 177.074 472.299 177.079 476.133C177.083 479.736 177.069 483.339 177.042 486.943C177.031 488.891 177.041 490.837 177.051 492.785C176.936 503.535 176.936 503.535 172.501 508.264C169.316 509.857 165.968 509.655 162.501 509.264C159.265 507.521 158.677 506.792 157.501 503.264C157.405 501.487 157.368 499.706 157.363 497.926C157.358 496.818 157.352 495.71 157.346 494.568C157.345 493.351 157.344 492.134 157.343 490.88C157.335 488.912 157.328 486.945 157.32 484.977C157.312 482.857 157.307 480.737 157.302 478.618C157.291 474.18 157.271 469.743 157.249 465.305C157.187 452.683 157.133 440.059 157.1 427.438C157.081 420.469 157.052 413.5 157.012 406.531C156.991 402.854 156.975 399.177 156.973 395.5C156.956 374.874 156.594 354.156 150.501 334.264C150.307 333.605 150.112 332.946 149.912 332.267C145.582 317.722 139.504 304.561 130.501 292.264C130.001 291.56 129.501 290.857 128.985 290.132C119.766 277.88 108.1 266.767 96.0825 257.339C92.4925 254.455 89.1425 251.337 85.7685 248.205C83.0565 245.689 80.3175 243.224 77.5005 240.826C58.5075 224.203 42.8205 203.067 40.2945 177.15C40.1135 173.505 40.2065 169.899 40.5005 166.264C39.8405 166.264 39.1805 166.264 38.5005 166.264C38.1295 167.44 37.7575 168.615 37.3755 169.826C36.0035 173.98 34.3785 177.98 32.6885 182.014C19.6855 213.939 16.9285 248.455 23.5005 282.264C23.7055 283.371 23.9105 284.48 24.1215 285.62C29.8615 312.039 46.3305 335.094 65.1175 353.882C66.4945 355.259 67.8565 356.651 69.1765 358.081C85.0605 375.028 108.1 389.006 130.148 396.15C134.945 397.772 137.998 399.681 141.501 403.264C142.534 406.703 142.278 409.773 141.501 413.264C139.439 415.889 139.439 415.889 136.501 417.264C112.542 418.969 81.7195 395.128 64.5005 380.264C63.7435 379.617 62.9875 378.97 62.2075 378.303C45.9995 364.078 32.2655 349.05 21.5005 330.264C21.1355 329.641 20.7705 329.017 20.3955 328.375C11.5945 313.222 5.52752 296.551 2.50052 279.264C2.29652 278.105 2.09352 276.947 1.88352 275.753C-7.02148 214.457 16.6115 155.859 52.4775 107.28C56.3245 102.135 60.3335 97.1535 64.5005 92.2645C65.4445 91.1465 66.3885 90.0275 67.3325 88.9095C77.4735 76.9375 88.1135 65.5595 99.1885 54.4525C99.9345 53.7015 99.9345 53.7015 100.696 52.9365C106.452 47.1575 112.303 41.5685 118.501 36.2645C120.046 34.8515 121.588 33.4355 123.126 32.0145C128.805 26.8855 134.817 22.2265 140.863 17.5425C143.161 15.7495 145.424 13.9135 147.689 12.0765C149.29 10.8025 150.894 9.5315 152.501 8.2645C153.441 7.5155 154.38 6.7665 155.349 5.9945C156.306 5.2585 157.264 4.5225 158.251 3.7645C159.112 3.0945 159.973 2.4235 160.86 1.7335C164.113 -0.0765007 165.826 -0.278501 169.501 0.264499Z"
                fill="currentColor" />
            </svg>
            <span class="docs-logo-text">Aether Notes</span>
            <span class="docs-logo-badge">Docs</span>
          </router-link>
        </div>

        <div class="docs-header-right">
          <button class="theme-toggle" @click="cycleTheme" :aria-label="`Switch theme (${settingsStore.theme})`">
            <svg v-if="settingsStore.theme === 'system'" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
            <svg v-else-if="settingsStore.theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2m-15.07 5.66-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>
          <router-link to="/note" class="launch-btn">Launch App</router-link>
        </div>
      </div>
    </header>

    <!-- Layout -->
    <div class="docs-layout">

      <!-- Sidebar Nav -->
      <aside class="docs-sidebar font-ui" :class="{ 'is-open': sidebarOpen }">
        <nav>
          <div v-for="section in navSections" :key="section.label" class="nav-group">
            <span class="nav-group-label">{{ section.label }}</span>
            <a v-for="item in section.items" :key="item.id" :href="`#${item.id}`" class="nav-link"
              :class="{ active: activeSection === item.id }" @click.prevent="scrollTo(item.id)">{{ item.title }}</a>
          </div>
        </nav>
      </aside>

      <!-- Sidebar Backdrop -->
      <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>

      <!-- Main Content -->
      <main class="docs-content">

        <!-- Introduction -->
        <section id="introduction" class="doc-section">
          <h1 class="doc-h1 font-display">Introduction</h1>
          <p class="doc-p">Aether Notes is a local-first, zero-knowledge notes workspace running entirely in the browser. Built using Vue 3, Tiptap/ProseMirror core, Pinia, and Dexie.js (IndexedDB), it features zero-knowledge client-side encryption via the Web Crypto API.</p>
          <div class="doc-callout info">
            <strong>Offline Support:</strong> Fully cached via service worker PWA, allowing complete offline functionality.
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Getting Started -->
        <section id="getting-started" class="doc-section">
          <h2 class="doc-h2 font-display">Getting Started</h2>
          <p class="doc-p">Simply open Aether Notes on the web and configure your private password (or passphrase) when prompted. This passphrase derives the local key to encrypt and lock your notes database.</p>
          <div class="doc-callout warning">
            <strong>Password Loss = Data Loss:</strong> We do not have servers, meaning there is no recovery option. Write your passphrase down and store it safely.
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Editor -->
        <section id="editor" class="doc-section">
          <h2 class="doc-h2 font-display">Editor & Formatting</h2>
          <p class="doc-p">Powered by Tiptap (ProseMirror core), the editor parses markdown input rules as you type or through the floating bubble menu.</p>
          <p class="doc-p"><strong>Slash commands:</strong> Type <code class="inline-code">/</code> at the end of any line to trigger formatting toggles (Paragraph, H1, H2, H3).</p>
          
          <table class="doc-table">
            <thead>
              <tr>
                <th>Syntax</th>
                <th>Format</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code class="inline-code">**bold**</code></td><td>Bold text</td></tr>
              <tr><td><code class="inline-code">_italic_</code></td><td>Italic text</td></tr>
              <tr><td><code class="inline-code">~~strike~~</code></td><td>Strikethrough</td></tr>
              <tr><td><code class="inline-code">`code`</code></td><td>Inline code</td></tr>
              <tr><td><code class="inline-code">==highlight==</code></td><td>Highlight mark</td></tr>
            </tbody>
          </table>

          <p class="doc-p"><strong>Inline Tags:</strong> Prefix any keyword with an <code class="inline-code">@</code> symbol (e.g. <code class="inline-code">@idea</code>) to tag your text. Tags are indexed in the sidebar for quick scroll-anchoring.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Keyboard Shortcuts -->
        <section id="shortcuts" class="doc-section">
          <h2 class="doc-h2 font-display">Keyboard Shortcuts</h2>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><kbd>Cmd/Ctrl + K</kbd></td><td>Open Search / Command Palette</td></tr>
              <tr><td><kbd>Cmd/Ctrl + N</kbd></td><td>New Note</td></tr>
              <tr><td><kbd>Cmd/Ctrl + \</kbd></td><td>Toggle Sidebar</td></tr>
              <tr><td><kbd>Cmd/Ctrl + B</kbd></td><td>Bold</td></tr>
              <tr><td><kbd>Cmd/Ctrl + I</kbd></td><td>Italic</td></tr>
              <tr><td><kbd>Cmd/Ctrl + Shift + X</kbd></td><td>Strikethrough</td></tr>
              <tr><td><kbd>Cmd/Ctrl + E</kbd></td><td>Inline Code</td></tr>
            </tbody>
          </table>
        </section>

        <hr class="doc-divider" />

        <!-- Command Search -->
        <section id="command-palette" class="doc-section">
          <h2 class="doc-h2 font-display">Command Search</h2>
          <p class="doc-p">Press <kbd>Cmd/Ctrl + K</kbd> to open the palette powered by Fuse.js fuzzy search. Quickly scan titles, bodies, and tags, or type commands like <code class="inline-code">settings</code> or <code class="inline-code">trash</code>.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Organization -->
        <section id="organization" class="doc-section">
          <h2 class="doc-h2 font-display">Organization</h2>
          <p class="doc-p"><strong>Nested Folders:</strong> Create subfolders and re-parent structures via drag-and-drop. Deleting a folder safely moves its notes to Uncategorized.</p>
          <p class="doc-p"><strong>Favorites & Trash:</strong> Star notes to pin them in the sidebar. Configure automatic trash purging (7 days, 30 days, or never) under Settings.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Security -->
        <section id="security" class="doc-section">
          <h2 class="doc-h2 font-display">How Privacy Works</h2>
          <p class="doc-p">All cryptographic operations run client-side via the Web Crypto API.</p>
          <ul class="doc-list">
            <li><strong>PBKDF2 Derivation:</strong> Key derived using PBKDF2 (100,000 iterations) with a local random salt.</li>
            <li><strong>AES-256-GCM:</strong> Derived key encrypts/decrypts notes in-memory. The key never touches IndexedDB or localStorage.</li>
            <li><strong>IndexedDB Storage:</strong> Encrypted ciphertext, random IV, and authentication tag are stored locally.</li>
            <li><strong>Cryptographic Resilience:</strong> In case of decryption failures due to missing or mismatched salts, the application safely intercepts the failure and redirects the user to an isolated Recovery Screen, avoiding top-level crashes and allowing settings reset.</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- PWA -->
        <section id="pwa" class="doc-section">
          <h2 class="doc-h2 font-display">App Installation</h2>
          <p class="doc-p">Install Aether Notes as a Progressive Web App (PWA) to run offline:</p>
          <ul class="doc-list">
            <li><strong>Desktop (Chrome/Edge/Safari):</strong> Click the install icon in the address bar.</li>
            <li><strong>iOS Safari:</strong> Tap Share → Add to Home Screen.</li>
            <li><strong>Android Chrome:</strong> Tap the install banner.</li>
            <li><strong>Offline Font Caching:</strong> Critical font distributions are pre-cached by the service worker to guarantee immediate layout stability and avoid jarring font swapping when starting entirely offline.</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- Data Safety -->
        <section id="data-safety" class="doc-section">
          <h2 class="doc-h2 font-display">Data Safety & Backup</h2>
          <p class="doc-p">Back up and download your data in Settings under Data Portability:</p>
          <ul class="doc-list">
            <li><strong>Export Vault (JSON):</strong> Full encrypted database snapshot file including settings and note history.</li>
            <li><strong>Export Markdown (ZIP):</strong> Generates a folder structure containing all notes exported as raw Markdown (.md) text files inside a ZIP archive.</li>
            <li><strong>Optimistic Concurrency Control:</strong> To protect against accidental overwrites across multiple sessions or tabs, Aether Notes uses optimistic locking. If a timestamp mismatch is detected, edits are frozen and a resolution banner lets you choose between keeping local edits or syncing from the database.</li>
          </ul>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useTheme } from '@/composables/useTheme';

const settingsStore = useSettingsStore();
useTheme();

const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function cycleTheme() {
  const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
  const nextIdx = (themes.indexOf(settingsStore.theme) + 1) % themes.length;
  settingsStore.setSetting('theme', themes[nextIdx]);
}



// Active section tracking
const activeSection = ref('introduction');

const navSections = [
  {
    label: 'Overview',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'getting-started', title: 'Getting Started' },
    ],
  },
  {
    label: 'Using Aether',
    items: [
      { id: 'editor', title: 'Editor & Formatting' },
      { id: 'shortcuts', title: 'Keyboard Shortcuts' },
      { id: 'command-palette', title: 'Command Search' },
      { id: 'organization', title: 'Organization' },
    ],
  },
  {
    label: 'Security',
    items: [
      { id: 'security', title: 'How Privacy Works' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { id: 'pwa', title: 'App Installation' },
      { id: 'data-safety', title: 'Data Safety & Backup' },
    ],
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = id;
    sidebarOpen.value = false;
  }
}

// Intersection observer for active section
let observer: IntersectionObserver | null = null;

onMounted(() => {
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';

  const sections = document.querySelectorAll('.doc-section');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer!.observe(s));

  // Scroll to hash if present in URL
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    setTimeout(() => {
      scrollTo(hash);
    }, 100);
  }
});

onUnmounted(() => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  observer?.disconnect();
});
</script>

<style scoped>
.docs-page {
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-height);
  background: var(--bg);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 100;
}

.docs-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 769px) {
  .docs-header-inner {
    padding: 0 var(--space-lg);
  }
}

.docs-logo-container {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
}

@media (min-width: 769px) {
  .sidebar-toggle {
    display: none;
  }
}

.docs-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--text-primary);
}

.logo-icon {
  color: var(--text-primary);
  flex-shrink: 0;
}

.docs-logo-text {
  font-size: 14px;
  font-weight: 500;
  font-family: 'Instrument Serif', Georgia, serif;
}

.docs-logo-badge {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'DM Mono', monospace;
}

.docs-header-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.theme-toggle:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.launch-btn {
  text-decoration: none;
  background: var(--text-primary);
  color: var(--bg);
  padding: 6px 14px;
  border-radius: var(--radius);
  font-size: 11px;
  font-weight: 500;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.launch-btn:hover {
  opacity: 0.8;
}

/* ── Layout ── */
.docs-layout {
  display: block;
  width: 100%;
  padding-top: var(--topbar-height);
  flex: 1;
}

@media (min-width: 769px) {
  .docs-layout {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* ── Sidebar ── */
.docs-sidebar {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  bottom: 0;
  width: 260px;
  z-index: 1000;
  background: var(--bg);
  transform: translateX(-100%);
  transition: transform var(--duration-base) var(--ease-out);
  border-right: 1px solid var(--border-subtle);
  padding: var(--space-lg);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
}

.docs-sidebar.is-open {
  transform: translateX(0);
}

@media (min-width: 769px) {
  .docs-sidebar {
    position: sticky;
    top: var(--topbar-height);
    transform: none;
    width: 220px;
    height: calc(100vh - var(--topbar-height));
    padding: var(--space-xl) var(--space-md) var(--space-2xl);
    border-right: 1px solid var(--border-subtle);
    z-index: auto;
  }
}

.sidebar-backdrop {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
}

@media (min-width: 769px) {
  .sidebar-backdrop {
    display: none;
  }
}

.nav-group {
  margin-bottom: var(--space-lg);
}

.nav-group-label {
  display: block;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--text-muted);
  font-weight: 600;
  padding: 0 var(--space-sm);
  margin-bottom: var(--space-xs);
}

.nav-link {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 5px var(--space-sm);
  border-radius: var(--radius);
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.nav-link.active {
  color: var(--text-primary);
  background: var(--accent-subtle);
  font-weight: 500;
}

/* ── Content ── */
.docs-content {
  width: 100%;
  padding: var(--space-md) var(--space-lg) var(--space-2xl);
}

@media (min-width: 769px) {
  .docs-content {
    flex: 1;
    min-width: 0;
    padding: var(--space-xl) var(--space-2xl);
    max-width: 780px;
  }
}

.doc-section {
  padding-top: var(--space-lg);
  margin-bottom: var(--space-lg);
  scroll-margin-top: calc(var(--topbar-height) + 24px);
}

.doc-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: var(--space-2xl) 0 0;
}

.doc-h1 {
  font-size: 32px;
  font-weight: normal;
  letter-spacing: -0.5px;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.doc-h2 {
  font-size: 24px;
  font-weight: normal;
  letter-spacing: -0.3px;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.doc-h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: var(--space-lg) 0 var(--space-sm);
  font-family: 'DM Mono', monospace;
  letter-spacing: -0.1px;
}

.doc-p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: var(--space-md);
  font-family: 'DM Mono', monospace;
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.doc-list li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: var(--space-md);
  position: relative;
  font-family: 'DM Mono', monospace;
}

.doc-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--text-muted);
}

.doc-link {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--border);
  transition: text-decoration-color var(--duration-fast) var(--ease-out);
}

.doc-link:hover {
  text-decoration-color: var(--text-primary);
}

/* ── Callout ── */
.doc-callout {
  border-radius: var(--radius);
  padding: var(--space-md);
  font-size: 12px;
  line-height: 1.65;
  margin: var(--space-md) 0;
  font-family: 'DM Mono', monospace;
}

.doc-callout.info {
  background: var(--accent-subtle);
  /* border-left: 3px solid var(--accent); */
  color: var(--text-primary);
}

.doc-callout.warning {
  background: rgba(217, 115, 13, 0.06);
  /* border-left: 3px solid var(--notion-orange); */
  color: var(--text-primary);
}

/* ── Table ── */
.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: var(--space-md) 0;
  font-family: 'DM Mono', monospace;
}

.doc-table th {
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.doc-table td {
  padding: var(--space-sm) var(--space-md);
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
  line-height: 1.5;
}

.doc-table tr:last-child td {
  border-bottom: none;
}

.doc-table tr:hover td {
  background: var(--hover-bg);
}

/* ── Code ── */
.inline-code {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  background: var(--accent-subtle);
  color: var(--text-primary);
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid var(--border);
}

.doc-code-block {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-md) 0;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-sunken);
  padding: var(--space-sm) var(--space-md);
  font-size: 10px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-btn {
  font-size: 10px;
  font-family: 'DM Mono', monospace;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 2px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.copy-btn:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.code-body {
  margin: 0;
  padding: var(--space-md);
  background: var(--bg-elevated);
  overflow-x: auto;
}

.code-body code {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--text-primary);
  line-height: 1.7;
}

/* ── Steps ── */
.doc-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin: var(--space-md) 0;
}

.step {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg);
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'DM Mono', monospace;
  margin-top: 2px;
}

.step strong {
  display: block;
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-family: 'DM Mono', monospace;
}

.step p {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
  font-family: 'DM Mono', monospace;
}

/* ── kbd ── */
kbd {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  color: var(--text-primary);
  white-space: nowrap;
}
</style>
