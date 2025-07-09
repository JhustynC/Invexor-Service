
export interface BranchOptions{
    readonly branch_id: Int16Array;
    readonly branchname: string;
    readonly city: string;
    readonly phone: string;
    readonly state: boolean;
    //readonly lastSeen: Date | undefined;

}
//////////////////////connect with entity type and item type
export class BranchEntity {
    branch_id: Int16Array;
    branchname: string;
    city: string;
    phone: string;
    state: boolean;

    constructor({branch_id, branchname, city, phone, state}: BranchOptions){
        this.branch_id = branch_id;
        this.branchname = branchname;
        this.city = city;
        this.phone = phone;
        this.state = state;
    }

    static fromObject(mongoObject: {[key: string]: any}): BranchEntity {
        const {branch_id, branchname, city, phone, state} = mongoObject;

        if(!branch_id || !branchname || !city || !phone || !state){
            throw new Error("More prop are required");
        }

        return new BranchEntity({
            branch_id,
            branchname,
            city,
            phone,
            state
        });
    }
}