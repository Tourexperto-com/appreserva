# Contacto

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
