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
         * /resource:
         *   get:
         *     summary: Get all resources
         *     tags: [Resources]
         *     responses:
         *       200:
         *         description: List of resources
         *       500:
         *         description: Internal server error
         */
        router.get('/', resourceController.getResources);

        /**
         * @swagger
         * /resource/{resource_id}:
         *   get:
         *     summary: Get a resource by ID
         *     tags: [Resources]
         *     parameters:
         *       - in: path
         *         name: resource_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Resource ID
         *     responses:
         *       200:
         *         description: Resource found
         *       404:
         *         description: Resource not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:resource_id', resourceController.getResource);

        /**
         * @swagger
         * /resource:
         *   post:
         *     summary: Create a new resource
         *     tags: [Resources]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - resource_id
         *               - resourcename
         *               - measure
         *               - currency
         *               - description
         *               - id_entity
         *             properties:
         *               resource_id:
         *                 type: string
         *                 description: Unique resource identifier
         *               resourcename:
         *                 type: string
         *                 description: Name of the resource
         *               measure:
         *                 type: string
         *                 description: Unit of measure for the resource
         *               currency:
         *                 type: string
         *                 description: Currency for the resource
         *               description:
         *                 type: string
         *                 description: Resource description
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *     responses:
         *       200:
         *         description: Resource created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Resource creation failed
         */
        router.post('/', resourceController.createResource);

        /**
         * @swagger
         * /resource/{id}:
         *   put:
         *     summary: Update a resource
         *     tags: [Resources]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Resource ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               resourcename:
         *                 type: string
         *                 description: Name of the resource
         *               measure:
         *                 type: string
         *                 description: Unit of measure for the resource
         *               currency:
         *                 type: string
         *                 description: Currency for the resource
         *               description:
         *                 type: string
         *                 description: Resource description
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *     responses:
         *       200:
         *         description: Resource updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Resource not found
         */
        router.put('/:id', resourceController.updateResource);

        /**
         * @swagger
         * /resource/{id}:
         *   delete:
         *     summary: Delete a resource
         *     tags: [Resources]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Resource ID to delete
         *     responses:
         *       200:
         *         description: Resource deleted successfully
         *       404:
         *         description: Resource not found
         */
        router.delete('/:id', resourceController.deleteResource);
     
        return router;
    }    
}