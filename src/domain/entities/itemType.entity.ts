export interface ItemTypeOptions{
    readonly id_item_type?: number;
    readonly name: string;
}
//////////////////////connect with entity type
export class ItemTypeEntity {
    id_item_type: number;
    name: string;

    constructor({id_item_type, name}: ItemTypeOptions){
        this.id_item_type = id_item_type!;
        this.name = name;
    }

    static fromObject(postgresObject: {[key: string]: any}): ItemTypeEntity {
        const {id_item_type, name} = postgresObject;

        if(!id_item_type || !name){
            throw new Error("More prop are required");
        }

        return new ItemTypeEntity({
            id_item_type,
            name
        });
    }
}