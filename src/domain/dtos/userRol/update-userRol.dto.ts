export class UpdateUserRolDto{
    private constructor(
        readonly id_user_rol: Int16Array,
        readonly name_user_rol?: string
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.name_user_rol) values.name_user_rol = this.name_user_rol;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserRolDto?] {
        const {id_user_rol,name_user_rol} = props;

        if(!id_user_rol) return ["User Role ID is required", undefined];
        if(!name_user_rol) return ["Role Name is required", undefined];

        return [
            undefined,
            new UpdateUserRolDto(
                id_user_rol,
               name_user_rol
            )
        ]
    }
}