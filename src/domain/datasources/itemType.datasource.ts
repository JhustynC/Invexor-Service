import { CreateItemTypeDto } from "../dtos/itemType/create-itemType.dto";
import { ItemTypeEntity } from "../entities/itemType.entity";

//? Rules
export abstract class AbsItemTypeDatasource {
    abstract saveItemType(itemType: CreateItemTypeDto): Promise<ItemTypeEntity>;
    abstract getById(id: string): Promise<ItemTypeEntity | undefined>;
    abstract getAll(): Promise<ItemTypeEntity[]>;
    //abstract updateItemType(itemType: UpdateItemT): Promise<ItemTypeEntity | undefined>;
    abstract deleteItemType(id: string): Promise<ItemTypeEntity>;
}