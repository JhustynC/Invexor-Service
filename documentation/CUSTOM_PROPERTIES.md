# Sistema de Propiedades Personalizadas (Custom Properties)

## Descripción

El sistema de propiedades personalizadas permite almacenar datos JSON flexibles para cualquier entidad del sistema Invexor. Cada entidad puede tener múltiples propiedades personalizadas almacenadas en un solo documento de MongoDB.

## Arquitectura

El sistema sigue la arquitectura Clean Architecture del proyecto:

```
Domain Layer:
├── entities/customProperty.entity.ts
├── dtos/customProperty/
│   ├── create-customProperty.dto.ts
│   └── update-customProperty.dto.ts
├── datasources/customProperty.datasource.ts
├── repositories/customProperty.repository.ts
└── use-cases/customProperty.use-cases.ts

Infrastructure Layer:
├── datasources/customProperty-mongo.datasource.imp.ts
└── repositories/customProperty.repository.imp.ts

Presentation Layer:
├── customProperty/
│   ├── customProperty.controller.ts
│   └── customProperty.routes.ts
└── routes.ts (updated)
```

## Modelo de Datos

### Estructura en MongoDB

```json
{
  "_id": "user_001",
  "properties": {
    "theme": "dark",
    "language": "es",
    "notifications": "enabled",
    "timezone": "America/Mexico_City"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Esquema Mongoose

```typescript
const customPropertySchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    properties: { 
        type: Map, 
        of: String, 
        default: {} 
    }
}, {
    timestamps: true
});
```

## API Endpoints

### CRUD Básico

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/customProperty` | Crear un nuevo documento |
| GET | `/customProperty` | Obtener todos los documentos |
| GET | `/customProperty/:id` | Obtener un documento por ID |
| PUT | `/customProperty/:id` | Actualizar un documento completo |
| DELETE | `/customProperty/:id` | Eliminar un documento |

### Manejo de Propiedades Individuales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/customProperty/:id/properties` | Agregar una nueva propiedad |
| GET | `/customProperty/:id/properties/:key` | Obtener el valor de una propiedad |
| DELETE | `/customProperty/:id/properties/:key` | Eliminar una propiedad |

## Ejemplos de Uso

### 1. Crear Preferencias de Usuario

```bash
POST /customProperty
Content-Type: application/json

{
  "_id": "user_123",
  "properties": {
    "theme": "dark",
    "language": "es",
    "notifications": "enabled",
    "sidebar_collapsed": "false"
  }
}
```

### 2. Agregar una Nueva Propiedad

```bash
POST /customProperty/user_123/properties
Content-Type: application/json

{
  "key": "timezone",
  "value": "America/Mexico_City"
}
```

### 3. Obtener una Propiedad Específica

```bash
GET /customProperty/user_123/properties/theme
```

Respuesta:
```json
{
  "ok": true,
  "data": {
    "key": "theme",
    "value": "dark"
  }
}
```

### 4. Actualizar Múltiples Propiedades

```bash
PUT /customProperty/user_123
Content-Type: application/json

{
  "properties": {
    "theme": "light",
    "language": "en",
    "notifications": "disabled"
  }
}
```

### 5. Eliminar una Propiedad

```bash
DELETE /customProperty/user_123/properties/notifications
```

## Casos de Uso Comunes

### 1. Preferencias de Usuario
- Tema de la aplicación (dark/light)
- Idioma preferido
- Configuración de notificaciones
- Configuración de la interfaz

### 2. Metadatos de Entidades
- Información adicional para items
- Propiedades específicas de recursos
- Configuraciones de áreas o sucursales

### 3. Configuraciones de Sistema
- Configuraciones por entidad
- Datos temporales o de sesión
- Información de auditoría

### 4. Datos Flexibles
- Cualquier información que no requiera una tabla dedicada
- Datos que pueden cambiar frecuentemente
- Información opcional o experimental

## Ventajas del Sistema

1. **Flexibilidad**: Puedes agregar cualquier propiedad sin cambiar el esquema
2. **Eficiencia**: Todas las propiedades de una entidad están en un solo documento
3. **Escalabilidad**: Fácil de extender sin migraciones de base de datos
4. **Rendimiento**: Consultas rápidas por ID de entidad
5. **Simplicidad**: API simple y fácil de usar

## Validaciones

- El `_id` es requerido y debe ser único
- Las propiedades se almacenan como pares clave-valor (string)
- Se incluyen timestamps automáticos (createdAt, updatedAt)

## Testing

Para probar el sistema, ejecuta:

```bash
node test-custom-properties.js
```

Este script prueba todos los endpoints y funcionalidades del sistema.

## Integración con el Frontend

El frontend puede usar este sistema para:

1. **Almacenar preferencias de usuario** de forma persistente
2. **Configuraciones de la aplicación** por usuario
3. **Metadatos adicionales** para entidades existentes
4. **Datos temporales** que no requieren persistencia en PostgreSQL

## Consideraciones de Rendimiento

- Las consultas por `_id` son muy rápidas
- El uso de `Map` de Mongoose optimiza el almacenamiento
- Los timestamps automáticos facilitan el seguimiento de cambios
- La estructura permite consultas eficientes por entidad 