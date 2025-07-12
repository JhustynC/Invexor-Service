import { CreateBranchDto } from "../dtos/branch/create-branch.dto";
import { UpdateBranchDto } from "../dtos/branch/update-branch.dto";
import { BranchEntity } from "../entities/branch.entity";
import { AbsBranchRepository } from "../repositories/branch.repository";

export class BranchUseCases {
    constructor(public readonly repository: AbsBranchRepository){}

    async createBranch(dto: CreateBranchDto): Promise<BranchEntity>{
        return await this.repository.saveBranch(dto);
    }

    async deleteBranch(id: string): Promise<BranchEntity>{
        return await this.repository.deleteBranch(id);
    }

    async getBranchById(id: string): Promise<BranchEntity | undefined>{
        return await this.repository.getById(id);
    }

    async getAllBranches(): Promise<BranchEntity[]>{
        return await this.repository.getAll();
    }

    async updateBranch(dto: UpdateBranchDto): Promise<BranchEntity | undefined>{
        return await this.repository.updateBranch(dto);
    }
}