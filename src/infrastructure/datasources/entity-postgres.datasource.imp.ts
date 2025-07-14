import { AbsAreaDatasource } from "../../domain/datasources/area.datasource";
import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";
import { AreaEntity } from "../../domain/entities/area.entity";
import { prisma } from "../../config/data/postgres/postgres.config";
import { AbsEntityDatasource } from "../../domain/datasources/entity.datasource";
import { CreateEntityDto } from "../../domain/dtos/entity/create-entity.dto";
import { EntityEntity } from "../../domain/entities/entity.entity";

export class PostgresEntityDatasourceImp implements AbsEntityDatasource{

    async saveEntity(entity: CreateEntityDto): Promise<EntityEntity> {
        const newEntity = await prisma.entity.create({
            data: {
                id_entity: entity.id_entity,
                id_type_entity: entity.id_type_entity
            }
        })
        return EntityEntity.fromObject(newEntity)
    }

    async getById(id: string): Promise<EntityEntity | undefined> {
        const entity = await prisma.entity.findUnique({
            where: { id }
        });
        if(!entity) return undefined
        return EntityEntity.fromObject(entity);
    }
    async getAll(): Promise<EntityEntity[]> {
        const entities = await prisma.entity.findMany();
        return entities.map((entity) => EntityEntity.fromObject(entity));
    }
    /*async updateArea(area: UpdateAreaDto): Promise<AreaEntity | undefined> {

        const updateData: any={};
        if(area.areaname) updateData.areaname = area.areaname;
        if(area.active) updateData.active = area.active;
        if(area.description) updateData.description = area.description;
        if(area.branch_id) updateData.branch_id = area.branch_id;
        if(area.pattern_area_id) updateData.pattern_area_id = area.pattern_area_id
        if(area.phone) updateData.phone = area.phone;

        const updateArea = await prisma.area.update({
            where: {area_id: area.area_id},
            data: updateData
        })

        if(!updateData) return undefined;
        return AreaEntity.fromObject(updateArea)
    }*/

    async deleteEntity(id: string): Promise<EntityEntity> {
        const deleteEntity = await prisma.entity.delete({
            where: { id_entity: id }
        })
        if (!deleteEntity) throw new Error("Something happened while attempting to delete data");
        return EntityEntity.fromObject(deleteEntity);
    }

    async disconnect(): Promise<void> {
        await prisma.$disconnect();
    }
    
}