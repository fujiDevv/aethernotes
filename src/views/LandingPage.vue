<template>
  <div class="landing-page">
    <!-- Header Navigation -->
    <header class="header font-ui">
      <div class="header-container">
        <router-link to="/" class="logo">
          <svg class="logo-icon" width="16" height="24" viewBox="0 0 333 510" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M169.501 0.264499C172.368 1.7765 172.368 1.7765 175.376 3.9525C175.928 4.3495 176.479 4.7465 177.048 5.1555C184.435 10.5545 191.478 16.4055 198.501 22.2645C199.1 22.7635 199.699 23.2615 200.316 23.7755C207.52 29.7815 214.58 35.9325 221.501 42.2645C222.473 43.1435 223.445 44.0225 224.446 44.9285C230.736 50.6455 236.855 56.5165 242.876 62.5145C243.857 63.4885 243.857 63.4885 244.857 64.4815C249.274 68.9125 253.424 73.5215 257.501 78.2645C258.451 79.3475 259.401 80.4295 260.353 81.5105C268.153 90.4535 275.435 99.7325 282.501 109.264C283.267 110.29 283.267 110.29 284.048 111.338C303.4 137.42 317.147 166.227 326.501 197.264C326.901 198.537 326.901 198.538 327.31 199.837C331.76 214.815 333.003 230.045 332.892 245.598C332.876 248.263 332.892 250.927 332.911 253.592C332.931 268.923 331.561 284.231 326.376 298.764C326.076 299.628 325.776 300.493 325.467 301.383C319.813 317.191 312.186 331.57 302.501 345.264C302.082 345.86 301.662 346.456 301.23 347.07C289.864 362.949 275.363 376.926 259.501 388.264C258.945 388.67 258.389 389.077 257.815 389.495C243.751 399.681 227.9 408.134 211.708 414.397C209.493 415.217 209.493 415.217 207.478 416.35C203.897 418.006 200.336 418.035 196.501 417.264C192.918 414.266 191.727 412.32 190.751 407.764C191.587 403.862 192.792 402.125 195.958 399.71C199.706 397.58 203.704 396.269 207.759 394.854C246.528 380.894 278.606 349.579 298.501 314.264C299.055 313.305 299.61 312.346 300.181 311.358C315.676 282.776 316.739 246.493 310.501 215.264C310.356 214.527 310.212 213.792 310.063 213.033C306.91 197.399 301.785 181.481 294.501 167.264C294.342 168.45 294.184 169.636 294.021 170.858C291.881 186.032 288.798 200.133 280.501 213.264C279.989 214.08 279.477 214.897 278.95 215.738C270.259 228.826 258.403 240.112 246.501 250.264C244.209 252.221 241.917 254.18 239.626 256.139C239.02 256.657 238.414 257.176 237.789 257.71C233.378 261.49 229.036 265.339 224.739 269.249C222.629 271.15 220.478 272.99 218.313 274.827C202.638 288.516 190.998 308.149 184.876 327.889C184.577 328.842 184.278 329.795 183.969 330.776C181.496 338.859 179.712 346.898 178.501 355.264C178.328 356.376 178.156 357.489 177.978 358.635C177.234 364.682 177.357 370.753 177.359 376.837C177.356 378.198 177.353 379.559 177.349 380.919C177.341 383.836 177.336 386.752 177.332 389.669C177.326 394.283 177.31 398.898 177.291 403.512C177.285 405.096 177.278 406.679 177.272 408.263C177.269 409.055 177.266 409.848 177.262 410.664C177.22 421.397 177.187 432.131 177.175 442.865C177.167 450.12 177.144 457.374 177.106 464.629C177.086 468.464 177.074 472.299 177.079 476.133C177.083 479.736 177.069 483.339 177.042 486.943C177.031 488.891 177.041 490.837 177.051 492.785C176.936 503.535 176.936 503.535 172.501 508.264C169.316 509.857 165.968 509.655 162.501 509.264C159.265 507.521 158.677 506.792 157.501 503.264C157.405 501.487 157.368 499.706 157.363 497.926C157.358 496.818 157.352 495.71 157.346 494.568C157.345 493.351 157.344 492.134 157.343 490.88C157.335 488.912 157.328 486.945 157.32 484.977C157.312 482.857 157.328 480.945 157.32 484.977C157.312 482.857 157.307 480.737 157.302 478.618C157.291 474.18 157.271 469.743 157.249 465.305C157.187 452.683 157.133 440.059 157.1 427.438C157.081 420.469 157.052 413.5 157.012 406.531C156.991 402.854 156.975 399.177 156.973 395.5C156.956 374.874 156.594 354.156 150.501 334.264C150.307 333.605 150.112 332.946 149.912 332.267C145.582 317.722 139.504 304.561 130.501 292.264C130.001 291.56 129.501 290.857 128.985 290.132C119.766 277.88 108.14 266.767 96.0825 257.339C92.4925 254.455 89.1425 251.337 85.7685 248.205C83.0565 245.689 80.3175 243.224 77.5005 240.826C58.5075 224.203 42.8205 203.067 40.2945 177.15C40.1135 173.505 40.2065 169.899 40.5005 166.264C39.8405 166.264 39.1805 166.264 38.5005 166.264C38.1295 167.44 37.7575 168.615 37.3755 169.826C36.0035 173.98 34.3785 177.98 32.6885 182.014C19.6855 213.939 16.9285 248.455 23.5005 282.264C23.7055 283.371 23.9105 284.48 24.1215 285.62C29.8615 312.039 46.3305 335.094 65.1175 353.882C66.4945 355.259 67.8565 356.651 69.1765 358.081C85.0605 375.028 108.1 389.006 130.148 396.15C134.945 397.772 137.998 399.681 141.501 403.264C142.534 406.703 142.278 409.773 141.501 413.264C139.439 415.889 139.439 415.889 136.501 417.264C112.542 418.969 81.7195 395.128 64.5005 380.264C63.7435 379.617 62.9875 378.97 62.2075 378.303C45.9995 364.078 32.2655 349.05 21.5005 330.264C21.1355 329.641 20.7705 329.017 20.3955 328.375C11.5945 313.222 5.52752 296.551 2.50052 279.264C2.29652 278.105 2.09352 276.947 1.88352 275.753C-7.02148 214.457 16.6115 155.859 52.4775 107.28C56.3245 102.135 60.3335 97.1535 64.5005 92.2645C65.4445 91.1465 66.3885 90.0275 67.3325 88.9095C77.4735 76.9375 88.1135 65.5595 99.1885 54.4525C99.9345 53.7015 99.9345 53.7015 100.696 52.9365C106.452 47.1575 112.303 41.5685 118.501 36.2645C120.046 34.8515 121.588 33.4355 123.126 32.0145C128.805 26.8855 134.817 22.2265 140.863 17.5425C143.161 15.7495 145.424 13.9135 147.689 12.0765C149.29 10.8025 150.894 9.5315 152.501 8.2645C153.441 7.5155 154.38 6.7665 155.349 5.9945C156.306 5.2585 157.264 4.5225 158.251 3.7645C159.112 3.0945 159.973 2.4235 160.86 1.7335C164.113 -0.0765007 165.826 -0.278501 169.501 0.264499Z"
              fill="currentColor" />
          </svg>
          <span class="logo-text font-display">Aether <span class="logo-notes font-ui">Notes</span></span>
        </router-link>

        <div class="header-right">
          <nav class="nav-links">
            <router-link to="/docs">Docs</router-link>
            <a href="#" @click.prevent="triggerDownload(downloadUrl)">Download</a>
            <a href="https://github.com/fujiDevv/aethernotes" target="_blank" rel="noopener">GitHub</a>
            <router-link to="/note" class="cta-btn">Launch App →</router-link>
          </nav>

          <!-- Mobile Menu Button -->
          <button class="menu-toggle" @click="toggleMobileMenu" :aria-expanded="mobileMenuOpen"
            aria-label="Toggle menu">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <Transition name="slide-down">
      <div v-if="mobileMenuOpen" class="mobile-drawer font-ui">
        <nav class="mobile-nav">
          <router-link to="/docs" @click="mobileMenuOpen = false">Docs</router-link>
          <a href="#" @click.prevent="mobileMenuOpen = false; triggerDownload(downloadUrl)">Download App</a>
          <a href="https://github.com/fujiDevv/aethernotes" target="_blank" rel="noopener"
            @click="mobileMenuOpen = false">GitHub</a>
          <router-link to="/note" class="mobile-cta-btn" @click="mobileMenuOpen = false">Launch App →</router-link>
        </nav>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-badge font-ui">Open Source · Native Desktop · Local-First</div>
        <h1 class="hero-title font-display">
          Your thoughts,<br />
          <span class="italic-accent">fully yours.</span>
        </h1>
        <p class="hero-subtitle font-ui">
          A native desktop Markdown notes editor powered by Tauri v2. Secure your notes with zero-knowledge AES-256-GCM
          encryption, while storing everything locally in raw Markdown files on your device.
        </p>
        <div class="hero-ctas font-ui">
          <!-- <router-link to="/note" class="hero-btn primary">Launch Web App →</router-link> -->
          <a href="#" class="hero-btn download-btn" @click.prevent="triggerDownload(downloadUrl)">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download for {{ osName || 'Desktop' }}
          </a>
          <router-link to="/docs" class="hero-btn secondary">Documentation</router-link>
        </div>
        <div class="platform-downloads font-ui">
          <!-- <span>Available on: </span -->
          <a href="#"
            @click.prevent="triggerDownload('https://github.com/fujiDevv/aethernotes/releases/download/v1.0.0/Aether.Notes_1.0.0_aarch64.dmg')">macOS
            (Apple Silicon)</a> ·
          <a href="#"
            @click.prevent="triggerDownload('https://github.com/fujiDevv/aethernotes/releases/download/v1.0.0/Aether.Notes_1.0.0_x64.dmg')">macOS
            (Intel)</a> ·
          <a href="#"
            @click.prevent="triggerDownload('https://github.com/fujiDevv/aethernotes/releases/download/v1.0.0/Aether.Notes_1.0.0_x64_en-US.msi')">Windows
            (.msi)</a> ·
          <a href="#"
            @click.prevent="triggerDownload('https://github.com/fujiDevv/aethernotes/releases/download/v1.0.0/Aether.Notes_1.0.0_x64.AppImage')">Linux
            (.AppImage)</a>
        </div>

        <!-- Simulated Typing Workspace Mockup -->
        <div class="editor-mockup animate-fade-in">
          <div class="mockup-header">
            <div class="mockup-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="mockup-title font-ui">untitled_log.md</div>
          </div>
          <div class="mockup-body">
            <div class="simulated-editor">
              <div v-for="(line, idx) in simulatedLines" :key="idx" :class="line.class">
                <template v-if="line.type === 'h1'">
                  <span class="tag-hash"># </span>{{ line.text }}
                </template>
                <template v-else-if="line.type === 'h2'">
                  <span class="tag-hash">## </span>{{ line.text }}
                </template>
                <template v-else-if="line.type === 'body'">
                  <span v-html="formatSimulatedBody(line.text, idx)"></span>
                </template>
                <span v-if="idx === activeLineIdx" class="simulated-cursor"></span>
              </div>

              <!-- Simulated Bubble Menu Mockup -->
              <Transition name="fade">
                <div v-if="showSlashMenu" class="simulated-bubble-menu-wrapper font-ui">
                  <div class="simulated-bubble-menu">
                    <!-- Text Type Toggles -->
                    <div class="sim-menu-btn"><span class="btn-text">P</span></div>
                    <div class="sim-menu-btn"><span class="btn-text">H1</span></div>
                    <div class="sim-menu-btn active"><span class="btn-text">H2</span></div>
                    <div class="sim-menu-btn"><span class="btn-text">H3</span></div>

                    <div class="sim-menu-divider"></div>

                    <!-- Bold -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                        <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                      </svg>
                    </div>

                    <!-- Italic -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" x2="10" y1="4" y2="4" />
                        <line x1="14" x2="5" y1="20" y2="20" />
                        <line x1="15" x2="9" y1="4" y2="20" />
                      </svg>
                    </div>

                    <!-- Strikethrough -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M16 4H9a3 3 0 0 0-2.83 4 4 4 0 0 0 3.71 3h7.24a4 4 0 0 1 3.71 3 3 3 0 0 1-2.83 4H7" />
                        <line x1="4" x2="20" y1="12" y2="12" />
                      </svg>
                    </div>

                    <!-- Inline Code -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>

                    <!-- Highlight -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path
                          d="m12 3-1.912 5.886a2 2 0 0 1-1.236 1.236L3 12l5.886 1.912a2 2 0 0 1 1.236 1.236L12 21l1.912-5.886a2 2 0 0 1 1.236-1.236L21 12l-5.886-1.912a2 2 0 0 1-1.236-1.236Z" />
                      </svg>
                    </div>

                    <!-- Text Color Button -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 17L12 4l5 13" />
                        <path d="M9 13h6" />
                        <path d="M4 21h16" stroke-width="4" />
                      </svg>
                    </div>

                    <!-- Emoji -->
                    <div class="sim-menu-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Download Warning Modal Overlay -->
    <Transition name="fade">
      <div v-if="showDownloadWarning" class="warning-modal-overlay" @click.self="showDownloadWarning = false">
        <div class="warning-modal">
          <div class="warning-modal-header">
            <svg xmlns="http://www.w3.org/2000/svg" class="warning-icon" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h3 class="warning-title font-display">Security &amp; Installation Notice</h3>
          </div>
          <div class="warning-modal-body font-ui">
            <p>Aether Notes is a free, open-source project. Because our installers are self-signed, your operating
              system
              may warn you that the developer is unverified during installation.</p>
            <p style="margin-top: 12px;"><strong>macOS:</strong> Right-click the app in Applications and click
              <strong>Open</strong> to bypass Gatekeeper.<br /><strong>Windows:</strong> Click <strong>More
                info</strong>
              and select <strong>Run anyway</strong> on the SmartScreen prompt.
            </p>
          </div>
          <div class="warning-modal-footer font-ui">
            <button class="btn-cancel" @click="showDownloadWarning = false">Cancel</button>
            <a :href="pendingDownloadUrl" class="btn-confirm" @click="showDownloadWarning = false"
              target="_blank">Download
              Anyway</a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const mobileMenuOpen = ref(false);
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

