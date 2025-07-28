export class UpdateAreaDto{
    private constructor(
        readonly area_id: string,
        readonly id_entity: number, 
        readonly areaname?: string,
        readonly pattern_area_id?: string,
        readonly branch_id?: string,
        readonly phone?: string,
        readonly description?: string,
        readonly active?: boolean
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.areaname) values.areaname = this.areaname;
        if(this.pattern_area_id) values.pattern_area_id = this.pattern_area_id;
        if(this.branch_id) values.branch_id = this.branch_id;
        if(this.phone) values.phone = this.phone;
        if(this.description) values.description = this.description;
        if(this.active !== undefined) values.active = this.active;
        if(this.id_entity) values.id_entity = this.id_entity;

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateAreaDto?]{
        const {area_id, areaname, pattern_area_id, branch_id, phone, description, active, id_entity} = props

        if(areaname){
            //? Validations
        }

        return [undefined, new UpdateAreaDto(
            area_id,
            id_entity,
            areaname,
            pattern_area_id,
            branch_id,
            phone,
            description,
            active
        )]
    }
}