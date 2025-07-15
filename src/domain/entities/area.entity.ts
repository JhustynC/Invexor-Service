export interface AreaOptions{
    readonly id_area: string;
    readonly name_area: string;
    readonly id_pattern_area: string | null;
    readonly id_branch: string;
    readonly phone: string;
    readonly description: string;
    readonly state: boolean;
    readonly id_entity: number;
}
//////////////////////connect with e
// ntity type
export class AreaEntity {
    id_area: string;
    name_area: string;
    id_pattern_area: string | null;
    id_branch: string;
    phone: string;
    description: string;
    state: boolean;
    id_entity: number;

    constructor({id_area, name_area, id_pattern_area, id_branch, phone, description, state, id_entity}: AreaOptions){
        this.id_area = id_area;
        this.name_area = name_area;
        this.id_pattern_area = id_pattern_area;
        this.id_branch = id_branch;
        this.phone = phone;
        this.description = description;
        this.state = state;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): AreaEntity {
        const {id_area, name_area, id_pattern_area, id_branch, phone, description, state, id_entity } = postgresObject;

        if(!id_area || !name_area || !id_branch || !phone || !description || !state || !id_entity){
            throw new Error("More prop are required");
        }

        return new AreaEntity({
            id_area,
            name_area,
            id_pattern_area,
            id_branch,
            phone,
            description,
            state,
            id_entity
        });
    }
}