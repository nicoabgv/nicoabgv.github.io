# Nicolás Álvarez — Software Engineer

Diseño productos de software y dirijo su construcción con agentes de IA. Trabajo de extremo a extremo: arquitectura, backend, frontend, despliegue e infraestructura, con foco en SaaS, automatización e IA aplicada.

[Portfolio](https://nicoabgv.github.io/) · [LinkedIn](https://www.linkedin.com/in/nicol%C3%A1s-%C3%A1lvarez-becerra-201773267/) · [CV en español](assets/cv_es.pdf) · [CV in English](assets/cv_en.pdf) · [Email](mailto:nicoabgv@gmail.com)

## Sobre este repositorio

Este repositorio cumple dos funciones:

1. Aloja el código de mi portfolio personal en GitHub Pages.
2. Documenta la ingeniería de algunos productos privados sin publicar su código fuente.

La [web](https://nicoabgv.github.io/) es el escaparate visual. Los documentos de este repositorio la complementan con contexto técnico: arquitectura, integraciones, decisiones, retos y límites de cada solución.

## Casos de estudio

| Proyecto | Qué resuelve | Foco técnico | Situación |
| --- | --- | --- | --- |
| [MiCartaYa](projects/micartaya.md) | Carta digital, pedidos y operación de restaurante | Multi-tenant, pagos Dojo, integración DST, tiempo real e IA acotada | En producción en 14 restaurantes |
| [OrderYa](projects/orderya.md) | Pedidos entre obrador y locales | Multi-tenant por subdominio, sincronización DST, previsión y rentabilidad | En producción |
| [Ponme](projects/ponme.md) | Armario digital y recomendación visual de conjuntos | IA multimodal, procesamiento asíncrono, Stripe y almacenamiento de objetos | En producción |
| [FirmaYa](projects/firmaya.md) | Firma electrónica simple de documentos | PDFs, consentimiento, OTP, integridad, auditoría e idempotencia | Producto privado |
| [BeatList](projects/beatlist.md) | Analítica y gestión de playlists | Spotify OAuth, caché por snapshot, procesamiento concurrente y tareas asíncronas | Aprobada por Spotify |
| [Dedica](projects/dedica.md) | Registro de tiempo, gastos y rentabilidad | API multiusuario, OAuth y servidor MCP con 16 herramientas definidas | Herramienta privada |
| [TuParte](projects/tuparte.md) | Reparto y planificación de finanzas personales | Motor adaptativo, liquidez, inversión, colchón, metas y análisis histórico | Herramienta personal |

## Más productos y plataformas

Los casos anteriores son los más desarrollados, no los únicos. Este inventario recoge el resto del trabajo con suficiente contexto para distinguir productos, herramientas internas y proyectos de integración.

### SaaS, negocio y operaciones

| Proyecto | Problema y aportación técnica | Tecnologías | Madurez |
| --- | --- | --- | --- |
| **MesasYa** | Reservas, disponibilidad de mesas, lista de espera, widget público, recordatorios y actualizaciones en tiempo real. | Flask, MySQL, Redis, Celery, SSE | Producto privado |
| **TratoYa** | CRM multi-organización para oportunidades, actividad comercial, onboarding y conexión con propuestas. | FastAPI, React, PostgreSQL, Docker | Producto privado |
| **PresupuestoYa** | Catálogo y propuestas públicas interactivas; aceptación y eventos devueltos al ciclo comercial de TratoYa. | FastAPI, React, PostgreSQL, analítica de eventos | Producto privado |
| **Kobra** | Importación y seguimiento de facturas, clientes, agentes, pagos, exportaciones y sincronización con un sistema legado. | FastAPI, MySQL, Redis, Celery, Docker | Herramienta operativa privada |
| **Intranet empresarial** | Procesos internos, reporting y métricas con sincronización de solo lectura desde un ERP corporativo. | React, FastAPI, PostgreSQL, Redis, MinIO, SQL Server | Plataforma interna |
| **Orbe** | Inteligencia financiera personal, seguimiento de activos y análisis asistido por IA. | React, Express, Gemini, datos de mercado | Herramienta personal |
| **Mirador** | Operación de proyectos: documentación, PDFs, runbooks, relaciones entre sistemas, renovaciones y finanzas. | FastAPI, React, MySQL, Docker | Herramienta personal |
| **Escolia** | Diseño de producto para colegios y academias: alcance, modelo multi-organización, migración, pagos y operación. | FastAPI, React, PostgreSQL, RLS, Dojo | Discovery y arquitectura pre-MVP |
| **YaSolutions** | Marca y escaparate común para una suite de productos de software orientados a hostelería. | HTML, CSS, JavaScript, arquitectura de marca | Sitio de producto |

### Integración, escritorio y automatización

| Proyecto | Problema y aportación técnica | Tecnologías | Madurez |
| --- | --- | --- | --- |
| **TPV Panel** | Monitorización remota de terminales Windows mediante agentes empaquetados e informes compatibles entre versiones. | FastAPI, Jinja, MySQL, cliente Windows | Herramienta operativa privada |
| **WebDST** | Históricos de ventas, precios maestros, exportaciones y comisiones sobre un ERP legado. | Python, SQLite, API DST, Excel | Herramienta operativa privada |

## Cómo trabajo

- **Producto antes que tecnología.** Empiezo por el problema, los usuarios, los límites y los criterios de aceptación.
- **Arquitectura proporcional.** Uso servicios y componentes separados cuando aíslan coste, carga o riesgo; evito complejidad sin una necesidad real.
- **IA con controles.** Los modelos proponen o transforman; el backend valida identidades, permisos, precios, estados y datos persistidos.
- **Seguridad desde el diseño.** Autorización por rol y tenant, validación de webhooks, protección de secretos, trazabilidad e idempotencia en operaciones sensibles.
- **Operación real.** Docker, Nginx, observabilidad, colas, copias de seguridad y procedimientos de despliegue forman parte del producto.

## Stack habitual

`Python` · `FastAPI` · `Flask` · `React` · `TypeScript` · `PostgreSQL` · `MySQL` · `Redis` · `Celery` · `Docker` · `Nginx` · `GitHub Actions`

Integraciones habituales: `Gemini` · `Spotify Web API` · `Stripe` · `Dojo` · `MCP` · `OAuth 2.0` · `S3 / Cloudflare R2` · sistemas ERP.

## Este portfolio web

La web es una página estática construida con HTML, Tailwind CSS, JavaScript y GSAP, publicada mediante GitHub Pages. La documentación técnica vive en Markdown para mantenerla legible, versionable y fácil de ampliar.

## Privacidad

Los repositorios de los productos son privados. Los casos de estudio omiten deliberadamente código propietario, credenciales, endpoints internos, datos de clientes, reglas de negocio sensibles y detalles que puedan comprometer la seguridad. Los diagramas son vistas simplificadas de alto nivel.

Para añadir otro proyecto se puede partir de [`projects/_template.md`](projects/_template.md).
