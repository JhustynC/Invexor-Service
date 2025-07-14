import { RequestHandler } from "express";
import { AbsBranchRepository } from "../../domain/repositories/branch.repository";
import { BranchUseCases } from "../../domain/use-cases/branch.use-cases";
import { CreateBranchDto } from "../../domain/dtos/branch/create-branch.dto";
import { UpdateBranchDto } from "../../domain/dtos/branch/update-branch.dto";

export class BranchController {
    constructor(private readonly branchRepository: AbsBranchRepository){}

    public getBranch: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const {id_branch} = req.params;

        //? We use the specific use-case
        new BranchUseCases(this.branchRepository)
        .getBranchById(id_branch)
        .then((branch) => res.json(branch))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getBranches:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new BranchUseCases(this.branchRepository)
        .getAllBranches()
        .then((branches) => res.json(branches))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createBranch:RequestHandler = (req, res) => {
        const [error, branch] = CreateBranchDto.create(req.body);
        
        if(error){
            res.status(400).json({error});
            return;
        }

        new BranchUseCases(this.branchRepository)
        .createBranch(branch!)
        .then((branch) => res.json(branch))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public updateBranch: RequestHandler = (req, res) => {
        const { id_branch } =  req.params;
        const obj = {...req.body, id_branch};
        const [error, branch] = UpdateBranchDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new BranchUseCases(this.branchRepository)
        .updateBranch(branch!)
        .then((branch) => res.json(branch))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteBranch: RequestHandler = (req, res) => {
        const {id_branch} = req.params;

        new BranchUseCases(this.branchRepository)
        .deleteBranch(id_branch)
        .then((branch) => res.json(branch))
        .catch((error) => res.status(404).json({error: error.message}));
    }
}