import { Router } from "express";
import { PostgresDashboardDatasourceImp } from '../../infrastructure/datasources/dashboard-postgres.datasource.imp';
import { DashboardRepositoryImp } from '../../infrastructure/repositories/dashboard.repository.imp';
import { DashboardController } from './dashboard.controller';

export class DashboardRoutes {
    static get routes(): Router {
        const router = Router();
        const datasource = new PostgresDashboardDatasourceImp();
        const repository = new DashboardRepositoryImp(datasource);
        const controller = new DashboardController(repository);

        /**
         * @swagger
         * /dashboard/total-items:
         *   get:
         *     summary: Get the total number of items
         *     tags: [Dashboard]
         *     responses:
         *       200:
         *         description: Total number of items
         *       500:
         *         description: Internal server error
         */
        router.get('/total-items', controller.getTotalItems);

        /**
         * @swagger
         * /dashboard/items-by-type:
         *   get:
         *     summary: Get the count of items by type
         *     tags: [Dashboard]
         *     responses:
         *       200:
         *         description: List of item counts by type
         *       500:
         *         description: Internal server error
         */
        router.get('/items-by-type', controller.getItemsCountByType);

        /**
         * @swagger
         * /dashboard/recent-transactions:
         *   get:
         *     summary: Get the most recent transactions
         *     tags: [Dashboard]
         *     responses:
         *       200:
         *         description: List of recent transactions
         *       500:
         *         description: Internal server error
         */
        router.get('/recent-transactions', controller.getRecentTransactions);

         /**
         * @swagger
         * /dashboard/transactions-by-period:
         *   get:
         *     summary: Get transactions by period
         *     tags: [Dashboard]
         *     parameters:
         *       - in: query
         *         name: period
         *         schema:
         *           type: string
         *           enum: [month, year]
         *         required: true
         *         description: The period to group transactions by
         *       - in: query
         *         name: year
         *         schema:
         *           type: integer
         *         description: The year to filter transactions by
         *     responses:
         *       200:
         *         description: List of transactions by period
         *       500:
         *         description: Internal server error
         */
         router.get('/transactions-by-period/:period/:year', controller.getTransactionsByPeriod);
         router.get('/transactions-by-period/:period', controller.getTransactionsByPeriod);
        
        //? Rutas de la anterior version    
        //  router.get('/period/:period/:year', transactionController.getTransactionsByPeriod);
        //  router.get('/period/:period', transactionController.getTransactionsByPeriod);

        /**
         * @swagger
         * /dashboard/report:
         *   get:
         *     summary: Generate a PDF report
         *     tags: [Dashboard]
         *     responses:
         *       200:
         *         description: PDF report
         *         content:
         *           application/pdf:
         *             schema:
         *               type: string
         *               format: binary
         *       500:
         *         description: Internal server error
         */
        router.get('/report', controller.generateReport);

        /**
         * @swagger
         * /dashboard/graph-data:
         *   get:
         *     summary: Get graph data for visualization
         *     tags: [Dashboard]
         *     responses:
         *       200:
         *         description: Graph data with nodes and links
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 nodes:
         *                   type: array
         *                   items:
         *                     type: object
         *                 links:
         *                   type: array
         *                   items:
         *                     type: object
         *       500:
         *         description: Internal server error
         */
        router.get('/graph-data', controller.getGraphData);

        return router;
    }
}
