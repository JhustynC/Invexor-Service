import { BranchOptions } from "../../entities/branch.entity";

export class CreateBranchDto{
    private constructor(
        readonly branch_id: string,
        readonly entity_id: number,
        readonly branchname: string,
        readonly city: string,
        readonly phone: string,
        readonly active: boolean,
    ){}
    
    static create(props: Partial<BranchOptions>): [string?, CreateBranchDto?]{
        const {branch_id, entity_id, branchname, city, phone, active} = props

        //! Validations
        if(!branch_id) return ["", undefined];
        if(!entity_id) return ["", undefined];
        if(!branchname) return ["", undefined];
        if(!city) return ["", undefined];
        if(!phone) return ["", undefined];
        if(!active) return ["", undefined];

        return [
            undefined,
            new CreateBranchDto(
                branch_id, 
                entity_id,
                branchname, 
                city, 
                phone, 
                active
            )
        ]
    }
}