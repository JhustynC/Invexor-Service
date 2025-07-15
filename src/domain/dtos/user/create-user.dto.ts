import { UserOptions } from "../../entities/user.entity";


export class CreateUserDto{
    private constructor(
        readonly id_user: string,
        readonly name_user: string,
        readonly email: string,
        readonly password: string,
        readonly user_role_ids: number[],
    ){}

    static create(props: Partial<UserOptions>): [string?, CreateUserDto?]{

        const {id_user, name_user, email, password, user_role_ids} = props

        //! Validations
        if(!id_user) return ["User-id is required", undefined];
        if(!name_user) return ["Username is required", undefined];
        if(!password) return ["Password is required", undefined];
        if(!email) return ["Email is required", undefined];
        if(!user_role_ids) return ["User rol or roles are required", undefined];

        return [
            undefined,
            new CreateUserDto(
                id_user,
                name_user,
                email,
                password,
                user_role_ids
            )
        ]
    }
}