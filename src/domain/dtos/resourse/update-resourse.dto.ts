export class UpdateResourseDto{
    private constructor(
        readonly id_resource: string,
        readonly name_resource?: string,
        readonly measure?: string,
        readonly currency?: string,
        readonly description?: string,
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.name_resource) values.resourcename = this.name_resource
        if(this.measure) values.measure = this.measure
        if(this.currency) values.currency = this.currency
        if(this.description) values.description = this.description

        return values
    }

    static create(props: {[key:string]:any}): [string?, UpdateResourseDto?] {
        const {id_resource, name_resource, measure, currency, description} = props

        if(name_resource){
            //? Validations
        }

        return [
            undefined, 
            new UpdateResourseDto(
                id_resource, 
                name_resource, 
                measure, 
                currency, 
                description)]
    }
}