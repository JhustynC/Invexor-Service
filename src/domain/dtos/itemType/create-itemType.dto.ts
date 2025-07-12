import { ItemTypeOptions } from "../../entities/itemType.entity";

export class CreateItemTypeDto{
    private constructor(
        readonly itemType_id: Int16Array,
        readonly name: string,
    ){}

    static create(props: Partial<ItemTypeOptions>): [string?, CreateItemTypeDto?]{
        const {itemType_id, name} = props

        if(!itemType_id) return ["", undefined];
        if(!name) return ["", undefined]

        return [
            undefined,
            new CreateItemTypeDto(
                itemType_id,
                name
            )
        ]
    }
}