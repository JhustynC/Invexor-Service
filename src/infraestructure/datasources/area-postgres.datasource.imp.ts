import { AbsAreaDatasource } from "../../domain/datasources/area.datasource";
import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";
import { AreaEntity } from "../../domain/entities/area.entity";
import { prisma } from "../../config/data/postgres/postgres.config"
import { UserEntity } from "../../domain/entities/user.entity";


export class PostgresAreaDatasourceImp implements AbsAreaDatasource{

    async saveArea(area: CreateAreaDto): Promise<AreaEntity> {
        const newArea = await prisma.area.create({
            data: {
                area_id: area.area_id,
                areaname: area.areaname,
                branch_id: area.branch_id,
                description: area.description,
                active: area.active,
                pattern_area_id: area.pattern_area_id,
                phone:area.phone
            }
        })
        return AreaEntity.fromObject(newArea)
    }

    async getById(id: string): Promise<AreaEntity | undefined> {
        const area = await prisma.area.findUnique({
            where: { id }
        });
        if(!area) return undefined
        return AreaEntity.fromObject(area)
        //throw new Error("Method not implemented.");
    }
    async getAll(): Promise<AreaEntity[]> {
        const areas = await prisma.area.findMany();
        return areas.map((area) => UserEntity.fromObject(area))
        //throw new Error("Method not implemented.");
    }
    async updateArea(area: UpdateAreaDto): Promise<AreaEntity | undefined> {

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
    }

    async deleteArea(id: string): Promise<AreaEntity> {
        const deleteArea = await prisma.user.delete({
            where: {area_id: id}
        })
        if (!deleteArea) throw new Error("Something happened while attempting to delete data");
        return AreaEntity.fromObject(deleteArea);
    }

    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
    
}