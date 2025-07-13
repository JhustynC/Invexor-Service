import { CreateCustomPropertyDto } from "../dtos/customProperty/create-customProperty.dto";
import { UpdateCustomPropertyDto } from "../dtos/customProperty/update-customProperty.dto";
import { CustomPropertyEntity } from "../entities/customProperty.entity";



export abstract class AbsCustomPropertyDatasource{
    abstract saveCustomProperty(user: CreateCustomPropertyDto): Promise<CustomPropertyEntity>;
    abstract getByEntityId_nameProperty(entity_id:string, nameproperty: string): Promise<CustomPropertyEntity | undefined>;
    abstract getAllByEntityId(entity_id:string): Promise<CustomPropertyEntity[]>;
    abstract updateCustomProperty(customProperty: UpdateCustomPropertyDto): Promise<CustomPropertyEntity | undefined>;
    abstract deleteUser(entity_id:string, nameproperty: string): Promise<CustomPropertyEntity>;
}