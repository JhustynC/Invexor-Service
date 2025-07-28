import { AbsAreaDatasource } from "../../domain/datasources/area.datasource";
import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";
import { AreaEntity } from "../../domain/entities/area.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresAreaDatasourceImp implements AbsAreaDatasource{

    async saveArea(area: CreateAreaDto): Promise<AreaEntity> {
        const newArea = await prisma.area.create({
            data: {
                area_id: String(area.area_id),
                areaname: area.areaname,
                branch_id: area.branch_id,
                description: area.description,
                active: area.active,
                pattern_area_id: area.pattern_area_id,
                phone: area.phone,
                id_entity: area.id_entity
            }
        })
        return AreaEntity.fromObject(newArea)
    }

    async getById(id: string): Promise<AreaEntity | undefined> {
        const area = await prisma.area.findUnique({
            where: { area_id: id }
        });
        if (!area) return undefined;
        return AreaEntity.fromObject(area);
    }
    async getAll(): Promise<AreaEntity[]> {
        const areas = await prisma.area.findMany();
        return areas.map((area) => AreaEntity.fromObject(area));
    }
    async updateArea(area: UpdateAreaDto): Promise<AreaEntity | undefined> {

        // Map UpdateAreaDto fields to match the database column names
        const mappedUpdateData: any = {};
        if (area.areaname) mappedUpdateData.areaname = area.areaname;
        if (area.active !== undefined) mappedUpdateData.active = area.active;
        if (area.description) mappedUpdateData.description = area.description;
        if (area.branch_id) mappedUpdateData.branch_id = area.branch_id;
        if (area.pattern_area_id) mappedUpdateData.pattern_area_id = area.pattern_area_id;
        if (area.phone) mappedUpdateData.phone = area.phone;
        if (area.id_entity) mappedUpdateData.id_entity = area.id_entity;

        const updateArea = await prisma.area.update({
            where: { area_id: String(area.area_id) },
            data: mappedUpdateData
        });

        if (!updateArea) return undefined;
        return AreaEntity.fromObject(updateArea)
    }

    async deleteArea(id: string): Promise<AreaEntity> {
        const deletedArea = await prisma.area.delete({
            where: { area_id: id }
        });
        if (!deletedArea) throw new Error("Something happened while attempting to delete data");
        return AreaEntity.fromObject(deletedArea);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
    
}