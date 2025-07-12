import { ItemOptions } from "../../entities/item.entity";

export class CreateItemDto{
    private constructor(
        readonly item_id: Int16Array,
        readonly itemname: string,
        readonly description: string,
        readonly provider: string,
        readonly item_type_ids: Int16Array[],
    ){}

    static create(props: Partial<ItemOptions>): [string?, CreateItemDto?]{
        const {item_id, itemname, description, provider, item_type_ids} = props

        if(!item_id) return ["", undefined];
        if(!itemname) return ["", undefined]
        if(!description) return ["", undefined]
        if(!provider) return ["", undefined]
        if(!item_type_ids) return ["", undefined]

        return [
            undefined,
            new CreateItemDto(
                item_id,
                itemname,
                description,
                provider,
                item_type_ids
            )
        ]
    }
}