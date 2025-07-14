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
         * /user:
         *   get:
         *     summary: Get all users
         *     responses:
         *       200:
         *         description: List of branches
         */
        router.get('/', branchController.getBranches);

        /**
         * @swagger
         * /user/{email}:
         *   get:
         *     summary: Get a user by email
         *     parameters:
         *       - in: path
         *         name: email
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User found
         *       404:
         *         description: User not found
         */
        router.get('/:id_branch', branchController.getBranch);

        /**
         * @swagger
         * /user:
         *   post:
         *     summary: Create a new user
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: User created
         *       400:
         *         description: Invalid data
         */
        router.post('/', branchController.createBranch);

        /**
         * @swagger
         * /user/{email}:
         *   put:
         *     summary: Update a user
         *     parameters:
         *       - in: path
         *         name: email
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: User updated
         *       404:
         *         description: User not found
         */
        router.put('/:id_branch', branchController.updateBranch);

        /**
         * @swagger
         * /user/{email}:
         *   delete:
         *     summary: Delete a user
         *     parameters:
         *       - in: path
         *         name: email
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User deleted
         *       404:
         *         description: User not found
         */
        router.delete('/:id_branch', branchController.deleteBranch);
     
        return router;
    }    
}