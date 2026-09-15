# CLAUDE.md — App Reservas (Tour Experto)

PWA para clientes de Tour Experto: login por magic-link y consulta de reservas
(detalle, pasajeros, hoteles, documentos, contacto).

Repo full-stack compartido con el equipo de back. **`server/` es de ellos** —
no tocar salvo pedido explícito.

## Stack

Nuxt 4 · Vue 3 · Tailwind v4 CSS-first · pnpm · `ssr: false` (SPA).

Tailwind se configura en `app/assets/css/main.css` con `@theme`. **No hay
`tailwind.config.js`** y no debe volver: el proyecto migró de v3 a v4.

## Diseño

Figma: `9io4rbGX9NnlAnrLeJdUzG`, 4 breakpoints (mobile / md / lg / xxl).
Tipografía **Raleway** vía `@nuxt/fonts`. Iconos `material-symbols` vía `@nuxt/icon`.

Tokens en `@theme` — nombres en español porque vienen del Figma:
`magenta` (#D3245C, acción), `morado` (#2E0049, títulos), `gris-texto` (#575757,
body), `gris` (#636363, secundario), `violeta-2` (fondos de ícono),
`violeta-texto` (#6B5B7A, el "Hola," del header), `magenta-switch` (estado activo
de nav), `coral` (#F03A36, sólo el contador del login), `whatsapp`.

`--shadow-card` son **dos** drop shadows apiladas `0 1px 4px` (#0C0C0D al 10% y
al 5%), en ese orden. La usan Help, Card, Fact, Chip, Row y Accordion.

Los íconos salen todos de **`material-symbols`** vía `@nuxt/icon` — es la única
colección instalada. El diseño usa las variantes **outline rounded**; las que no
tienen outline (chevrons, logout, download, install-mobile) van `rounded` a secas.
Ojo: varias capas del Figma están mal nombradas — mirar el render, no el nombre.
El "info" del login figura como `login-rounded` y es `info-outline-rounded`.

Tipografía: **Raleway** para todo, salvo el contador del login que va en **Inter
Medium** (así está en el Figma). El frame mobile del Figma mide **320px**, no 375.

Breakpoint clave: **`lg` = 1080px**, donde la app cambia de arquitectura —
bottom nav + header mobile abajo de 1080, sidebar fijo de 290px arriba. El
valor sale del ancho del artboard de desktop en Figma.

El rail de contenido cambia por breakpoint y se define con **padding, no con
`max-w`**: `md:px-30` (120px, da los 528 exactos del frame de 768) y `lg:px-16`.
Con padding el contenido acompaña el ancho de la ventana entre breakpoints; con
un `max-w` fijo quedaba clavado y descentrado respecto del hero.

## Estructura

```
app/
  layouts/
    default.vue     app shell: sidebar (lg) + header/bottom-nav (mobile)
    auth.vue        login/verify: hero split-screen
  pages/
    index.vue                    listado de viajes
    login.vue  verify.vue  instalar.vue
    reservas/[id].vue            padre: trae la reserva, hero, <NuxtPage>
    reservas/[id]/
      index.vue pasajeros.vue hoteles.vue documentos.vue contacto.vue
  components/
    Avatar Accordion Row State Help Modal   genéricos
    button/   Primary                    magenta; disabled = gris #D9D9D9
    default/  Sidebar Header HeaderBack Nav   app shell
    form/     TextField
    instalar/ Guia                       contenido de /instalar
    reserva/  Hero Fact Chip
    viaje/    Card
```

`ButtonPrimary` cubre link y botón: con `to` renderiza `NuxtLink`, sin `to` un
`<button>` (prop `type` para `submit`). El gris deshabilitado es un **estado**, no
una variante — por eso no hay `ButtonSecondary`.

`Modal.vue` es un `<dialog>` nativo, no una capa propia: el backdrop, el cierre
con Escape y el focus trap los da el navegador. `showModal()`/`close()` se
disparan desde un `watch` sobre `v-model`. Hoy lo usa `/documentos` para abrir el
voucher en un `<iframe>` con el ojito, en vez de mandarlo a otra pestaña.

Las 5 secciones del detalle son **rutas anidadas**, no tabs: cada una tiene URL
propia y hace su fetch al montar. El layout arma los links de nav a partir de
`route.params.id`; si no hay `id`, no renderiza nav.

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

Setup: `cp example.env develop.env` y completar `BACKEND_TOKEN`.

## Mock local

`NUXT_USE_MOCK=true` en `develop.env` corta las llamadas al back y las responde
con fixtures locales. Sirve para laburar sin backend, sin token y sin depender de
que dev esté arriba.

**Dos archivos, los dos gitignoreados:**

```
server/middleware/mock.ts     intercepta /api/pwa/* antes del proxy
server/utils/mock-data.ts     los fixtures + resolveMock()
```

Van por middleware y no dentro del proxy a propósito: `server/api/pwa/[...path].ts`
es del equipo de back y tiene que quedar igual a como ellos lo dejaron. El mock se
mete antes en la cadena de Nitro y nunca toca ese archivo.

**Por qué nunca llega a producción**, tres capas independientes:

1. `import.meta.dev` corta al inicio del middleware — en un build de prod la rama
   no existe aunque alguien setee `NUXT_USE_MOCK=true` en Vercel.
2. Los dos archivos están en `.gitignore`, así que no viajan al repo.
3. `*.env` está gitignoreado, así que el flag tampoco viaja.

**Mantenerlo al día**: cuando cambie un endpoint o un campo del back, actualizar
`resolveMock()` y los fixtures. Si el mock devuelve una forma que el back ya no
usa, la app anda en local y rompe en dev — es el único costo de tener mock.

**Sesión simulada**: `resolveMock()` recibe `hasSession` y devuelve el símbolo
`UNAUTHORIZED` (→ 401) en todo lo que no sea `auth/*`. El middleware setea la
cookie `mock_session` en `auth/verify` y la borra en `auth/logout`. Así el
middleware `auth` y `useAuthStatus` se pueden probar de verdad: sin esa cookie la
app te trata como no logueado. Para ver una pantalla sin sesión, borrá
`mock_session` en DevTools o entrá en incógnito.

## Auth

Magic link: `/login` pide el mail → `/verify` valida el token del link y deja la
cookie de sesión. El cliente nunca ve el token del backend.

Los tres consumidores de sesión pegan a **`GET /auth/session`** (verificar que
exista en el back real — ver `docs/pedido-back-agente.md`):

- `middleware/auth.js` protege las rutas con datos. Redirige a `/login` con **401
  y con 403** — el back devuelve 403 cuando el `BACKEND_TOKEN` del server está
  mal, y mirando sólo el 401 te dejaba entrar a una pantalla vacía.
- `useAuthStatus()` resuelve si hay sesión **sin redirigir**, para pantallas que
  existen en los dos estados. Hoy la usa `/instalar`, que es pública pero cambia
  de header: `DefaultHeader` (avatar + logout) con sesión, `DefaultHeaderBack`
  (flecha a `/login`) sin ella. La decisión la toma una llamada real al back, no
  estado local, así que no se puede falsear desde el cliente.
- `useSession()` trae el nombre para el header y el sidebar.

### Staff: "ver como" un cliente

`/admin` es para que alguien de Tour Experto vea la app exactamente como la ve un
cliente, con sus datos reales. No es un superusuario: el back le arma **la sesión
normal de ese cliente**, así que todas las pantallas funcionan igual y no hay
queries especiales.

- Entrar: `/admin` pide el mail → magic link a `/admin/verify` (un solo uso, vence
  a los 15 min) → cookie `pwa_staff` por 8 h. Sólo pueden los mails de
  `PWA_STAFF_EMAILS` en el back; al resto se le responde igual, pero no se manda
  nada.
- Ver como: se busca por **email** o **número de oportunidad**. El back pisa
  `pwa_token` con una sesión de ese cliente que dura 2 h, marcada con el mail del
  staff, y loguea quién miró a quién. No toca el último login del cliente.
- `/auth/session` devuelve `staff` con valor sólo en un "ver como". Con eso
  `default.vue` muestra la franja morada *"Estás viendo la app como…"*, y el
  logout (el de la franja, el header o el sidebar) vuelve a `/admin` en vez de a
  `/login`.
- Al cambiar de cliente hay que llamar `reset()` de `useSession`: el nombre queda
  cacheado en `useState` y si no, el header muestra el del cliente anterior.

## PWA

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

## Contacto

`/contacto` tiene dos bloques distintos y conviene no confundirlos:

- **Operadores del tour** (`/reservas/{id}/contactos`) — Europamundo, Special Tours,
  hoteles. Vienen del back, uno por fila. Si el contacto trae `whatsapp` sale el
  botón verde; si trae `telefono`, el morado.
- **Datos de Tour Experto** (`reserva/DatosTex.vue`) — el bloque de abajo, que en
  esta pantalla reemplaza al de `<Help />`. Es la agencia, no el operador.

Los teléfonos por país y el WhatsApp de mensajes están **hardcodeados** en
`DatosTex.vue`: son datos institucionales fijos, no de la reserva. Si cambian, se
tocan ahí.

El **agente de viajes** sí es por reserva y llega del back como
**`reserva.vendedor`** (un string con el nombre). `contacto.vue` lo adapta a la
forma `{ nombre }` que espera `DatosTex`; si no viene, esa línea no se renderiza
y el resto del bloque funciona igual. **El mail del agente no llega** — el
componente lo soporta (`agente.email`) pero hoy queda siempre vacío.

## Estado

**Responsive cerrado** contra el Figma en los cuatro breakpoints (mobile, md, lg,
xxl): login, verify, instalar, listado de viajes y las 5 secciones del detalle,
más los headers, el sidebar, el bottom nav y los componentes compartidos.

Tres cosas que el diseño resuelve distinto según el ancho y no se deducen del
código:

- **`/instalar` no existe en desktop.** Instalar la PWA es algo de celular, así
  que de `lg` para arriba no hay ningún acceso a esa ruta: el botón de info del
  login y el del header mobile son `lg:hidden`, el del hero del detalle es
  `md:hidden` y el sidebar nunca la ofreció. La ruta sigue viva para quien tenga
  el link, pero no está diseñada para ese ancho.
- **El hero del detalle reordena en md.** En mobile el pill de estado va abajo
  junto al título y arriba a la derecha están info y logout; de `md` para arriba
  el pill sube a la derecha y esos dos botones desaparecen. Por eso `StatusPill`
  se renderiza dos veces, cada una visible en su breakpoint.
- **Entre 768 y 1079 el detalle se queda sin logout**, porque los botones del
  hero ya se ocultaron y el sidebar todavía no aparece. Es consecuencia del punto
  anterior; si molesta, la salida es adelantar el sidebar o sostener los botones
  hasta `lg`.

Los íconos de `@nuxt/icon` necesitan `size-N!` para escalar: el componente
escribe `width`/`height` inline en el SVG y un estilo inline le gana a cualquier
clase sin `!`. El atributo `size="24"` funciona pero es un valor fijo, así que no
sirve cuando el ícono tiene que cambiar por breakpoint.

En Tailwind v4 los `<button>` quedan con `cursor: default` — el preflight ya no
los pone en `pointer` como en v3. Cada botón necesita `cursor-pointer` explícito;
hoy lo tiene `Accordion` y falta en `ButtonPrimary`, `ButtonIconAction` y el
logout del sidebar.

## Pendiente

- **Mail del agente**: el back manda `reserva.vendedor` (sólo el nombre). El mail
  sigue sin llegar — pedido en `docs/pedido-back-agente.md`. No es bloqueante.
  `contacto.vue` ya acepta las dos formas (`vendedor` + `vendedor_email`, o un
  objeto `agente`), así que cuando back lo mande no hay que tocar front.
- **Categoría hotelera**: no llega del back. `index.vue` la busca como
  `categoria_hoteleria`, `categoria_hotelera` o `categoria`, y si no viene, la
  tarjeta "Hotelería" no se renderiza. Pedido en el mismo doc.
- **`cursor-pointer`**: falta en `ButtonPrimary`, `ButtonIconAction` y el logout
  del sidebar (ver la nota de Tailwind v4 en Estado).
- **Campos sin confirmar contra el back**: `descripcion`/`description`,
  `incluye`/`includes`, `categoria_hoteleria`, `titular`/`nombre_titular`.
  Las páginas los leen con fallback; verificar y dejar uno solo.
- **`/auth/session`**: los tres consumidores de sesión ya lo usan, pero está
  verificado sólo contra el mock. Confirmar que existe en el back real y que
  devuelve 401 sin sesión (pedido en `docs/pedido-back-agente.md`).
- **Ícono de aéreo**: los demás de "Tu tour incluye" son SVG oficiales bajados a
  `public/images/incluye/`, pero el de aéreo no existe en el bucket y quedó con
  `material-symbols`. Pedirlo a diseño y dejarlo caer en esa carpeta.
