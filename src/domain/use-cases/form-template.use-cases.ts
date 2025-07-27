import { FormTemplateRepository } from "../repositories/form-template.repository";
import { FormTemplate } from "../entities/form-template.entity";
import { CreateFormTemplateDto } from "../dtos/form-template/create-form-template.dto";
import { UpdateFormTemplateDto } from "../dtos/form-template/update-form-template.dto";

export class FormTemplateUseCases {
    constructor(
        private readonly repository: FormTemplateRepository
    ) {}

    async create(createFormTemplateDto: CreateFormTemplateDto): Promise<FormTemplate> {
        return this.repository.create(createFormTemplateDto);
    }

    async getAll(): Promise<FormTemplate[]> {
        return this.repository.getAll();
    }

    async findById(id: string): Promise<FormTemplate> {
        return this.repository.findById(id);
    }

    async findByName(name: string): Promise<FormTemplate> {
        return this.repository.findByName(name);
    }

    async update(id: string, updateFormTemplateDto: UpdateFormTemplateDto): Promise<FormTemplate> {
        return this.repository.update(id, updateFormTemplateDto);
    }

    async delete(id: string): Promise<void> {
        return this.repository.delete(id);
    }
} 