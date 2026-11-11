// What I have built, as rows of a departures board. Facts come from Nico's own notes.
// SW Demoscopia work is described without project names, links or screenshots.

export type World = 'propio' | 'ya' | 'sw';
export type Status = 'live' | 'dev' | 'test' | 'off';

export interface Job {
  id: string;
  what: string; // board line, max 32 chars
  name?: string;
  title?: string; // detail heading when there is no public name
  world: World;
  status: Status;
  stack: string[];
  detail: string[];
  link?: { href: string; label: string };
  shot?: string;
  logo?: string; // preview for projects without a public screenshot
}

export const WORLD_LABEL: Record<World, string> = {
  propio: 'Propio',
  ya: 'YaSolutions',
  sw: 'SW Demoscopia',
};

export const STATUS_LABEL: Record<Status, string> = {
  live: 'En marcha',
  dev: 'En desarrollo',
  test: 'En pruebas',
  off: 'Apagado',
};

export const JOBS: Job[] = [
  {
    id: 'ponme',
    what: 'Estilista con IA para tu armario',
    name: 'Ponme',
    world: 'propio',
    status: 'live',
    stack: ['FastAPI', 'React 19', 'PostgreSQL', 'Celery', 'Redis', 'Gemini', 'U2Net', 'Stripe', 'MCP'],
    detail: [
      'Fotografías tu ropa y te dice qué ponerte según tu plan y el tiempo que va a hacer, solo con prendas que tienes.',
      'Pipeline de visión en tres colas: quita el fondo con U2Net en mi propio servidor y Gemini clasifica color, estilo, temporada y formalidad.',
      'Planifica la semana, prepara la maleta de un viaje día a día y comparte looks en grupos.',
      'Conector MCP en producción: Claude y ChatGPT pueden leer tu armario y proponerte looks.',
      'Suscripción y packs de tokens con Stripe, entorno de staging propio y copia de la base de datos antes de cada despliegue.',
    ],
    link: { href: 'https://ponme.es', label: 'ponme.es' },
    shot: '/shots/ponme.webp',
  },
  {
    id: 'micartaya',
    what: 'Carta QR con pedidos y cobro',
    name: 'MiCartaYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'React', 'MySQL', 'Redis', 'WebSockets', 'Dojo', 'TPV DST'],
    detail: [
      'El cliente escanea el QR, pide desde la mesa y paga sin esperar al camarero.',
      'Incluye un camarero con IA que recomienda platos según lo que le pides.',
      'Los pedidos llegan a cocina en tiempo real por WebSockets y salen por la impresora de tickets.',
      'Cobro con datáfonos Dojo: un pedido solo cuenta como pagado cuando el backend lo confirma.',
      'Multi-restaurante por dominio y conectada con el TPV DST. La usan 14 restaurantes.',
    ],
    link: { href: 'https://micartaya.es', label: 'micartaya.es' },
    shot: '/shots/micartaya.webp',
  },
  {
    id: 'orbe',
    name: 'Orbe',
    what: 'Analisis de mi cartera con IA',
    world: 'propio',
    status: 'live',
    stack: ['React', 'TypeScript', 'Express', 'Gemini', 'Yahoo Finance'],
    detail: [
      'Panel que construí para entender mi propia cartera: cotizaciones, noticias, calendario e indicadores en un solo sitio.',
      'Gemini lee los datos reales de la cartera y hace el análisis cualitativo: sesgos, auditoría de riesgo y un briefing.',
      'Cada semana me llega un resumen por email, sin tener que mirar el mercado todo el día.',
      'De un solo usuario, yo, por diseño.',
    ],
    logo: '/logos/orbe.svg',
  },
  {
    id: 'dedica',
    name: 'Dedica',
    what: 'Fichaje de horas que opera un agente',
    world: 'propio',
    status: 'live',
    stack: ['FastAPI', 'MySQL', 'React', 'MCP', 'OAuth 2.0'],
    detail: [
      'Registra horas y gastos por proyecto y calcula si un proyecto sale rentable.',
      'Toda su API está expuesta como servidor MCP, con 16 herramientas: un agente como Claude crea fichajes, gastos y proyectos sin tocar la interfaz.',
      'Servidor de autorización OAuth 2.0 propio para autenticar el acceso de los agentes por HTTP.',
      'Es la pieza que mejor resume cómo trabajo: diseño el sistema para que la IA opere dentro de él.',
    ],
    logo: '/logos/dedica.svg',
  },
  {
    id: 'mirador',
    what: 'Intranet que vigila 32 sistemas',
    name: 'Mirador',
    world: 'propio',
    status: 'live',
    stack: ['FastAPI', 'React', 'MySQL', 'Docker'],
    detail: [
      'Estado de cada proyecto, roadmap, runbooks, vencimientos y recursos del servidor en un solo panel.',
      'Mapa del sistema en forma de grafo: proyectos, tecnologías y recursos.',
      'Acceso con doble factor y lectura del servidor sin permisos de escritura.',
    ],
  },
  {
    id: 'servidor',
    title: 'Servidores',
    what: 'Servidores que despliego y opero',
    world: 'propio',
    status: 'live',
    stack: ['Docker', 'Nginx', 'Tailscale', 'MySQL', 'Redis', 'Cloudflare'],
    detail: [
      'Mis productos y los de YaSolutions corren en un VPS propio, cada uno en su contenedor detrás de Nginx, con copia diaria fuera.',
      'Además despliego en los servidores de Cybersur y de SW, entre ellos uno con GPU para la IA local.',
      'Scripts para encender y apagar proyectos, vigilar el disco y mandar métricas de seguridad.',
    ],
  },
  {
    id: 'yatelemetry',
    what: 'Telemetria propia para 11 apps',
    name: 'YaTelemetry',
    world: 'ya',
    status: 'live',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    detail: [
      'Recogida de eventos, panel de auditoría y panel de operaciones.',
      'Unos 3.600 eventos definidos y validados para 11 productos.',
      'Sondas que miran el contenido real de cada web: que responda 200 no significa que funcione.',
    ],
  },
  {
    id: 'presupuestoya',
    what: 'Presupuestos que se firman',
    name: 'PresupuestoYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'SQLAlchemy', 'React 18', 'TypeScript', 'TanStack Query', 'MySQL', 'Docker'],
    detail: [
      'El presupuesto llega como un enlace: el cliente ve fotos, elige opciones y el total se recalcula al momento.',
      'Lo firma desde el móvil con FirmaYa: código por correo, registro de auditoría y verificación pública por hash SHA-256.',
      'Los importes se guardan como texto y se calculan solo en el backend, para que no haya errores de redondeo.',
    ],
    link: { href: 'https://presupuestoya.yasolutions.es', label: 'presupuestoya.yasolutions.es' },
    shot: '/shots/presupuestoya.webp',
  },
  {
    id: 'tpv',
    name: 'TPV',
    what: 'TPV que funciona sin internet',
    world: 'ya',
    status: 'dev',
    stack: ['Kotlin', 'SQLite', 'React', 'TypeScript', 'Android', 'PostgreSQL'],
    detail: [
      'Un Hub local (Kotlin + SQLite) manda en pedidos, caja, pagos y stock aunque se caiga internet.',
      'TPV y backoffice en una PWA para Windows (React + TypeScript) y comanderas PDA con Android.',
      'SaaS propio en PostgreSQL con datos aislados por organización: registra cada local y recibe su estado.',
      'Pedido, venta, pago y documento fiscal son cosas distintas. Lo desarrollo con agentes de IA y revisión humana, tests primero.',
    ],
  },
  {
    id: 'orderya',
    what: 'Pedidos entre tiendas y obrador',
    name: 'OrderYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'MySQL', 'Tailwind', 'JavaScript'],
    detail: [
      'Pedidos internos entre tiendas, franquicias y obrador en una sola web.',
      'Cada tienda pide lo que necesita y el obrador ve en un panel qué tiene que preparar y para quién.',
      'Sustituye los pedidos por WhatsApp y las hojas de cálculo; sus métricas de negocio las sigo desde mi intranet.',
    ],
    link: { href: 'https://orderya.es', label: 'orderya.es' },
    shot: '/shots/orderya.webp',
  },
  {
    id: 'firmaya',
    what: 'Firma electronica verificable',
    name: 'FirmaYa',
    world: 'ya',
    status: 'off',
    stack: ['FastAPI', 'React', 'MySQL'],
    detail: [
      'Sobres con PDF, firmantes, código por correo, auditoría y evidencias.',
      'Cualquiera puede comprobar un documento firmado con su huella SHA-256.',
      'Ahora está apagado para dejar memoria libre en el servidor.',
    ],
  },
  {
    id: 'tratoya',
    what: 'CRM para equipos de ventas',
    name: 'TratoYa',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'MySQL', 'Celery', 'Redis'],
    detail: [
      'CRM para equipos comerciales: cada oportunidad con su siguiente paso apuntado y nada se queda colgado.',
      'Tareas en segundo plano con Celery y Redis para que la interfaz no espere.',
    ],
    link: { href: 'https://tratoya.es', label: 'tratoya.es' },
  },
  {
    id: 'intranet',
    name: 'Intranet de Cybersur',
    what: 'Intranet conectada a un ERP',
    world: 'ya',
    status: 'live',
    stack: ['FastAPI', 'Vite', 'PostgreSQL', 'Celery'],
    detail: [
      'Clientes sincronizados en solo lectura con el ERP de la empresa.',
      'Semáforo de deuda por cliente, conectado al sistema de cobros.',
    ],
  },
  {
    id: 'pauta',
    what: 'Videos para redes con IA',
    name: 'Pauta',
    world: 'propio',
    status: 'live',
    stack: ['Remotion', 'TypeScript', 'Node.js'],
    detail: [
      'Una IA escribe el guion; el motor genera la voz, los subtítulos y el vídeo con Remotion.',
      'Una persona revisa y publica en Instagram y TikTok.',
      'Lo que aprendí: sale mejor con plantillas hechas a mano que dejando que la IA invente el diseño.',
    ],
  },
  {
    id: 'beatlist',
    what: 'Ordenar playlists de Spotify',
    name: 'BeatList',
    world: 'propio',
    status: 'live',
    stack: ['Flask', 'Spotify Web API', 'OAuth 2.0', 'Celery', 'Redis'],
    detail: [
      'Analiza tempo, energía y tono de tus playlists de Spotify y las ordena para que una canción enlace con la siguiente.',
      'Spotify revisó y aprobó la app para uso público de su API.',
      'Solo recalcula lo que ha cambiado: la caché se invalida con el snapshot_id de cada playlist.',
      'Mi primer sistema en producción: OAuth 2.0, colas con Celery y Redis.',
    ],
    link: { href: 'https://beatlist.es', label: 'beatlist.es' },
    shot: '/shots/beatlist.webp',
  },
  {
    id: 'sw-clips',
    title: 'Clips de vídeo automáticos',
    what: 'Clips de video automaticos',
    world: 'sw',
    status: 'live',
    stack: ['Python', 'Whisper', 'Reconocimiento facial', 'GPU'],
    detail: [
      'Corta vídeos en clips con transcripción y reconocimiento facial.',
      'La IA corre en una GPU propia, con un proveedor en la nube de respaldo si falla.',
    ],
  },
  {
    id: 'sw-encuestas',
    title: 'Encuestas electorales con IA',
    what: 'Encuestas electorales con IA',
    world: 'sw',
    status: 'live',
    stack: ['FastAPI', 'PostgreSQL', 'Next.js', 'DeepSeek'],
    detail: ['Explorador de encuestas por olas con un chat de IA que redacta conclusiones y genera gráficos.'],
  },
  {
    id: 'sw-audiencias',
    title: 'Mapa de audiencias e informes',
    what: 'Mapa de audiencias e informes',
    world: 'sw',
    status: 'live',
    stack: ['Mapas', 'Scraping', 'Informes Word'],
    detail: [
      'Mapa con puntos de interés, variables de audiencia e informes en Word.',
      'Se alimenta leyendo boletines oficiales con un scraper propio.',
    ],
  },
  {
    id: 'sw-mapas',
    title: 'App de mapas con privacidad',
    what: 'App de mapas con privacidad',
    world: 'sw',
    status: 'test',
    stack: ['PWA', 'API', 'Offline'],
    detail: [
      'App de sitios, mapas y fotos sobre una API que llevo yo.',
      'Privacidad por diseño: las respuestas son anónimas y no se pueden ligar a quien contesta. Funciona sin conexión.',
    ],
  },
  {
    id: 'sw-telemetria',
    title: 'Telemetría y panel de estado',
    what: 'Telemetria y panel de estado',
    world: 'sw',
    status: 'live',
    stack: ['Eventos', 'Auditoría', 'Panel'],
    detail: ['Eventos validados contra catálogos y un panel privado con el estado de los proyectos del equipo.'],
  },
];
