import { UserRolOptions } from "../../entities/userRol.entity";

export class CreateUserRolDto{
    private constructor(
        readonly id_user_rol: number,
        readonly name_user_rol: string
    ){}

    static create(props: Partial<UserRolOptions>): [string?, CreateUserRolDto?]{

        const {id_user_rol, name_user_rol} = props

        //! Validations
        if(!id_user_rol) return ["User Role ID is required", undefined];
        if(!name_user_rol) return ["Role Name is required", undefined];

        return [
            undefined,
            new CreateUserRolDto(
                id_user_rol,
               name_user_rol
            )
        ]
    }
}