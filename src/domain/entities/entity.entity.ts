export interface EntityOptions{
    readonly id_entity: Int16Array;
    readonly id_type_entity: string;
}
//////////////////////connect with entity type
export class EntityEntity {
    id_entity: Int16Array;
    id_type_entity: string;

    constructor({id_entity, id_type_entity}: EntityOptions){
        this.id_entity = id_entity;
        this.id_type_entity = id_type_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): EntityEntity {
        const {id_entity, id_type_entity} = postgresObject;

        if(!id_entity || !id_type_entity){
            throw new Error("More prop are required");
        }

        return new EntityEntity({
            id_entity,
            id_type_entity
        });
    }
}
