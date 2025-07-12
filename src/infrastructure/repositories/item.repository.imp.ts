import { CreateItemDto } from "../../domain/dtos/item/create-item.dto";
import { UpdateItemDto } from "../../domain/dtos/item/update-item.dto";
import { ItemEntity } from "../../domain/entities/item.entity";
import { AbsItemRepository } from "../../domain/repositories/item.repository";

export class ItemRepositoryImp implements AbsItemRepository{

    constructor(private readonly datasource: AbsItemRepository){}
    saveItem(item: CreateItemDto): Promise<ItemEntity> {
        return this.datasource.saveItem(item);
    }
    getById(id: string): Promise<ItemEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<ItemEntity[]> {
        return this.datasource.getAll();
    }
    updateItem(item: UpdateItemDto): Promise<ItemEntity | undefined> {
        return this.datasource.updateItem(item);
    }
    deleteItem(id: string): Promise<ItemEntity> {
        return this.datasource.deleteItem(id);
    }
    
}