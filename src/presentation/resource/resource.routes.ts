import { Router } from "express";
import { PostgresResourceDatasourceImp } from '../../infrastructure/datasources/resource-postgres.datasource.imp';
import { ResourceRepositoryImp } from '../../infrastructure/repositories/resource.repository.imp';
import { ResourceController } from './resource.controller';

export class ResourceRoutes {
    static get routes(): Router {
        const router = Router();
        const resourceDatasource = new PostgresResourceDatasourceImp();
        const resourceRepository =  new ResourceRepositoryImp(resourceDatasource);
        const resourceController = new ResourceController(resourceRepository);

        /**
         * @swagger
         * /user:
         *   get:
         *     summary: Get all users
         *     responses:
         *       200:
         *         description: List of resources
         */
        router.get('/', resourceController.getResources);

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
        router.get('/:id_resource', resourceController.getResource);

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
        router.post('/', resourceController.createResource);

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
        router.put('/:id_resource', resourceController.updateResource);

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
        router.delete('/:id_resource', resourceController.deleteResource);
     
        return router;
    }    
}