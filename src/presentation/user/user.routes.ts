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
         *     tags: [Users]
         *     responses:
         *       200:
         *         description: List of users
         *       500:
         *         description: Internal server error
         */
        router.get('/', userController.getUsers);

        /**
         * @swagger
         * /user/{user_id}:
         *   get:
         *     summary: Get a user by ID
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID
         *     responses:
         *       200:
         *         description: User found
         *       404:
         *         description: User not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:user_id', userController.getUser);

        /**
         * @swagger
         * /user:
         *   post:
         *     summary: Create a new user
         *     tags: [Users]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - user_id
         *               - username
         *               - email
         *               - password
         *               - user_role_ids
         *             properties:
         *               user_id:
         *                 type: string
         *                 description: Unique user identifier
         *               username:
         *                 type: string
         *                 description: User's username
         *               email:
         *                 type: string
         *                 format: email
         *                 description: User's email address
         *               password:
         *                 type: string
         *                 description: User's password
         *               user_role_ids:
         *                 type: array
         *                 items:
         *                   type: integer
         *                 description: Array of user role IDs
         *     responses:
         *       200:
         *         description: User created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: User creation failed
         */
        router.post('/', userController.createUser);

        /**
         * @swagger
         * /user/{user_id}:
         *   put:
         *     summary: Update a user
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: User's username
         *               email:
         *                 type: string
         *                 format: email
         *                 description: User's email address
         *               password:
         *                 type: string
         *                 description: User's password
         *               user_role_ids:
         *                 type: array
         *                 items:
         *                   type: integer
         *                 description: Array of user role IDs
         *     responses:
         *       200:
         *         description: User updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: User not found
         */
        router.put('/:user_id', userController.updateUser);

        /**
         * @swagger
         * /user/{user_id}:
         *   delete:
         *     summary: Delete a user
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID to delete
         *     responses:
         *       200:
         *         description: User deleted successfully
         *       404:
         *         description: User not found
         */
        router.delete('/:user_id', userController.deleteUser);

        /**
         * @swagger
         * /user/{user_id}/check-password:
         *   post:
         *     summary: Verify a user's password
         *     tags: [Users]
         *     parameters:
         *       - in: path
         *         name: user_id
         *         required: true
         *         schema:
         *           type: string
         *         description: User ID
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - password
         *             properties:
         *               password:
         *                 type: string
         *                 description: Password to verify
         *     responses:
         *       200:
         *         description: Password verification result
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 checkResult:
         *                   type: boolean
         *                   description: True if password is correct, false otherwise
         *       404:
         *         description: User not found
         *       500:
         *         description: Internal server error
         */
        router.post('/:user_id/check-password', userController.checkPassword);

        return router;
    }    
}