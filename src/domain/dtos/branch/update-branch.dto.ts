export class UpdateBranchDto{
    private constructor(
        readonly branch_id: Int16Array,
        readonly branchname?: string,
        readonly city?: string,
        readonly phone?: string,
        readonly active?: boolean,
    ){}

    public get values(){
        const values: {[key: string]:any} = {};
        
        if(this.active) values.active = this.active;
        if(this.branchname) values.branchname = this.branchname;
        if(this.city) values.city = this.city;
        if(this.phone) values.phone = this.phone;

        return values
    }

    static create(props:  {[key:string]:any}): [string?, UpdateBranchDto?] {
        const {branch_id, branchname, city, phone, active} = props;

        if(branchname){

        }

        return [
            undefined,
            new UpdateBranchDto(
                branch_id, 
                branchname, 
                city, 
                phone, 
                active
            )
        ]

    } 
}