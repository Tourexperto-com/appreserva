# Idioma (español / portugués)

Si la oportunidad de Zoho viene con **Segmento = Brasil**, el back guarda
`idioma = 'pt'` en la reserva (si no, `'es'`) y toda la app se ve en portugués.
Es un idioma por cliente, no por pantalla: no hay selector.

## Dónde viven los textos

Todos los strings de UI del cliente salen de `app/locales/es.js` y
`app/locales/pt.js`, con las mismas claves. Ningún componente tiene texto
literal: se usa `t('clave')` de `useLocale()`, con parámetros entre llaves
(`t('trips.activeMany', { n: 3 })`). Si una clave falta en `pt.js`, cae al
español. **Al sumar un texto, agregarlo en los dos archivos.**

Quedan en español a propósito: `/admin`, `/admin/verify` y la franja morada del
"ver como", porque los usa el staff de Tour Experto, no el cliente. También los
datos que llegan del back tal cual (nombres de hoteles, `incluye`, `genero`,
`nacionalidad`, el `estado` de la reserva).

Las fechas usan `es-AR` o `pt-BR` según el idioma (`useFecha.js` lee el mismo
`useState('locale')`), y `<html lang>` se actualiza en `app.vue`.

## De dónde sale el idioma

`useLocale().setLocale()` se llama desde dos lugares:

- `useSession().apply()`, con `idioma` de `/auth/session`. **Hoy el back no lo
  manda** (pedido abajo); cuando lo mande, no hay que tocar front.
- `pages/reservas/[id].vue`, con `reserva.idioma` de `GET /reservas/:id`. Esto
  ya funciona.

El valor queda en la cookie `pwa_idioma` (1 año), así que el login, el verify y
el listado ya salen en portugués desde la segunda visita.

**Hueco actual**: en la primera visita, `/verify` y "Mis viajes" se ven en
español hasta que el cliente abre una reserva. Lo cierra que `/auth/session`
devuelva `idioma` (el de la reserva más reciente, igual que hace
`requestMagicLinkCTR` para elegir la plantilla del mail).

Datos institucionales que cambian con el idioma: el WhatsApp de `DatosTex`
(`+1 754 267-7980` para Brasil, el de `numero_wpp` del back) y los nombres de
los países de los teléfonos. Los teléfonos en sí son los mismos.

## Probar en local

El mock tiene la reserva 1 en `es` y la 2 en `pt`: entrar a `/reservas/2` pasa
la app a portugués y `/reservas/1` la vuelve a español.
