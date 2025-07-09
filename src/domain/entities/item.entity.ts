
export interface ItemOptions{
    readonly item_id: Int16Array;
    readonly itemname: string;
    readonly description: string;
    readonly provider: string;
    //readonly lastSeen: Date | undefined;

}
//////////////////////connect with entity type and item type
export class ItemEntity {
    item_id: Int16Array;
    itemname: string;
    description: string;
    provider: string;
    //lastSeen: Date | undefined;

    constructor({item_id, itemname, description, provider}: ItemOptions){
        this.item_id = item_id;
        this.itemname = itemname;
        this.description = description;
        this.provider = provider;
        //this.lastSeen = lastSeen;
    }

    //? Mapper 
    static fromObject(mongoObject: {[key: string]: any}): ItemEntity {
        const {item_id, itemname, description, provider, lastSeen} = mongoObject;

        if(!item_id || !itemname || !description || !provider || !lastSeen){
            throw new Error("More prop are required");
        }

        return new ItemEntity({
            item_id,
            itemname,
            description,
            provider,
//            lastSeen: lastSeen ? new Date(lastSeen) : new Date(),
        });
    }
}