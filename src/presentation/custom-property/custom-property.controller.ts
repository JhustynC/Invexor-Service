import { Request, Response } from 'express';
import { CustomPropertyUseCases } from '../../domain/use-cases/custom-property.use-cases';
import { CreateCustomPropertyDto } from '../../domain/dtos/custom-property/create-customProperty.dto';
import { UpdateCustomPropertyDto } from '../../domain/dtos/custom-property/update-customProperty.dto';

export class CustomPropertyController {
    
    constructor(
        private readonly customPropertyUseCases: CustomPropertyUseCases
    ) {}

    async create(req: Request, res: Response) {
        try {
            const createCustomPropertyDto = req.body as CreateCustomPropertyDto;
            const customProperty = await this.customPropertyUseCases.create(createCustomPropertyDto);
            
            return res.status(201).json({
                ok: true,
                data: customProperty
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const customProperties = await this.customPropertyUseCases.findAll();
            
            return res.status(200).json({
                ok: true,
                data: customProperties
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const customProperty = await this.customPropertyUseCases.findById(id);
            
            if (!customProperty) {
                return res.status(404).json({
                    ok: false,
                    message: 'Custom property not found'
                });
            }
            
            return res.status(200).json({
                ok: true,
                data: customProperty
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async updateById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateCustomPropertyDto = req.body as UpdateCustomPropertyDto;
            
            const customProperty = await this.customPropertyUseCases.updateById(id, updateCustomPropertyDto);
            
            if (!customProperty) {
                return res.status(404).json({
                    ok: false,
                    message: 'Custom property not found'
                });
            }
            
            return res.status(200).json({
                ok: true,
                data: customProperty
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async deleteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await this.customPropertyUseCases.deleteById(id);
            
            if (!deleted) {
                return res.status(404).json({
                    ok: false,
                    message: 'Custom property not found'
                });
            }
            
            return res.status(200).json({
                ok: true,
                message: 'Custom property deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async addProperty(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { key, value } = req.body;
            
            if (!key || !value) {
                return res.status(400).json({
                    ok: false,
                    message: 'Key and value are required'
                });
            }
            
            const customProperty = await this.customPropertyUseCases.addProperty(id, key, value);
            
            if (!customProperty) {
                return res.status(404).json({
                    ok: false,
                    message: 'Custom property not found'
                });
            }
            
            return res.status(200).json({
                ok: true,
                data: customProperty
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getProperty(req: Request, res: Response) {
        try {
            const { id, key } = req.params;
            const value = await this.customPropertyUseCases.getProperty(id, key);
            
            if (value === null) {
                return res.status(404).json({
                    ok: false,
                    message: 'Property not found'
                });
            }
            
            return res.status(200).json({
                ok: true,
                data: { key, value }
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async removeProperty(req: Request, res: Response) {
        try {
            const { id, key } = req.params;
            const customProperty = await this.customPropertyUseCases.removeProperty(id, key);
            
            if (!customProperty) {
                return res.status(404).json({
                    ok: false,
                    message: 'Custom property not found'
                });
            }
            
            return res.status(200).json({
                ok: true,
                data: customProperty
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
} 