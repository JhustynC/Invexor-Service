import { CreateBranchDto } from "../../domain/dtos/branch/create-branch.dto";
import { UpdateBranchDto } from "../../domain/dtos/branch/update-branch.dto";
import { BranchEntity } from "../../domain/entities/branch.entity";
import { AbsBranchRepository } from "../../domain/repositories/branch.repository";

export class BranchRepositoryImp implements AbsBranchRepository{

    constructor(private readonly datasource: AbsBranchRepository){}
    saveBranch(branch: CreateBranchDto): Promise<BranchEntity> {
        return this.datasource.saveBranch(branch);
    }
    getById(id: string): Promise<BranchEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAll(): Promise<BranchEntity[]> {
        return this.datasource.getAll();
    }
    updateBranch(branch: UpdateBranchDto): Promise<BranchEntity | undefined> {
        return this.datasource.updateBranch(branch);
    }
    deleteBranch(id: string): Promise<BranchEntity> {
        return this.datasource.deleteBranch(id);
    }
    
}