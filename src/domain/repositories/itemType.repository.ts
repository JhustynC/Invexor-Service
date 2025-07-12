import { CreateItemTypeDto } from "../dtos/itemType/create-itemType.dto";
import { ItemTypeEntity } from "../entities/itemType.entity";

//? Rules
export abstract class AbsItemTypeRepository {
    abstract saveItem(item: CreateItemTypeDto): Promise<ItemTypeEntity>;
    abstract getById(id: string): Promise<ItemTypeEntity | undefined>;
    abstract getAll(): Promise<ItemTypeEntity[]>;
    //abstract updateItem(item: UpdateItemTypeDto): Promise<ItemTypeEntity | undefined>;
    abstract deleteItem(id: string): Promise<ItemTypeEntity>;
}