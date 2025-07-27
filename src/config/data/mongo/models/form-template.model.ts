import mongoose from "mongoose";

// Schema for form control validators
const validatorSchema = new mongoose.Schema({
    required: { type: [String, Boolean], default: false },
    minLength: { type: Number, default: 0 },
    maxLength: { type: Number, default: 0 },
    email: { type: Boolean, default: false },
    pattern: { type: String, default: "" }
}, { _id: false });

// Schema for select options
const selectOptionSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });

// Schema for range options
const rangeOptionsSchema = new mongoose.Schema({
    min: { type: String, default: "0" },
    max: { type: String, default: "100" },
    step: { type: String, default: "1" },
    icon: { type: String, default: "" }
}, { _id: false });

// Schema for form controls
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

// Main form template schema
const formTemplateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    category: { 
        type: String, 
        default: "general" 
    },
    version: { 
        type: String, 
        default: "1.0.0" 
    },
    controls: [controlSchema],
    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to update the updatedAt field
formTemplateSchema.pre('save', async function(next) {
    this.updatedAt = new Date();
    next();
});

formTemplateSchema.pre('findOneAndUpdate', async function(next) {
    this.set({ updatedAt: new Date() });
    next();
});

export const FormTemplateModel = mongoose.model("formTemplate", formTemplateSchema); 