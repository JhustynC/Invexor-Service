import { FormControl } from "../../entities/form-template.entity";

export class UpdateFormTemplateDto {
    constructor(
        public readonly name?: string,
        public readonly controls?: FormControl[],
        public readonly description?: string,
        public readonly category?: string,
        public readonly version?: string,
        public readonly isActive?: boolean
    ) {}

    static create(object: { [key: string]: any }): UpdateFormTemplateDto {
        const { name, controls, description, category, version, isActive } = object;

        return new UpdateFormTemplateDto(
            name,
            controls,
            description,
            category,
            version,
            isActive
        );
    }
} 