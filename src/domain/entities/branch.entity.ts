export interface BranchOptions{
    readonly branch_id: Int16Array;
    readonly branchname: string;
    readonly city: string;
    readonly phone: string;
    readonly active: boolean;
}
//////////////////////connect with entity type
export class BranchEntity {
    branch_id: Int16Array;
    branchname: string;
    city: string;
    phone: string;
    active: boolean;

    constructor({branch_id, branchname, city, phone, active}: BranchOptions){
        this.branch_id = branch_id;
        this.branchname = branchname;
        this.city = city;
        this.phone = phone;
        this.active = active;
    }

    static fromObject(postgresObject: {[key: string]: any}): BranchEntity {
        const {branch_id, branchname, city, phone, active} = postgresObject;

        if(!branch_id || !branchname || !city || !phone || !active){
            throw new Error("More prop are required");
        }

        return new BranchEntity({
            branch_id,
            branchname,
            city,
            phone,
            active
        });
    }
}