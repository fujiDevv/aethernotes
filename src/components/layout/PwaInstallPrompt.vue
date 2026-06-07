<template>
  <Transition name="slide-up">
    <div v-if="showPrompt" class="pwa-prompt-container font-ui">
      <!-- Premium gradient accent line -->
      <div class="gradient-accent"></div>

      <div class="prompt-content">
        <!-- Close Button -->
        <button class="close-btn" @click="handleDismiss" aria-label="Dismiss">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>

        <div class="prompt-header">
          <div class="app-icon-wrapper">
            <svg class="app-logo" viewBox="0 0 333 510" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M169.501 0.264499C172.368 1.7765 172.368 1.7765 175.376 3.9525C175.928 4.3495 176.479 4.7465 177.048 5.1555C184.435 10.5545 191.478 16.4055 198.501 22.2645C199.1 22.7635 199.699 23.2615 200.316 23.7755C207.52 29.7815 214.58 35.9325 221.501 42.2645C222.473 43.1435 223.445 44.0225 224.446 44.9285C230.736 50.6455 236.855 56.5165 242.876 62.5145C243.857 63.4885 243.857 63.4885 244.857 64.4815C249.274 68.9125 253.424 73.5215 257.501 78.2645C258.451 79.3475 259.401 80.4295 260.353 81.5105C268.153 90.4535 275.435 99.7325 282.501 109.264C283.267 110.29 283.267 110.29 284.048 111.338C303.4 137.42 317.147 166.227 326.501 197.264C326.901 198.537 326.901 198.538 327.31 199.837C331.76 214.815 333.003 230.045 332.892 245.598C332.876 248.263 332.892 250.927 332.911 253.592C332.931 268.923 331.561 284.231 326.376 298.764C326.076 299.628 325.776 300.493 325.467 301.383C319.813 317.191 312.186 331.57 302.501 345.264C302.082 345.86 301.662 346.456 301.23 347.07C289.864 362.949 275.363 376.926 259.501 388.264C258.945 388.67 258.389 389.077 257.815 389.495C243.751 399.681 227.9 408.134 211.708 414.397C209.493 415.217 209.493 415.217 207.478 416.35C203.897 418.006 200.336 418.035 196.501 417.264C192.918 414.266 191.727 412.32 190.751 407.764C191.587 403.862 192.792 402.125 195.958 399.71C199.706 397.58 203.704 396.269 207.759 394.854C246.528 380.894 278.606 349.579 298.501 314.264C299.055 313.305 299.61 312.346 300.181 311.358C315.676 282.776 316.739 246.493 310.501 215.264C310.356 214.527 310.212 213.792 310.063 213.033C306.91 197.399 301.785 181.481 294.501 167.264C294.342 168.45 294.184 169.636 294.021 170.858C291.881 186.032 288.798 200.133 280.501 213.264C279.989 214.08 279.477 214.897 278.95 215.738C270.259 228.826 258.403 240.112 246.501 250.264C244.209 252.221 241.917 254.18 239.626 256.139C239.02 256.657 238.414 257.176 237.789 257.71C233.378 261.49 229.036 265.339 224.739 269.249C222.629 271.15 220.478 272.99 218.313 274.827C202.638 288.516 190.998 308.149 184.876 327.889C184.577 328.842 184.278 329.795 183.969 330.776C181.496 338.859 179.712 346.898 178.501 355.264C178.328 356.376 178.156 357.489 177.978 358.635C177.234 364.682 177.357 370.753 177.359 376.837C177.356 378.198 177.353 379.559 177.349 380.919C177.341 383.836 177.336 386.752 177.332 389.669C177.326 394.283 177.31 398.898 177.291 403.512C177.285 405.096 177.278 406.679 177.272 408.263C177.269 409.055 177.266 409.848 177.262 410.664C177.22 421.397 177.187 432.131 177.175 442.865C177.167 450.12 177.144 457.374 177.106 464.629C177.086 468.464 177.074 472.299 177.079 476.133C177.083 479.736 177.069 483.339 177.042 486.943C177.031 488.891 177.041 490.837 177.051 492.785C176.936 503.535 176.936 503.535 172.501 508.264C169.316 509.857 165.968 509.655 162.501 509.264C159.265 507.521 158.677 506.792 157.501 503.264C157.405 501.487 157.368 499.706 157.363 497.926C157.358 496.818 157.352 495.71 157.346 494.568C157.345 493.351 157.344 492.134 157.343 490.88C157.335 488.912 157.328 486.945 157.32 484.977C157.32 484.977 157.32 484.977 157.32 484.977ZM169.501 0.264499" fill="currentColor" />
            </svg>
          </div>
          <div class="prompt-text">
            <h4 class="prompt-title">Install Aether Notes</h4>
            <p class="prompt-desc">Run as a distraction-free window with offline access.</p>
          </div>
        </div>

        <!-- Standard install option for Desktop/Android -->
        <div v-if="!isIOS()" class="prompt-actions">
          <button class="action-btn cancel" @click="handleDismiss">Later</button>
          <button class="action-btn install" @click="handleInstall">Install</button>
        </div>

        <!-- Custom iOS share menu option -->
        <div v-else class="ios-instructions">
          <p class="ios-text">
            Tap the share button
            <span class="ios-icon-share">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </span>
            then select <span class="highlight">Add to Home Screen</span>.
          </p>
          <button class="action-btn ios-ok" @click="handleDismiss">Got It</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
