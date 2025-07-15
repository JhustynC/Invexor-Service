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
    static fromObject(postgresObject: { [key: string]: any }): UserEntity {
    const { id_user, name_user, email, password } = postgresObject;

    if (!id_user || !name_user || !email || !password) {
        throw new Error("More props are required");
    }

    // Detectar de dónde vienen los roles (GET o POST)
    let user_role_ids: number[] = [];

    if (Array.isArray(postgresObject.user_user_roles)) {
        // Estructura del GET
        user_role_ids = postgresObject.user_user_roles.map(
            (role: any) => role.id_user_rol
        );
    } else if (Array.isArray(postgresObject.user_role_ids)) {
        // Estructura del POST (manual)
        user_role_ids = postgresObject.user_role_ids;
    } else {
        throw new Error("User roles are missing or malformed");
    }

    return new UserEntity({
        id_user,
        name_user,
        email,
        password,
        user_role_ids
    });
    }

}