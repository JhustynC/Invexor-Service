import { Router } from "express";
import { UserController } from "./user.controller";
import { PostgresUserDatasourceImp } from "../../infrastructure/datasources/user-postgres.datasource.imp";
import { UserRepositoryImp } from "../../infrastructure/repositories/user.repository.imp";

export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        const userDatasource = new PostgresUserDatasourceImp();
        const userRepository =  new UserRepositoryImp(userDatasource);
        const userController = new UserController(userRepository);

        /**
         * @swagger
         * /user:
         *   get:
         *     summary: Get all users
         *     responses:
         *       200:
         *         description: List of users
         */
        router.get('/', userController.getUsers);

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
        router.get('/:user_id', userController.getUser);

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
        router.post('/', userController.createUser);

        /**
         * @swagger
         * /user/{user_id}:
         *   put:
         *     summary: Update a user
         *     parameters:
         *       - in: path
         *         name: user_id
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
        router.put('/:user_id', userController.updateUser);

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
        router.delete('/:user_id', userController.deleteUser);

        /**
         * @swagger
         * /user/{user_id}:
         *   post:
         *     summary: Verify a user's password
         *     parameters:
         *       - in: path
         *         name: email
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
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: Correct password
         *       401:
         *         description: Incorrect password
         *       404:
         *         description: User not found
         */
        router.post('/:user_id', userController.checkPassword);

        return router;
    }    
}