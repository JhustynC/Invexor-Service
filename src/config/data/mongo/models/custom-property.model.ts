import mongoose from "mongoose";

// Interface para los métodos personalizados
interface ICustomPropertyMethods {
    addProperty(key: string, value: string): Promise<this>;
    getProperty(key: string): string | undefined;
    removeProperty(key: string): Promise<this>;
    getAllProperties(): Record<string, string>;
}

// Interface para el documento
interface ICustomPropertyDocument extends mongoose.Document, ICustomPropertyMethods {
    _id: string;
    properties: Map<string, string>;
    createdAt: Date;
    updatedAt: Date;
}

const customPropertySchema = new mongoose.Schema<ICustomPropertyDocument>({
    _id: { type: String, required: true, unique: true },
    properties: { 
        type: Map, 
        of: String, 
        default: {} 
    }
}, {
    timestamps: true
});

customPropertySchema.pre('save', async function(next){
    // Validación antes de guardar
    if (!this._id) {
        return next(new Error('_id is required'));
    }
    next();
});

customPropertySchema.pre('findOneAndUpdate', async function (next){
    // Validación antes de actualizar
    next();
});

// Método para agregar una propiedad
customPropertySchema.methods.addProperty = function(key: string, value: string) {
    this.properties.set(key, value);
    return this.save();
};

// Método para obtener una propiedad
customPropertySchema.methods.getProperty = function(key: string) {
    return this.properties.get(key);
};

// Método para eliminar una propiedad
customPropertySchema.methods.removeProperty = function(key: string) {
    this.properties.delete(key);
    return this.save();
};

// Método para obtener todas las propiedades como objeto
customPropertySchema.methods.getAllProperties = function() {
    return Object.fromEntries(this.properties);
};

export const CustomPropertyModel = mongoose.model<ICustomPropertyDocument>("customProperty", customPropertySchema);

