import { UserRolOptions } from "../../entities/userRol.entity";

export class CreateUserRolDto{
    private constructor(
        readonly userRol_id: Int16Array,
        readonly rolname: string
    ){}

    static create(props: Partial<UserRolOptions>): [string?, CreateUserRolDto?]{

        const {userRol_id, rolname} = props

        //! Validations
        if(!userRol_id) return ["User Role ID is required", undefined];
        if(!rolname) return ["Role Name is required", undefined];

        return [
            undefined,
            new CreateUserRolDto(
                userRol_id,
                rolname
            )
        ]
    }
}