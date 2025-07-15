import { ItemOptions } from "../../entities/item.entity";

export class CreateItemDto{
    private constructor(
        readonly id_item: string,
        readonly name_item: string,
        readonly description: string,
        readonly provider: string,
        readonly id_item_type: number,
        readonly id_entity: number,
    ){}

    static create(props: Partial<ItemOptions>): [string?, CreateItemDto?]{
        const {id_item, name_item, description, provider, id_item_type, id_entity} = props

        if(!id_item) return ["", undefined];
        if(!name_item) return ["", undefined]
        if(!description) return ["", undefined]
        if(!provider) return ["", undefined]
        if(!id_item_type) return ["", undefined]
        if(!id_entity) return ["", undefined]

        return [
            undefined,
            new CreateItemDto(
                id_item,
                name_item,
                description,
                provider,
                id_item_type,
                id_entity
            )
        ]
    }
}