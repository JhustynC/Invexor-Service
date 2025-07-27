import { FormTemplateRepository } from "../../domain/repositories/form-template.repository";
import { FormTemplate } from "../../domain/entities/form-template.entity";
import { CreateFormTemplateDto } from "../../domain/dtos/form-template/create-form-template.dto";
import { UpdateFormTemplateDto } from "../../domain/dtos/form-template/update-form-template.dto";
import { FormTemplateMongoDatasource } from "../datasources/form-template-mongo.datasource.imp";

export class FormTemplateRepositoryImpl implements FormTemplateRepository {
    constructor(
        private readonly datasource: FormTemplateMongoDatasource
    ) {}

    async create(createFormTemplateDto: CreateFormTemplateDto): Promise<FormTemplate> {
        return this.datasource.create(createFormTemplateDto);
    }

    async getAll(): Promise<FormTemplate[]> {
        return this.datasource.getAll();
    }

    async findById(id: string): Promise<FormTemplate> {
        return this.datasource.findById(id);
    }

    async findByName(name: string): Promise<FormTemplate> {
        return this.datasource.findByName(name);
    }

    async update(id: string, updateFormTemplateDto: UpdateFormTemplateDto): Promise<FormTemplate> {
        return this.datasource.update(id, updateFormTemplateDto);
    }

    async delete(id: string): Promise<void> {
        return this.datasource.delete(id);
    }
} 