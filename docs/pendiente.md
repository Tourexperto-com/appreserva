# Pendiente

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
- **`idioma` en `/auth/session`**: sin eso, un cliente de Brasil ve `/verify`
  y "Mis viajes" en español hasta abrir una reserva (ver `docs/idioma.md`).
- **Ícono de aéreo**: los demás de "Tu tour incluye" son SVG oficiales bajados a
  `public/images/incluye/`, pero el de aéreo no existe en el bucket y quedó con
  `material-symbols`. Pedirlo a diseño y dejarlo caer en esa carpeta.
