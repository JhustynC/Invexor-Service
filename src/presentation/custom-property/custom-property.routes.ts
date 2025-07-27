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
        router.post('/', controller.create.bind(controller));
        router.get('/', controller.findAll.bind(controller));
        router.get('/:id', controller.findById.bind(controller));
        router.put('/:id', controller.updateById.bind(controller));
        router.delete('/:id', controller.deleteById.bind(controller));

        // Rutas para manejo de propiedades individuales
        router.post('/:id/properties', controller.addProperty.bind(controller));
        router.get('/:id/properties/:key', controller.getProperty.bind(controller));
        router.delete('/:id/properties/:key', controller.removeProperty.bind(controller));

        return router;
    }
} 