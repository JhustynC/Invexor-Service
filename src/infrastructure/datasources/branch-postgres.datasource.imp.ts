import { AbsBranchDatasource } from "../../domain/datasources/branch.datasource";
import { CreateBranchDto } from "../../domain/dtos/branch/create-branch.dto";
import { UpdateBranchDto } from "../../domain/dtos/branch/update-branch.dto";
import { BranchEntity } from "../../domain/entities/branch.entity";
import { prisma } from "../../config/data/postgres/postgres.config"

export class PostgresBranchDatasourceImp implements AbsBranchDatasource{
    async saveBranch(branch: CreateBranchDto): Promise<BranchEntity> {
        const newBranch = await prisma.branch.create({
            data: {
                id_branch: branch.id_branch,
                state: branch.state,
                name_branch: branch.name_branch,
                city: branch.city,
                phone: branch.phone,
                id_entity: branch.id_entity,
                // If you need to create a new entity, use 'create' instead of 'connect'
            }
        })

        return BranchEntity.fromObject(newBranch)
        throw new Error("Method not implemented.");
    }
    async getById(id: string): Promise<BranchEntity | undefined> {
        const branch = await prisma.branch.findUnique({
            where: {id_branch: id}
        })

        if(!branch) return undefined
        return BranchEntity.fromObject(branch)
        //throw new Error("Method not implemented.");
    }
    async getAll(): Promise<BranchEntity[]> {
        const branches = await prisma.branch.findMany();
        return branches.map((branch) => BranchEntity.fromObject(branch))
        //throw new Error("Method not implemented.");
    }
    async updateBranch(branch: UpdateBranchDto): Promise<BranchEntity | undefined> {
        const updateData: any = {};

        if (branch.id_entity) updateData.id_entity = branch.id_entity;
        if (branch.state) updateData.state = branch.state;
        if (branch.name_branch) updateData.name_branch = branch.name_branch;
        if (branch.city) updateData.city = branch.city;
        if (branch.phone) updateData.phone = branch.phone;
        if (branch.values) updateData.values = branch.values;
        
        const updateBranch = await prisma.branch.update({
            where: {id_branch: branch.id_branch},
            data: updateData
        })

        if (!updateBranch) return undefined;
        return BranchEntity.fromObject(updateBranch)
        //throw new Error("Method not implemented.");
    }
    async deleteBranch(id: string): Promise<BranchEntity> {
        const deleteBranch = await prisma.branch.delete({
            where: {id_branch: id}
        })
        if (!deleteBranch) throw new Error("Something happened while attempting to delete data");
        return BranchEntity.fromObject(deleteBranch);
        //throw new Error("Method not implemented.");
    }
    async disconnet(): Promise<void> {
        await prisma.$disconnect();
    }
}