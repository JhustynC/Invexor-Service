import { AreaOptions } from "../../entities/area.entity";
import { EntityOptions } from "../../entities/entity.entity";


export class CreateEntityDto{
    private constructor(
        readonly id_entity: Int16Array,
        readonly id_type_entity: string,
    ){}

    static create(props: Partial<EntityOptions>): [string?, CreateEntityDto?]{
        const {id_entity, id_type_entity} = props

        //! Validations
        if(!id_entity) return ["", undefined];
        if(!id_type_entity) return ["", undefined];

        return [
            undefined,
            new CreateEntityDto(
                id_entity,
                id_type_entity
            )
        ]
    }
}