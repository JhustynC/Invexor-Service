import { Request, Response } from "express";
import { FormTemplateUseCases } from "../../domain/use-cases/form-template.use-cases";
import { CreateFormTemplateDto } from "../../domain/dtos/form-template/create-form-template.dto";
import { UpdateFormTemplateDto } from "../../domain/dtos/form-template/update-form-template.dto";

export class FormTemplateController {
    constructor(
        private readonly formTemplateUseCases: FormTemplateUseCases
    ) {}

    async create(req: Request, res: Response) {
        try {
            const createFormTemplateDto = CreateFormTemplateDto.create(req.body);
            const formTemplate = await this.formTemplateUseCases.create(createFormTemplateDto);
            
            res.status(201).json({
                ok: true,
                data: formTemplate.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const formTemplates = await this.formTemplateUseCases.getAll();
            
            res.status(200).json({
                ok: true,
                data: formTemplates.map(template => template.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const formTemplate = await this.formTemplateUseCases.findById(id);
            
            res.status(200).json({
                ok: true,
                data: formTemplate.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                ok: false,
                message: error instanceof Error ? error.message : 'Form template not found'
            });
        }
    }

    async getByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const formTemplate = await this.formTemplateUseCases.findByName(name);
            
            res.status(200).json({
                ok: true,
                data: formTemplate.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                ok: false,
                message: error instanceof Error ? error.message : 'Form template not found'
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateFormTemplateDto = UpdateFormTemplateDto.create(req.body);
            const formTemplate = await this.formTemplateUseCases.update(id, updateFormTemplateDto);
            
            res.status(200).json({
                ok: true,
                data: formTemplate.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.formTemplateUseCases.delete(id);
            
            res.status(200).json({
                ok: true,
                message: 'Form template deleted successfully'
            });
        } catch (error) {
            res.status(404).json({
                ok: false,
                message: error instanceof Error ? error.message : 'Form template not found'
            });
        }
    }
} 