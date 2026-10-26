# Estructura

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
