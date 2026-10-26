# CLAUDE.md — App Reservas (Tour Experto)

PWA para clientes de Tour Experto: login por magic-link y consulta de reservas
(detalle, pasajeros, hoteles, documentos, contacto).

Repo full-stack compartido con el equipo de back. **`server/` es de ellos** —
no tocar salvo pedido explícito.

## Stack

Nuxt 4 · Vue 3 · Tailwind v4 CSS-first · pnpm · `ssr: false` (SPA).

Tailwind se configura en `app/assets/css/main.css` con `@theme`. **No hay
`tailwind.config.js`** y no debe volver: el proyecto migró de v3 a v4.

## Comandos

- Setup: `cp example.env develop.env` y completar `BACKEND_TOKEN`.
- `pnpm dev` — dev server con `develop.env`.
- `pnpm build && pnpm preview` — única forma de probar el service worker (no existe en `dev`).

## Convenciones

- `.vue`: `<template>` → `<script setup>` → `<style scoped>`. Nunca `lang="ts"`.
- Componentes: nombre corto, agrupados por carpeta de dominio. Sin prefijos
  `Base`/`App` — la carpeta ya da el namespace (`components/reserva/Hero.vue` →
  `<ReservaHero>`).
- Código en inglés (props, funciones, variables). **Strings de UI en español
  rioplatense** (voseo: "Tocá", "Iniciá", "tenés").
- `State.vue` centraliza pending/error/empty. No repetir esos tres `v-if` en las
  páginas.

## Datos

Todo pasa por el proxy BFF `server/api/pwa/[...path].ts`, que agrega el header
`token` con `BACKEND_TOKEN` y reenvía cookies. El cliente nunca ve el token.

Composables en `app/composables/useReservas.js`, uno por endpoint. Todos cargan
al montar (`immediate` por defecto) porque cada uno vive en su propia ruta.

## Mock local

`NUXT_USE_MOCK=true` en `develop.env` responde `/api/pwa/*` con fixtures locales
(sin back ni token) desde `server/middleware/mock.ts` y `server/utils/mock-data.ts`,
ambos gitignoreados y sólo en dev. Al cambiar un endpoint o campo del back,
actualizar `resolveMock()` y los fixtures.

## Diseño

Figma `9io4rbGX9NnlAnrLeJdUzG` (mobile / md / lg / xxl). Tokens en `@theme` con
nombres en español (`magenta`, `morado`, `gris-texto`…). **`lg` = 1080px**: abajo
bottom nav + header mobile, arriba sidebar fijo de 290px. El rail de contenido se
define con padding, no con `max-w`.

## Docs

Leer según la tarea (el detalle salió de este archivo para no cargarlo siempre):

- `docs/diseno.md` — antes de tocar estilos, componentes visuales o responsive:
  tokens, sombras, íconos, tipografía, breakpoints y rails, estado del responsive,
  gotchas de Tailwind v4 y `@nuxt/icon`.
- `docs/estructura.md` — para ubicar archivos: árbol de `app/`, `ButtonPrimary`,
  `Modal`, rutas anidadas del detalle.
- `docs/auth.md` — al tocar login/verify, `middleware/auth.js`, `useSession`,
  `useAuthStatus`, `/instalar` o `/admin` (staff "ver como").
- `docs/mock.md` — al usar o mantener el mock: por qué no llega a prod, sesión
  simulada (`mock_session`).
- `docs/pwa.md` — al tocar manifest, service worker, íconos o la instalación (iOS).
- `docs/contacto.md` — al tocar `/contacto`, `DatosTex` o el agente de viajes.
- `docs/pendiente.md` — campos sin confirmar con el back, mail del agente,
  `cursor-pointer`: leer antes de tocar esos campos o `/auth/session`.
- `docs/pedido-back-agente.md` — el pedido al equipo de back (mail del agente,
  categoría hotelera, `/auth/session`).
