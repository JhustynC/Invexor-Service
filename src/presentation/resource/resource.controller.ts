import { RequestHandler } from "express";
import { AbsResourceRepository } from "../../domain/repositories/resource.repository";
import { ResourceUseCases } from "../../domain/use-cases/resource.use-cases";
import { UpdateResourseDto } from "../../domain/dtos/resourse/update-resourse.dto";
import { CreateResourseDto } from "../../domain/dtos/resourse/create-resourse.dto";

export class ResourceController {
    constructor(private readonly resourceRepository: AbsResourceRepository){}

    public getResource: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {resource_id} = req.params;
        
        //? We use the specific use-case
        new ResourceUseCases(this.resourceRepository)
        .getResourceById(resource_id)
        .then((resource) => res.json(resource))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getResources:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new ResourceUseCases(this.resourceRepository)
        .getAllResources()
        .then((resources) => res.json(resources))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createResource:RequestHandler = (req, res) => {
        const [error, resource] = CreateResourseDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }

        new ResourceUseCases(this.resourceRepository)
        .createResource(resource!)
        .then((resource) => res.json(resource))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public updateResource: RequestHandler = (req, res) => {
        const { id } =  req.params;
        const obj = {...req.body, id};
        const [error, resource] = UpdateResourseDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new ResourceUseCases(this.resourceRepository)
        .updateResource(resource!)
        .then((resource) => res.json(resource))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteResource: RequestHandler = (req, res) => {
        const { id } = req.params;

        new ResourceUseCases(this.resourceRepository)
        .deleteResource(id)
        .then((resource) => res.json(resource))
        .catch((error) => res.status(404).json({error: error.message}));
    }
}