const showDownloadWarning = ref(false);
const pendingDownloadUrl = ref('');

function triggerDownload(url: string) {
  pendingDownloadUrl.value = url;
  showDownloadWarning.value = true;
}

const downloadUrl = computed(() => {
  const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent.toLowerCase() : '';
  const githubRepo = 'https://github.com/fujiDevv/aethernotes';

  if (userAgent.indexOf('win') !== -1) {
    return `${githubRepo}/releases/download/v1.0.0/Aether.Notes_1.0.0_x64_en-US.msi`;
  } else if (userAgent.indexOf('mac') !== -1) {
    return `${githubRepo}/releases/download/v1.0.0/Aether.Notes_1.0.0_aarch64.dmg`;
  } else if (userAgent.indexOf('linux') !== -1) {
    return `${githubRepo}/releases/download/v1.0.0/Aether.Notes_1.0.0_amd64.AppImage`;
  }
  return `${githubRepo}/releases/latest`;
});

const osName = computed(() => {
  const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent.toLowerCase() : '';
  if (userAgent.indexOf('win') !== -1) return 'Windows';
  if (userAgent.indexOf('mac') !== -1) return 'macOS';
  if (userAgent.indexOf('linux') !== -1) return 'Linux';
  return '';
});

interface SimulatedLine {
  text: string;
  type: string;
  class: string;
}

