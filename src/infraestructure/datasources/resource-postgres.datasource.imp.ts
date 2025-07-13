
import { AbsResourceDatasource } from "../../domain/datasources/resource.datasource";
import { CreateResourseDto } from "../../domain/dtos/resourse/create-resourse.dto";
import { UpdateResourseDto } from "../../domain/dtos/resourse/update-resourse.dto";
import { ResourceEntity } from "../../domain/entities/resource.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresResourceDatasourceImp implements AbsResourceDatasource{
    async saveResource(resource: CreateResourseDto): Promise<ResourceEntity> {
        const newResource = await prisma.resource.create({
            data: {
                resource_id: resource.resource_id,
                currency: resource.currency,
                description: resource.description,
                measure: resource.measure,
                resourcename: resource.resourcename
            }
        })

        return ResourceEntity.fromObject(newResource)
    }
    
    async getById(id: string): Promise<ResourceEntity | undefined> {
        const resource = await prisma.resource.findUnique({
            where: {resource_id: id}
        });
        if(!resource) return undefined
        return ResourceEntity.fromObject(resource)
    }
    
    async getAll(): Promise<ResourceEntity[]> {
        const resources = await prisma.item.findMany();
        return resources.map((resourse) => ResourceEntity.fromObject(resourse))
    }
    
    async updateResource(resource: UpdateResourseDto): Promise<ResourceEntity | undefined> {
        
        const updateData: any = {};
        if (resource.currency) updateData.currency = resource.currency;
        if (resource.description) updateData.description = resource.description;
        if (resource.measure) updateData.measure = resource.measure
        if (resource.resourcename) updateData.resourcename = resource.resourcename

        const updateResource = await prisma.resourse.update({
            where: {resource_id: resource.resource_id},
            data: updateData
        })

        if(!updateResource) return undefined
        return ResourceEntity.fromObject(updateResource);
    }
    
    async deleteResource(id: string): Promise<ResourceEntity> {
        const deleteResource = await prisma.resource.delete({
            where: {resource_id: id}
        })
        if(!deleteResource) throw new Error("Something happened while attempting to delete data");
        return ResourceEntity.fromObject(deleteResource);
    }

}