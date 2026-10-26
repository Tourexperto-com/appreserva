# Diseño y responsive

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
