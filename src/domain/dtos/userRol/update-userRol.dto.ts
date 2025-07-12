export class UpdateUserRolDto{
    private constructor(
        readonly userRol_id: Int16Array,
        readonly rolname?: string
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.rolname) values.rolname = this.rolname;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserRolDto?] {
        const {userRol_id, rolname} = props;

        if(!userRol_id) return ["User Role ID is required", undefined];
        if(!rolname) return ["Role Name is required", undefined];

        return [
            undefined,
            new UpdateUserRolDto(
                userRol_id,
                rolname
            )
        ]
    }
}