export class UpdateAreaDto{
    private constructor(
        readonly id_area: string,
        readonly name_area?: string,
        readonly id_pattern_area?: string | null,
        readonly id_branch?: string,
        readonly phone?: string,
        readonly description?: string,
        readonly state?: boolean,
        readonly id_entity?: number
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        return values;
    }

    static create(props: {[key:string]:any}): [string?, UpdateAreaDto?]{
        const {id_area, name_area, id_pattern_area, id_branch, phone, description, state, id_entity} = props

        if(name_area){
            //? Validations
        }

        return [undefined, new UpdateAreaDto(id_area, name_area, id_pattern_area, id_branch, phone, description, state, id_entity)]
    }
}