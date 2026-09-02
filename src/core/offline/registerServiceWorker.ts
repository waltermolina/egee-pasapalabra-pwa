import { registerSW } from 'virtual:pwa-register';

/**
 * Registers the Workbox-generated service worker so the app can run
 * fully offline once assets have been cached on first load.
 */
export function registerOfflineSupport(): void {
  if (import.meta.env.PROD) {
    registerSW({ immediate: true });
  }
}
