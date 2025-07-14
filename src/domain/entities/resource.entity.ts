export interface ResourceOptions{
    readonly resource_id: string;
    readonly resourcename: string;
    readonly measure: string;
    readonly currency: string;
    readonly description: string;
    readonly id_entity: Int16Array; // Optional, as it may not be set during creation
}
//////////////////////connect with entity type
export class ResourceEntity {
    resource_id: string;
    resourcename: string;
    measure: string;
    description: string;
    currency: string;
    id_entity: Int16Array;

    constructor({resource_id,resourcename, measure, description, currency, id_entity}: ResourceOptions){
        this.resource_id = resource_id;
        this.resourcename = resourcename;
        this.measure = measure;
        this.description = description;
        this.currency = currency;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): ResourceEntity {
        const {resource_id,resourcename, measure, description, currency, id_entity} = postgresObject;

        if(!resource_id || !resourcename || !measure || !description || !currency || !id_entity){
            throw new Error("More prop are required");
        }

        return new ResourceEntity({
            resource_id,
            resourcename,
            measure,
            description,
            currency,
            id_entity
        });
    }
}