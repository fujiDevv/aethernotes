import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AppShell from '@/components/layout/AppShell.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/views/DocsPage.vue'),
  },
  {
    path: '/',
    component: AppShell,
    children: [
      {
        path: 'note',
        name: 'note-empty',
        component: () => import('@/components/editor/NoteEditor.vue'),
      },
      {
        path: 'note/:id',
        name: 'note-detail',
        component: () => import('@/components/editor/NoteEditor.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/components/settings/SettingsPanel.vue'),
      },
      {
        path: 'trash',
        name: 'trash',
        component: () => import('@/components/editor/NoteEditor.vue'),
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

function checkIsTauri(): boolean {
  return typeof window !== 'undefined' && (!!(window as any).__TAURI__ || !!(window as any).__TAURI_INTERNALS__);
}

/**
 * Detect if the app is running as an installed PWA in standalone mode.
 * Works on Chrome/Edge (display-mode: standalone) and iOS Safari (navigator.standalone).
 */
function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true)
  );
}

// Public-facing pages that should redirect to the editor when running as PWA or Tauri
const webOnlyRoutes = new Set(['landing', 'docs']);

router.beforeEach((to) => {
  if ((isStandalone() || checkIsTauri()) && to.name && webOnlyRoutes.has(to.name as string)) {
    return { name: 'note-empty' };
  }
});

export default router;
