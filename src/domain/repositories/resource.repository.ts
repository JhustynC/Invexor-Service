import { CreateResourseDto } from "../dtos/resourse/create-resourse.dto";
import { UpdateResourseDto } from "../dtos/resourse/update-resourse.dto";
import { ResourceEntity } from "../entities/resource.entity";

//? Rules
export abstract class AbsResourceRepository {
    abstract saveResource(item: CreateResourseDto): Promise<ResourceEntity>;
    abstract getById(id: string): Promise<ResourceEntity | undefined>;
    abstract getAll(): Promise<ResourceEntity[]>;
    abstract updateResource(resource: UpdateResourseDto): Promise<ResourceEntity | undefined>;
    abstract deleteResource(id: string): Promise<ResourceEntity>;
}