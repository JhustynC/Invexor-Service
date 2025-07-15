export interface UserOptions{
    readonly id_user: string;
    readonly name_user: string;
    readonly email: string;
    readonly password: string;
    readonly user_role_ids: number[];
}
/////////////////////Connect with entity type and user roles
export class UserEntity {
    id_user: string;
    name_user: string;
    email: string;
    password: string;
    user_role_ids: number[] = [];

    constructor({id_user, name_user, email, password, user_role_ids}: UserOptions){
        this.id_user = id_user;
        this.name_user = name_user;
        this.email = email;
        this.password = password;
        this.user_role_ids = user_role_ids;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): UserEntity {
        const {id_user, name_user, email, password, user_user_roles} = postgresObject;

        console.log(postgresObject)

        if(!id_user || !name_user || !email || !password || !user_user_roles){
            throw new Error("More prop are required");
        }

        const user_role_ids = user_user_roles.map((role: any) => role.id_user_rol);

        

        return new UserEntity({
            id_user,
            name_user,
            email,
            password,
            user_role_ids
        });
    }
}