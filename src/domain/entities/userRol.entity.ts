export interface UserRolOptions{
    readonly userRol_id: Int16Array;
    readonly rolname: string;
}
//////////////////////connect with entity type
export class UserRolEntity {
    userRol_id: Int16Array;
    rolname: string;

    constructor({userRol_id, rolname}: UserRolOptions){
        this.userRol_id = userRol_id;
        this.rolname = rolname;
    }

    static fromObject(postgresObject: {[key: string]: any}): UserRolEntity {
        const {userRol_id, rolname} = postgresObject;

        if(!userRol_id || !rolname){
            throw new Error("More prop are required");
        }

        return new UserRolEntity({
            userRol_id,
            rolname
        });
    }
}