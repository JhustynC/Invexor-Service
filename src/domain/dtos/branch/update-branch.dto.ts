export class UpdateBranchDto{
    private constructor(
        readonly id_branch: string,
        readonly id_entity: number,
        readonly name_branch?: string,
        readonly city?: string,
        readonly phone?: string,
        readonly state?: boolean,
    ){}

    public get values(){
        const values: {[key: string]:any} = {};
        
        if(this.state) values.state = this.state;
        if(this.name_branch) values.name_branch = this.name_branch;
        if(this.city) values.city = this.city;
        if(this.phone) values.phone = this.phone;
        if(this.id_entity) values.id_entity = this.id_entity;

        return values
    }

    static create(props:  {[key:string]:any}): [string?, UpdateBranchDto?] {
        const {id_branch,  id_entity, name_branch, city, phone, state} = props;

        if(name_branch){

        }

        return [
            undefined,
            new UpdateBranchDto(
                id_branch,
                id_entity,
                name_branch, 
                city, 
                phone, 
                state
            )
        ]

    } 
}