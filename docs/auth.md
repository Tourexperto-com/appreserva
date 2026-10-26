# Auth

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

## Staff: "ver como" un cliente

`/admin` es para que alguien de Tour Experto vea la app exactamente como la ve un
cliente, con sus datos reales. No es un superusuario: el back le arma **la sesión
normal de ese cliente**, así que todas las pantallas funcionan igual y no hay
queries especiales.

- Entrar: `/admin` pide el mail → magic link a `/admin/verify`, que **canjea el
  link recién al tocar "Entrar al panel"** (un solo uso, vence a los 15 min; el
  botón evita que un escáner de mail lo gaste) → cookie `pwa_staff` por 8 h.
  Sólo pueden los mails de `PWA_STAFF_EMAILS` en el back; al resto se le
  responde igual, pero no se manda nada.
- La sesión de staff **no es un JWT**: es un token al azar guardado hasheado en
  la DB, así que no se puede forjar con el secreto y "Cerrar sesión de staff"
  (en `/admin`) la invalida en el back y borra también la cookie del "ver como".
- Ver como: `/admin` lista los clientes que tienen reservas (`GET /staff/clientes`,
  hasta 50, primero los que viajan más pronto) con un buscador por nombre, email,
  número de oportunidad o programa; el ojito de cada fila abre la app como ese
  cliente mandando su id. El back pisa
  `pwa_token` con una sesión de ese cliente marcada con el mail del staff, que
  dura 2 h (o menos, si la sesión de staff vence antes), y loguea quién miró a
  quién. No toca el último login del cliente. Si el staff usa el mismo
  navegador para su propia cuenta de cliente, esa sesión se pierde.
- `/auth/session` devuelve `staff` con valor sólo en un "ver como". Con eso
  `default.vue` muestra la franja morada *"Estás viendo la app como…"* (nombre y
  mail del cliente). El logout de la franja, el header o el sidebar corta sólo
  el "ver como" y vuelve a `/admin`.
- `middleware/auth.js` vuelca `/auth/session` en `useSession` en cada navegación
  (si otra pestaña cambió de cliente, la franja se corrige) y, si vence un "ver
  como", manda a `/admin` en vez de a `/login`. Al abrir otro cliente desde
  `/admin` se llama `reset()` para no mostrar el nombre del anterior.
