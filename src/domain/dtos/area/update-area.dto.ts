export class UpdateAreaDto{
    private constructor(
        readonly area_id: Int16Array,
        readonly areaname: string,
        readonly pattern_area_id: Int16Array,
        readonly branch_id: Int16Array,
        readonly phone: string,
        readonly description: string,
        readonly active: boolean,
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateAreaDto?]{
        const {area_id, areaname, pattern_area_id, branch_id, phone, description, active} = props

        if(areaname){
            //? Validations
        }

        return [undefined, new UpdateAreaDto(area_id, areaname, pattern_area_id, branch_id, phone, description, active)]
    }
}