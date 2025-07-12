import { CreateResourseDto } from "../dtos/resourse/create-resourse.dto";
import { UpdateResourseDto } from "../dtos/resourse/update-resourse.dto";
import { ResourceEntity } from "../entities/resource.entity";
import { AbsResourceRepository } from "../repositories/resource.repository";

export class ResourceUseCases {
    constructor(public readonly repository: AbsResourceRepository){}

    async createResource(dto: CreateResourseDto): Promise<ResourceEntity>{
        return await this.repository.saveResource(dto);
    }

    async deleteResource(id: string): Promise<ResourceEntity>{
        return await this.repository.deleteResource(id);
    }

    async getResourceById(id: string): Promise<ResourceEntity | undefined>{
        return await this.repository.getById(id);
    }

    async getAllResources(): Promise<ResourceEntity[]>{
        return await this.repository.getAll();
    }

    async updateResource(dto: UpdateResourseDto): Promise<ResourceEntity | undefined>{
        return await this.repository.updateResource(dto);
    }
}