const dismissed = ref(false);

const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('crios') && !ua.includes('fxios');
};

const showPrompt = computed(() => {
  if (dismissed.value || !uiStore.showPwaPrompt) return false;

  // Don't show if already in standalone app mode
  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && (window.navigator as any).standalone)
  ) {
    return false;
  }

  // Show if we have deferred prompt OR if we are on iOS Safari
  return !!uiStore.pwaInstallPrompt || (isIOS() && isSafari());
});

function handleDismiss() {
  dismissed.value = true;
  uiStore.dismissPwaPrompt();
}

async function handleInstall() {
  const promptEvent = uiStore.pwaInstallPrompt;
  if (!promptEvent) return;

  // Trigger PWA installation dialog
  promptEvent.prompt();

  try {
    const { outcome } = await promptEvent.userChoice;
    console.log(`PWA install outcome: ${outcome}`);
  } catch (err) {
    console.error('PWA install choice failed:', err);
  }

  // Clear prompt event and hide prompt UI
  uiStore.pwaInstallPrompt = null;
  uiStore.showPwaPrompt = false;
  dismissed.value = true;
}
</script>

<style scoped>
.pwa-prompt-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.gradient-accent {
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--notion-blue));
  width: 100%;
}

.prompt-content {
  position: relative;
  padding: var(--space-md);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-out);
}

.close-btn:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.prompt-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  padding-right: var(--space-md);
}

.app-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: var(--radius);
  background: var(--bg-sunken);
  color: var(--text-primary);
  flex-shrink: 0;
  border: 1px solid var(--border-subtle);
}

.app-logo {
  width: 20px;
  height: 20px;
}

.prompt-text {
  display: flex;
  flex-direction: column;
}

.prompt-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2px 0;
}

.prompt-desc {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

.prompt-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-xs);
}

.action-btn {
  font-size: 11px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  border: none;
  transition: all var(--duration-fast) var(--ease-out);
}

.action-btn.cancel {
  background: transparent;
  color: var(--text-secondary);
}

.action-btn.cancel:hover {
  background: var(--bg-sunken);
  color: var(--text-primary);
}

.action-btn.install {
  background: var(--accent);
  color: var(--bg-elevated);
}

.action-btn.install:hover {
  opacity: 0.9;
}

/* iOS instructions */
.ios-instructions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.ios-text {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.ios-icon-share {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 4px;
  vertical-align: middle;
  margin: 0 2px;
}

.highlight {
  font-weight: 600;
  color: var(--text-primary);
}

.action-btn.ios-ok {
  background: var(--accent);
  color: var(--bg-elevated);
  align-self: flex-end;
}

.action-btn.ios-ok:hover {
  opacity: 0.9;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform var(--duration-base) var(--ease-out),
              opacity var(--duration-base) var(--ease-out);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 1;
}

/* Desktop responsive view */
@media (min-width: 481px) {
  .pwa-prompt-container {
    bottom: 20px;
    right: 20px;
    left: auto;
    width: 320px;
    border-radius: var(--radius-lg);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
