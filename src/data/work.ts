// What I have built. Facts come from Nico's own notes; every text exists in Spanish and English.
// SW Demoscopia work is described without project names, links or screenshots.

export type Lang = 'es' | 'en';
export type World = 'propio' | 'ya' | 'sw';
export type Status = 'live' | 'dev' | 'test' | 'off';

interface Copy {
  title?: string; // heading when there is no public product name
  detail: string[];
  hook?: [string, string]; // big figure + line for the cards without a screenshot
}

export interface Job {
  id: string;
  name?: string;
  world: World;
  status: Status;
  stack: string[];
  link?: { href: string; label: string };
  shot?: string;
  es: Copy;
  en: Copy;
}

export const WORLD_LABEL: Record<Lang, Record<World, string>> = {
  es: { propio: 'Propio', ya: 'YaSolutions', sw: 'SW Demoscopia' },
  en: { propio: 'Personal', ya: 'YaSolutions', sw: 'SW Demoscopia' },
};

export const STATUS_LABEL: Record<Lang, Record<Status, string>> = {
  es: { live: 'En marcha', dev: 'En desarrollo', test: 'En pruebas', off: 'Apagado' },
  en: { live: 'Live', dev: 'In development', test: 'Testing', off: 'Switched off' },
};

export const JOBS: Job[] = [
  {
    id: 'ponme',
    name: 'Ponme',
    world: 'propio',
    status: 'live',
    stack: ['FastAPI', 'React 19', 'PostgreSQL', 'Celery', 'Redis', 'Gemini', 'U2Net', 'Stripe', 'MCP'],
    link: { href: 'https://ponme.es', label: 'ponme.es' },
    shot: '/shots/ponme.webp',
    es: {
      detail: [
        'Fotografías tu ropa y te dice qué ponerte según tu plan y el tiempo que va a hacer, solo con prendas que tienes.',
        'Visión en tres colas: quita el fondo con U2Net en mi propio servidor y Gemini clasifica color, estilo, temporada y formalidad.',
        'Planifica la semana, prepara la maleta de un viaje día a día y comparte looks en grupos.',
        'Conector MCP en producción: Claude y ChatGPT pueden leer tu armario y proponerte looks.',
        'Suscripción y packs con Stripe, entorno de staging propio y copia de la base de datos antes de cada despliegue.',
      ],
    },
    en: {
      detail: [
        'Take photos of your clothes and it tells you what to wear for your plans and the weather, using only what you own.',
        'Vision pipeline on three queues: U2Net removes the background on my own server and Gemini tags colour, style, season and formality.',
        'Plans your week, packs a trip day by day and lets you share outfits in groups.',
        'MCP connector in production: Claude and ChatGPT can read your wardrobe and suggest outfits.',
        'Subscriptions and packs with Stripe, its own staging environment and a database backup before every deploy.',
      ],
    },
  },
  {
    id: 'orbe',
    name: 'Orbe',
    world: 'propio',
    status: 'live',
    stack: ['React', 'TypeScript', 'Express', 'Gemini', 'Yahoo Finance'],
    shot: '/shots/orbe.webp',
    es: {
      detail: [
        'Panel que construí para entender mi propia cartera: cotizaciones, noticias, calendario e indicadores en un solo sitio.',
        'Gemini lee los datos de la cartera y hace el análisis cualitativo: sesgos, riesgo y un resumen de lo importante.',
        'Cada semana me llega un briefing por email, sin tener que mirar el mercado todo el día.',
        'De un solo usuario, yo, por diseño. La captura usa datos de demostración.',
      ],
    },
    en: {
      detail: [
        'A dashboard I built to understand my own portfolio: quotes, news, calendar and indicators in one place.',
        'Gemini reads the portfolio data and writes the qualitative analysis: biases, risk and what actually matters.',
        'A weekly briefing lands in my inbox, so I do not have to watch the market all day.',
        'Single user, me, by design. The screenshot uses demo data.',
      ],
    },
  },
  {
    id: 'dedica',
    name: 'Dedica',
    world: 'propio',
    status: 'live',
    stack: ['FastAPI', 'MySQL', 'React', 'MCP', 'OAuth 2.0'],
    shot: '/shots/dedica.webp',
    es: {
      detail: [
        'Registra horas y gastos por proyecto y calcula si un proyecto sale rentable. También como app móvil.',
        'Toda su API está expuesta como servidor MCP, con 16 herramientas: se puede fichar o apuntar un gasto desde Claude sin abrir la app.',
        'Servidor de autorización OAuth 2.0 propio para autenticar ese acceso por HTTP.',
      ],
    },
    en: {
      detail: [
        'Tracks hours and expenses per project and tells you whether a project is profitable. Also as a mobile app.',
        'Its whole API is exposed as an MCP server with 16 tools: you can clock in or log an expense from Claude without opening the app.',
        'Its own OAuth 2.0 authorization server to authenticate that access over HTTP.',
      ],
    },
  },
  {
    id: 'micartaya',
    name: 'MiCartaYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'React', 'MySQL', 'Redis', 'WebSockets', 'Dojo', 'TPV DST'],
    link: { href: 'https://micartaya.es', label: 'micartaya.es' },
    shot: '/shots/micartaya.webp',
    es: {
      detail: [
        'El cliente escanea el QR, pide desde la mesa y paga sin esperar al camarero.',
        'Incluye un camarero con IA que recomienda platos según lo que le pides.',
        'Los pedidos llegan a cocina en tiempo real por WebSockets y salen por la impresora de tickets.',
        'Cobro con datáfonos Dojo: un pedido solo cuenta como pagado cuando el backend lo confirma.',
        'Multi-restaurante por dominio y conectada con el TPV DST. La usan 14 restaurantes.',
      ],
    },
    en: {
      detail: [
        'Guests scan the QR code, order from the table and pay without waiting for a waiter.',
        'Includes an AI waiter that recommends dishes based on what you ask for.',
        'Orders reach the kitchen in real time over WebSockets and come out of the ticket printer.',
        'Card payments with Dojo terminals: an order only counts as paid once the backend confirms it.',
        'Multi-restaurant by domain and connected to the DST POS. Used by 14 restaurants.',
      ],
    },
  },
  {
    id: 'presupuestoya',
    name: 'PresupuestoYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'SQLAlchemy', 'React 18', 'TypeScript', 'TanStack Query', 'MySQL', 'Docker'],
    link: { href: 'https://presupuestoya.yasolutions.es', label: 'presupuestoya.yasolutions.es' },
    shot: '/shots/presupuestoya.webp',
    es: {
      detail: [
        'El presupuesto llega como un enlace: el cliente ve fotos, elige opciones y el total se recalcula al momento.',
        'Lo firma desde el móvil con FirmaYa: código por correo, registro de auditoría y verificación pública por hash SHA-256.',
        'Los importes se guardan como texto y se calculan solo en el backend, para que no haya errores de redondeo.',
      ],
    },
    en: {
      detail: [
        'The quote arrives as a link: the client sees photos, picks options and the total updates instantly.',
        'They sign it on their phone with FirmaYa: email code, audit trail and public verification via SHA-256 hash.',
        'Amounts are stored as strings and computed only on the backend, so there are no rounding errors.',
      ],
    },
  },
  {
    id: 'orderya',
    name: 'OrderYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'MySQL', 'Tailwind', 'JavaScript'],
    link: { href: 'https://orderya.es', label: 'orderya.es' },
    shot: '/shots/orderya.webp',
    es: {
      detail: [
        'Pedidos internos entre tiendas, franquicias y obrador en una sola web.',
        'Cada tienda pide lo que necesita y el obrador ve en un panel qué tiene que preparar y para quién.',
        'Sustituye los pedidos por WhatsApp y las hojas de cálculo; sus métricas de negocio las sigo desde mi intranet.',
      ],
    },
    en: {
      detail: [
        'Internal orders between shops, franchises and the central bakery in a single web app.',
        'Each shop orders what it needs and the bakery sees on one panel what to prepare and for whom.',
        'Replaces orders over WhatsApp and spreadsheets; I follow its business metrics from my intranet.',
      ],
    },
  },
  {
    id: 'beatlist',
    name: 'BeatList',
    world: 'propio',
    status: 'live',
    stack: ['Flask', 'Spotify Web API', 'OAuth 2.0', 'Celery', 'Redis'],
    link: { href: 'https://beatlist.es', label: 'beatlist.es' },
    shot: '/shots/beatlist.webp',
    es: {
      detail: [
        'Analiza tempo, energía y tono de tus playlists de Spotify y las ordena para que una canción enlace con la siguiente.',
        'Spotify revisó y aprobó la app para uso público de su API.',
        'Solo recalcula lo que ha cambiado: la caché se invalida con el snapshot_id de cada playlist.',
        'Mi primer sistema en producción: OAuth 2.0, colas con Celery y Redis.',
      ],
    },
    en: {
      detail: [
        'Analyses tempo, energy and key of your Spotify playlists and orders them so each song flows into the next.',
        'Spotify reviewed and approved the app for public use of its API.',
        'Only recomputes what changed: the cache is invalidated by each playlist’s snapshot_id.',
        'My first system in production: OAuth 2.0, queues with Celery and Redis.',
      ],
    },
  },
  {
    id: 'pauta',
    name: 'Pauta',
    world: 'propio',
    status: 'live',
    stack: ['Remotion', 'TypeScript', 'Node.js'],
    es: { detail: ['Motor de vídeos y carruseles para redes.'] },
    en: { detail: ['Video and carousel engine for social media.'] },
  },
  {
    id: 'mirador',
    name: 'Mirador',
    world: 'propio',
    status: 'live',
    stack: ['FastAPI', 'React', 'MySQL', 'Docker'],
    es: {
      detail: ['Estado de cada proyecto, roadmap, runbooks, vencimientos y recursos del servidor en un solo panel.'],
      hook: ['32', 'proyectos vigilados desde mi propia intranet'],
    },
    en: {
      detail: ['Status of every project, roadmap, runbooks, renewals and server resources in one panel.'],
      hook: ['32', 'projects monitored from my own intranet'],
    },
  },
  {
    id: 'servidor',
    world: 'propio',
    status: 'live',
    stack: ['Docker', 'Nginx', 'MySQL', 'Redis', 'Cloudflare'],
    es: {
      title: 'Servidores',
      detail: ['Mis productos y los de YaSolutions corren en un VPS propio, cada uno en su contenedor, con copia diaria fuera.'],
      hook: ['11', 'servidores en los que despliego y opero'],
    },
    en: {
      title: 'Servers',
      detail: ['My products and YaSolutions’ run on my own VPS, each in its own container, with a daily off-site backup.'],
      hook: ['11', 'servers I deploy to and operate'],
    },
  },
  {
    id: 'tuparte',
    name: 'TuParte',
    world: 'propio',
    status: 'live',
    stack: ['Python', 'Streamlit', 'pandas', 'Altair'],
    es: {
      detail: ['Reparte cada ingreso entre liquidez, metas, gastos e inversión según la situación real, y compara el plan base con el adaptativo.'],
      hook: ['0', 'IA generativa: el reparto lo deciden reglas que puedo explicar'],
    },
    en: {
      detail: ['Splits each income between cash, goals, expenses and investing based on the real situation, and compares the base plan with the adaptive one.'],
      hook: ['0', 'generative AI: the split comes from rules I can explain'],
    },
  },
  {
    id: 'tpv',
    name: 'TPV',
    world: 'ya',
    status: 'dev',
    stack: ['Kotlin', 'SQLite', 'React', 'Android', 'PostgreSQL'],
    es: {
      detail: ['Un Hub local en Kotlin manda en pedidos, caja, pagos y stock; TPV en Windows y comanderas Android.'],
      hook: ['3', 'apps que siguen cobrando aunque se caiga internet'],
    },
    en: {
      detail: ['A local Kotlin hub owns orders, till, payments and stock; POS on Windows and Android handhelds.'],
      hook: ['3', 'apps that keep taking payments when the internet drops'],
    },
  },
  {
    id: 'yatelemetry',
    name: 'YaTelemetry',
    world: 'ya',
    status: 'live',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    es: {
      detail: ['Eventos, auditoría y sondas que miran el contenido real de cada web: que responda 200 no significa que funcione.'],
      hook: ['3.600', 'eventos definidos para 11 apps'],
    },
    en: {
      detail: ['Events, audit log and probes that check each site’s real content: a 200 response does not mean it works.'],
      hook: ['3,600', 'events defined across 11 apps'],
    },
  },
  {
    id: 'firmaya',
    name: 'FirmaYa',
    world: 'ya',
    status: 'off',
    stack: ['FastAPI', 'React', 'MySQL'],
    es: {
      detail: ['Sobres con PDF, firmantes, código por correo, auditoría y evidencias.'],
      hook: ['SHA-256', 'para comprobar cada documento firmado'],
    },
    en: {
      detail: ['Envelopes with PDFs, signers, email codes, audit trail and evidence.'],
      hook: ['SHA-256', 'to verify every signed document'],
    },
  },
  {
    id: 'tratoya',
    name: 'TratoYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'MySQL', 'Celery', 'Redis'],
    es: {
      detail: ['CRM para equipos comerciales, conectado con PresupuestoYa.'],
      hook: ['CRM', 'cada oportunidad con su siguiente paso apuntado'],
    },
    en: {
      detail: ['CRM for sales teams, connected to PresupuestoYa.'],
      hook: ['CRM', 'every deal with its next step written down'],
    },
  },
  {
    id: 'intranet',
    name: 'Intranet de Cybersur',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'Vite', 'PostgreSQL', 'Celery'],
    es: {
      detail: ['Clientes sincronizados con el ERP y semáforo de deuda conectado al sistema de cobros.'],
      hook: ['ERP', 'la intranet lee los clientes del programa de gestión'],
    },
    en: {
      detail: ['Customers synced from the ERP and a debt traffic light linked to the collections system.'],
      hook: ['ERP', 'the intranet reads customers from the management software'],
    },
  },
  {
    id: 'sw-clips',
    world: 'sw',
    status: 'live',
    stack: ['Python', 'Whisper', 'GPU'],
    es: {
      title: 'Clips de vídeo automáticos',
      detail: ['Corta vídeos en clips con transcripción y reconocimiento facial, con la IA en una GPU propia.'],
      hook: ['GPU', 'propia para cortar vídeos con transcripción y caras'],
    },
    en: {
      title: 'Automatic video clips',
      detail: ['Cuts videos into clips with transcription and face recognition, with the models on an in-house GPU.'],
      hook: ['GPU', 'in-house, cutting videos with transcripts and faces'],
    },
  },
  {
    id: 'sw-encuestas',
    world: 'sw',
    status: 'live',
    stack: ['FastAPI', 'PostgreSQL', 'Next.js'],
    es: {
      title: 'Encuestas electorales',
      detail: ['Explorador de encuestas por olas con un chat que redacta conclusiones y genera gráficos.'],
      hook: ['Chat', 'que responde preguntas sobre encuestas electorales'],
    },
    en: {
      title: 'Election polls',
      detail: ['Explorer for polling waves with a chat that writes findings and draws charts.'],
      hook: ['Chat', 'that answers questions about election polls'],
    },
  },
  {
    id: 'sw-audiencias',
    world: 'sw',
    status: 'live',
    stack: ['Mapas', 'Scraping'],
    es: {
      title: 'Mapa de audiencias',
      detail: ['Mapa con puntos de interés y variables de audiencia que se alimenta de boletines oficiales.'],
      hook: ['Word', 'informes generados desde un mapa'],
    },
    en: {
      title: 'Audience map',
      detail: ['Map with points of interest and audience variables, fed from official gazettes.'],
      hook: ['Word', 'reports generated from a map'],
    },
  },
  {
    id: 'sw-mapas',
    world: 'sw',
    status: 'test',
    stack: ['PWA', 'API', 'Offline'],
    es: {
      title: 'App de mapas con privacidad',
      detail: ['App de sitios, mapas y fotos sobre una API que llevo yo. Funciona sin conexión.'],
      hook: ['0', 'datos que liguen una respuesta a quien contesta'],
    },
    en: {
      title: 'Privacy-first map app',
      detail: ['App for places, maps and photos on an API I own. Works offline.'],
      hook: ['0', 'data linking an answer to whoever gave it'],
    },
  },
];
