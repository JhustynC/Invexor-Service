export interface FormTemplateValidator {
    required?: boolean | string;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    pattern?: string;
}

export interface SelectOption {
    label: string;
    value: string;
}

export interface RangeOptions {
    min?: string;
    max?: string;
    step?: string;
    icon?: string;
}

export interface FormControl {
    name: string;
    label: string;
    value?: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox' | 'toggle' | 'range';
    disabled?: boolean;
    validators?: FormTemplateValidator;
    selectOptions?: SelectOption[];
    options?: RangeOptions;
}

export class FormTemplate {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly category: string,
        public readonly version: string,
        public readonly controls: FormControl[],
        public readonly isActive: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}

    static create(
        name: string,
        controls: FormControl[],
        description: string = "",
        category: string = "general",
        version: string = "1.0.0"
    ): FormTemplate {
        const now = new Date();
        return new FormTemplate(
            "", // ID will be assigned by the database
            name,
            description,
            category,
            version,
            controls,
            true,
            now,
            now
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            version: this.version,
            controls: this.controls,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
} 