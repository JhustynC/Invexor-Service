import { Router } from "express";
import { PostgresItemType } from "../../infrastructure/datasources/itemType-postgres.datasource.imp";
import { ItemTypeRepositoryImp } from "../../infrastructure/repositories/itemType.repository.imp";
import { ItemTypeController } from "./itemType.controller";

export class ItemTypeRoutes {
    static get routes(): Router {
        const router = Router();
        const itemTypeDatasource = new PostgresItemType();
        const itemTypeRepository =  new ItemTypeRepositoryImp(itemTypeDatasource);
        const itemTypeController = new ItemTypeController(itemTypeRepository);

        /**
         * @swagger
         * /itemType:
         *   get:
         *     summary: Get all item types
         *     tags: [ItemTypes]
         *     responses:
         *       200:
         *         description: List of item types
         *       500:
         *         description: Internal server error
         */
        router.get('/', itemTypeController.getItemTypes);

        /**
         * @swagger
         * /itemType/{id_item_type}:
         *   get:
         *     summary: Get an item type by ID
         *     tags: [ItemTypes]
         *     parameters:
         *       - in: path
         *         name: id_item_type
         *         required: true
         *         schema:
         *           type: integer
         *         description: Item type ID
         *     responses:
         *       200:
         *         description: Item type found
         *       404:
         *         description: Item type not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id_item_type', itemTypeController.getItemType);

        /**
         * @swagger
         * /itemType:
         *   post:
         *     summary: Create a new item type
         *     tags: [ItemTypes]
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
         *                 description: Name of the item type
         *     responses:
         *       200:
         *         description: Item type created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Item type creation failed
         */
        router.post('/', itemTypeController.createItemType);

        /**
         * @swagger
         * /itemType/{id_item_type}:
         *   delete:
         *     summary: Delete an item type
         *     tags: [ItemTypes]
         *     parameters:
         *       - in: path
         *         name: id_item_type
         *         required: true
         *         schema:
         *           type: integer
         *         description: Item type ID to delete
         *     responses:
         *       200:
         *         description: Item type deleted successfully
         *       404:
         *         description: Item type not found
         */
        router.delete('/:id_item_type', itemTypeController.deleteItemType);

        return router;
    }    
}