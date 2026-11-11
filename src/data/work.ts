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
      detail: ['Intranet propia que centraliza salud de contenedores por cron en el host, roadmap, runbooks de incidentes y métricas de negocio.'],
      hook: ['Intranet', 'monitorización y estado real de cada proyecto'],
    },
    en: {
      detail: ['In-house intranet centralising host container health via cron, roadmap, incident runbooks, and business metrics.'],
      hook: ['Intranet', 'monitoring and live status across every project'],
    },
  },
  {
    id: 'servidor',
    world: 'propio',
    status: 'live',
    stack: ['Docker', 'Nginx', 'Hetzner', 'CrowdSec'],
    es: {
      title: 'Infraestructura',
      detail: ['VPS propio con Docker, proxy inverso Nginx, MySQL y Redis centrales, aislamiento de puertos en localhost y copias diarias off-site.'],
      hook: ['VPS', 'despliegue en contenedores con defensa perimetral'],
    },
    en: {
      title: 'Infrastructure',
      detail: ['Dedicated VPS with Docker, Nginx reverse proxy, shared MySQL and Redis, localhost port binding, and daily off-site backups.'],
      hook: ['VPS', 'containerised deployments with perimeter defence'],
    },
  },
  {
    id: 'tpv',
    name: 'TPV YaSolutions',
    world: 'ya',
    status: 'dev',
    stack: ['Kotlin', 'SQLite', 'React', 'Android'],
    es: {
      detail: ['Arquitectura local-first con Hub Kotlin/JVM y SQLite para pedidos, caja, cobros y stock resistentes a caídas de internet.'],
      hook: ['Local-first', 'cobro y pedidos resilientes sin depender de la nube'],
    },
    en: {
      detail: ['Local-first architecture with Kotlin/JVM Hub and SQLite for orders, till, payments, and stock resilient to network drops.'],
      hook: ['Local-first', 'resilient till and orders without cloud dependency'],
    },
  },
  {
    id: 'sw-clips',
    world: 'sw',
    status: 'live',
    stack: ['Python', 'Whisper', 'PyTorch', 'CUDA'],
    es: {
      title: 'AutoClipper',
      detail: ['Pipeline de corte de vídeo automatizado con transcripción por Whisper y reconocimiento facial corriendo en GPU RTX 5070 Ti propia.'],
      hook: ['GPU propia', 'transcripción y detección facial aceleradas por hardware'],
    },
    en: {
      title: 'AutoClipper',
      detail: ['Automated video clipping pipeline with Whisper transcription and face recognition running on an in-house RTX 5070 Ti GPU.'],
      hook: ['In-house GPU', 'hardware-accelerated transcription and face recognition'],
    },
  },
  {
    id: 'sw-encuestas',
    world: 'sw',
    status: 'live',
    stack: ['FastAPI', 'DeepSeek', 'PostgreSQL', 'Next.js'],
    es: {
      title: 'CampaignScout',
      detail: ['Explorador de encuestas electorales por olas con motor LLM (DeepSeek) que genera análisis narrativo y visualizaciones de microdatos.'],
      hook: ['DeepSeek', 'análisis narrativo de encuestas y microdatos electorales'],
    },
    en: {
      title: 'CampaignScout',
      detail: ['Polling wave explorer with an LLM engine (DeepSeek) generating narrative analysis and visualisations from electoral microdata.'],
      hook: ['DeepSeek', 'narrative analysis of polling waves and electoral microdata'],
    },
  },
  {
    id: 'sw-audiencias',
    world: 'sw',
    status: 'live',
    stack: ['Python', 'Scraping', 'Mapas', 'FastAPI'],
    es: {
      title: 'GeoPilot',
      detail: ['Plataforma de audiencias sobre mapas y puntos de interés, alimentada por canalizaciones de scraping sobre boletines oficiales.'],
      hook: ['Geoespacial', 'mapa de audiencias y POIs alimentado por boletines oficiales'],
    },
    en: {
      title: 'GeoPilot',
      detail: ['Audience and POI mapping platform fed by automated scraping pipelines from official gazettes.'],
      hook: ['Geospatial', 'audience and POI map fed by official gazette scraping'],
    },
  },
  {
    id: 'sw-mapas',
    world: 'sw',
    status: 'test',
    stack: ['PWA', 'TypeScript', 'Offline', 'Leaflet'],
    es: {
      title: 'CivicMap PWA',
      detail: ['PWA de sitios, mapas y fotos con soporte offline completo y diseño que garantiza anonimato en las aportaciones ciudadanas.'],
      hook: ['PWA offline', 'mapas y encuestas anónimas sin conexión'],
    },
    en: {
      title: 'CivicMap PWA',
      detail: ['Places, maps and photos PWA with full offline support and privacy-first architecture for citizen contributions.'],
      hook: ['Offline PWA', 'anonymous places and surveys without connection'],
    },
  },
  {
    id: 'tuparte',
    name: 'TuParte',
    world: 'propio',
    status: 'live',
    stack: ['Python', 'Streamlit', 'pandas', 'Altair'],
    es: {
      detail: ['Motor determinista que reparte cada ingreso según un safety score (liquidez, colchón, metas), sin modelos opacos.'],
      hook: ['Matemático', 'reparto financiero adaptativo con reglas explicables'],
    },
    en: {
      detail: ['Deterministic engine splitting income via a safety score (liquidity, buffer, goals), without opaque models.'],
      hook: ['Mathematical', 'adaptive financial split with explainable rules'],
    },
  },
  {
    id: 'yatelemetry',
    name: 'YaTelemetry',
    world: 'ya',
    status: 'live',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    es: {
      detail: ['Sistema de auditoría y sondas que verifican el contenido real de los servicios para detectar degradaciones que un ping 200 no ve.'],
      hook: ['Observabilidad', 'auditoría de eventos y sondas activas de contenido'],
    },
    en: {
      detail: ['Audit and probe system checking actual page content to catch regressions that a simple HTTP 200 ping misses.'],
      hook: ['Observability', 'event audit trails and deep content probes'],
    },
  },
  {
    id: 'intranet',
    name: 'Intranet Cybersur',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'PostgreSQL', 'Celery', 'GotelGest'],
    es: {
      detail: ['Sincronización segura con el ERP corporativo (GotelGest) e integración con el sistema de cobros bajo contrato de solo lectura.'],
      hook: ['Integración ERP', 'sincronización con el sistema de gestión y cobros'],
    },
    en: {
      detail: ['Secure sync with the corporate ERP (GotelGest) and integration with the collections system under read-only contracts.'],
      hook: ['ERP Integration', 'synchronisation with corporate billing and collections'],
    },
  },
];
