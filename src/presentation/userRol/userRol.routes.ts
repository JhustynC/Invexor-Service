import { Router } from "express";
import { PostgresUserRolDatasourceImp } from "../../infrastructure/datasources/userRol-postgres.datasource.imp";
import { UserRolRepositoryImp } from "../../infrastructure/repositories/userRol.repository.imp";
import { UserRolController } from "./userRol.controller";

export class UserRolRoutes{
    static get routes(): Router{
        const router = Router();
        const userRolDatasource = new PostgresUserRolDatasourceImp();
        const userRolRepository =  new UserRolRepositoryImp(userRolDatasource);
        const userRolController = new UserRolController(userRolRepository);
        
        /**
         * @swagger
         * /userRol:
         *   get:
         *     summary: Get all user roles
         *     tags: [UserRoles]
         *     responses:
         *       200:
         *         description: List of user roles
         *       500:
         *         description: Internal server error
         */
        router.get('/', userRolController.getUserRols);

        /**
         * @swagger
         * /userRol/{id_user_rol}:
         *   get:
         *     summary: Get a user role by ID
         *     tags: [UserRoles]
         *     parameters:
         *       - in: path
         *         name: id_user_rol
         *         required: true
         *         schema:
         *           type: integer
         *         description: User role ID
         *     responses:
         *       200:
         *         description: User role found
         *       404:
         *         description: User role not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:id_user_rol', userRolController.getUserRol);

        /**
         * @swagger
         * /userRol:
         *   post:
         *     summary: Create a new user role
         *     tags: [UserRoles]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - id_user_rol
         *               - name_user_rol
         *             properties:
         *               id_user_rol:
         *                 type: integer
         *                 description: Unique user role identifier
         *               name_user_rol:
         *                 type: string
         *                 description: Name of the user role
         *     responses:
         *       200:
         *         description: User role created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: User role creation failed
         */
        router.post('/', userRolController.createUserRol);

        /**
         * @swagger
         * /userRol/{id_user_rol}:
         *   delete:
         *     summary: Delete a user role
         *     tags: [UserRoles]
         *     parameters:
         *       - in: path
         *         name: id_user_rol
         *         required: true
         *         schema:
         *           type: integer
         *         description: User role ID to delete
         *     responses:
         *       200:
         *         description: User role deleted successfully
         *       404:
         *         description: User role not found
         */
        router.delete('/:id_user_rol', userRolController.deleteUserRol);

        return router;
    }
}