export interface UserRolOptions{
    readonly id_user_rol: number;
    readonly name_user_rol: string;
}
//////////////////////connect with entity type
export class UserRolEntity {
    id_user_rol: number;
   name_user_rol: string;

    constructor({id_user_rol,name_user_rol}: UserRolOptions){
        this.id_user_rol = id_user_rol;
        this.name_user_rol =name_user_rol;
    }

    static fromObject(postgresObject: {[key: string]: any}): UserRolEntity {
        const {id_user_rol, name_user_rol} = postgresObject;

        if(!id_user_rol || !name_user_rol){
            throw new Error("More prop are required");
        }

        return new UserRolEntity({
            id_user_rol,
           name_user_rol
        });
    }
}