const simulatedLines = ref<SimulatedLine[]>([
  { text: '', type: 'h1', class: 'sim-h1' },
  { text: '', type: 'body', class: 'sim-p placeholder' },
  { text: '', type: 'body', class: 'sim-p' }
]);

const activeLineIdx = ref(0);
const showSlashMenu = ref(false);

const demoScript = [
  { line: 0, text: 'Getting Started with Aether', delay: 40 },
  { action: 'nextLine', targetLine: 1 },
  { line: 1, text: 'A minimal notes workspace.', delay: 30 },
  { action: 'nextLine', targetLine: 2 },
  { line: 2, text: '/', delay: 200 },
  { action: 'showMenu' },
  { action: 'selectH2' },
  { line: 2, text: 'Secure. Local. Yours.', delay: 50 },
  { action: 'nextLine', targetLine: 3 },
  { line: 3, text: 'Encrypted with @crypto before saving.', delay: 30 },
];

let timers: ReturnType<typeof setTimeout>[] = [];

function formatSimulatedBody(text: string, idx: number) {
  if (!text) {
    if (idx === 1 && simulatedLines.value[1]?.text === '') {
      return "Start writing or type '/' for blocks...";
    }
    return '';
  }
  return text.replace(/(@[a-zA-Z0-9_-]+)/g, '<span class="sim-tag">$1</span>');
}

