# MiCartaYa

[← Volver al portfolio técnico](../README.md)

SaaS para que un restaurante publique su carta mediante QR, reciba pedidos y gestione la operación en tiempo real desde un único panel.

| | |
| --- | --- |
| **Situación** | En producción en 14 restaurantes |
| **Rol** | Diseño de producto, arquitectura y dirección técnica de extremo a extremo |
| **Stack** | FastAPI, React, MySQL, Redis, Celery, Cloudflare R2 y Docker |
| **Integraciones** | DST, Dojo, Gemini, impresión local y WebSocket |
| **Código** | Privado |

## Problema

Una carta digital aislada resuelve poco. El reto real es conectar lo que ve el cliente con catálogo, disponibilidad, cobro, preparación e impresión, sin imponer al restaurante una operación paralela difícil de mantener.

MiCartaYa reúne carta pública, pedidos, administración y servicios externos, manteniendo separados los datos y la configuración de cada restaurante.

## Alcance funcional

- Carta pública por QR con familias, productos, tamaños, extras, alérgenos, imágenes y vídeo.
- Distintas experiencias de navegación, incluida una vista vertical tipo Reels.
- Pedido desde el móvil, seguimiento en panel y envío inmediato a cocina.
- Mesas y restaurantes configurables, con operación separada por tenant.
- Pago en mesa, pago externo o pago online mediante Dojo, configurable por restaurante.
- Sincronización de carta y envío de pedidos al TPV DST.
- SmartWaiter para recomendaciones y traducción masiva de la carta.
- Paneles diferenciados para plataforma, distribuidores y restaurantes.

## Arquitectura

```mermaid
flowchart LR
    C["Cliente · carta QR"] --> API["API FastAPI"]
    P["Panel React"] --> API
    API --> DB[("MySQL")]
    API --> R["Redis + Celery"]
    API --> O["Cloudflare R2"]
    API <--> DST["DST · catálogo y operación"]
    API <--> DOJO["Dojo · pagos"]
    API --> AI["Gemini · SmartWaiter y traducción"]
    API --> WS["WebSocket"]
    WS --> PRINT["Cliente de impresión local"]
```

El diagrama muestra límites funcionales, no la topología interna ni los contratos privados.

## Flujo de un pedido

1. El dominio o subdominio identifica el restaurante antes de resolver la carta.
2. El cliente selecciona productos, tamaños y opciones; el backend reconstruye y valida el pedido con el catálogo vigente.
3. Si el pago online está activo, el backend crea una sesión alojada por Dojo. Los datos de tarjeta no pasan por MiCartaYa.
4. El webhook firmado confirma el resultado del cobro y actualiza el estado de pago de forma idempotente.
5. El pedido se registra con un estado operativo independiente del estado del pago.
6. Cuando DST está configurado, se envía al TPV con el modo de pago correspondiente.
7. Redis distribuye el evento al panel y al cliente de impresión mediante WebSocket.

Si se pierde el canal en tiempo real, el panel mantiene un ciclo de consulta de respaldo. La impresora anterior basada en polling también se conserva como mecanismo de rollback durante la transición.

## Decisiones técnicas

### El webhook confirma el pago

La vuelta del navegador mejora la experiencia, pero no es la autoridad sobre el cobro. El backend valida la firma HMAC del webhook de Dojo, registra el evento y separa el estado del pago del estado del pedido.

La materialización del pedido usa transiciones de estado controladas, deduplicación de eventos y bloqueo de la fila correspondiente. Así, dos notificaciones simultáneas no crean dos pedidos.

### La IA no inventa el catálogo

SmartWaiter usa Gemini para interpretar preferencias y recomendar, pero trabaja con identificadores de productos. El backend vuelve a resolver productos, precios y disponibilidad desde la base de datos antes de responder. También limita consultas fuera de contexto e incluye avisos específicos para alérgenos.

### Integraciones detrás de adaptadores

DST, Dojo, almacenamiento e IA se aíslan del dominio mediante servicios específicos. Esto permite distinguir fallos de autenticación, tiempo de espera o proveedor sin mezclar esos detalles con pedidos y cartas.

### Impresión como borde local

La plataforma envía eventos en tiempo real a un cliente instalado en el restaurante. El cliente local resuelve la impresora y el sistema operativo, mientras el servidor conserva el estado central del pedido.

## Operación y seguridad

- Redis funciona como broker de Celery, caché y canal pub/sub para repartir eventos entre varias instancias.
- Celery Worker procesa traducciones y trabajos lentos; Celery Beat programa informes periódicos.
- Imágenes y vídeos se almacenan en Cloudflare R2 para no depender del disco del contenedor web.
- Las credenciales de Dojo y DST se cifran antes de persistirse y permanecen separadas por restaurante.
- CORS, hosts permitidos y resolución de tenant se derivan del dominio público configurado.
- La API limita tamaño y codificación de peticiones antes de llegar a la base de datos.
- Backend y frontend envían errores a Sentry; los eventos operativos relevantes quedan auditados.

## Retos y soluciones

| Reto | Solución |
| --- | --- |
| Evitar pedidos duplicados ante reintentos del proveedor de pagos | Webhooks firmados, identificador de evento, operación idempotente y bloqueo transaccional |
| Hacer útiles las recomendaciones sin ceder el control de los datos | Salida estructurada de IA y validación final contra catálogo y disponibilidad |
| Convivir con software instalado dentro del restaurante | Cliente de impresión desacoplado y comunicación WebSocket |
| Mantener aislados restaurantes, planes y funciones opcionales | Contexto de tenant y configuración por restaurante en backend |
| Traducir contenido sin convertir un proveedor en punto único de fallo | Procesamiento asíncrono y estrategia de fallback |

## Resultado

El producto opera en 14 restaurantes y admite funciones activables por cliente, como vídeo de producto, recomendaciones y traducción. La arquitectura permite evolucionar carta, pedido, pago e integraciones por separado sin exponer esos detalles al usuario final.

## Límites de esta documentación

No se publican contratos con proveedores, endpoints, credenciales, reglas comerciales, datos de restaurantes ni código fuente. Las capacidades descritas son una vista técnica deliberadamente reducida.
