import { Router } from 'express';
import { CustomPropertyController } from './custom-property.controller';
import { CustomPropertyUseCases } from '../../domain/use-cases/custom-property.use-cases';
import { CustomPropertyRepositoryImpl } from '../../infrastructure/repositories/customProperty.repository.imp';
import { CustomPropertyMongoDatasource } from '../../infrastructure/datasources/customProperty-mongo.datasource.imp';

export class CustomPropertyRoutes {
    static get routes(): Router {
        const router = Router();

        // Inyección de dependencias
        const datasource = new CustomPropertyMongoDatasource();
        const repository = new CustomPropertyRepositoryImpl(datasource);
        const customPropertyUseCases = new CustomPropertyUseCases(repository);
        const controller = new CustomPropertyController(customPropertyUseCases);

        // Rutas CRUD básicas
        
        /**
         * @swagger
         * /customProperty:
         *   post:
         *     summary: Create a new custom property
         *     tags: [CustomProperties]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *             properties:
         *               name:
         *                 type: string
         *                 description: Custom property name
         *               description:
         *                 type: string
         *                 description: Custom property description
         *               properties:
         *                 type: object
         *                 description: Key-value pairs of custom properties
         *     responses:
         *       201:
         *         description: Custom property created successfully
         *       400:
         *         description: Invalid data provided
         *       500:
         *         description: Internal server error
         */
        router.post('/', controller.create.bind(controller));
        
        /**
         * @swagger
         * /customProperty:
         *   get:
         *     summary: Get all custom properties
         *     tags: [CustomProperties]
         *     responses:
         *       200:
         *         description: List of custom properties
         *       500:
         *         description: Internal server error
         */
        router.get('/', controller.findAll.bind(controller));
        
        /**
         * @swagger
         * /customProperty/{id}:
         *   get:
         *     summary: Get a custom property by ID
         *     tags: [CustomProperties]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Custom property ID
         *     responses:
         *       200:
         *         description: Custom property found
         *       404:
         *         description: Custom property not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id', controller.findById.bind(controller));
        
        /**
         * @swagger
         * /customProperty/{id}:
         *   put:
         *     summary: Update a custom property
         *     tags: [CustomProperties]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Custom property ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Custom property name
         *               description:
         *                 type: string
         *                 description: Custom property description
         *               properties:
         *                 type: object
         *                 description: Key-value pairs of custom properties
         *     responses:
         *       200:
         *         description: Custom property updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Custom property not found
         *       500:
         *         description: Internal server error
         */
        router.put('/:id', controller.updateById.bind(controller));
        
        /**
         * @swagger
         * /customProperty/{id}:
         *   delete:
         *     summary: Delete a custom property
         *     tags: [CustomProperties]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Custom property ID
         *     responses:
         *       200:
         *         description: Custom property deleted successfully
         *       404:
         *         description: Custom property not found
         *       500:
         *         description: Internal server error
         */
        router.delete('/:id', controller.deleteById.bind(controller));

        // Rutas para manejo de propiedades individuales
        
        /**
         * @swagger
         * /customProperty/{id}/properties:
         *   post:
         *     summary: Add a property to a custom property
         *     tags: [CustomProperties]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Custom property ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - key
         *               - value
         *             properties:
         *               key:
         *                 type: string
         *                 description: Property key
         *               value:
         *                 type: string
         *                 description: Property value
         *     responses:
         *       200:
         *         description: Property added successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Custom property not found
         *       500:
         *         description: Internal server error
         */
        router.post('/:id/properties', controller.addProperty.bind(controller));
        
        /**
         * @swagger
         * /customProperty/{id}/properties/{key}:
         *   get:
         *     summary: Get a specific property from a custom property
         *     tags: [CustomProperties]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Custom property ID
         *       - in: path
         *         name: key
         *         required: true
         *         schema:
         *           type: string
         *         description: Property key
         *     responses:
         *       200:
         *         description: Property found
         *       404:
         *         description: Property or custom property not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id/properties/:key', controller.getProperty.bind(controller));
        
        /**
         * @swagger
         * /customProperty/{id}/properties/{key}:
         *   delete:
         *     summary: Remove a property from a custom property
         *     tags: [CustomProperties]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Custom property ID
         *       - in: path
         *         name: key
         *         required: true
         *         schema:
         *           type: string
         *         description: Property key
         *     responses:
         *       200:
         *         description: Property removed successfully
         *       404:
         *         description: Property or custom property not found
         *       500:
         *         description: Internal server error
         */
        router.delete('/:id/properties/:key', controller.removeProperty.bind(controller));

        return router;
    }
}