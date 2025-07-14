export interface EntityOptions{
    readonly id_entity?: number;
    readonly id_entity_type: number;
}
//////////////////////connect with entity type
export class EntityEntity {
    id_entity: number;
    id_entity_type: number;

    constructor({id_entity, id_entity_type}: EntityOptions){
        this.id_entity = id_entity!;
        this.id_entity_type = id_entity_type;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): EntityEntity {
        const {id_entity, id_entity_type} = postgresObject;

        if(typeof id_entity !== 'number' || typeof id_entity_type !== 'number'){
            throw new Error("id_entity and id_entity_type are required and must be numbers");
        }

        return new EntityEntity({
            id_entity,
            id_entity_type
        });
    }
}
