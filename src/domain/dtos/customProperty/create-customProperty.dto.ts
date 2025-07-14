import { CustomPropertyOptions } from "../../entities/customProperty.entity";


export class CreateCustomPropertyDto{
    private constructor(
        readonly nameproperty: string,
        readonly valueproperty: string,
    ){}
    
    static create(props: Partial<CustomPropertyOptions>): [string?, CreateCustomPropertyDto?]{
        const {nameproperty, valueproperty} = props

        //! Validations
        if(!nameproperty) return ["Name property is required", undefined]
        if(!valueproperty) return ["Value property is required", undefined]

        return [
            undefined,
            new CreateCustomPropertyDto(
                nameproperty,
                valueproperty
            )
        ]
    }
}