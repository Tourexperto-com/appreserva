# PWA

`@vite-pwa/nuxt` con manifest inline en `nuxt.config.ts` (no hay
`public/manifest.json`; lo genera el módulo en build).

Íconos en `public/`, generados desde el isotipo de `images/logo.svg` (la gota,
sin el texto): `pwa-192x192`, `pwa-512x512`, `pwa-maskable-512x512` (22% de
padding para el recorte circular de Android), `apple-touch-icon.png` (180px) y
`favicon.ico`.

Dos cosas que importan y no son obvias:

- **`navigateFallbackDenylist: [/^\/api\//]`** — sin eso el service worker
  intercepta las llamadas al BFF y devuelve el `index.html` en vez del JSON.
- **`app.head`** con `apple-mobile-web-app-capable` y `apple-touch-icon`: iOS no
  lee el manifest ni para el ícono ni para el modo standalone. Sin eso, "Agregar
  a Inicio" pone un screenshot de la página y abre con la barra de Safari.

`devOptions.enabled: false` → el SW **sólo existe en build**. Para probar la
instalación: `pnpm build && pnpm preview`, no `pnpm dev`.
