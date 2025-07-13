import { CustomPropertyModel } from "../../config/data/mongo/models/custom-property.model";
import { AbsCustomPropertyDatasource } from "../../domain/datasources/customProperty.datasource";
import { CreateCustomPropertyDto } from "../../domain/dtos/customProperty/create-customProperty.dto";
import { UpdateCustomPropertyDto } from "../../domain/dtos/customProperty/update-customProperty.dto";
import { CustomPropertyEntity } from "../../domain/entities/customProperty.entity";


export class MongoCustomPropertyDatasourceImp implements AbsCustomPropertyDatasource{
    async getByEntityId_nameProperty(entity_id: string, nameproperty: string): Promise<CustomPropertyEntity | undefined> {
        const customProperty = await CustomPropertyModel.findOne({entity_id: entity_id, nameproperty: nameproperty});
        if(!customProperty) return undefined;
        return CustomPropertyEntity.fromObject(customProperty)
        throw new Error("Method not implemented.");
    }
    async getAllByEntityId(entity_id: string): Promise<CustomPropertyEntity[]> {
        const customProperty = await CustomPropertyModel.find({entity_id: entity_id});
        return customProperty.map((u) => CustomPropertyEntity.fromObject(u))
    }
    async saveCustomProperty(customProperty: CreateCustomPropertyDto): Promise<CustomPropertyEntity>{
        const newCustomProperty = await CustomPropertyModel.create(customProperty)
        return CustomPropertyEntity.fromObject(newCustomProperty)
    }
    async updateCustomProperty(customProperty: UpdateCustomPropertyDto): Promise<CustomPropertyEntity | undefined> {
        const updateFields: {[key:string]: any} = {...customProperty.values};
        const updatedCustomProperty = await CustomPropertyModel.findOneAndReplace(
            {$set: updateFields},
            {new: true}
        )
        
        if(!updatedCustomProperty) return undefined;
        return CustomPropertyEntity.fromObject(updatedCustomProperty)
        //throw new Error("Method not implemented.");
    }
    async deleteUser(entity_id:string, nameproperty: string): Promise<CustomPropertyEntity> {
        const deleteCustomProperty = await CustomPropertyModel.findOneAndDelete({entity_id: entity_id, nameproperty: nameproperty})
        if(!deleteCustomProperty) throw new Error("Something happens while It was attempted delete data");
        return CustomPropertyEntity.fromObject(deleteCustomProperty)
        //throw new Error("Method not implemented.");
    }
    
}