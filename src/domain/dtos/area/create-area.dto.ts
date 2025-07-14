import { AreaOptions } from "../../entities/area.entity";


export class CreateAreaDto{
    private constructor(
        readonly area_id: string,
        readonly areaname: string,
        readonly pattern_area_id: string | null,
        readonly branch_id: string,
        readonly phone: string,
        readonly description: string,
        readonly active: boolean,
        readonly id_entity: number 
    ){}

    static create(props: Partial<AreaOptions>): [string?, CreateAreaDto?]{
        const {area_id, areaname, pattern_area_id, branch_id, phone, description, active, id_entity } = props

        //! Validations
        if(!area_id) return ["area_id is required", undefined];
        if(!areaname) return ["areaname is required", undefined];
        if(!branch_id) return ["branch_id is required", undefined];
        if(!phone) return ["phone is required", undefined];
        if(!description) return ["description is required", undefined];
        if(typeof active !== 'boolean') return ["active must be boolean", undefined];
        if(typeof id_entity !== 'number') return ["id_entity must be a number", undefined];
        // pattern_area_id puede ser string o null

        return [
            undefined,
            new CreateAreaDto(
                area_id, 
                areaname, 
                pattern_area_id ?? null, 
                branch_id, 
                phone, 
                description, 
                active,
                id_entity
            )
        ]
    }
}