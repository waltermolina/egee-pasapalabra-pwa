# Pasapalabra – Ruleta de Letras (PWA)

PWA offline-first, instalable y a pantalla completa que muestra una ruleta
de letras del abecedario (A–Z + Ñ) con animación de sorteo, resultado y
reinicio, tal como se usa en el segmento "Pasapalabra".

## Stack

- React + Vite + TypeScript
- SCSS modular
- Workbox (vía `vite-plugin-pwa`) para el Service Worker
- Vitest + Testing Library para pruebas
- Sin backend, sin Firestore, sin APIs externas

## Estructura del proyecto

```
src/
  app/              Layout raíz y estilos globales de la aplicación
  features/roulette Lógica y UI de la ruleta (hook + componente)
  shared/ui         Componentes reutilizables (Button, LetterDisplay)
  core/offline      Registro del Service Worker offline
public/
  icons/            Íconos PNG usados por el manifest
```

## Flujo de la app

1. **Espera**: pantalla en blanco con el bloque naranja vacío y el botón
   "GIRAR RULETA".
2. **Giro**: al presionar el botón, el bloque muestra letras del abecedario
   cambiando cada 50ms durante 2–3 segundos.
3. **Resultado**: la animación se detiene sola sobre una letra aleatoria,
   mostrada en negro, gigante y centrada sobre fondo naranja.
4. **Reinicio**: la letra queda fija hasta volver a presionar el botón.

## Scripts

```bash
npm install       # instala dependencias
npm run dev       # entorno de desarrollo
npm run build     # build de producción (genera el Service Worker con Workbox)
npm run preview   # sirve el build de producción
npm run test      # ejecuta las pruebas con Vitest
npm run lint      # linting con oxlint
```

## Modo offline

El build de producción genera un Service Worker (Workbox) que:

- Precachea el bundle JS/CSS, el manifest y los íconos.
- Sirve los assets estáticos (JS, CSS, imágenes, fuentes) con estrategia
  **Cache First**.
- Sirve el documento HTML con estrategia **Network First** (intenta red y
  cae a caché si no hay conexión), con un *fallback* de navegación al
  `index.html` cacheado para que la app funcione 100% sin conexión.

## Manifest

`manifest.webmanifest` se genera automáticamente por `vite-plugin-pwa` con
`display: fullscreen`, `orientation: portrait` e íconos PNG. Se incluyen
además meta tags para el modo fullscreen en iOS (`apple-mobile-web-app-*`).
