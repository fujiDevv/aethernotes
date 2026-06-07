/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig(({ command }) => {
  const plugins = [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Aether Notes',
        short_name: 'Aether',
        description: 'Minimal markdown notes',
        theme_color: '#FAFAF7',
        background_color: '#FAFAF7',
        display: 'standalone',
        start_url: '/note',
        scope: '/',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webformats',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ];

  if (command === "build") {
    plugins.push({
      name: "force-exit",
      closeBundle() {
        const bun = (globalThis as any).Bun;
        if (bun) {
          bun.exit(0);
        } else {
          process.exit(0);
        }
      },
    });
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      threads: false,
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'INVALID_ANNOTATION') return;
          warn(warning);
        },
      },
    },
  };
});

