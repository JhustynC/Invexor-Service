import { Router } from "express";
import { PostgresEntityDatasourceImp } from "../../infrastructure/datasources/entity-postgres.datasource.imp";
import { EntityRepositoryImp } from "../../infrastructure/repositories/entity.repository.imp";
import { EntityController } from "./entity.controller";

export class EntityRoutes {
    static get routes(): Router {
        const router = Router();
        const entityDatasource = new PostgresEntityDatasourceImp();
        const entityRepository =  new EntityRepositoryImp(entityDatasource);
        const entityController = new EntityController(entityRepository);

        /**
         * @swagger
         * /user:
         *   get:
         *     summary: Get all users
         *     responses:
         *       200:
         *         description: List of resources
         */
        router.get('/', entityController.getEntities);

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
        router.get('/:id_entity', entityController.getEntity);

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
        router.post('/', entityController.createEntity);


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
        router.delete('/:id_entity', entityController.deleteEntity);

        return router;
    }    
}