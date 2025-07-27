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
        router.post('/', controller.create.bind(controller));
        router.get('/', controller.getAll.bind(controller));
        router.get('/:id', controller.getById.bind(controller));
        router.get('/name/:name', controller.getByName.bind(controller));
        router.put('/:id', controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));

        return router;
    }
} 