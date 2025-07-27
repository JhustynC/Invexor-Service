import { FormControl } from "../../entities/form-template.entity";

export class CreateFormTemplateDto {
    constructor(
        public readonly name: string,
        public readonly controls: FormControl[],
        public readonly description?: string,
        public readonly category?: string,
        public readonly version?: string
    ) {}

    static create(object: { [key: string]: any }): CreateFormTemplateDto {
        const { name, controls, description, category, version } = object;

        if (!name) throw new Error('Name is required');
        if (!controls || !Array.isArray(controls)) throw new Error('Controls array is required');

        return new CreateFormTemplateDto(
            name,
            controls,
            description,
            category,
            version
        );
    }
} 