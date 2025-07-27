import { FormTemplateDatasource } from "../../domain/datasources/form-template.datasource";
import { FormTemplate } from "../../domain/entities/form-template.entity";
import { CreateFormTemplateDto } from "../../domain/dtos/form-template/create-form-template.dto";
import { UpdateFormTemplateDto } from "../../domain/dtos/form-template/update-form-template.dto";
import { FormTemplateModel } from "../../config/data/mongo/models/form-template.model";

export class FormTemplateMongoDatasource implements FormTemplateDatasource {
    
    async create(createFormTemplateDto: CreateFormTemplateDto): Promise<FormTemplate> {
        const { name, controls, description, category, version } = createFormTemplateDto;

        const formTemplate = await FormTemplateModel.create({
            name,
            controls,
            description: description || "",
            category: category || "general",
            version: version || "1.0.0"
        });

        return new FormTemplate(
            formTemplate._id.toString(),
            formTemplate.name,
            formTemplate.description,
            formTemplate.category,
            formTemplate.version,
            formTemplate.controls.toObject(),
            formTemplate.isActive,
            formTemplate.createdAt,
            formTemplate.updatedAt
        );
    }

    async getAll(): Promise<FormTemplate[]> {
        const formTemplates = await FormTemplateModel.find({ isActive: true }).exec();
        
        return formTemplates.map(template => new FormTemplate(
            template._id.toString(),
            template.name,
            template.description,
            template.category,
            template.version,
            template.controls.toObject(),
            template.isActive,
            template.createdAt,
            template.updatedAt
        ));
    }

    async findById(id: string): Promise<FormTemplate> {
        const formTemplate = await FormTemplateModel.findById(id).exec();
        
        if (!formTemplate) {
            throw new Error(`Form template with id ${id} not found`);
        }

        return new FormTemplate(
            formTemplate._id.toString(),
            formTemplate.name,
            formTemplate.description,
            formTemplate.category,
            formTemplate.version,
            formTemplate.controls.toObject(),
            formTemplate.isActive,
            formTemplate.createdAt,
            formTemplate.updatedAt
        );
    }

    async findByName(name: string): Promise<FormTemplate> {
        const formTemplate = await FormTemplateModel.findOne({ name, isActive: true }).exec();
        
        if (!formTemplate) {
            throw new Error(`Form template with name ${name} not found`);
        }

        return new FormTemplate(
            formTemplate._id.toString(),
            formTemplate.name,
            formTemplate.description,
            formTemplate.category,
            formTemplate.version,
            formTemplate.controls.toObject(),
            formTemplate.isActive,
            formTemplate.createdAt,
            formTemplate.updatedAt
        );
    }

    async update(id: string, updateFormTemplateDto: UpdateFormTemplateDto): Promise<FormTemplate> {
        const updateData: any = {};
        
        if (updateFormTemplateDto.name !== undefined) updateData.name = updateFormTemplateDto.name;
        if (updateFormTemplateDto.controls !== undefined) updateData.controls = updateFormTemplateDto.controls;
        if (updateFormTemplateDto.description !== undefined) updateData.description = updateFormTemplateDto.description;
        if (updateFormTemplateDto.category !== undefined) updateData.category = updateFormTemplateDto.category;
        if (updateFormTemplateDto.version !== undefined) updateData.version = updateFormTemplateDto.version;
        if (updateFormTemplateDto.isActive !== undefined) updateData.isActive = updateFormTemplateDto.isActive;

        const formTemplate = await FormTemplateModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).exec();

        if (!formTemplate) {
            throw new Error(`Form template with id ${id} not found`);
        }

        return new FormTemplate(
            formTemplate._id.toString(),
            formTemplate.name,
            formTemplate.description,
            formTemplate.category,
            formTemplate.version,
            formTemplate.controls.toObject(),
            formTemplate.isActive,
            formTemplate.createdAt,
            formTemplate.updatedAt
        );
    }

    async delete(id: string): Promise<void> {
        const result = await FormTemplateModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        ).exec();

        if (!result) {
            throw new Error(`Form template with id ${id} not found`);
        }
    }
} 