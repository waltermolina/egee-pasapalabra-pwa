import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'Pasapalabra - Ruleta de letras',
        short_name: 'Pasapalabra',
        description: 'Ruleta de letras del Pasapalabra: PWA offline-first.',
        display: 'fullscreen',
        orientation: 'portrait',
        theme_color: '#ff7a00',
        background_color: '#ffffff',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Precache the JS/CSS bundle plus every static asset produced by the build.
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webmanifest}'],
        // The app shell is served from cache when the network request for it fails.
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // HTML documents: always try the network first, fall back to cache offline.
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            // Static assets (JS, CSS, images, fonts, icons): serve from cache first.
            urlPattern: ({ request }) =>
              ['script', 'style', 'image', 'font'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
            },
          },
        ],
      },
    }),
  ],
})
