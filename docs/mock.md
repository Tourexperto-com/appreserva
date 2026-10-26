# Mock local

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
