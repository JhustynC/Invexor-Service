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
         * /area:
         *   get:
         *     summary: Get all areas
         *     tags: [Areas]
         *     responses:
         *       200:
         *         description: List of areas
         *       500:
         *         description: Internal server error
         */
        router.get('/', areaController.getAreas);

        /**
         * @swagger
         * /area/{area_id}:
         *   get:
         *     summary: Get an area by ID
         *     tags: [Areas]
         *     parameters:
         *       - in: path
         *         name: area_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Area ID
         *     responses:
         *       200:
         *         description: Area found
         *       404:
         *         description: Area not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:area_id', areaController.getArea);

        /**
         * @swagger
         * /area:
         *   post:
         *     summary: Create a new area
         *     tags: [Areas]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - area_id
         *               - areaname
         *               - branch_id
         *               - phone
         *               - description
         *               - active
         *               - id_entity
         *             properties:
         *               area_id:
         *                 type: string
         *                 description: Unique area identifier
         *               areaname:
         *                 type: string
         *                 description: Name of the area
         *               pattern_area_id:
         *                 type: string
         *                 nullable: true
         *                 description: Pattern area ID (optional)
         *               branch_id:
         *                 type: string
         *                 description: Branch ID this area belongs to
         *               phone:
         *                 type: string
         *                 description: Area phone number
         *               description:
         *                 type: string
         *                 description: Area description
         *               active:
         *                 type: boolean
         *                 description: Whether the area is active
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *     responses:
         *       200:
         *         description: Area created successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Area creation failed
         */
        router.post('/', areaController.createArea);

        /**
         * @swagger
         * /area/{area_id}:
         *   put:
         *     summary: Update an area
         *     tags: [Areas]
         *     parameters:
         *       - in: path
         *         name: area_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Area ID to update
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               areaname:
         *                 type: string
         *                 description: Name of the area
         *               pattern_area_id:
         *                 type: string
         *                 nullable: true
         *                 description: Pattern area ID (optional)
         *               branch_id:
         *                 type: string
         *                 description: Branch ID this area belongs to
         *               phone:
         *                 type: string
         *                 description: Area phone number
         *               description:
         *                 type: string
         *                 description: Area description
         *               active:
         *                 type: boolean
         *                 description: Whether the area is active
         *               id_entity:
         *                 type: integer
         *                 description: Entity ID
         *     responses:
         *       200:
         *         description: Area updated successfully
         *       400:
         *         description: Invalid data provided
         *       404:
         *         description: Area not found
         */
        router.put('/:area_id', areaController.updateArea);

        /**
         * @swagger
         * /area/{area_id}:
         *   delete:
         *     summary: Delete an area
         *     tags: [Areas]
         *     parameters:
         *       - in: path
         *         name: area_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Area ID to delete
         *     responses:
         *       200:
         *         description: Area deleted successfully
         *       404:
         *         description: Area not found
         */
        router.delete('/:area_id', areaController.deleteArea);

        return router;
    }    
}