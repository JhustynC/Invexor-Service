import { FormTemplateModel } from "../config/data/mongo/models/form-template.model";
import { connect, disconnect } from "mongoose";

// Sample form templates based on the existing JSON files
const formTemplates = [
    {
        name: "add-users-form",
        description: "Formulario para agregar usuarios",
        category: "users",
        version: "1.0.0",
        controls: [
            {
                name: "ID",
                label: "ID:",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 1
                }
            },
            {
                name: "Contraseña",
                label: "Contraseña:",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 4
                }
            },
            {
                name: "Nombre",
                label: "Nombre:",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 3
                }
            },
            {
                name: "Email",
                label: "Email:",
                value: "",
                type: "text",
                validators: {
                    required: "Email is required",
                    email: true
                }
            }
        ]
    },
    {
        name: "areas-form",
        description: "Formulario para gestionar áreas",
        category: "areas",
        version: "1.0.0",
        controls: [
            {
                name: "id",
                label: "ID",
                value: "",
                type: "text",
                disabled: true,
                validators: {
                    required: true,
                    minLength: 1
                }
            },
            {
                name: "nombre",
                label: "Name",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 4
                }
            },
            {
                name: "sucursal",
                label: "Select a branch",
                value: "",
                type: "select",
                validators: {
                    required: false
                },
                selectOptions: [
                    { label: "Sucursal A", value: "Sucursal A" },
                    { label: "Sucursal B", value: "Sucursal B" },
                    { label: "Sucursal C", value: "Sucursal C" },
                    { label: "Sucursal D", value: "Sucursal D" }
                ]
            },
            {
                name: "padre",
                label: "Select patern area",
                value: "",
                type: "select",
                validators: {
                    required: false
                },
                selectOptions: [
                    { label: "Area A", value: "Area A" },
                    { label: "Area B", value: "Area B" },
                    { label: "Area C", value: "Area C" },
                    { label: "Area D", value: "Area D" }
                ]
            },
            {
                name: "telefono",
                label: "Phone",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 5
                }
            },
            {
                name: "estado",
                label: "Select a state",
                value: "",
                type: "select",
                validators: {
                    required: false
                },
                selectOptions: [
                    { label: "Activa", value: "Activa" },
                    { label: "Inactiva", value: "Inactiva" }
                ]
            },
            {
                name: "descripcion",
                label: "Description",
                value: "",
                type: "textarea",
                validators: {}
            }
        ]
    },
    {
        name: "branchs-form",
        description: "Formulario para gestionar sucursales",
        category: "branches",
        version: "1.0.0",
        controls: [
            {
                name: "id",
                label: "ID",
                value: "",
                type: "text",
                disabled: true,
                validators: {
                    required: true,
                    minLength: 1
                }
            },
            {
                name: "nombre",
                label: "Name",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 4
                }
            },
            {
                name: "ciudad",
                label: "City",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 4
                }
            },
            {
                name: "telefono",
                label: "Phone",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 5
                }
            },
            {
                name: "estado",
                label: "Select a state",
                value: "",
                type: "select",
                validators: {
                    required: false
                },
                selectOptions: [
                    { label: "Activa", value: "Activa" },
                    { label: "Inactiva", value: "Inactiva" }
                ]
            }
        ]
    },
    {
        name: "items-form",
        description: "Formulario para gestionar items",
        category: "items",
        version: "1.0.0",
        controls: [
            {
                name: "SKU",
                label: "SKU:",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 1
                }
            },
            {
                name: "Nombre",
                label: "Nombre:",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 1
                }
            },
            {
                name: "Description",
                label: "Description",
                value: "",
                type: "text",
                validators: {
                    required: false,
                    minLength: 1
                }
            },
            {
                name: "Proveedor",
                label: "Proveedor:",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 1
                }
            }
        ]
    },
    {
        name: "resources-form",
        description: "Formulario para gestionar recursos",
        category: "resources",
        version: "1.0.0",
        controls: [
            {
                name: "medida",
                label: "Measure",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 4
                }
            },
            {
                name: "moneda",
                label: "Currency",
                value: "",
                type: "text",
                validators: {
                    required: true,
                    minLength: 4
                }
            },
            {
                name: "description",
                label: "Description",
                value: "",
                type: "textarea",
                validators: {}
            }
        ]
    }
];

async function migrateFormTemplates() {
    try {
        // Connect to MongoDB (you'll need to set the connection string)
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/invexor";
        await connect(mongoUri);
        console.log("Connected to MongoDB");

        // Clear existing form templates
        await FormTemplateModel.deleteMany({});
        console.log("Cleared existing form templates");

        // Insert new form templates
        const result = await FormTemplateModel.insertMany(formTemplates);
        console.log(`Successfully migrated ${result.length} form templates`);

        // List the migrated templates
        result.forEach(template => {
            console.log(`- ${template.name}: ${template.description}`);
        });

    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await disconnect();
        console.log("Disconnected from MongoDB");
    }
}

// Run migration if this file is executed directly
if (require.main === module) {
    migrateFormTemplates();
}

export { migrateFormTemplates }; 