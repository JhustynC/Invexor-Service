import { Router } from "express";
import { TransactionRepositoryImp } from "../../infrastructure/repositories/transaction.repository.imp";
import { PostgresTransactionDatasourceImp } from "../../infrastructure/datasources/transaction.datasource.imp";
import { TransactionController } from "./transaction.controller";

export class TransactionRoutes {
    static get routes(): Router {
        const router = Router();
        const transactionDatasource = new PostgresTransactionDatasourceImp();
        const transactionRepository =  new TransactionRepositoryImp(transactionDatasource);
        const transactionController = new TransactionController(transactionRepository);

        /**
         * @swagger
         * /transaction:
         *   get:
         *     summary: Get all transactions
         *     tags: [Transactions]
         *     responses:
         *       200:
         *         description: List of transactions
         *       500:
         *         description: Internal server error
         */
        router.get('/', transactionController.getTransactions);

        /**
         * @swagger
         * /transaction/{transaction_id}:
         *   get:
         *     summary: Get a transaction by ID
         *     tags: [Transactions]
         *     parameters:
         *       - in: path
         *         name: transaction_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Transaction ID
         *     responses:
         *       200:
         *         description: Transaction found
         *       404:
         *         description: Transaction not found
         *       500:
         *         description: Internal server error
         */
        router.get('/:transaction_id', transactionController.getTransaction);

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
        router.post('/', transactionController.createTransaction);

        /**
         * @swagger
         * /transaction/{transaction_id}:
         *   put:
         *     summary: Update a transaction
         *     tags: [Transactions]
         *     parameters:
         *       - in: path
         *         name: transaction_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Transaction ID to update
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
         *         description: Transaction not found
         */
        router.put('/:transaction_id', transactionController.updateTransaction);

        /**
         * @swagger
         * /transaction/{transaction_id}:
         *   delete:
         *     summary: Delete a transaction
         *     tags: [Transactions]
         *     parameters:
         *       - in: path
         *         name: transaction_id
         *         required: true
         *         schema:
         *           type: string
         *         description: Transaction ID to delete
         *     responses:
         *       200:
         *         description: Transaction deleted successfully
         *       404:
         *         description: Transaction not found
         */
        router.delete('/:transaction_id', transactionController.deleteTransaction);

        return router;
    }    
}