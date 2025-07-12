import { CreateAreaDto } from "../dtos/area/create-area.dto";
import { UpdateAreaDto } from "../dtos/area/update-area.dto";
import { AreaEntity } from "../entities/area.entity";

//? Rules
export abstract class AbsAreaDatasource {
    abstract saveArea(area: CreateAreaDto): Promise<AreaEntity>;
    abstract getById(id: string): Promise<AreaEntity | undefined>;
    abstract getAll(): Promise<AreaEntity[]>;
    abstract updateArea(area: UpdateAreaDto): Promise<AreaEntity | undefined>;
    abstract deleteArea(id: string): Promise<AreaEntity>;
}