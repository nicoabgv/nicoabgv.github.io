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
      hook: ['30+', 'proyectos y contenedores vigilados desde mi propia intranet'],
    },
    en: {
      detail: ['In-house intranet centralising host container health via cron, roadmap, incident runbooks, and business metrics.'],
      hook: ['30+', 'projects and containers monitored from my own intranet'],
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
      hook: ['1', 'VPS propio con Docker, Nginx y copias diarias fuera'],
    },
    en: {
      title: 'Infrastructure',
      detail: ['Dedicated VPS with Docker, Nginx reverse proxy, shared MySQL and Redis, localhost port binding, and daily off-site backups.'],
      hook: ['1', 'dedicated VPS running Docker, Nginx and daily off-site backups'],
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
      hook: ['100%', 'operativo en cobro y pedidos aunque se caiga internet'],
    },
    en: {
      detail: ['Local-first architecture with Kotlin/JVM Hub and SQLite for orders, till, payments, and stock resilient to network drops.'],
      hook: ['100%', 'operational for orders and billing even offline'],
    },
  },
  {
    id: 'sw-sentinel',
    world: 'sw',
    status: 'live',
    stack: ['Node.js', 'Python', 'React', 'GPU'],
    es: {
      title: 'Biometría & Reconocimiento Facial',
      detail: ['Arquitectura desacoplada: API en Node, panel SPA en React y microservicio de biometría facial en Python (face_mvp) integrado en pipeline en vivo.'],
      hook: ['RTX', 'reconocimiento facial y transcripción acelerados por GPU'],
    },
    en: {
      title: 'Biometrics & Facial Recognition',
      detail: ['Decoupled architecture: Node API, React SPA dashboard, and Python face biometrics microservice (face_mvp) integrated into a live pipeline.'],
      hook: ['RTX', 'hardware-accelerated facial recognition and transcription'],
    },
  },
  {
    id: 'sw-clips',
    world: 'sw',
    status: 'live',
    stack: ['Python', 'Whisper', 'PyTorch', 'CUDA'],
    es: {
      title: 'Clips Automatizados con IA',
      detail: ['Pipeline de corte inteligente de vídeo con transcripción automática mediante Whisper y detección de caras acelerada por hardware.'],
      hook: ['0', 'edición manual: corte y transcripción automatizados con IA'],
    },
    en: {
      title: 'Automated AI Video Clipping',
      detail: ['Intelligent video clipping pipeline with automated Whisper transcription and hardware-accelerated face detection.'],
      hook: ['0', 'manual editing: automated video clipping and transcription'],
    },
  },
  {
    id: 'sw-encuestas',
    world: 'sw',
    status: 'live',
    stack: ['FastAPI', 'DeepSeek', 'PostgreSQL', 'Next.js'],
    es: {
      title: 'Análisis Electoral con LLM',
      detail: ['Explorador de microdatos sociopolíticos por olas con un motor LLM que redacta conclusiones narrativas y genera gráficos analíticos.'],
      hook: ['LLM', 'extracción de narrativa y gráficos sobre olas de microdatos'],
    },
    en: {
      title: 'Electoral Analysis with LLMs',
      detail: ['Sociopolitical microdata explorer across waves with an LLM engine drafting narrative conclusions and generating analytical charts.'],
      hook: ['LLM', 'narrative extraction and charts from electoral microdata waves'],
    },
  },
  {
    id: 'sw-audiencias',
    world: 'sw',
    status: 'live',
    stack: ['Python', 'Scraping', 'Mapas', 'FastAPI'],
    es: {
      title: 'Inteligencia Geoespacial',
      detail: ['Plataforma de audiencias sobre mapas y puntos de interés alimentada de forma continua mediante canalizaciones de scraping sobre boletines oficiales.'],
      hook: ['24/7', 'extracción automatizada de audiencias desde boletines oficiales'],
    },
    en: {
      title: 'Geospatial Intelligence',
      detail: ['Audience and points-of-interest mapping platform continuously fed by automated web scraping pipelines over official gazettes.'],
      hook: ['24/7', 'automated audience extraction from official gazettes'],
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
      hook: ['0%', 'azar: reparto financiero adaptativo con reglas deterministas'],
    },
    en: {
      detail: ['Deterministic engine splitting income via a safety score (liquidity, buffer, goals), without opaque models.'],
      hook: ['0%', 'chance: adaptive financial split with deterministic rules'],
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
      hook: ['3.600', 'eventos de telemetría y auditoría con sondas activas'],
    },
    en: {
      detail: ['Audit and probe system checking actual page content to catch regressions that a simple HTTP 200 ping misses.'],
      hook: ['3,600', 'telemetry and audit events with deep content probes'],
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
      hook: ['ERP', 'sincronización directa de clientes y facturas con GotelGest'],
    },
    en: {
      detail: ['Secure sync with the corporate ERP (GotelGest) and integration with the collections system under read-only contracts.'],
      hook: ['ERP', 'direct sync of customers and invoices with GotelGest'],
    },
  },
];
