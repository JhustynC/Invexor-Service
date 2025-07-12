import { CreateItemTypeDto } from "../../domain/dtos/itemType/create-itemType.dto";
import { ItemTypeEntity } from "../../domain/entities/itemType.entity";
import { AbsItemTypeRepository } from "../../domain/repositories/itemType.repository";

export class ItemTypeRepositoryImp implements AbsItemTypeRepository{

    constructor(private readonly datasource: AbsItemTypeRepository){}
    saveItemType(item: CreateItemTypeDto): Promise<ItemTypeEntity> {
        return this.datasource.saveItemType(item);
    }
    getById(id: string): Promise<ItemTypeEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<ItemTypeEntity[]> {
        return this.datasource.getAll();
    }
    deleteItemType(id: string): Promise<ItemTypeEntity> {
        return this.datasource.deleteItemType(id);
    }
    
}