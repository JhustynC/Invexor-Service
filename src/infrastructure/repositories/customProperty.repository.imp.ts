import { CustomPropertyRepository } from '../../domain/repositories/custom-property.repository';
import { CustomProperty, CreateCustomPropertyDto, UpdateCustomPropertyDto } from '../../domain/entities/custom-property.entity';
import { CustomPropertyMongoDatasource } from '../datasources/customProperty-mongo.datasource.imp';

export class CustomPropertyRepositoryImpl implements CustomPropertyRepository {
    
    constructor(
        private readonly datasource: CustomPropertyMongoDatasource
    ) {}

    async create(createCustomPropertyDto: CreateCustomPropertyDto): Promise<CustomProperty> {
        return await this.datasource.create(createCustomPropertyDto);
    }

    async findAll(): Promise<CustomProperty[]> {
        return await this.datasource.findAll();
    }

    async findById(id: string): Promise<CustomProperty | null> {
        return await this.datasource.findById(id);
    }

    async updateById(id: string, updateCustomPropertyDto: UpdateCustomPropertyDto): Promise<CustomProperty | null> {
        return await this.datasource.updateById(id, updateCustomPropertyDto);
    }

    async deleteById(id: string): Promise<boolean> {
        return await this.datasource.deleteById(id);
    }

    async addProperty(id: string, key: string, value: string): Promise<CustomProperty | null> {
        return await this.datasource.addProperty(id, key, value);
    }

    async getProperty(id: string, key: string): Promise<string | null> {
        return await this.datasource.getProperty(id, key);
    }

    async removeProperty(id: string, key: string): Promise<CustomProperty | null> {
        return await this.datasource.removeProperty(id, key);
    }
} 