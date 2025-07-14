import { ResourceOptions } from "../../entities/resource.entity";


export class CreateResourseDto{
    private constructor(
        readonly resource_id: string,
        readonly resourcename: string,
        readonly measure: string,
        readonly currency: string,
        readonly description: string,
        readonly id_entity: Int16Array, // Optional, as it may not be set during creation
    ){}

    static create(props: Partial<ResourceOptions>): [string?, CreateResourseDto?]{

        const {resource_id, resourcename, measure, currency, description, id_entity} = props

        //! Validations
        if(!resource_id) return ["", undefined]
        if(!resourcename) return ["", undefined]
        if(!measure) return ["", undefined]
        if(!currency) return ["", undefined]
        if(!description) return ["", undefined]
        if(!id_entity) return ["", undefined]

        return [
            undefined, 
            new CreateResourseDto(
                resource_id, 
                resourcename, 
                measure, 
                currency, 
                description,
                id_entity
            )]

    }
}