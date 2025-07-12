import { CreateItemDto } from "../dtos/item/create-item.dto";
import { UpdateItemDto } from "../dtos/item/update-item.dto";
import { ItemEntity } from "../entities/item.entity";
import { AbsItemRepository } from "../repositories/item.repository";

export class ItemUseCases {
    constructor(public readonly repository: AbsItemRepository){}

    async createItem(dto: CreateItemDto): Promise<ItemEntity>{
        return await this.repository.saveItem(dto);
    }

    async deleteItem(id: string): Promise<ItemEntity>{
        return await this.repository.deleteItem(id);
    }

    async getItemById(id: string): Promise<ItemEntity | undefined>{
        return await this.repository.getById(id);
    }

    async getAllItems(): Promise<ItemEntity[]>{
        return await this.repository.getAll();
    }

    async updateItem(dto: UpdateItemDto): Promise<ItemEntity | undefined>{
        return await this.repository.updateItem(dto);
    }
}