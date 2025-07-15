import { ResourceOptions } from "../../entities/resource.entity";


export class CreateResourseDto{
    private constructor(
        readonly id_resource: string,
        readonly name_resource: string,
        readonly measure: string,
        readonly currency: string,
        readonly description: string,
        readonly id_entity: Int16Array, // Optional, as it may not be set during creation
    ){}

    static create(props: Partial<ResourceOptions>): [string?, CreateResourseDto?]{

        const {id_resource, name_resource, measure, currency, description, id_entity} = props

        //! Validations
        if(!id_resource) return ["", undefined]
        if(!name_resource) return ["", undefined]
        if(!measure) return ["", undefined]
        if(!currency) return ["", undefined]
        if(!description) return ["", undefined]
        if(!id_entity) return ["", undefined]

        return [
            undefined, 
            new CreateResourseDto(
                id_resource, 
                name_resource, 
                measure, 
                currency, 
                description,
                id_entity
            )]

    }
}