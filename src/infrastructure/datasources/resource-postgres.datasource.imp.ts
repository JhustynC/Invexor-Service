
import { AbsResourceDatasource } from "../../domain/datasources/resource.datasource";
import { CreateResourseDto } from "../../domain/dtos/resourse/create-resourse.dto";
import { UpdateResourseDto } from "../../domain/dtos/resourse/update-resourse.dto";
import { ResourceEntity } from "../../domain/entities/resource.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresResourceDatasourceImp implements AbsResourceDatasource{
    async saveResource(resource: CreateResourseDto): Promise<ResourceEntity> {
        const newResource = await prisma.resource.create({
            data: {
                id_resource: resource.resource_id,
                name_resource: resource.resourcename,
                measure: resource.measure,
                currency: resource.currency,
                description: resource.description,
                id_entity: Number(resource.id_entity)
            }
        })

        return ResourceEntity.fromObject(newResource)
    }
    
    async getById(id: string): Promise<ResourceEntity | undefined> {
        const resource = await prisma.resource.findUnique({
            where: {id_resource: id}
        });
        if(!resource) return undefined
        return ResourceEntity.fromObject(resource)
    }
    
    async getAll(): Promise<ResourceEntity[]> {
        const resources = await prisma.resource.findMany();
        return resources.map((resource) => ResourceEntity.fromObject(resource))
    }
    
    async updateResource(resource: UpdateResourseDto): Promise<ResourceEntity | undefined> {
        
        const updateData: any = {};
        if (resource.resourcename) updateData.name_resource = resource.resourcename;
        if (resource.measure) updateData.measure = resource.measure;
        if (resource.currency) updateData.currency = resource.currency;
        if (resource.description) updateData.description = resource.description;

        const updateResource = await prisma.resource.update({
            where: {id_resource: resource.resource_id},
            data: updateData
        })

        if(!updateResource) return undefined
        return ResourceEntity.fromObject(updateResource);
    }
    
    async deleteResource(id: string): Promise<ResourceEntity> {
        const deleteResource = await prisma.resource.delete({
            where: {id_resource: id}
        })
        if(!deleteResource) throw new Error("Something happened while attempting to delete data");
        return ResourceEntity.fromObject(deleteResource);
    }

}