import { CreateItemDto } from "../dtos/item/create-item.dto";
import { UpdateItemDto } from "../dtos/item/update-item.dto";
import { ItemEntity } from "../entities/item.entity";

//? Rules
export abstract class AbsItemDatasource {
    abstract saveItem(item: CreateItemDto): Promise<ItemEntity>;
    abstract getById(id: string): Promise<ItemEntity | undefined>;
    abstract getAll(): Promise<ItemEntity[]>;
    abstract updateItem(item: UpdateItemDto): Promise<ItemEntity | undefined>;
    abstract deleteItem(id: string): Promise<ItemEntity>;
}