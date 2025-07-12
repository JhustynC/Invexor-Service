import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";
import { AreaEntity } from "../../domain/entities/area.entity";
import { AbsAreaRepository } from "../../domain/repositories/area.repository";

export class AreaRepositoryImp implements AbsAreaRepository{

    constructor(private readonly datasource: AbsAreaRepository){}
    saveArea(area: CreateAreaDto): Promise<AreaEntity> {
        return this.datasource.saveArea(area);
    }
    getById(id: string): Promise<AreaEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<AreaEntity[]> {
        return this.datasource.getAll();
    }
    updateArea(area: UpdateAreaDto): Promise<AreaEntity | undefined> {
        return this.datasource.updateArea(area);
    }
    deleteArea(id: string): Promise<AreaEntity> {
        return this.datasource.deleteArea(id);
    }
}