# Sistema de Plantillas de Formularios (Form Templates)

## Descripción

El sistema de plantillas de formularios permite crear, gestionar y reutilizar formularios dinámicos en el sistema Invexor. Cada plantilla define la estructura, controles y validaciones de un formulario que puede ser utilizado en diferentes partes de la aplicación.

## Arquitectura

El sistema sigue la arquitectura Clean Architecture del proyecto:

```
Domain Layer:
├── entities/form-template.entity.ts
├── dtos/form-template/
│   ├── create-form-template.dto.ts
│   └── update-form-template.dto.ts
├── datasources/form-template.datasource.ts
├── repositories/form-template.repository.ts
└── use-cases/form-template.use-cases.ts

Infrastructure Layer:
├── datasources/form-template-mongo.datasource.imp.ts
├── repositories/form-template.repository.imp.ts
└── config/data/mongo/models/form-template.model.ts

Presentation Layer:
├── form-template/
│   ├── form-template.controller.ts
│   └── form-template.routes.ts
└── routes.ts (updated)
```

## Modelo de Datos

### Estructura en MongoDB

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "User Registration Form",
  "description": "Formulario para registro de usuarios",
  "category": "user-management",
  "version": "1.0.0",
  "controls": [
    {
      "name": "firstName",
      "label": "Nombre",
      "type": "text",
      "validators": {
        "required": true,
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "name": "email",
      "label": "Correo Electrónico",
      "type": "text",
      "validators": {
        "required": true,
        "email": true
      }
    },
    {
      "name": "department",
      "label": "Departamento",
      "type": "select",
      "selectOptions": [
        { "label": "Ingeniería", "value": "engineering" },
        { "label": "Marketing", "value": "marketing" }
      ]
    }
  ],
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Esquema Mongoose

```typescript
// Schema para validadores
const validatorSchema = new mongoose.Schema({
    required: { type: [String, Boolean], default: false },
    minLength: { type: Number, default: 0 },
    maxLength: { type: Number, default: 0 },
    email: { type: Boolean, default: false },
    pattern: { type: String, default: "" }
}, { _id: false });

// Schema para opciones de select
const selectOptionSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

// Schema para opciones de range
const rangeOptionsSchema = new mongoose.Schema({
    min: { type: String, default: "0" },
    max: { type: String, default: "100" },
    step: { type: String, default: "1" },
    icon: { type: String, default: "" }
}, { _id: false });

// Schema para controles de formulario
const controlSchema = new mongoose.Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, default: "" },
    type: { 
        type: String, 
        required: true,
        enum: ['text', 'textarea', 'select', 'checkbox', 'toggle', 'range']
    },
    disabled: { type: Boolean, default: false },
    validators: { type: validatorSchema, default: {} },
    selectOptions: [selectOptionSchema],
    options: { type: rangeOptionsSchema, default: {} }
}, { _id: false });

// Schema principal de plantilla de formulario
const formTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    category: { type: String, default: "general" },
    version: { type: String, default: "1.0.0" },
    controls: [controlSchema],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
```

## Tipos de Controles

### 1. Text (`text`)
Campo de texto simple con validaciones opcionales.

```json
{
  "name": "firstName",
  "label": "Nombre",
  "type": "text",
  "validators": {
    "required": true,
    "minLength": 2,
    "maxLength": 50
  }
}
```

### 2. Textarea (`textarea`)
Campo de texto multilínea.

```json
{
  "name": "description",
  "label": "Descripción",
  "type": "textarea",
  "validators": {
    "maxLength": 500
  }
}
```

### 3. Select (`select`)
Lista desplegable con opciones predefinidas.

```json
{
  "name": "department",
  "label": "Departamento",
  "type": "select",
  "selectOptions": [
    { "label": "Ingeniería", "value": "engineering" },
    { "label": "Marketing", "value": "marketing" },
    { "label": "Ventas", "value": "sales" }
  ]
}
```

### 4. Checkbox (`checkbox`)
Casilla de verificación.

```json
{
  "name": "termsAccepted",
  "label": "Acepto los términos y condiciones",
  "type": "checkbox",
  "value": "false",
  "validators": {
    "required": true
  }
}
```

### 5. Toggle (`toggle`)
Interruptor de encendido/apagado.

```json
{
  "name": "notifications",
  "label": "Recibir notificaciones",
  "type": "toggle",
  "value": "true"
}
```

### 6. Range (`range`)
Control deslizante con valores mínimo y máximo.

```json
{
  "name": "age",
  "label": "Edad",
  "type": "range",
  "options": {
    "min": "18",
    "max": "100",
    "step": "1"
  }
}
```

## Validaciones Disponibles

### Tipos de Validación

| Validación | Tipo | Descripción |
|------------|------|-------------|
| `required` | boolean/string | Campo obligatorio |
| `minLength` | number | Longitud mínima |
| `maxLength` | number | Longitud máxima |
| `email` | boolean | Validación de email |
| `pattern` | string | Expresión regular |

### Ejemplos de Validación

```json
{
  "name": "email",
  "label": "Correo Electrónico",
  "type": "text",
  "validators": {
    "required": true,
    "email": true
  }
}
```

```json
{
  "name": "phone",
  "label": "Teléfono",
  "type": "text",
  "validators": {
    "required": true,
    "pattern": "^[0-9]{10}$"
  }
}
```

## API Endpoints

### CRUD Básico

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/template` | Crear una nueva plantilla |
| GET | `/template` | Obtener todas las plantillas activas |
| GET | `/template/:id` | Obtener una plantilla por ID |
| GET | `/template/name/:name` | Obtener una plantilla por nombre |
| PUT | `/template/:id` | Actualizar una plantilla |
| DELETE | `/template/:id` | Desactivar una plantilla (soft delete) |

## Ejemplos de Uso

### 1. Crear Plantilla de Registro de Usuario

```bash
POST /template
Content-Type: application/json

{
  "name": "User Registration Form",
  "description": "Formulario para registro de usuarios",
  "category": "user-management",
  "version": "1.0.0",
  "controls": [
    {
      "name": "firstName",
      "label": "Nombre",
      "type": "text",
      "validators": {
        "required": true,
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "name": "lastName",
      "label": "Apellido",
      "type": "text",
      "validators": {
        "required": true,
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "name": "email",
      "label": "Correo Electrónico",
      "type": "text",
      "validators": {
        "required": true,
        "email": true
      }
    },
    {
      "name": "department",
      "label": "Departamento",
      "type": "select",
      "selectOptions": [
        { "label": "Ingeniería", "value": "engineering" },
        { "label": "Marketing", "value": "marketing" },
        { "label": "Ventas", "value": "sales" }
      ]
    },
    {
      "name": "isActive",
      "label": "Usuario Activo",
      "type": "toggle",
      "value": "true"
    }
  ]
}
```

### 2. Crear Plantilla de Configuración

```bash
POST /template
Content-Type: application/json

{
  "name": "System Configuration Form",
  "description": "Configuración del sistema",
  "category": "system",
  "version": "1.0.0",
  "controls": [
    {
      "name": "siteName",
      "label": "Nombre del Sitio",
      "type": "text",
      "validators": {
        "required": true,
        "maxLength": 100
      }
    },
    {
      "name": "maintenanceMode",
      "label": "Modo Mantenimiento",
      "type": "toggle",
      "value": "false"
    },
    {
      "name": "sessionTimeout",
      "label": "Tiempo de Sesión (minutos)",
      "type": "range",
      "options": {
        "min": "5",
        "max": "480",
        "step": "5"
      }
    },
    {
      "name": "description",
      "label": "Descripción del Sistema",
      "type": "textarea",
      "validators": {
        "maxLength": 500
      }
    }
  ]
}
```

### 3. Obtener Plantilla por Nombre

```bash
GET /template/name/User Registration Form
```

Respuesta:
```json
{
  "ok": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "User Registration Form",
    "description": "Formulario para registro de usuarios",
    "category": "user-management",
    "version": "1.0.0",
    "controls": [...],
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Actualizar Plantilla

```bash
PUT /template/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "name": "Updated User Registration Form",
  "description": "Formulario actualizado para registro de usuarios",
  "version": "1.1.0",
  "controls": [
    {
      "name": "firstName",
      "label": "Nombre",
      "type": "text",
      "validators": {
        "required": true,
        "minLength": 2,
        "maxLength": 50
      }
    },
    {
      "name": "phone",
      "label": "Teléfono",
      "type": "text",
      "validators": {
        "pattern": "^[0-9]{10}$"
      }
    }
  ]
}
```

### 5. Desactivar Plantilla

```bash
DELETE /template/507f1f77bcf86cd799439011
```

## Casos de Uso Comunes

### 1. Formularios de Registro
- Registro de usuarios
- Registro de clientes
- Registro de empleados
- Formularios de contacto

### 2. Formularios de Configuración
- Configuración del sistema
- Preferencias de usuario
- Configuración de módulos
- Parámetros de aplicación

### 3. Formularios de Datos
- Información de productos
- Datos de inventario
- Información de recursos
- Metadatos de entidades

### 4. Formularios Dinámicos
- Formularios generados por el usuario
- Plantillas personalizables
- Formularios temporales
- Formularios experimentales

## Ventajas del Sistema

1. **Reutilización**: Las plantillas pueden usarse en múltiples contextos
2. **Flexibilidad**: Fácil creación y modificación de formularios
3. **Validación**: Sistema robusto de validaciones
4. **Versionado**: Control de versiones de plantillas
5. **Categorización**: Organización por categorías
6. **Escalabilidad**: Fácil extensión con nuevos tipos de controles
7. **Mantenibilidad**: Estructura clara y organizada

## Validaciones y Reglas

### Reglas de Negocio
- El `name` es requerido y debe ser único
- Los `controls` son requeridos y deben ser un array
- Cada control debe tener `name`, `label` y `type`
- El `type` debe ser uno de los valores permitidos
- Las validaciones son opcionales pero deben ser válidas
- Soft delete: las plantillas se desactivan, no se eliminan

### Validaciones de Controles
- **Text/Textarea**: Validaciones de longitud y patrones
- **Select**: Debe tener `selectOptions` definidas
- **Range**: Debe tener opciones `min`, `max`, `step`
- **Checkbox/Toggle**: Valores booleanos como strings

## Testing

Para probar el sistema, ejecuta:

```bash
node test-form-templates.js
```

Este script prueba todos los endpoints y funcionalidades del sistema, incluyendo:
- Creación de plantillas con diferentes tipos de controles
- Validaciones de formularios
- Manejo de errores
- Operaciones CRUD completas

## Integración con el Frontend

El frontend puede usar este sistema para:

1. **Generar formularios dinámicamente** basados en plantillas
2. **Validar datos** usando las reglas definidas en las plantillas
3. **Reutilizar componentes** de formulario
4. **Personalizar formularios** según necesidades específicas
5. **Mantener consistencia** en la interfaz de usuario

### Ejemplo de Uso en Frontend

```typescript
// Obtener plantilla
const template = await api.get('/template/name/User Registration Form');

// Generar formulario dinámicamente
const form = generateFormFromTemplate(template.data);

// Aplicar validaciones
const validators = extractValidators(template.data.controls);

// Renderizar controles
template.data.controls.forEach(control => {
  renderControl(control);
});
```

## Consideraciones de Rendimiento

- Las consultas por `name` son optimizadas con índices únicos
- Solo se devuelven plantillas activas (`isActive: true`)
- Los controles se almacenan como subdocumentos para mejor rendimiento
- El versionado permite cachear plantillas por versión
- La categorización facilita consultas filtradas

## Migración y Versionado

### Estrategia de Versionado
- **Semantic Versioning**: `major.minor.patch`
- **Backward Compatibility**: Las versiones menores mantienen compatibilidad
- **Migration Scripts**: Para cambios breaking en versiones mayores

### Ejemplo de Migración
```typescript
// Migrar de v1.0.0 a v1.1.0
const migration = {
  from: "1.0.0",
  to: "1.1.0",
  changes: [
    { field: "controls", type: "add", value: "newControl" }
  ]
};
```

## Seguridad

- **Validación de entrada**: Todos los datos se validan antes de procesar
- **Sanitización**: Los datos se limpian antes de almacenar
- **Autorización**: Control de acceso a plantillas sensibles
- **Auditoría**: Logs de cambios en plantillas críticas 