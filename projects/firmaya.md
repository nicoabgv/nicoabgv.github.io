# FirmaYa

[← Volver al portfolio técnico](../README.md)

Plataforma para preparar, enviar y firmar documentos mediante firma electrónica simple, con trazabilidad del proceso.

| | |
| --- | --- |
| **Situación** | Producto privado |
| **Rol** | Diseño de producto, arquitectura y dirección técnica de extremo a extremo |
| **Stack** | FastAPI, React, TypeScript, MySQL, Redis, Celery, PyMuPDF y Docker |
| **Capacidades** | Enlace seguro, consentimiento, OTP opcional, firma manuscrita, QR y evidencias |
| **Código** | Privado |

## Problema

Una firma dibujada sobre un PDF no basta para construir un flujo fiable. Es necesario identificar el documento exacto, recoger consentimiento, controlar quién puede acceder, evitar finalizaciones duplicadas y conservar evidencias verificables.

FirmaYa coordina preparación, invitación, firma pública y generación de documentos sin presentar una firma simple como si fuera cualificada o certificada.

## Alcance funcional

- Administración multiempresa de usuarios, permisos y firmantes.
- Preparación de envíos con uno o varios documentos y campos posicionados sobre el PDF.
- Envío por correo, recordatorios, reenvío, caducidad, rechazo y cancelación.
- Tres niveles de verificación: enlace, confirmación de datos y OTP por correo.
- Firma manuscrita desde el mismo dispositivo o mediante QR móvil de un solo uso.
- Generación separada de PDF firmado, evidencias PDF/JSON y código de verificación.
- Textos legales versionados y personalización de marca por empresa.
- Exportación, copias de seguridad y restauración de metadatos y documentos.

## Arquitectura

```mermaid
sequenceDiagram
    participant E as Emisor
    participant API as FastAPI
    participant Q as Celery
    participant S as Firmante
    participant PDF as Servicio PDF
    participant A as Auditoría

    E->>API: Prepara y envía documento
    API->>Q: Encola notificación
    Q-->>S: Entrega enlace con token
    S->>API: Accede, consiente y firma
    opt Verificación reforzada
        API-->>S: Solicita OTP
        S->>API: Confirma OTP
    end
    API->>PDF: Finaliza documento y evidencias
    PDF-->>API: PDF firmado + hash
    API->>A: Registra evento inmutable
    API-->>S: Confirma finalización
```

## Ciclo de vida del envío

Vista simplificada de las transiciones principales:

```mermaid
stateDiagram-v2
    [*] --> Borrador
    Borrador --> Preparando
    Preparando --> Enviado
    Preparando --> ErrorEnvio
    ErrorEnvio --> Preparando
    Enviado --> Entregado
    Enviado --> Abierto
    Entregado --> Abierto
    Abierto --> EnProgreso
    Abierto --> Firmado
    EnProgreso --> Firmado
    Abierto --> Rechazado
    Enviado --> Caducado
    Enviado --> Cancelado
    Firmado --> [*]
    Rechazado --> [*]
    Caducado --> [*]
    Cancelado --> [*]
```

Los estados finales son inmutables. Un envío pendiente puede reenviarse sin crear otro contrato y solo los borradores admiten eliminación lógica.

## Decisiones técnicas

### Alcance legal explícito

El producto implementa firma electrónica simple. La interfaz y la documentación evitan atribuirle propiedades de firma cualificada o certificada que requerirían otros prestadores, identidades y garantías.

### Acceso público mediante token

El firmante no necesita una cuenta interna. Un token de acceso limita el documento y el flujo disponibles, mientras el backend sigue comprobando estado, caducidad y operaciones permitidas.

### Integridad mediante hashes

Se calculan hashes SHA-256 para vincular el documento y sus evidencias con el contenido generado. El valor sirve para detectar cambios; no sustituye por sí solo una certificación externa.

### Finalización idempotente

La creación del PDF definitivo y del informe de evidencias se protege con bloqueo pesimista y comprobaciones de estado. Reintentar una petición no debe producir varias versiones finales.

### Auditoría append-only

Consentimiento, verificaciones y cambios relevantes se registran como eventos añadidos a la cronología, sin reescribir silenciosamente los anteriores.

## Seguridad documental

- Los tokens públicos son largos y no predecibles; la base de datos conserva su hash.
- Los enlaces se invalidan al firmar, rechazar, cancelar o caducar el envío.
- El QR móvil usa un token efímero de un solo uso y una actualización atómica para evitar repetición.
- Los PDFs se validan por MIME, firma mágica, tamaño, páginas y apertura real con PyMuPDF.
- Original, documento firmado y evidencias son archivos diferentes; el original nunca se sobrescribe.
- Las descargas pasan por rutas autorizadas y auditadas, con claves de almacenamiento no derivadas del nombre original.
- El acceso interno usa cookies HttpOnly, refresh rotatorio, CSRF, Argon2, rate limiting y MFA TOTP configurable.

## Operación y verificación

Celery saca del ciclo HTTP el correo y la generación documental. Celery Beat gestiona caducidades, recordatorios y limpieza programada. El almacenamiento está abstraído para poder cambiar el volumen local por S3 sin alterar el dominio.

Las pruebas automatizadas cubren permisos, validación de PDF, firma completa, consentimiento, OTP, QR de un solo uso, rechazo, caducidad, idempotencia, hashes y generación de evidencias. Un smoke test atraviesa Nginx, API, worker y correo local como un flujo real.

## Retos y soluciones

| Reto | Solución |
| --- | --- |
| Permitir firma externa sin abrir el panel interno | Token específico, caducidad y permisos limitados |
| Evitar dos documentos finales ante peticiones concurrentes | Transacción, bloqueo y finalización idempotente |
| Conservar una historia comprensible del proceso | Eventos append-only e informe de evidencias |
| Añadir verificación sin hacerla obligatoria en todos los flujos | OTP configurable según el nivel necesario |
| Delimitar correctamente lo que ofrece el producto | Mensajes y arquitectura alineados con firma electrónica simple |

## Resultado

La solución cubre el recorrido completo desde la preparación hasta el PDF final y su informe de evidencias, manteniendo separados el panel del emisor, el acceso público del firmante, las notificaciones y el procesamiento documental.

## Límites de esta documentación

No se publican mecanismos de generación de tokens, plantillas, datos personales, documentos, secretos, endpoints internos ni código. Este caso no constituye asesoramiento legal.
