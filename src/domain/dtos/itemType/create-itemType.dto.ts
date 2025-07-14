import { ItemTypeOptions } from "../../entities/itemType.entity";

export class CreateItemTypeDto{
    private constructor(
        readonly name: string
    ){}

    static create(props: Partial<ItemTypeOptions>): [string?, CreateItemTypeDto?]{
        const {name} = props

        if(!name) return ["", undefined]

        return [
            undefined,
            new CreateItemTypeDto(
                name
            )
        ]
    }
}