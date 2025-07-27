# Form Template Model

Este modelo de MongoDB está diseñado para almacenar plantillas de formularios dinámicos que pueden ser utilizadas por el frontend para generar formularios automáticamente.

## Estructura del Modelo

### FormTemplate Schema

```typescript
{
  name: string,           // Nombre único del formulario
  description: string,    // Descripción del formulario
  category: string,       // Categoría (ej: "users", "areas", "items")
  version: string,        // Versión del formulario
  controls: FormControl[], // Array de controles del formulario
  isActive: boolean,      // Estado activo/inactivo
  createdAt: Date,        // Fecha de creación
  updatedAt: Date         // Fecha de última actualización
}
```

### FormControl Schema

```typescript
{
  name: string,           // Nombre del campo
  label: string,          // Etiqueta visible
  value: string,          // Valor por defecto
  type: string,           // Tipo de control: 'text', 'textarea', 'select', 'checkbox', 'toggle', 'range'
  disabled: boolean,      // Campo deshabilitado
  validators: object,     // Validaciones
  selectOptions: array,   // Opciones para campos select
  options: object         // Opciones adicionales (ej: para range)
}
```

## Tipos de Controles Soportados

1. **text**: Campo de texto simple
2. **textarea**: Área de texto multilínea
3. **select**: Lista desplegable
4. **checkbox**: Casilla de verificación
5. **toggle**: Interruptor on/off
6. **range**: Control deslizante

## Validaciones Soportadas

```typescript
{
  required: boolean | string,  // Campo requerido
  minLength: number,          // Longitud mínima
  maxLength: number,          // Longitud máxima
  email: boolean,             // Validación de email
  pattern: string             // Patrón regex
}
```

## Ejemplo de Uso

### Crear un Formulario

```typescript
const formTemplate = {
  name: "user-registration",
  description: "Formulario de registro de usuarios",
  category: "users",
  version: "1.0.0",
  controls: [
    {
      name: "firstName",
      label: "Nombre:",
      value: "",
      type: "text",
      validators: {
        required: true,
        minLength: 2
      }
    },
    {
      name: "email",
      label: "Email:",
      value: "",
      type: "text",
      validators: {
        required: true,
        email: true
      }
    },
    {
      name: "role",
      label: "Rol:",
      value: "",
      type: "select",
      validators: {
        required: true
      },
      selectOptions: [
        { label: "Administrador", value: "admin" },
        { label: "Usuario", value: "user" }
      ]
    }
  ]
};
```

## API Endpoints

- `POST /api/form-templates` - Crear formulario
- `GET /api/form-templates` - Obtener todos los formularios
- `GET /api/form-templates/:id` - Obtener formulario por ID
- `GET /api/form-templates/name/:name` - Obtener formulario por nombre
- `PUT /api/form-templates/:id` - Actualizar formulario
- `DELETE /api/form-templates/:id` - Eliminar formulario (soft delete)

## Migración de Formularios Existentes

Para migrar los formularios JSON existentes a MongoDB, ejecuta:

```bash
npm run migrate:form-templates
```

O directamente:

```bash
npx ts-node src/scripts/migrate-form-templates.ts
```

## Integración con Frontend

El frontend puede consumir estos formularios a través de la API y generar formularios dinámicos basándose en la estructura de `controls` que se almacena en MongoDB. 