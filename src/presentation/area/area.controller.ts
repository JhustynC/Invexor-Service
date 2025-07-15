import { RequestHandler } from "express";
import { AbsAreaRepository } from "../../domain/repositories/area.repository";
import { AreaUseCases } from "../../domain/use-cases/area.use-cases";
import { CreateAreaDto } from "../../domain/dtos/area/create-area.dto";
import { UpdateAreaDto } from "../../domain/dtos/area/update-area.dto";

export class AreaController {
    constructor(private readonly areaRepository: AbsAreaRepository){}

    public getArea: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {id_area} = req.params;

        //? We use the specific use-case
        new AreaUseCases(this.areaRepository)
        .getAreaById(id_area)
        .then((area) => res.json(area))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getAreas:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new AreaUseCases(this.areaRepository)
        .getAllAreas()
        .then((areas) => res.json(areas))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createArea:RequestHandler = (req, res) => {
        const [error, area] = CreateAreaDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }

        new AreaUseCases(this.areaRepository)
        .createArea(area!)
        .then((area) => res.json(area))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public updateArea: RequestHandler = (req, res) => {
        const { id_area } =  req.params;
        const obj = {...req.body, id_area};
        const [error, area] = UpdateAreaDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new AreaUseCases(this.areaRepository)
        .updateArea(area!)
        .then((area) => res.json(area))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteArea: RequestHandler = (req, res) => {
        const {id_area} = req.params;

        new AreaUseCases(this.areaRepository)
        .deleteArea(id_area)
        .then((area) => res.json(area))
        .catch((error) => res.status(404).json({error: error.message}));
    }
}