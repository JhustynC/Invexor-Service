import { EntityOptions } from "../../entities/entity.entity";


export class CreateEntityDto{
    private constructor(
        readonly id_entity_type: number,
    ){}

    static create(props: Partial<EntityOptions>): [string?, CreateEntityDto?]{
        const {id_entity_type} = props

        //! Validations
        if(typeof id_entity_type !== 'number') return ["id_entity_type is required and must be a number", undefined];

        return [
            undefined,
            new CreateEntityDto(
                id_entity_type
            )
        ]
    }
}