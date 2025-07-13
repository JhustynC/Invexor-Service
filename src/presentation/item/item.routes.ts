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
         *     responses:
         *       200:
         *         description: List of items
         */
        router.get('/', itemController.getItems);

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
        router.get('/:item_id', itemController.getItem);

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
        router.post('/', itemController.createItem);

        /**
         * @swagger
         * /item/{item_id}:
         *   put:
         *     summary: Update an item
         *     parameters:
         *       - in: path
         *         name: item_id
         *         required: true
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: User updated
         *       404:
         *         description: User not found
         */
        router.put('/:item_id', itemController.updateItem);

        /**
         * @swagger
         * /item/{item_id}:
         *   delete:
         *     summary: Delete an item
         *     parameters:
         *       - in: path
         *         name: item_id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User deleted
         *       404:
         *         description: User not found
         */
        router.delete('/:item_id', itemController.deleteItem);
     
        return router;
    }    
}