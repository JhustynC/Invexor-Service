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
         * /item:
         *   get:
         *     summary: Get all items
         *     responses:
         *       200:
         *         description: List of items
         */
        router.get('/', itemTypeController.getItemTypes);

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
        router.get('/:id_item_type', itemTypeController.getItemType);

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
        router.post('/', itemTypeController.createItemType);

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
        router.delete('/:id_item_type', itemTypeController.deleteItemType);

        return router;
    }    
}