export interface UserOptions{
    readonly user_id: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly user_role_ids: Int16Array[];
}
/////////////////////Connect with entity type and user roles
export class UserEntity {
    user_id: string;
    username: string;
    email: string;
    password: string;
    user_role_ids: Int16Array[] = [];

    constructor({user_id, username, email, password, user_role_ids}: UserOptions){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_role_ids = user_role_ids;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): UserEntity {
        const {user_id, username, email, password, user_role_ids} = postgresObject;

        if(!user_id || !username || !email || !password || !user_role_ids){
            throw new Error("More prop are required");
        }

        return new UserEntity({
            user_id,
            username,
            email,
            password,
            user_role_ids
        });
    }
}