function runDemo() {
  let timeAccumulator = 800;

  demoScript.forEach(step => {
    if (step.line !== undefined && step.text !== undefined) {
      const chars = step.text.split('');
      chars.forEach((char, charIdx) => {
        const timer = setTimeout(() => {
          activeLineIdx.value = step.line as number;
          simulatedLines.value[step.line as number].text += char;
          if (step.line === 1) {
            simulatedLines.value[1].class = 'sim-p';
          }
        }, timeAccumulator + charIdx * (step.delay as number));
        timers.push(timer);
      });
      timeAccumulator += chars.length * (step.delay as number) + 400;
    } else if (step.action === 'nextLine') {
      const timer = setTimeout(() => {
        activeLineIdx.value = step.targetLine as number;
        if (simulatedLines.value.length <= (step.targetLine as number)) {
          simulatedLines.value.push({ text: '', type: 'body', class: 'sim-p' });
        }
      }, timeAccumulator);
      timers.push(timer);
      timeAccumulator += 300;
    } else if (step.action === 'showMenu') {
      const timer = setTimeout(() => { showSlashMenu.value = true; }, timeAccumulator);
      timers.push(timer);
      timeAccumulator += 800;
    } else if (step.action === 'selectH2') {
      const timer = setTimeout(() => {
        showSlashMenu.value = false;
        simulatedLines.value[2].type = 'h2';
        simulatedLines.value[2].class = 'sim-h2';
        simulatedLines.value[2].text = '';
      }, timeAccumulator);
      timers.push(timer);
      timeAccumulator += 200;
    }
  });

  // Loop
  const loopTimer = setTimeout(() => {
    simulatedLines.value = [
      { text: '', type: 'h1', class: 'sim-h1' },
      { text: '', type: 'body', class: 'sim-p placeholder' },
      { text: '', type: 'body', class: 'sim-p' }
    ];
    activeLineIdx.value = 0;
    showSlashMenu.value = false;
    runDemo();
  }, timeAccumulator + 4000);
  timers.push(loopTimer);
}

