import { AreaOptions } from "../../entities/area.entity";


export class CreateAreaDto{
    private constructor(
            readonly id_area: string,
            readonly name_area: string,
            readonly id_pattern_area: string | null,
            readonly id_branch: string,
            readonly phone: string,
            readonly description: string,
            readonly state: boolean,
            readonly id_entity: number
    ){}

    static create(props: Partial<AreaOptions>): [string?, CreateAreaDto?]{
        const {id_area, name_area, id_pattern_area, id_branch, phone, description, state, id_entity } = props

        //! Validations
        if(!id_area) return ["id_area is required", undefined];
        if(!name_area) return ["name_area is required", undefined];
        if(!id_branch) return ["id_branch is required", undefined];
        if(!phone) return ["phone is required", undefined];
        if(!description) return ["description is required", undefined];
        if(typeof state !== 'boolean') return ["state must be boolean", undefined];
        if(typeof id_entity !== 'number') return ["id_entity must be a number", undefined];
        // pattern_area_id puede ser string o null

        return [
            undefined,
            new CreateAreaDto(
                id_area,
                name_area,
                id_pattern_area ?? null,
                id_branch,
                phone,
                description,
                state,
                id_entity
            )
        ]
    }
}