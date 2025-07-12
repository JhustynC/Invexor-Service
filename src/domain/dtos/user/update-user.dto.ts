export class UpdateUserDto{
    private constructor(
        readonly user_id: string,
        readonly username?: string,
        readonly email?: string,
        readonly password?: string,
        readonly user_role_ids?: Int16Array[],
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.username) values.username = this.username;
        if(this.password) values.password = this.password;
        if(this.email) values.email = this.email;
        if(this.user_role_ids) values.user_role_ids = this.user_role_ids;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserDto?] {
        const {user_id, username, email, password, user_role_ids} = props;
        
        if(username){
            //? Validations
        }

        return [
            undefined, 
            new UpdateUserDto(
                user_id, 
                username, 
                email, 
                password, 
                user_role_ids)]
    }
}