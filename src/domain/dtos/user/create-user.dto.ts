import { UserOptions } from "../../entities/user.entity";


export class CreateUserDto{
    private constructor(
        readonly user_id: string,
        readonly username: string,
        readonly email: string,
        readonly password: string,
        readonly user_role_ids: Int16Array[],
        readonly id_entity: number,
    ){}

    static create(props: Partial<UserOptions>): [string?, CreateUserDto?]{

        const {user_id, username, email, password, user_role_ids, id_entity} = props

        //! Validations
        if(!user_id) return ["User-id is required", undefined];
        if(!username) return ["Username is required", undefined];
        if(!password) return ["Password is required", undefined];
        if(!email) return ["Email is required", undefined];
        if(!user_role_ids) return ["User rol or roles are required", undefined];
        if(!id_entity) return ["Id enity is required", undefined];

        return [
            undefined,
            new CreateUserDto(
                user_id,
                username,
                email,
                password,
                user_role_ids,
                id_entity
            )
        ]
    }
}