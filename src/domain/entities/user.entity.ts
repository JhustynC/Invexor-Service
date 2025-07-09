
export interface UserOptions{
    readonly user_id: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    //readonly lastSeen: Date | undefined;
}
/////////////////////Connect with entity type and user roles
export class UserEntity {
    user_id: string;
    username: string;
    email: string;
    password: string;
    //lastSeen: Date | undefined;

    constructor({user_id, username, email, password}: UserOptions){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        //this.lastSeen = lastSeen;
    }

    //? Mapper 
    static fromObject(mongoObject: {[key: string]: any}): UserEntity {
        const {user_id, username, email, password, lastSeen} = mongoObject;

        if(!user_id || !username || !email || !password || !lastSeen){
            throw new Error("More prop are required");
        }

        return new UserEntity({
            user_id,
            username,
            email,
            password,
            //lastSeen: lastSeen ? new Date(lastSeen) : new Date(),
        });
    }
}