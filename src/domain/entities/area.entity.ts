export interface AreaOptions{
    readonly area_id: string;
    readonly areaname: string;
    readonly pattern_area_id: string;
    readonly branch_id: string;
    readonly phone: string;
    readonly description: string;
    readonly active: boolean;
    readonly id_entity: number;
}
//////////////////////connect with e
// ntity type
export class AreaEntity {
    area_id: string;
    areaname: string;
    pattern_area_id: string;
    branch_id: string;
    phone: string;
    description: string;
    active: boolean;
    id_entity: number;

    constructor({area_id, areaname, pattern_area_id, branch_id, phone, description, active, id_entity}: AreaOptions){
        this.area_id = area_id;
        this.areaname = areaname;
        this.pattern_area_id = pattern_area_id;
        this.branch_id = branch_id;
        this.phone = phone;
        this.description = description;
        this.active = active;
        this.id_entity = id_entity;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): AreaEntity {
        const {area_id, areaname, pattern_area_id, branch_id, phone, description, active,id_entity } = postgresObject;

        if(!area_id || !areaname || !pattern_area_id || !branch_id || !phone || !description || !active){
            throw new Error("More prop are required");
        }

        return new AreaEntity({
            area_id,
            areaname,
            pattern_area_id,
            branch_id,
            phone,
            description,
            active,
            id_entity
        });
    }
}