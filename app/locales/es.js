export default {
  common: {
    hello: 'Hola,',
    back: 'Volver',
    logout: 'Cerrar sesión',
    close: 'Cerrar',
    howToInstall: 'Cómo descargar la app',
    sending: 'Enviando…',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'Ingresá aquí tu email',
    invalidLink: 'Enlace inválido.',
    view: 'Ver {name}',
    download: 'Descargar {name}'
  },
  state: {
    error: 'No se pudo cargar la información.',
    empty: 'No hay información para mostrar.'
  },
  nav: {
    detail: 'Detalle',
    passengers: 'Pasajeros',
    hotels: 'Hoteles',
    documents: 'Documentos',
    contact: 'Contacto'
  },
  help: {
    title: '¿Necesitás ayuda?',
    text: 'Hablá con tu experto cuando lo necesites'
  },
  auth: {
    howToInstall: 'Cómo instalar la app',
    tagline: 'Tu próximo viaje, organizado al detalle.'
  },
  login: {
    intro: 'Iniciá sesión para ver tu itinerario, vouchers y contactos en cualquier momento de tu viaje.',
    sent: 'Te enviamos un correo electrónico con un link para que puedas acceder al detalle de tu viaje.',
    retryIn: 'Si no recibiste el correo podés volverlo a intentar en',
    resend: 'Volver a enviar',
    submit: 'Ingresar',
    error: 'No se pudo enviar el enlace. Probá de nuevo.'
  },
  verify: {
    checking: 'Verificando acceso…',
    expired: 'El enlace expiró o no es válido.',
    retry: 'Volver a ingresar'
  },
  install: {
    title: '¿Cómo descargar la app en tu celular?',
    guides: [
      {
        title: 'Para iPhone:',
        steps: [
          'Abrí la app de reservas desde Safari.',
          'Tocá el ícono cuadrado con una flecha hacia arriba, abajo de la pantalla.',
          'Deslizá hacia abajo y tocá "Agregar a Inicio".',
          'Tocá "Agregar" arriba a la derecha.',
          'Listo. Ahora vas a ver el ícono de la app en tu pantalla, como cualquier otra app.'
        ]
      },
      {
        title: 'Para Android:',
        steps: [
          'Abrí la app de reservas desde Chrome.',
          'Va a aparecer un cartel abajo que dice "Instalar app". Tocalo.',
          'Tocá "Instalar" otra vez para confirmar.',
          'Listo. Buscá el ícono de la app en tu pantalla principal.'
        ]
      }
    ]
  },
  trips: {
    title: 'Mis viajes',
    activeOne: '1 reserva activa',
    activeMany: '{n} reservas activas',
    error: 'No se pudieron cargar tus viajes.',
    empty: 'Todavía no tenés viajes reservados.',
    days: '{days} días',
    daysNights: '{days} días - {nights} noches',
    pax: '{n} pax'
  },
  reserva: {
    backToTrips: 'Volver a mis viajes',
    error: 'No se pudo cargar la reserva.'
  },
  detail: {
    starts: 'Inicia',
    ends: 'Finaliza',
    duration: 'Duración',
    days: '{n} días',
    nights: '{n} noches',
    passengers: 'Pasajeros',
    adults: '{n} adultos',
    route: 'Recorre:',
    includes: 'Tu tour incluye:',
    category: 'Categoría:',
    hotels: 'Hotelería',
    departure: 'Salida',
    departureWords: {
      acompanada: 'acompañada',
      espanol: 'español',
      aereo: 'aéreo',
      economica: 'económica'
    }
  },
  passengers: {
    intro: 'Pasajeros incluidos en esta reserva.',
    introOne: '1 pasajero incluido en esta reserva. Tocá uno para ver el detalle del documento.',
    introMany: '{n} pasajeros incluidos en esta reserva. Tocá uno para ver el detalle del documento.',
    error: 'No se pudieron cargar los pasajeros.',
    empty: 'Todavía no hay pasajeros cargados.',
    passport: 'Pasaporte',
    birth: 'Nacimiento',
    nationality: 'Nacionalidad',
    gender: 'Género'
  },
  hotels: {
    intro: 'Tu alojamiento por destino. Podrás ser alojado en cualquiera de nuestros hoteles seleccionados ya que la asignación depende de disponibilidad y estacionalidad.',
    error: 'No se pudieron cargar los hoteles.',
    empty: 'Todavía no hay hoteles asignados.',
    planned: 'Previsto o similar'
  },
  documents: {
    intro: 'Documentos de viaje listos para descargar y mostrar en destino.',
    error: 'No se pudieron cargar los documentos.',
    empty: 'Todavía no hay documentos disponibles.'
  },
  contact: {
    emergency: 'En caso de emergencia, contactate primero con tu operador.',
    error: 'No se pudieron cargar los contactos.',
    empty: 'Todavía no hay contactos disponibles.',
    messagesOnly: 'Solamente mensajes',
    emergencies: 'Emergencias y consultas',
    whatsappOf: 'WhatsApp de {name}',
    callTo: 'Llamar a {name}'
  },
  datosTex: {
    title: 'Datos de Tour Experto',
    agent: '{name}, tu agente de viajes:',
    whatsapp: 'WhatsApp solo mensajes:',
    whatsappNumber: '+1 302 252-1235',
    calls: 'Llamadas:',
    countries: {
      argentina: 'Argentina',
      chile: 'Chile',
      colombia: 'Colombia',
      spain: 'España',
      usa: 'Estados Unidos',
      mexico: 'México'
    }
  }
}
