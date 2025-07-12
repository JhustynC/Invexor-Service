

export class UpdateItemDto{
    private constructor(
        readonly item_id: Int16Array,
        readonly itemname?: string,
        readonly description?: string,
        readonly provider?: string,
        readonly item_type_ids?: Int16Array[],
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.itemname) values.itemname = this.itemname;
        if(this.description) values.description = this.description;
        if(this.provider) values.provider = this.provider;
        if(this.item_type_ids) values.item_type_ids = this.item_type_ids;

        return values
    }

    static create(props: {[key:string]:any}): [string?, UpdateItemDto?]{
        const {item_id, itemname, description, provider, item_type_ids} = props;

        if(itemname){
            //? Validations
        }

        return [
            undefined,
            new UpdateItemDto(
                item_id, 
                itemname, 
                description, 
                provider, 
                item_type_ids)]
    }
}