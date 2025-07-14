import { RequestHandler } from "express";
import { AbsEntityRepository } from "../../domain/repositories/entity.repository";
import { EntityUseCases } from "../../domain/use-cases/entity.use-cases";
import { CreateEntityDto } from "../../domain/dtos/entity/create-entity.dto";

export class EntityController {
    constructor(private readonly entityRepository: AbsEntityRepository){}

    public getEntity: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {id_entity} = req.params;

        //? We use the specific use-case
        new EntityUseCases(this.entityRepository)
        .getEntityById(id_entity)
        .then((entity) => res.json(entity))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getEntities:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new EntityUseCases(this.entityRepository)
        .getAllEntities()
        .then((entities) => res.json(entities))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createEntity:RequestHandler = (req, res) => {
        const [error, entity] = CreateEntityDto.create(req.body);
        
        if(error){
            res.status(400).json({error});
            return;
        }

        new EntityUseCases(this.entityRepository)
        .createEntity(entity!)
        .then((entity) => res.json(entity))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    /*public updateEntity: RequestHandler = (req, res) => {
        const { entity_id } =  req.params;
        const obj = {...req.body, entity_id};
        const [error, entity] = UpdateEntityDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new UserUseCases(this.userRepository)
        .updateUser(user!)
        .then((user) => res.json(user))
        .catch((error) => res.status(404).json({error: error.message}));
    }*/

    public deleteEntity: RequestHandler = (req, res) => {
        const {id_entity} = req.params;

        new EntityUseCases(this.entityRepository)
        .deleteEntity(id_entity)
        .then((entity) => res.json(entity))
        .catch((error) => res.status(404).json({error: error.message}));
    }
}