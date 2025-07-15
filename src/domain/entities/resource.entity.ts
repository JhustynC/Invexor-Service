export interface ResourceOptions{
    readonly id_resource: string;
    readonly name_resource: string;
    readonly measure: string;
    readonly currency: string;
    readonly description: string;
    readonly id_entity: Int16Array; // Optional, as it may not be set during creation
}
//////////////////////connect with entity type
export class ResourceEntity {
    id_resource: string;
    name_resource: string;
    measure: string;
    description: string;
    currency: string;
    id_entity: Int16Array;

    constructor({id_resource: resource_id,name_resource: resourcename, measure, description, currency, id_entity}: ResourceOptions){
        this.id_resource = resource_id;
        this.name_resource = resourcename;
        this.measure = measure;
        this.description = description;
        this.currency = currency;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): ResourceEntity {
        const {
            id_resource,
            name_resource,
            measure,
            description,
            currency,
            id_entity
        } = postgresObject;
    
        if(!id_resource || !name_resource || !id_entity){
            throw new Error("id_resource, name_resource, and id_entity are required");
        }
    
        return new ResourceEntity({
            id_resource: id_resource,
            name_resource: name_resource,
            measure,
            description,
            currency,
            id_entity
        });
    }
}