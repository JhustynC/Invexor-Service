import { EntityOptions } from "../../entities/entity.entity";


export class CreateEntityDto{
    private constructor(
        readonly entity_type: number,
    ){}

    static create(props: Partial<EntityOptions>): [string?, CreateEntityDto?]{
        const {entity_type} = props

        //! Validations
        if(typeof entity_type !== 'number') return ["entity_type is required and must be a number", undefined];

        return [
            undefined,
            new CreateEntityDto(
                entity_type
            )
        ]
    }
}