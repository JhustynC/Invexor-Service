export interface ItemOptions{
    readonly item_id: Int16Array;
    readonly itemname: string;
    readonly description: string;
    readonly provider: string;
    readonly item_type_ids: Int16Array[];
}
//////////////////////connect with entity type and item type
export class ItemEntity {
    item_id: Int16Array;
    itemname: string;
    description: string;
    provider: string;
    item_type_ids: Int16Array[] = [];

    constructor({item_id, itemname, description, provider, item_type_ids}: ItemOptions){
        this.item_id = item_id;
        this.itemname = itemname;
        this.description = description;
        this.provider = provider;
        this.item_type_ids = item_type_ids;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): ItemEntity {
        const {item_id, itemname, description, provider, item_type_ids} = postgresObject;

        if(!item_id || !itemname || !description || !provider || !item_type_ids){
            throw new Error("More prop are required");
        }

        return new ItemEntity({
            item_id,
            itemname,
            description,
            provider,
            item_type_ids
        });
    }
}