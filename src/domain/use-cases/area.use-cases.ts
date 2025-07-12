import { CreateAreaDto } from "../dtos/area/create-area.dto";
import { UpdateAreaDto } from "../dtos/area/update-area.dto";
import { AreaEntity } from "../entities/area.entity";
import { AbsAreaRepository } from "../repositories/area.repository";

export class AreaUseCases {
    constructor(public readonly repository: AbsAreaRepository){}

    async createArea(dto: CreateAreaDto): Promise<AreaEntity>{
        return await this.repository.saveArea(dto);
    }

    async deleteArea(id: string): Promise<AreaEntity>{
        return await this.repository.deleteArea(id);
    }

    async getAreaById(id: string): Promise<AreaEntity | undefined>{
        return await this.repository.getById(id);
    }

    async getAllAreas(): Promise<AreaEntity[]>{
        return await this.repository.getAll();
    }

    async updateArea(dto: UpdateAreaDto): Promise<AreaEntity | undefined>{
        return await this.repository.updateArea(dto);
    }
}