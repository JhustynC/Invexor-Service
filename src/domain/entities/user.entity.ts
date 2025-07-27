export interface UserOptions{
    readonly user_id: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly user_role_ids: Int16Array[];
    readonly id_entity: number;
}
/////////////////////Connect with entity type and user roles
export class UserEntity {
    user_id: string;
    username: string;
    email: string;
    password: string;
    user_role_ids: Int16Array[] = [];
    id_entity: number;;

    constructor({user_id, username, email, password, user_role_ids, id_entity}: UserOptions){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_role_ids = user_role_ids;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): UserEntity {
        const {user_id, username, email, password, user_role_ids, id_entity} = postgresObject;

        if(!user_id || !username || !email || !password || !user_role_ids || id_entity){
            throw new Error("More prop are required");
        }

        return new UserEntity({
            user_id,
            username,
            email,
            password,
            user_role_ids,
            id_entity
        });
    }
}