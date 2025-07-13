import { Router } from "express";
import { PostgresAreaDatasourceImp } from "../../infrastructure/datasources/area-postgres.datasource.imp";
import { AreaRepositoryImp } from "../../infrastructure/repositories/area.repository.imp";
import { AreaController } from "./area.controller";

export class AreaRoutes {
    static get routes(): Router {
        const router = Router();
        const areaDatasource = new PostgresAreaDatasourceImp();
        const areaRepository = new AreaRepositoryImp(areaDatasource);
        const areaController = new AreaController(areaRepository);

        /**
         * @swagger
         * /user:
         *   get:
         *     summary: Get all users
         *     responses:
         *       200:
         *         description: List of areas
         */
        router.get('/', areaController.getAreas);

        /**
         * @swagger
         * /area/{area_id}:
         *   get:
         *     summary: Get a area by ID
         *     parameters:
         *       - in: path
         *         name: area_id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User found
         *       404:
         *         description: Area not found
         */
        router.get('/:area_id', areaController.getArea);

        /**
         * @swagger
         * /area:
         *   post:
         *     summary: Create a new area
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
        router.post('/', areaController.createArea);

        /**
         * @swagger
         * /area/{area_id}:
         *   put:
         *     summary: Update a area
         *     parameters:
         *       - in: path
         *         name: area_id
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
         *         description: Area not found
         */
        router.put('/:area_id', areaController.updateArea);

        /**
         * @swagger
         * /area/{area_id}:
         *   delete:
         *     summary: Delete a area
         *     parameters:
         *       - in: path
         *         name: area_id
         *         required: true
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: User deleted
         *       404:
         *         description: Area not found
         */
        router.delete('/:area_id', areaController.deleteArea);

        return router;
    }    
}