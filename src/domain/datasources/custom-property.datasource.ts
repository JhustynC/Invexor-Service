import { CustomProperty, CreateCustomPropertyDto, UpdateCustomPropertyDto } from '../entities/custom-property.entity';

export abstract class CustomPropertyDatasource {
    abstract create(createCustomPropertyDto: CreateCustomPropertyDto): Promise<CustomProperty>;
    abstract findAll(): Promise<CustomProperty[]>;
    abstract findById(id: string): Promise<CustomProperty | null>;
    abstract updateById(id: string, updateCustomPropertyDto: UpdateCustomPropertyDto): Promise<CustomProperty | null>;
    abstract deleteById(id: string): Promise<boolean>;
    abstract addProperty(id: string, key: string, value: string): Promise<CustomProperty | null>;
    abstract getProperty(id: string, key: string): Promise<string | null>;
    abstract removeProperty(id: string, key: string): Promise<CustomProperty | null>;
}