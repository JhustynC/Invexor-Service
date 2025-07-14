import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";
import { CreateEntityDto } from "../../domain/dtos/entity/create-entity.dto";
import { AreaEntity } from "../../domain/entities/area.entity";
import { EntityEntity } from "../../domain/entities/entity.entity";
import { AbsAreaRepository } from "../../domain/repositories/area.repository";
import { AbsEntityRepository } from "../../domain/repositories/entity.repository";

export class EntityRepositoryImp implements AbsEntityRepository{

    constructor(private readonly datasource: AbsEntityRepository){}
    saveEntity(entity: CreateEntityDto): Promise<EntityEntity> {
        return this.datasource.saveEntity(entity);
    }
    getById(id: string): Promise<EntityEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<EntityEntity[]> {
        return this.datasource.getAll();
    }
    /*updateEntity(entity: UpdateEntityDto): Promise<EntityEntity | undefined> {
        return this.datasource.updateEntity(entity);
    }*/
    deleteEntity(id: string): Promise<EntityEntity> {
        return this.datasource.deleteEntity(id);
    }
}