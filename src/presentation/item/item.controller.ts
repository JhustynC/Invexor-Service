import { RequestHandler } from "express";
import { AbsItemRepository } from "../../domain/repositories/item.repository";
import { ItemUseCases } from "../../domain/use-cases/item.use-cases";
import { CreateItemDto } from "../../domain/dtos/item/create-item.dto";
import { UpdateItemDto } from "../../domain/dtos/item/update-item.dto";

export class ItemController {
    constructor(private readonly itemRepository: AbsItemRepository){}

    public getItem: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {item_id} = req.params;
        
        //? We use the specific use-case
        new ItemUseCases(this.itemRepository)
        .getItemById(item_id)
        .then((item) => res.json(item))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getItems:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new ItemUseCases(this.itemRepository)
        .getAllItems()
        .then((items) => res.json(items))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createItem:RequestHandler = (req, res) => {
        const [error, item] = CreateItemDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }

        new ItemUseCases(this.itemRepository)
        .createItem(item!)
        .then((item) => res.json(item))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public updateItem: RequestHandler = (req, res) => {
        const { id_item } =  req.params;
        const obj = {...req.body, id_item: id_item};
        const [error, item] = UpdateItemDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new ItemUseCases(this.itemRepository)
        .updateItem(item!)
        .then((item) => res.json(item))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteItem: RequestHandler = (req, res) => {
        const {id_item} = req.params;

        new ItemUseCases(this.itemRepository)
        .deleteItem(id_item)
        .then((item) => res.json(item))
        .catch((error) => res.status(404).json({error: error.message}));
    }
}