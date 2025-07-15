import { Router } from "express";
import { PostgresUserRolDatasourceImp } from "../../infrastructure/datasources/userRol-postgres.datasource.imp";
import { UserRolRepositoryImp } from "../../infrastructure/repositories/userRol.repository.imp";
import { UserRolController } from "./userRol.controller";
import swaggerJSDoc from "swagger-jsdoc";

export class UserRolRoutes{
    static get routes(): Router{
        const router = Router();
        const userRolDatasource = new PostgresUserRolDatasourceImp();
        const userRolRepository =  new UserRolRepositoryImp(userRolDatasource);
        const userRolController = new UserRolController(userRolRepository);
        
        /**
         * @swagger
         * /user:
         *   get:
         *     summary: Get all users
         *     responses:
         *       200:
         *         description: List of users
         */
        router.get('/', userRolController.getUserRols);

        /**
         * @swagger
         * /user/{user_id}:
         *   get:
         *     summary: Get a user by ID
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User found
         *       404:
         *         description: User not found
         */
        router.get('/:id_user_rol', userRolController.getUserRol);

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
        router.post('/', userRolController.createUserRol);

        /**
         * @swagger
         * /user/{user_id}:
         *   delete:
         *     summary: Delete a user
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User deleted
         *       404:
         *         description: User not found
         */
        router.delete('/:id_user_rol', userRolController.deleteUserRol);

        return router;
    }
}