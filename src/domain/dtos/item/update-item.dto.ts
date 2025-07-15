export class UpdateItemDto{
    private constructor(
        readonly id_item: string,
        readonly name_item?: string,
        readonly description?: string,
        readonly provider?: string,
        readonly id_item_type?: number,
        readonly id_entity?: number
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.name_item) values.name_item = this.name_item;
        if(this.description) values.description = this.description;
        if(this.provider) values.provider = this.provider;
        if(this.id_item_type) values.id_item_type = this.id_item_type;
        if(this.id_entity) values.id_entity = this.id_entity;

        return values
    }

    static create(props: {[key:string]:any}): [string?, UpdateItemDto?]{
        const {id_item, name_item, description, provider, id_item_type, id_entity} = props;

        if(name_item){
            //? Validations
        }

        return [
            undefined,
            new UpdateItemDto(
                id_item,
                name_item,
                description,
                provider,
                id_item_type,
                id_entity
            )
        ]
    }
}