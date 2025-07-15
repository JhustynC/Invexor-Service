import { AbsAreaDatasource } from "../../domain/datasources/area.datasource";
import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";
import { AreaEntity } from "../../domain/entities/area.entity";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresAreaDatasourceImp implements AbsAreaDatasource{

    async saveArea(area: CreateAreaDto): Promise<AreaEntity> {
        const newArea = await prisma.area.create({
            data: {
                id_area: String(area.id_area),
                name_area: area.name_area,
                id_branch: area.id_branch,
                description: area.description,
                state: area.state,
                id_pattern_area: area.id_pattern_area,
                phone: area.phone,
                id_entity: area.id_entity
            }
        })
        return AreaEntity.fromObject(newArea)
    }

    async getById(id: string): Promise<AreaEntity | undefined> {
        const area = await prisma.area.findUnique({
            where: { id_area: id }
        });
        if (!area) return undefined;
        return AreaEntity.fromObject(area);
    }
    async getAll(): Promise<AreaEntity[]> {
        const areas = await prisma.area.findMany();
        return areas.map((area) => AreaEntity.fromObject(area));
    }
    async updateArea(area: UpdateAreaDto): Promise<AreaEntity | undefined> {

        const updateData: any={};
        if(area.id_area) updateData.id_area = area.id_area;
        if(area.name_area) updateData.name_area = area.name_area;
        if(area.state) updateData.state = area.state;
        if(area.description) updateData.description = area.description;
        if(area.id_branch) updateData.id_branch = area.id_branch;
        if(area.id_pattern_area) updateData.id_pattern_area = area.id_pattern_area
        if(area.phone) updateData.phone = area.phone;

        // Map UpdateAreaDto fields to match the database column names
        const mappedUpdateData: any = {};
        if (area.name_area) mappedUpdateData.name_area = area.name_area;
        if (area.state !== undefined) mappedUpdateData.state = area.state;
        if (area.description) mappedUpdateData.description = area.description;
        if (area.id_branch) mappedUpdateData.id_branch = area.id_branch;
        if (area.id_pattern_area) mappedUpdateData.id_pattern_area = area.id_pattern_area;
        if (area.phone) mappedUpdateData.phone = area.phone;

        const updateArea = await prisma.area.update({
            where: { id_area: String(area.id_area) },
            data: mappedUpdateData
        });

        if (!updateArea) return undefined;
        return AreaEntity.fromObject(updateArea)
    }

    async deleteArea(id: string): Promise<AreaEntity> {
        const deletedArea = await prisma.area.delete({
            where: { id_area: id }
        });
        if (!deletedArea) throw new Error("Something happened while attempting to delete data");
        return AreaEntity.fromObject(deletedArea);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
    
}