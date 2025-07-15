export class UpdateUserDto{
    private constructor(
        readonly id_user: string,
        readonly name_user?: string,
        readonly email?: string,
        readonly password?: string,
        readonly user_role_ids?: number[],
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.name_user) values.username = this.name_user;
        if(this.password) values.password = this.password;
        if(this.email) values.email = this.email;
        if(this.user_role_ids) values.user_role_ids = this.user_role_ids;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserDto?] {
        const {id_user, name_user, email, password, user_role_ids} = props;
        
        if(name_user){
            //? Validations
        }

        return [
            undefined, 
            new UpdateUserDto(
                id_user, 
                name_user, 
                email, 
                password, 
                user_role_ids)]
    }
}