onMounted(() => {
  // Enforce Light Mode on Landing Page
  document.documentElement.setAttribute('data-theme', 'light');
  document.documentElement.classList.remove('dark');

  // Allow the landing page to scroll by overriding the global body overflow
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';
  runDemo();
});

onUnmounted(() => {
  // Restore the app-shell body style when navigating to the editor
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  timers.forEach(t => clearTimeout(t));
});
</script>

<style scoped>
.landing-page {
  /* Enforce Light Mode Variables locally */
  --bg: #FFFFFF;
  --bg-elevated: #FFFFFF;
  --bg-sunken: #F1F1EF;
  --border: #EDEBE6;
  --border-subtle: #F1F1EF;

  /* Increase text contrast on light background */
  --text-primary: #1A1A18;
  --text-secondary: #444340;
  --text-muted: #7A533E;

  --accent: #1A1A18;
  --accent-subtle: rgba(26, 26, 24, 0.06);

  --sidebar-bg: #F7F6F3;
  --sidebar-hover: #FFFFFF;
  --hover-bg: #F1F1EF;

  background-image: url('@/assets/bg-01.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-height);
  /* background-color: transparent; */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.05); */
  z-index: 1000;
  /* backdrop-filter: blur(12px); */
  /* -webkit-backdrop-filter: blur(12px); */
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1080px;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 768px) {
  .header-container {
    padding: 0 var(--space-lg);
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  color: var(--text-primary);
  flex-shrink: 0;
}

.logo-text {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.logo-notes {
  font-size: 9px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-family: 'DM Mono', monospace;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.nav-links {
  display: none;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
  }
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 800;
  font-size: 11px;
  transition: color var(--duration-fast) var(--ease-out);
  letter-spacing: 0.3px;
}

.nav-links a:hover {
  color: var(--text-primary);
}

/* Hamburger toggle */
.menu-toggle {
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

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
}

.cta-btn {
  background: var(--text-primary) !important;
  color: var(--bg) !important;
  padding: 6px 14px;
  border-radius: var(--radius);
  font-weight: 500;
  font-size: 11px !important;
  transition: opacity var(--duration-fast) var(--ease-out) !important;
}

.cta-btn:hover {
  opacity: 0.85 !important;
  color: var(--bg) !important;
}

/* ── Mobile Drawer ── */
.mobile-drawer {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: var(--space-xl) var(--space-lg);
  border-top: 1px solid var(--border-subtle);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.mobile-nav a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 18px;
  font-weight: 500;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--border-subtle);
  transition: color var(--duration-fast) var(--ease-out);
}

.mobile-nav a:hover {
  color: var(--text-primary);
}

.mobile-cta-btn {
  text-align: center;
  background: var(--text-primary);
  color: var(--bg) !important;
  padding: var(--space-md);
  border-radius: var(--radius);
  font-size: 16px !important;
  font-weight: 600;
  margin-top: var(--space-lg);
  border-bottom: none !important;
}

/* slide-down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform var(--duration-base) var(--ease-out),
    opacity var(--duration-base) var(--ease-out);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* ── Hero ── */
.hero-section {
  padding-top: calc(var(--topbar-height) + 40px);
  padding-bottom: 80px;
  text-align: center;
  background-color: transparent;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .hero-section {
    padding-top: calc(var(--topbar-height) + 60px);
    padding-bottom: 100px;
  }
}

.hero-container {
  max-width: 760px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 768px) {
  .hero-container {
    padding: 0 var(--space-lg);
  }
}

.hero-badge {
  display: inline-block;
  font-size: 10px;
  letter-spacing: 0.5px;
  color: #2A2A28;
  border: 1px solid #D6D4CE;
  border-radius: 99px;
  padding: 4px 12px;
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  /* background-color: rgba(255, 255, 255, 0.65); */
  /* backdrop-filter: blur(4px); */
  /* -webkit-backdrop-filter: blur(4px); */
}

@media (min-width: 768px) {
  .hero-badge {
    margin-bottom: var(--space-lg);
  }
}

.hero-title {
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: var(--space-md);
  font-weight: normal;
  color: #000000;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: clamp(42px, 8vw, 72px);
    line-height: 1.05;
    letter-spacing: -1.5px;
  }
}

