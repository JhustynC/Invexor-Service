export interface ItemTypeOptions{
    readonly itemType_id: Int16Array;
    readonly name: string;
}
//////////////////////connect with entity type
export class ItemTypeEntity {
    itemType_id: Int16Array;
    name: string;

    constructor({itemType_id, name}: ItemTypeOptions){
        this.itemType_id = itemType_id;
        this.name = name;
    }

    static fromObject(postgresObject: {[key: string]: any}): ItemTypeEntity {
        const {itemType_id, name} = postgresObject;

        if(!itemType_id || !name){
            throw new Error("More prop are required");
        }

        return new ItemTypeEntity({
            itemType_id,
            name
        });
    }
}