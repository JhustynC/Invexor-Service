import { AreaOptions } from "../../entities/area.entity";


export class CreateAreaDto{
    private constructor(
        readonly area_id: Int16Array,
        readonly areaname: string,
        readonly pattern_area_id: Int16Array,
        readonly branch_id: Int16Array,
        readonly phone: string,
        readonly description: string,
        readonly active: boolean,
    ){}

    static create(props: Partial<AreaOptions>): [string?, CreateAreaDto?]{
        const {area_id, areaname, pattern_area_id, branch_id, phone, description, active} = props

        //! Validations
        if(!area_id) return ["", undefined];
        if(!pattern_area_id) return ["", undefined];
        if(!areaname) return ["", undefined];
        if(!branch_id) return ["", undefined];
        if(!phone) return ["", undefined];
        if(!description) return ["", undefined];
        if(!active) return ["", undefined];

        return [
            undefined,
            new CreateAreaDto(
                area_id, 
                areaname, 
                pattern_area_id, 
                branch_id, 
                phone, 
                description, 
                active
            )
        ]
    }
}