export interface EntityOptions{
    readonly id_entity?: number;
    readonly entity_type: number;
}
//////////////////////connect with entity type
export class EntityEntity {
    id_entity: number;
    entity_type: number;

    constructor({id_entity, entity_type}: EntityOptions){
        this.id_entity = id_entity!;
        this.entity_type = entity_type;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): EntityEntity {
        const {id_entity, entity_type} = postgresObject;

        if(typeof id_entity !== 'number' || typeof entity_type !== 'number'){
            throw new Error("id_entity and id_entity_type are required and must be numbers");
        }

        return new EntityEntity({
            id_entity,
            entity_type
        });
    }
}
