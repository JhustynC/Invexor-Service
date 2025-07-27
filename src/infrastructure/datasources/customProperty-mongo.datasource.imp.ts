import { CustomPropertyDatasource } from '../../domain/datasources/custom-property.datasource';
import { CustomProperty, CreateCustomPropertyDto, UpdateCustomPropertyDto } from '../../domain/entities/custom-property.entity';
import { CustomPropertyModel } from '../../config/data/mongo/models/custom-property.model';

export class CustomPropertyMongoDatasource implements CustomPropertyDatasource {
    
    async create(createCustomPropertyDto: CreateCustomPropertyDto): Promise<CustomProperty> {
        const customProperty = new CustomPropertyModel(createCustomPropertyDto);
        const savedCustomProperty = await customProperty.save();
        
        return {
            _id: savedCustomProperty._id,
            properties: savedCustomProperty.getAllProperties(),
            createdAt: savedCustomProperty.createdAt,
            updatedAt: savedCustomProperty.updatedAt
        };
    }

    async findAll(): Promise<CustomProperty[]> {
        const customProperties = await CustomPropertyModel.find();
        
        return customProperties.map(cp => ({
            _id: cp._id,
            properties: cp.getAllProperties(),
            createdAt: cp.createdAt,
            updatedAt: cp.updatedAt
        }));
    }

    async findById(id: string): Promise<CustomProperty | null> {
        const customProperty = await CustomPropertyModel.findById(id);
        
        if (!customProperty) return null;
        
        return {
            _id: customProperty._id,
            properties: customProperty.getAllProperties(),
            createdAt: customProperty.createdAt,
            updatedAt: customProperty.updatedAt
        };
    }

    async updateById(id: string, updateCustomPropertyDto: UpdateCustomPropertyDto): Promise<CustomProperty | null> {
        const customProperty = await CustomPropertyModel.findById(id);
        
        if (!customProperty) return null;
        
        if (updateCustomPropertyDto.properties) {
            // Actualizar todas las propiedades
            for (const [key, value] of Object.entries(updateCustomPropertyDto.properties)) {
                customProperty.properties.set(key, value);
            }
        }
        
        const updatedCustomProperty = await customProperty.save();
        
        return {
            _id: updatedCustomProperty._id,
            properties: updatedCustomProperty.getAllProperties(),
            createdAt: updatedCustomProperty.createdAt,
            updatedAt: updatedCustomProperty.updatedAt
        };
    }

    async deleteById(id: string): Promise<boolean> {
        const result = await CustomPropertyModel.findByIdAndDelete(id);
        return result !== null;
    }

    async addProperty(id: string, key: string, value: string): Promise<CustomProperty | null> {
        const customProperty = await CustomPropertyModel.findById(id);
        
        if (!customProperty) return null;
        
        await customProperty.addProperty(key, value);
        
        return {
            _id: customProperty._id,
            properties: customProperty.getAllProperties(),
            createdAt: customProperty.createdAt,
            updatedAt: customProperty.updatedAt
        };
    }

    async getProperty(id: string, key: string): Promise<string | null> {
        const customProperty = await CustomPropertyModel.findById(id);
        
        if (!customProperty) return null;
        
        const value = customProperty.getProperty(key);
        return value || null;
    }

    async removeProperty(id: string, key: string): Promise<CustomProperty | null> {
        const customProperty = await CustomPropertyModel.findById(id);
        
        if (!customProperty) return null;
        
        await customProperty.removeProperty(key);
        
        return {
            _id: customProperty._id,
            properties: customProperty.getAllProperties(),
            createdAt: customProperty.createdAt,
            updatedAt: customProperty.updatedAt
        };
    }
}