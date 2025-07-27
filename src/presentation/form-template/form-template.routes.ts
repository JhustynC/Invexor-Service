import { Router } from "express";
import { FormTemplateController } from "./form-template.controller";

export class FormTemplateRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new FormTemplateController(
            // This will be injected via dependency injection
            {} as any
        );

        // Define routes
        router.post('/', controller.create.bind(controller));
        router.get('/', controller.getAll.bind(controller));
        router.get('/:id', controller.getById.bind(controller));
        router.get('/name/:name', controller.getByName.bind(controller));
        router.put('/:id', controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));

        return router;
    }
} 