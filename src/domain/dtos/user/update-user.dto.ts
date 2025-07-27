export class UpdateUserDto{
    private constructor(
        readonly user_id: string,
        readonly username?: string,
        readonly email?: string,
        readonly password?: string,
        readonly user_roles?: number[],
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.username) values.username = this.username;
        if(this.password) values.password = this.password;
        if(this.email) values.email = this.email;
        if(this.user_roles) values.user_roles = this.user_roles;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateUserDto?] {
        const {user_id, username, email, password, user_roles} = props;
        
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
                user_roles)]
    }
}