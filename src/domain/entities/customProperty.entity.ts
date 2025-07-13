export interface CustomPropertyOptions{
    readonly nameproperty: string;
    readonly valueproperty: string;
    readonly user_id: string;
}

export class CustomPropertyEntity{
    nameproperty: string;
    valueproperty: string;
    user_id: string;

    constructor({nameproperty, valueproperty, user_id}: CustomPropertyOptions){
        this.nameproperty = nameproperty;
        this.valueproperty = valueproperty;
        this.user_id = user_id
    }

    //? Mapper 
    static fromObject(mongoObject: {[key: string]: any}): CustomPropertyEntity {
        const {nameproperty, valueproperty, user_id} = mongoObject;

        if(!nameproperty || !valueproperty){
            throw new Error("More prop are required");
        }

        return new CustomPropertyEntity({
            nameproperty,
            valueproperty,
            user_id,
        });
    }
}