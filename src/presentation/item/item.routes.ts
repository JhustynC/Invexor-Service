import { Router } from "express";
import { PostgresItemDatasourceImp } from '../../infrastructure/datasources/item-postgres.datasource.imp';
import { ItemRepositoryImp } from '../../infrastructure/repositories/item.repository.imp';
import { ItemController } from './item.controller';

export class ItemRoutes {
    static get routes(): Router {
        const router = Router();
        const itemDatasource = new PostgresItemDatasourceImp();
        const itemRepository =  new ItemRepositoryImp(itemDatasource);
        const itemController = new ItemController(itemRepository);

        /**
         * @swagger
         * /item:
         *   get:
         *     summary: Get all items
         *     tags: [Items]
         *     responses:
         *       200:
         *         description: List of items
         *       500:
         *         description: Internal server error
         */
        router.get('/', itemController.getItems);

        /**
         * @swagger
         * /item/{item_id}:
         *   get:
         *     summary: Get an item by ID
         *     tags: [Items]
         *     parameters:
         *       - in: path
         *         name: item_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Item ID
         *     responses:
         *       200:
         *         description: Item found
         *       404:
         *         description: Item not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:item_id', itemController.getItem);

        /**
         * @swagger
         * /item:
         *   post:
         *     summary: Create a new item
         *     tags: [Items]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - id_item
         *               - name_item
         *               - description
         *               - provider
         *               - id_item_type
         *               - id_entity
         *             properties:
         *               id_item:
         *                 type: string
         *                 description: Unique item identifier
         *               name_item:
         *                 type: string
         *                 description: Name of the item
         *               description:
         *                 type: string
         *                 description: Item description
         *               provider:
         *                 type: string
         *                 description: Item provider
         *               id_item_type:
         *                 type: integer
         *                 description: Item type ID
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *     responses:
         *       200:
         *         description: Item created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Item creation failed
         */
        router.post('/', itemController.createItem);

        /**
         * @swagger
         * /item/{id_item}:
         *   put:
         *     summary: Update an item
         *     tags: [Items]
         *     parameters:
         *       - in: path
         *         name: id_item
         *         required: true
         *         schema:
         *           type: string
         *         description: Item ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name_item:
         *                 type: string
         *                 description: Name of the item
         *               description:
         *                 type: string
         *                 description: Item description
         *               provider:
         *                 type: string
         *                 description: Item provider
         *               id_item_type:
         *                 type: integer
         *                 description: Item type ID
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *     responses:
         *       200:
         *         description: Item updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Item not found
         */
        router.put('/:id_item', itemController.updateItem);

        /**
         * @swagger
         * /item/{id_item}:
         *   delete:
         *     summary: Delete an item
         *     tags: [Items]
         *     parameters:
         *       - in: path
         *         name: id_item
         *         required: true
         *         schema:
         *           type: string
         *         description: Item ID to delete
         *     responses:
         *       200:
         *         description: Item deleted successfully
         *       404:
         *         description: Item not found
         */
        router.delete('/:id_item', itemController.deleteItem);
     
        return router;
    }    
}