.italic-accent {
  font-style: italic;
  font-family: 'Instrument Serif', Georgia, serif;
  color: #444340;
}

.hero-subtitle {
  font-size: 13px;
  color: #2E2D2B;
  line-height: 1.7;
  margin-bottom: var(--space-md);
  max-width: 100%;
}

@media (min-width: 768px) {
  .hero-subtitle {
    margin-bottom: var(--space-lg);
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
  }
}

.hero-ctas {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
  align-items: stretch;
}

@media (min-width: 768px) {
  .hero-ctas {
    flex-direction: row;
    justify-content: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-2xl);
    align-items: center;
  }
}

.hero-btn {
  text-decoration: none;
  padding: 12px 20px;
  font-size: 13px;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all var(--duration-fast) var(--ease-out);
  letter-spacing: 0.2px;
  text-align: center;
}

@media (min-width: 768px) {
  .hero-btn {
    padding: 9px 20px;
    font-size: 12px;
    text-align: left;
  }
}

.hero-btn.primary {
  background: var(--text-primary);
  color: var(--bg);
}

.hero-btn.primary:hover {
  opacity: 0.85;
}

.hero-btn.secondary {
  border: 1px solid #C4C2BC;
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.hero-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: #A19F9A;
}

.hero-btn.download-btn {
  background: #1A1A18;
  color: #FFFFFF;
  border: 1px solid #1A1A18;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero-btn.download-btn:hover {
  opacity: 0.85;
}

.platform-downloads {
  margin-bottom: 10px;
  font-size: 10px;
  color: #2E2D2B;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.platform-downloads a {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.platform-downloads a:hover {
  color: var(--accent);
}

/* ── Editor Mockup ── */
.editor-mockup {
  /* Override variables to dark mode colors specifically for the mockup */
  --bg-elevated: #18181B;
  --bg-sunken: #111113;
  --border: #27272A;
  --text-primary: #F4F4F5;
  --text-secondary: #A1A1AA;
  --accent: #FFFFFF;
  --accent-subtle: rgba(255, 255, 255, 0.08);

  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25), 0 2px 10px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background: var(--bg-elevated);
  text-align: left;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .editor-mockup {
    max-width: 580px;
  }
}

