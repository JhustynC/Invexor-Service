export interface UserOptions{
    readonly user_id: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly user_roles: number[];
    readonly id_entity: number;
}
/////////////////////Connect with entity type and user roles
export class UserEntity {
    user_id: string;
    username: string;
    email: string;
    password: string;
    user_roles: number[] = [];
    id_entity: number;;

    constructor({user_id, username, email, password, user_roles, id_entity}: UserOptions){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_roles = user_roles;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): UserEntity {
        const {user_id, username, email, password, id_entity} = postgresObject;

        if(!user_id || !username || !email || !password || !id_entity){
            throw new Error("More prop are required");
        }
        
        let user_roles: number[] = [];
        //console.log("Dentro de fromObject")
        //console.log(postgresObject.user_roles)
        //console.log("Tipo:", typeof postgresObject.user_roles);
        //console.log("Es array:", Array.isArray(postgresObject.user_roles));
        //console.log("Contenido:", postgresObject.user_roles);
        //console.log("Contenido:", postgresObject);
        if (!Array.isArray(postgresObject.user_roles)) {
            throw new Error("user_roles no es un array");
        }

        if (Array.isArray(postgresObject.user_roles) &&
            typeof postgresObject.user_roles[0] === 'object' &&
            postgresObject.user_roles[0] !== null &&
            'id_user_rol' in postgresObject.user_roles[0]
        ) {
            console.log("Se activa por el get")
            // Caso GET: array de objetos
            user_roles = postgresObject.user_roles.map((role: any) => role.id_user_rol);
        } else if (
            Array.isArray(postgresObject.user_roles) &&
            typeof postgresObject.user_roles[0] === 'number'
            ) {
            // console.log("Se activa por el post")
            // Caso POST: array de números
            user_roles = postgresObject.user_roles;
        } else if (postgresObject.user_roles.length === 0) {
            user_roles = [];
            
        } else {
            throw new Error("user_roles tiene formato inesperado");
        }


    return new UserEntity({
            user_id,
            username,
            email,
            password,
            user_roles,
            id_entity
        });        
    }
}