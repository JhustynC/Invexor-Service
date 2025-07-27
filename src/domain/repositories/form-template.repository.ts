import { FormTemplate } from "../entities/form-template.entity";
import { CreateFormTemplateDto } from "../dtos/form-template/create-form-template.dto";
import { UpdateFormTemplateDto } from "../dtos/form-template/update-form-template.dto";

export abstract class FormTemplateRepository {
    abstract create(createFormTemplateDto: CreateFormTemplateDto): Promise<FormTemplate>;
    abstract getAll(): Promise<FormTemplate[]>;
    abstract findById(id: string): Promise<FormTemplate>;
    abstract findByName(name: string): Promise<FormTemplate>;
    abstract update(id: string, updateFormTemplateDto: UpdateFormTemplateDto): Promise<FormTemplate>;
    abstract delete(id: string): Promise<void>;
} 