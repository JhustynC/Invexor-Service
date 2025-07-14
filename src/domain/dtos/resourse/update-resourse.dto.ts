

export class UpdateResourseDto{
    private constructor(
        readonly resource_id: string,
        readonly resourcename?: string,
        readonly measure?: string,
        readonly currency?: string,
        readonly description?: string,
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.resourcename) values.resourcename = this.resourcename
        if(this.measure) values.measure = this.measure
        if(this.currency) values.currency = this.currency
        if(this.description) values.description = this.description

        return values
    }

    static create(props: {[key:string]:any}): [string?, UpdateResourseDto?] {
        const {resource_id, resourcename, measure, currency, description} = props

        if(resourcename){
            //? Validations
        }

        return [
            undefined, 
            new UpdateResourseDto(
                resource_id, 
                resourcename, 
                measure, 
                currency, 
                description)]
    }
}