.mockup-header {
  display: flex;
  align-items: center;
  background: var(--bg-sunken);
  height: 36px;
  padding: 0 var(--space-sm);
  border-bottom: 1px solid var(--border);
}

.mockup-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot.red {
  background: #FF5F56;
}

.dot.yellow {
  background: #FFBD2E;
}

.dot.green {
  background: #27C93F;
}

.mockup-title {
  flex: 1;
  text-align: center;
  font-size: 10px;
  color: var(--text-secondary);
  margin-right: 36px;
  letter-spacing: 0.3px;
}

.mockup-body {
  padding: var(--space-md);
  min-height: 200px;
  position: relative;
}

@media (min-width: 768px) {
  .mockup-body {
    padding: var(--space-lg);
    min-height: 220px;
  }
}

.simulated-editor {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sim-h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 20px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 1.4em;
}

@media (min-width: 768px) {
  .sim-h1 {
    font-size: 22px;
  }
}

.sim-h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 600;
  margin-top: var(--space-xs);
  display: flex;
  align-items: center;
  gap: 2px;
  min-height: 1.4em;
}

@media (min-width: 768px) {
  .sim-h2 {
    font-size: 17px;
  }
}

.sim-p {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.6;
  min-height: 1.6em;
}

@media (min-width: 768px) {
  .sim-p {
    font-size: 12px;
  }
}

.sim-p.placeholder {
  opacity: 0.4;
}

.tag-hash {
  opacity: 0.35;
  font-family: 'DM Mono', monospace;
  font-size: 0.7em;
}

:deep(.sim-tag) {
  color: var(--accent);
  background-color: var(--accent-subtle);
  padding: 1px 5px;
  border-radius: 3px;
  font-family: 'DM Mono', monospace;
  font-size: 0.9em;
  font-weight: 500;
}

/* Cursor */
.simulated-cursor {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: var(--text-primary);
  margin-left: 1px;
  animation: blink 0.9s infinite;
  vertical-align: middle;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* Simulated Bubble Menu */
.simulated-bubble-menu-wrapper {
  position: absolute;
  left: var(--space-md);
  top: 55px;
  z-index: 10;
}

@media (min-width: 768px) {
  .simulated-bubble-menu-wrapper {
    left: var(--space-lg);
    top: 65px;
  }
}

.simulated-bubble-menu {
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

.sim-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: var(--text-secondary);
  transition: all var(--duration-fast) var(--ease-out);
}

.sim-menu-btn.active {
  background: var(--accent-subtle);
  color: var(--accent);
}

.btn-text {
  font-size: 10px;
  font-weight: 700;
}

.sim-menu-divider {
  width: 1px;
  height: 16px;
  background: var(--border);
  align-self: center;
  margin: 0 4px;
}

/* ── Transition ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Fade in animation ── */
.animate-fade-in {
  animation: fadeIn 0.6s var(--ease-out) 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Warning Modal ── */
.warning-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
}

.warning-modal {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: modalScaleUp 0.25s var(--ease-out);
}

@keyframes modalScaleUp {
  from {
    opacity: 0;
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.warning-modal-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-lg) var(--space-lg) var(--space-sm);
  border-bottom: 1px solid var(--border-subtle);
}

.warning-icon {
  color: #D9730D;
  flex-shrink: 0;
}

.warning-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: var(--text-primary);
}

.warning-modal-body {
  padding: var(--space-lg);
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.warning-modal-body p {
  margin: 0 0 var(--space-md);
}

.platform-instructions {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.platform-instruction-box {
  background: var(--bg-sunken);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
  padding: var(--space-md);
}

.platform-instruction-box strong {
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.platform-instruction-box p {
  margin: 0;
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.warning-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-sunken);
  border-top: 1px solid var(--border-subtle);
}

.btn-cancel {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: var(--radius);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.btn-cancel:hover {
  background: var(--bg);
  color: var(--text-primary);
  border-color: var(--text-secondary);
}

.btn-confirm {
  text-decoration: none;
  background: var(--text-primary);
  color: var(--bg);
  padding: 8px 16px;
  border-radius: var(--radius);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-out);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-confirm:hover {
  opacity: 0.9;
}
</style>
