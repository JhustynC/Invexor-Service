import { CreateEntityDto } from "../dtos/entity/create-entity.dto";
import { EntityEntity } from "../entities/entity.entity";
import { AbsEntityRepository } from "../repositories/entity.repository";

export class EntityUseCases {
    constructor(public readonly repository: AbsEntityRepository){}

    async createEntity(dto: CreateEntityDto): Promise<EntityEntity>{
        return await this.repository.saveEntity(dto);
    }

    async deleteEntity(id: string): Promise<EntityEntity>{
        return await this.repository.deleteEntity(id);
    }

    async getEntityById(id: string): Promise<EntityEntity | undefined>{
        return await this.repository.getById(id);
    }

    async getAllEntities(): Promise<EntityEntity[]>{
        return await this.repository.getAll();
    }

    /*async updateEntity(dto: UpdateEntityDto): Promise<EntityEntity | undefined>{
        return await this.repository.updateEntity(dto);
    }*/
}