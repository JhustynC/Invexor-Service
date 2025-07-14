export interface TemplateOptions{
    readonly name:string;
    readonly controls: string[];
}

export class TemplateEntity{
    name:string;
    controls: string[];

    constructor({name, controls}: TemplateOptions){
        this.name = name;
        this.controls = controls;
    }

    //? Mapper 
        static fromObject(mongoObject: {[key: string]: any}): TemplateEntity{
            const {name, controls} = mongoObject;
    
            if(!name || !controls){
                throw new Error("More prop are required");
            }
    
            return new TemplateEntity({
                name,
                controls,
            });
        }
}

