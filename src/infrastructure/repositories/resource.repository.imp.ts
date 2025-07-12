import { CreateResourseDto } from "../../domain/dtos/resourse/create-resourse.dto";
import { UpdateResourseDto } from "../../domain/dtos/resourse/update-resourse.dto";
import { ResourceEntity } from "../../domain/entities/resource.entity";
import { AbsResourceRepository } from "../../domain/repositories/resource.repository";

export class ResourceRepositoryImp implements AbsResourceRepository{

    constructor(private readonly datasource: AbsResourceRepository){}
    saveResource(item: CreateResourseDto): Promise<ResourceEntity> {
        return this.datasource.saveResource(item);
    }
    getById(id: string): Promise<ResourceEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<ResourceEntity[]> {
        return this.datasource.getAll();
    }
    updateResource(resource: UpdateResourseDto): Promise<ResourceEntity | undefined> {
        return this.datasource.updateResource(resource);
    }
    deleteResource(id: string): Promise<ResourceEntity> {
        return this.datasource.deleteResource(id);
    }
    
}