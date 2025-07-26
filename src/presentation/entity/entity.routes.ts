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
         * /entity:
         *   get:
         *     summary: Get all entities
         *     tags: [Entities]
         *     responses:
         *       200:
         *         description: List of entities
         *       500:
         *         description: Internal server error
         */
        router.get('/', entityController.getEntities);

        /**
         * @swagger
         * /entity/{id_entity}:
         *   get:
         *     summary: Get an entity by ID
         *     tags: [Entities]
         *     parameters:
         *       - in: path
         *         name: id_entity
         *         required: true
         *         schema:
         *           type: string
         *         description: Entity ID
         *     responses:
         *       200:
         *         description: Entity found
         *       404:
         *         description: Entity not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id_entity', entityController.getEntity);

        /**
         * @swagger
         * /entity:
         *   post:
         *     summary: Create a new entity
         *     tags: [Entities]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - id_entity_type
         *             properties:
         *               id_entity_type:
         *                 type: integer
         *                 description: Entity type ID
         *     responses:
         *       200:
         *         description: Entity created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Entity creation failed
         */
        router.post('/', entityController.createEntity);


        /**
         * @swagger
         * /entity/{id_entity}:
         *   delete:
         *     summary: Delete an entity
         *     tags: [Entities]
         *     parameters:
         *       - in: path
         *         name: id_entity
         *         required: true
         *         schema:
         *           type: string
         *         description: Entity ID to delete
         *     responses:
         *       200:
         *         description: Entity deleted successfully
         *       404:
         *         description: Entity not found
         */
        router.delete('/:id_entity', entityController.deleteEntity);

        return router;
    }    
}