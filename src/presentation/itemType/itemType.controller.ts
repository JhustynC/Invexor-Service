import { RequestHandler } from "express";
import { ItemTypeUseCases } from "../../domain/use-cases/itemType.use-cases";
import { AbsItemTypeRepository } from "../../domain/repositories/itemType.repository";
import { CreateItemTypeDto } from "../../domain/dtos/itemType/create-itemType.dto";

export class ItemTypeController {
    constructor(private readonly itemTypeRepository: AbsItemTypeRepository){}

    public getItemType: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {id_item_type} = req.params;
        
        //? We use the specific use-case
        new ItemTypeUseCases(this.itemTypeRepository)
        .getItemTypeById(Number(id_item_type))
        .then((item) => res.json(item))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getItemTypes:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new ItemTypeUseCases(this.itemTypeRepository)
        .getAllItemTypes()
        .then((items) => res.json(items))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createItemType:RequestHandler = (req, res) => {
        const [error, itemType] = CreateItemTypeDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }

        new ItemTypeUseCases(this.itemTypeRepository)
        .createItemType(itemType!)
        .then((item) => res.json(item))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    /*public updateItem: RequestHandler = (req, res) => {
        const { id_item_type } =  req.params;
        const obj = {...req.body, id_item_type};
        const [error, item] = UpdateItem.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new ItemUseCases(this.itemRepository)
        .updateItem(item!)
        .then((item) => res.json(item))
        .catch((error) => res.status(404).json({error: error.message}));
    }*/

    public deleteItemType: RequestHandler = (req, res) => {
        const {id_item_type} = req.params;

        new ItemTypeUseCases(this.itemTypeRepository)
        .deleteItemType(Number(id_item_type))
        .then((item) => res.json(item))
        .catch((error) => res.status(404).json({error: error.message}));
    }
}