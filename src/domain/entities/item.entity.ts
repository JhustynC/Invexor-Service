export interface ItemOptions{
    readonly id_item: string;
    readonly name_item: string;
    readonly description: string;
    readonly provider: string;
    readonly id_item_type: number;
    readonly id_entity: number;
}
//////////////////////connect with entity type and item type
export class ItemEntity {
    id_item: string;
    name_item: string;
    description: string;
    provider: string;
    id_item_type: number;
    id_entity: number;

    constructor({id_item, name_item, description, provider, id_item_type, id_entity}: ItemOptions){
        this.id_item = id_item;
        this.name_item = name_item;
        this.description = description;
        this.provider = provider;
        this.id_item_type = id_item_type;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): ItemEntity {
        const {id_item, name_item, description, provider, id_item_type, id_entity} = postgresObject;

        if(!id_item || !name_item || !description || !provider || !id_item_type || !id_entity){
            throw new Error("More prop are required");
        }

        return new ItemEntity({
            id_item,
            name_item,
            description,
            provider,
            id_item_type,
            id_entity
        });
    }
}