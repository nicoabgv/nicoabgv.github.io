# Dedica

[← Volver al portfolio técnico](../README.md)

Sistema para registrar tiempo y gastos, administrar proyectos y consultar rentabilidad desde una interfaz web o mediante herramientas MCP.

| | |
| --- | --- |
| **Situación** | Herramienta privada |
| **Rol** | Diseño de producto, arquitectura y dirección técnica de extremo a extremo |
| **Stack** | FastAPI, React, MySQL, OAuth 2.0 y MCP |
| **Interfaces** | Aplicación web, API y servidor MCP |
| **Código** | Privado |

## Problema

Registrar dedicación suele convertirse en trabajo administrativo y los datos llegan tarde para decidir. Dedica unifica horas, gastos, tipos de trabajo y estado de proyectos, y permite operar sobre la misma información desde la web o desde un asistente compatible con MCP.

## Alcance funcional

- Proyectos activos y cerrados, con presupuesto estimado y notas internas.
- Registro de tiempo por proyecto, usuario y tipo de trabajo.
- Registro de gastos y mantenimiento de sus categorías.
- Catálogo administrable de tipos de trabajo.
- Analítica de proyecto con tiempo por usuario, gastos, costes y comparación con presupuesto.
- Gestión multiempresa y permisos diferenciados.
- Acceso equivalente desde interfaz web, API y clientes MCP.

## Arquitectura

```mermaid
flowchart LR
    U["Usuario web"] --> UI["Aplicación React"]
    UI --> API["API FastAPI"]
    A["Asistente / agente"] --> MCP["Servidor MCP"]
    MCP --> AUTH["OAuth 2.0 + verificador de token"]
    AUTH --> API
    API --> DB[("MySQL")]
    API --> REPORTS["Analítica y rentabilidad"]
```

## Superficie MCP

La implementación actual define 16 herramientas:

| Área | Herramientas | Cantidad |
| --- | --- | ---: |
| Consulta | Proyectos, usuarios, tipos de trabajo y tipos de gasto | 4 |
| Registro | Añadir dedicación y añadir gasto | 2 |
| Catálogos | Crear o eliminar tipos de trabajo y de gasto | 4 |
| Analítica | Resumen económico y operativo de un proyecto | 1 |
| Ciclo de proyecto | Crear, actualizar, cerrar, reabrir y eliminar | 5 |

Las herramientas de consulta ayudan al cliente a resolver identificadores antes de ejecutar una acción. Las operaciones administrativas permanecen separadas de las altas cotidianas para poder aplicar permisos y confirmaciones diferentes.

## Autorización de un cliente MCP

```mermaid
sequenceDiagram
    participant C as Cliente MCP
    participant O as OAuth Dedica
    participant U as Usuario
    participant M as Servidor MCP
    participant A as API Dedica

    C->>O: Inicia autorización con state y redirect
    O->>U: Solicita acceso
    U->>O: Autentica su cuenta
    O-->>C: Devuelve código temporal
    C->>O: Intercambia código y credenciales del cliente
    O-->>C: Access token + refresh token
    C->>M: Invoca herramienta con Bearer
    M->>M: Verifica tipo, identidad y caducidad
    M->>A: Reenvía la operación con el token del usuario
    A-->>M: Aplica empresa, rol y reglas de negocio
    M-->>C: Devuelve resultado estructurado
```

## Decisiones técnicas

### MCP como otra interfaz, no otro dominio

El servidor MCP reutiliza las mismas operaciones y restricciones del producto. No mantiene una segunda base de datos ni una lógica paralela para agentes.

### Herramientas pequeñas y explícitas

La implementación actual define 16 herramientas MCP agrupadas en consulta de proyectos y catálogos, alta de tiempo y gastos, mantenimiento de tipos, analítica y ciclo de vida de proyectos. Cada herramienta tiene un propósito acotado y parámetros definidos.

### OAuth para clientes remotos

El servidor publica metadatos de autorización y soporta código de autorización y renovación. Las credenciales del cliente, códigos y tokens se validan en el backend antes de permitir el acceso a las herramientas.

### Analítica calculada en servidor

La rentabilidad se deriva de dedicación, gastos y configuración del proyecto en una única capa de backend. La web y MCP consumen el mismo resultado y no reimplementan las fórmulas.

### Operaciones destructivas separadas

Cerrar, reabrir o eliminar un proyecto son acciones distintas de consultar o registrar tiempo. Mantenerlas como herramientas explícitas facilita aplicar autorización y pedir confirmación desde el cliente.

## Seguridad y consistencia

- El servidor MCP rechaza refresh tokens usados como tokens de acceso.
- El access token transporta identidad, empresa y rol; la API vuelve a validar el usuario activo.
- El código de autorización está ligado a la URI de retorno y tiene una vida corta.
- El intercambio exige credenciales válidas del cliente.
- MCP reenvía el token del usuario a la API en lugar de usar una cuenta técnica con acceso global.
- La API conserva la autoridad sobre permisos, estados y validación de importes.
- Cerrar un proyecto impide nuevos registros hasta que una operación autorizada lo reabre.

## Trade-offs

- MCP actúa como adaptador fino: se evita duplicar reglas, aunque cada interacción depende de la disponibilidad de la API principal.
- Herramientas pequeñas generan más llamadas que una herramienta genérica, pero son más fáciles de autorizar, validar y explicar.
- La cifra de herramientas describe la implementación actual; un despliegue puede habilitar una superficie menor.

## Retos y soluciones

| Reto | Solución |
| --- | --- |
| Hacer útil MCP sin duplicar el producto | Adaptador MCP sobre el mismo backend y modelo de datos |
| Autorizar asistentes remotos | OAuth 2.0, verificación de token y validación de cliente |
| Evitar herramientas ambiguas con demasiadas funciones | Conjunto acotado de operaciones con entradas específicas |
| Mantener consistentes web, API y agentes | Reglas y cálculos centralizados en backend |
| Distinguir consulta de cambios sensibles | Herramientas separadas y autorización por operación |

## Resultado

Dedica permite que el registro y la consulta formen parte del flujo de trabajo del usuario, incluso desde un agente, sin perder una fuente única de datos. La implementación actual contiene 16 herramientas MCP; esta cifra describe el código, no garantiza que todas estén habilitadas en cada despliegue.

## Límites de esta documentación

No se publican clientes OAuth, tokens, endpoints privados, tarifas, datos de proyectos, identidad de usuarios ni código fuente.
