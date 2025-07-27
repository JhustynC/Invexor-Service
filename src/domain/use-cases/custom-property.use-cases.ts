import { CustomProperty, CreateCustomPropertyDto, UpdateCustomPropertyDto } from '../entities/custom-property.entity';
import { CustomPropertyRepository } from '../repositories/custom-property.repository';

export class CustomPropertyUseCases {
    constructor(private readonly customPropertyRepository: CustomPropertyRepository) {}

    async create(createCustomPropertyDto: CreateCustomPropertyDto): Promise<CustomProperty> {
        return await this.customPropertyRepository.create(createCustomPropertyDto);
    }

    async findAll(): Promise<CustomProperty[]> {
        return await this.customPropertyRepository.findAll();
    }

    async findById(id: string): Promise<CustomProperty | null> {
        return await this.customPropertyRepository.findById(id);
    }

    async updateById(id: string, updateCustomPropertyDto: UpdateCustomPropertyDto): Promise<CustomProperty | null> {
        return await this.customPropertyRepository.updateById(id, updateCustomPropertyDto);
    }

    async deleteById(id: string): Promise<boolean> {
        return await this.customPropertyRepository.deleteById(id);
    }

    async addProperty(id: string, key: string, value: string): Promise<CustomProperty | null> {
        return await this.customPropertyRepository.addProperty(id, key, value);
    }

    async getProperty(id: string, key: string): Promise<string | null> {
        return await this.customPropertyRepository.getProperty(id, key);
    }

    async removeProperty(id: string, key: string): Promise<CustomProperty | null> {
        return await this.customPropertyRepository.removeProperty(id, key);
    }
} 