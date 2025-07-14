import { EventEmitter } from "stream";

export interface BranchOptions{
    readonly branch_id: string;
    readonly entity_id: number;
    readonly branchname: string;
    readonly city: string;
    readonly phone: string;
    readonly active: boolean;
}
//////////////////////connect with entity type
export class BranchEntity {
    branch_id: string;
    entity_id: number;
    branchname: string;
    city: string;
    phone: string;
    active: boolean;

    constructor({branch_id, entity_id, branchname, city, phone, active}: BranchOptions){
        this.branch_id = branch_id;
        this.entity_id = entity_id;
        this.branchname = branchname;
        this.city = city;
        this.phone = phone;
        this.active = active;
    }

    static fromObject(postgresObject: {[key: string]: any}): BranchEntity {
        const {branch_id, entity_id, branchname, city, phone, active} = postgresObject;

        if(!branch_id || !entity_id || !branchname || !city || !phone || !active){
            throw new Error("More prop are required");
        }

        return new BranchEntity({
            branch_id,
            entity_id,
            branchname,
            city,
            phone,
            active
        });
    }
}