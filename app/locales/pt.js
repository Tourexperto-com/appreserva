export default {
  common: {
    hello: 'Olá,',
    back: 'Voltar',
    logout: 'Sair',
    close: 'Fechar',
    howToInstall: 'Como baixar o app',
    sending: 'Enviando…',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Digite aqui o seu e-mail',
    invalidLink: 'Link inválido.',
    view: 'Ver {name}',
    download: 'Baixar {name}'
  },
  state: {
    error: 'Não foi possível carregar as informações.',
    empty: 'Não há informações para mostrar.'
  },
  nav: {
    detail: 'Detalhes',
    passengers: 'Passageiros',
    hotels: 'Hotéis',
    documents: 'Documentos',
    contact: 'Contato'
  },
  help: {
    title: 'Precisa de ajuda?',
    text: 'Fale com o seu especialista sempre que precisar'
  },
  auth: {
    howToInstall: 'Como instalar o app',
    tagline: 'A sua próxima viagem, organizada nos mínimos detalhes.'
  },
  login: {
    intro: 'Faça login para ver o seu roteiro, vouchers e contatos a qualquer momento da sua viagem.',
    sent: 'Enviamos um e-mail com um link para você acessar os detalhes da sua viagem.',
    retryIn: 'Se não recebeu o e-mail, você pode tentar novamente em',
    resend: 'Reenviar',
    submit: 'Entrar',
    error: 'Não foi possível enviar o link. Tente novamente.'
  },
  verify: {
    checking: 'Verificando acesso…',
    expired: 'O link expirou ou não é válido.',
    retry: 'Entrar novamente'
  },
  install: {
    title: 'Como baixar o app no seu celular?',
    guides: [
      {
        title: 'No iPhone:',
        steps: [
          'Abra o app de reservas no Safari.',
          'Toque no ícone quadrado com uma seta para cima, na parte de baixo da tela.',
          'Role para baixo e toque em "Adicionar à Tela de Início".',
          'Toque em "Adicionar" no canto superior direito.',
          'Pronto. Agora o ícone do app aparece na sua tela, como qualquer outro app.'
        ]
      },
      {
        title: 'No Android:',
        steps: [
          'Abra o app de reservas no Chrome.',
          'Vai aparecer um aviso embaixo dizendo "Instalar app". Toque nele.',
          'Toque em "Instalar" de novo para confirmar.',
          'Pronto. Procure o ícone do app na sua tela inicial.'
        ]
      }
    ]
  },
  trips: {
    title: 'Minhas viagens',
    activeOne: '1 reserva ativa',
    activeMany: '{n} reservas ativas',
    error: 'Não foi possível carregar as suas viagens.',
    empty: 'Você ainda não tem viagens reservadas.',
    days: '{days} dias',
    daysNights: '{days} dias - {nights} noites',
    pax: '{n} pax'
  },
  reserva: {
    backToTrips: 'Voltar para minhas viagens',
    error: 'Não foi possível carregar a reserva.'
  },
  detail: {
    starts: 'Início',
    ends: 'Término',
    duration: 'Duração',
    days: '{n} dias',
    nights: '{n} noites',
    passengers: 'Passageiros',
    adults: '{n} adultos',
    route: 'Percorre:',
    includes: 'O seu tour inclui:',
    category: 'Categoria:',
    hotels: 'Hotelaria',
    departure: 'Saída',
    // asumo: los slugs de tipo_salida combinan estas palabras; las que no estén quedan como vienen
    departureWords: {
      salida: 'saída',
      grupal: 'em grupo',
      acompanada: 'acompanhada',
      espanol: 'espanhol',
      aereo: 'aéreo',
      economica: 'econômica'
    }
  },
  passengers: {
    intro: 'Passageiros incluídos nesta reserva.',
    introOne: '1 passageiro incluído nesta reserva. Toque nele para ver os dados do documento.',
    introMany: '{n} passageiros incluídos nesta reserva. Toque em um deles para ver os dados do documento.',
    error: 'Não foi possível carregar os passageiros.',
    empty: 'Ainda não há passageiros cadastrados.',
    passport: 'Passaporte',
    birth: 'Nascimento',
    nationality: 'Nacionalidade',
    gender: 'Gênero'
  },
  hotels: {
    intro: 'A sua hospedagem por destino. Você poderá ficar em qualquer um dos nossos hotéis selecionados, já que a definição depende da disponibilidade e da temporada.',
    error: 'Não foi possível carregar os hotéis.',
    empty: 'Ainda não há hotéis definidos.',
    planned: 'Previsto ou similar'
  },
  documents: {
    intro: 'Documentos de viagem prontos para baixar e apresentar no destino.',
    error: 'Não foi possível carregar os documentos.',
    empty: 'Ainda não há documentos disponíveis.'
  },
  contact: {
    emergency: 'Em caso de emergência, entre em contato primeiro com o seu operador.',
    error: 'Não foi possível carregar os contatos.',
    empty: 'Ainda não há contatos disponíveis.',
    messagesOnly: 'Somente mensagens',
    emergencies: 'Emergências e dúvidas',
    whatsappOf: 'WhatsApp de {name}',
    callTo: 'Ligar para {name}'
  },
  datosTex: {
    title: 'Dados da Tour Experto',
    agent: '{name}, o seu agente de viagens:',
    whatsapp: 'WhatsApp somente mensagens:',
    whatsappNumber: '+1 754 267-7980',
    calls: 'Ligações:',
    countries: {
      argentina: 'Argentina',
      chile: 'Chile',
      colombia: 'Colômbia',
      spain: 'Espanha',
      usa: 'Estados Unidos',
      mexico: 'México'
    }
  }
}
