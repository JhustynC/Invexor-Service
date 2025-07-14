import { BranchOptions } from "../../entities/branch.entity";

export class CreateBranchDto{
    private constructor(
        readonly id_branch: string,
        readonly id_entity: number,
        readonly name_branch: string,
        readonly city: string,
        readonly phone: string,
        readonly state: boolean,
    ){}
    
    static create(props: Partial<BranchOptions>): [string?, CreateBranchDto?]{
        const {id_branch, id_entity, name_branch, city, phone, state} = props

        //! Validations
        if(!id_branch) return ["", undefined];
        if(!id_entity) return ["", undefined];
        if(!name_branch) return ["", undefined];
        if(!city) return ["", undefined];
        if(!phone) return ["", undefined];
        if(!state) return ["", undefined];

        return [
            undefined,
            new CreateBranchDto(
                id_branch, 
                id_entity,
                name_branch, 
                city, 
                phone, 
                state
            )
        ]
    }
}