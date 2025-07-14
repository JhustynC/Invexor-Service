export interface BranchOptions{
    readonly id_branch: string;
    readonly id_entity: number;
    readonly name_branch: string;
    readonly city: string;
    readonly phone: string;
    readonly state: boolean;
}
//////////////////////connect with entity type
export class BranchEntity {
    id_branch: string;
    id_entity: number;
    name_branch: string;
    city: string;
    phone: string;
    state: boolean;

    constructor({id_branch, id_entity, name_branch, city, phone, state}: BranchOptions){
        this.id_branch = id_branch;
        this.id_entity = id_entity;
        this.name_branch = name_branch;
        this.city = city;
        this.phone = phone;
        this.state = state;
    }

    static fromObject(postgresObject: {[key: string]: any}): BranchEntity {
        const {id_branch, id_entity, name_branch, city, phone, state} = postgresObject;

        if(!id_branch || !id_entity || !name_branch || !city || !phone || !state){
            throw new Error("More prop are required");
        }

        return new BranchEntity({
            id_branch,
            id_entity,
            name_branch,
            city,
            phone,
            state
        });
    }
}