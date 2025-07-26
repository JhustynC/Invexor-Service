import { Router } from "express";
import { PostgresBranchDatasourceImp } from '../../infrastructure/datasources/branch-postgres.datasource.imp';
import { BranchRepositoryImp } from '../../infrastructure/repositories/branch.repository.imp';
import { BranchController } from './branch.controller';

export class BranchRoutes {
    static get routes(): Router {
        const router = Router();
        const branchDatasource = new PostgresBranchDatasourceImp();
        const branchRepository =  new BranchRepositoryImp(branchDatasource);
        const branchController = new BranchController(branchRepository);

        /**
         * @swagger
         * /branch:
         *   get:
         *     summary: Get all branches
         *     tags: [Branches]
         *     responses:
         *       200:
         *         description: List of branches
         *       500:
         *         description: Internal server error
         */
        router.get('/', branchController.getBranches);

        /**
         * @swagger
         * /branch/{id_branch}:
         *   get:
         *     summary: Get a branch by ID
         *     tags: [Branches]
         *     parameters:
         *       - in: path
         *         name: id_branch
         *         required: true
         *         schema:
         *           type: string
         *         description: Branch ID
         *     responses:
         *       200:
         *         description: Branch found
         *       404:
         *         description: Branch not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id_branch', branchController.getBranch);

        /**
         * @swagger
         * /branch:
         *   post:
         *     summary: Create a new branch
         *     tags: [Branches]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - id_branch
         *               - id_entity
         *               - name_branch
         *               - city
         *               - phone
         *               - state
         *             properties:
         *               id_branch:
         *                 type: string
         *                 description: Unique branch identifier
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *               name_branch:
         *                 type: string
         *                 description: Name of the branch
         *               city:
         *                 type: string
         *                 description: City where the branch is located
         *               phone:
         *                 type: string
         *                 description: Branch phone number
         *               state:
         *                 type: boolean
         *                 description: Whether the branch is active
         *     responses:
         *       200:
         *         description: Branch created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Branch creation failed
         */
        router.post('/', branchController.createBranch);

        /**
         * @swagger
         * /branch/{id_branch}:
         *   put:
         *     summary: Update a branch
         *     tags: [Branches]
         *     parameters:
         *       - in: path
         *         name: id_branch
         *         required: true
         *         schema:
         *           type: string
         *         description: Branch ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *               name_branch:
         *                 type: string
         *                 description: Name of the branch
         *               city:
         *                 type: string
         *                 description: City where the branch is located
         *               phone:
         *                 type: string
         *                 description: Branch phone number
         *               state:
         *                 type: boolean
         *                 description: Whether the branch is active
         *     responses:
         *       200:
         *         description: Branch updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Branch not found
         */
        router.put('/:id_branch', branchController.updateBranch);

        /**
         * @swagger
         * /branch/{id_branch}:
         *   delete:
         *     summary: Delete a branch
         *     tags: [Branches]
         *     parameters:
         *       - in: path
         *         name: id_branch
         *         required: true
         *         schema:
         *           type: string
         *         description: Branch ID to delete
         *     responses:
         *       200:
         *         description: Branch deleted successfully
         *       404:
         *         description: Branch not found
         */
        router.delete('/:id_branch', branchController.deleteBranch);
     
        return router;
    }    
}