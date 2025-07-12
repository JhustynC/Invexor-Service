import { CreateBranchDto } from "../dtos/branch/create-branch.dto";
import { UpdateBranchDto } from "../dtos/branch/update-branch.dto";
import { BranchEntity } from "../entities/branch.entity";

//? Rules
export abstract class AbsBranchRepository {
    abstract saveBranch(branch: CreateBranchDto): Promise<BranchEntity>;
    abstract getById(id: string): Promise<BranchEntity | undefined>;
    abstract getAll(): Promise<BranchEntity[]>;
    abstract updateBranch(branch: UpdateBranchDto): Promise<BranchEntity | undefined>;
    abstract deleteBranch(id: string): Promise<BranchEntity>;
}