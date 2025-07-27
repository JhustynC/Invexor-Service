import { Router } from "express";
import { FormTemplateController } from "./form-template.controller";
import { FormTemplateUseCases } from "../../domain/use-cases/form-template.use-cases";
import { FormTemplateRepositoryImpl } from "../../infrastructure/repositories/form-template.repository.imp";
import { FormTemplateMongoDatasource } from "../../infrastructure/datasources/form-template-mongo.datasource.imp";

export class FormTemplateRoutes {
    static get routes(): Router {
        const router = Router();
        
        // Inyección de dependencias
        const formTemplateDatasource = new FormTemplateMongoDatasource();
        const formTemplateRepository = new FormTemplateRepositoryImpl(formTemplateDatasource);
        const formTemplateUseCases = new FormTemplateUseCases(formTemplateRepository);
        const controller = new FormTemplateController(formTemplateUseCases);
        
        // Rutas CRUD básicas
        
        /**
         * @swagger
         * /template:
         *   post:
         *     summary: Create a new form template
         *     tags: [FormTemplates]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - name
         *               - fields
         *             properties:
         *               name:
         *                 type: string
         *                 description: Template name
         *               description:
         *                 type: string
         *                 description: Template description
         *               fields:
         *                 type: array
         *                 items:
         *                   type: object
         *                 description: Form fields configuration
         *     responses:
         *       201:
         *         description: Template created successfully
         *       400:
         *         description: Invalid data provided
         *       500:
         *         description: Internal server error
         */
        router.post('/', controller.create.bind(controller));
        
        /**
         * @swagger
         * /template:
         *   get:
         *     summary: Get all form templates
         *     tags: [FormTemplates]
         *     responses:
         *       200:
         *         description: List of form templates
         *       500:
         *         description: Internal server error
         */
        router.get('/', controller.getAll.bind(controller));
        
        /**
         * @swagger
         * /template/{id}:
         *   get:
         *     summary: Get a form template by ID
         *     tags: [FormTemplates]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Template ID
         *     responses:
         *       200:
         *         description: Template found
         *       404:
         *         description: Template not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id', controller.getById.bind(controller));
        
        /**
         * @swagger
         * /template/name/{name}:
         *   get:
         *     summary: Get a form template by name
         *     tags: [FormTemplates]
         *     parameters:
         *       - in: path
         *         name: name
         *         required: true
         *         schema:
         *           type: string
         *         description: Template name
         *     responses:
         *       200:
         *         description: Template found
         *       404:
         *         description: Template not found
         *       500:
         *         description: Internal server error
         */
        router.get('/name/:name', controller.getByName.bind(controller));
        
        /**
         * @swagger
         * /template/{id}:
         *   put:
         *     summary: Update a form template
         *     tags: [FormTemplates]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Template ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 description: Template name
         *               description:
         *                 type: string
         *                 description: Template description
         *               fields:
         *                 type: array
         *                 items:
         *                   type: object
         *                 description: Form fields configuration
         *     responses:
         *       200:
         *         description: Template updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Template not found
         *       500:
         *         description: Internal server error
         */
        router.put('/:id', controller.update.bind(controller));
        
        /**
         * @swagger
         * /template/{id}:
         *   delete:
         *     summary: Delete a form template
         *     tags: [FormTemplates]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: string
         *         description: Template ID
         *     responses:
         *       200:
         *         description: Template deleted successfully
         *       404:
         *         description: Template not found
         *       500:
         *         description: Internal server error
         */
        router.delete('/:id', controller.delete.bind(controller));

        return router;
    }
} 