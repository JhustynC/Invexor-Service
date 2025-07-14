import { CreateEntityDto } from "../dtos/entity/create-entity.dto";
import { EntityEntity } from "../entities/entity.entity";

//? Rules
export abstract class AbsEntityRepository {
    abstract saveEntity(entity: CreateEntityDto): Promise<EntityEntity>;
    abstract getById(id: string): Promise<EntityEntity | undefined>;
    abstract getAll(): Promise<EntityEntity[]>;
    //abstract updateEntity(entity: UpdateEntityDto): Promise<EntityEntity | undefined>;
    abstract deleteEntity(id: string): Promise<EntityEntity>;
}