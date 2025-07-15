import { CreateItemTypeDto } from "../dtos/itemType/create-itemType.dto";
import { ItemTypeEntity } from "../entities/itemType.entity";
import { AbsItemTypeRepository } from "../repositories/itemType.repository";

export class ItemTypeUseCases {
    constructor(public readonly repository: AbsItemTypeRepository){}

    async createItemType(dto: CreateItemTypeDto): Promise<ItemTypeEntity>{
        return await this.repository.saveItemType(dto);
    }

    async deleteItemType(id: number): Promise<ItemTypeEntity>{
        return await this.repository.deleteItemType(id);
    }

    async getItemTypeById(id: number): Promise<ItemTypeEntity | undefined>{
        return await this.repository.getById(id);
    }

    async getAllItemTypes(): Promise<ItemTypeEntity[]>{
        return await this.repository.getAll();
    }

    /*async updateArea(dto: UpdateAreaDto): Promise<AreaEntity | undefined>{
        return await this.repository.updateArea(dto);
    }*/
}