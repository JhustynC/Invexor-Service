import { ResourceOptions } from "../../entities/resource.entity";


export class CreateResourseDto{
    private constructor(
        readonly resource_id: Int16Array,
        readonly resourcename: string,
        readonly measure: string,
        readonly currency: string,
        readonly description: string,
    ){}

    static create(props: Partial<ResourceOptions>): [string?, CreateResourseDto?]{

        const {resource_id, resourcename, measure, currency, description} = props

        //! Validations
        if(!resource_id) return ["", undefined]
        if(!resourcename) return ["", undefined]
        if(!measure) return ["", undefined]
        if(!currency) return ["", undefined]
        if(!description) return ["", undefined]

        return [
            undefined, 
            new CreateResourseDto(
                resource_id, 
                resourcename, 
                measure, 
                currency, 
                description)]

    }
}