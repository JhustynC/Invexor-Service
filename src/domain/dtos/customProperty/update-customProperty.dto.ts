export class UpdateCustomPropertyDto{
    private constructor(
        readonly nameproperty: string,
        readonly valueproperty?: string,
    ){}

    public get values(){
        const values: {[key: string]:any} = {};

        if(this.valueproperty) values.valueproperty = this.valueproperty

        return values
    }

    static create(props: {[key:string]:any}): [string?, UpdateCustomPropertyDto?]{
        const {nameproperty, valueproperty} = props

        if(valueproperty){
            //? Validations
        }

        return [
            undefined,
            new UpdateCustomPropertyDto(
                nameproperty,
                valueproperty,
            )
        ]
    }
}