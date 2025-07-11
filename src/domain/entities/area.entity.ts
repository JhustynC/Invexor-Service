export interface AreaOptions{
    readonly area_id: Int16Array;
    readonly areaname: string;
    readonly pattern_area_id: Int16Array;
    readonly branch_id: Int16Array;
    readonly phone: string;
    readonly description: string;
    readonly active: boolean;
}
//////////////////////connect with entity type
export class AreaEntity {
    area_id: Int16Array;
    areaname: string;
    pattern_area_id: Int16Array;
    branch_id: Int16Array;
    phone: string;
    description: string;
    active: boolean;

    constructor({area_id, areaname, pattern_area_id, branch_id, phone, description, active}: AreaOptions){
        this.area_id = area_id;
        this.areaname = areaname;
        this.pattern_area_id = pattern_area_id;
        this.branch_id = branch_id;
        this.phone = phone;
        this.description = description;
        this.active = active;
    }

    //? Mapper 
    static fromObject(postgresObject: {[key: string]: any}): AreaEntity {
        const {area_id, areaname, pattern_area_id, branch_id, phone, description, active} = postgresObject;

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
            active
        });
    }
}