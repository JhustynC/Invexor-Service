export interface ResourceOptions{
    readonly resource_id: Int16Array;
    readonly resourcename: string;
    readonly measure: string;
    readonly currency: string;
    readonly description: string;
}
//////////////////////connect with entity type
export class ResourceEntity {
    resource_id: Int16Array;
    resourcename: string;
    measure: string;
    description: string;
    currency: string;

    constructor({resource_id,resourcename, measure, description, currency}: ResourceOptions){
        this.resource_id = resource_id;
        this.resourcename = resourcename;
        this.measure = measure;
        this.description = description;
        this.currency = currency;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): ResourceEntity {
        const {resource_id,resourcename, measure, description, currency} = postgresObject;

        if(!resource_id || !resourcename || !measure || !description || !currency){
            throw new Error("More prop are required");
        }

        return new ResourceEntity({
            resource_id,
            resourcename,
            measure,
            description,
            currency
        });
    }
}