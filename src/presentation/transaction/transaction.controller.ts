import { RequestHandler } from "express";
import { AbsTransactionRepository } from "../../domain/repositories/transaction.repository";
import { TransactionUseCases } from "../../domain/use-cases/transaction.use-cases";
import { CreateTransactionDto } from "../../domain/dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../../domain/dtos/transaction/update-transaction.dto";

export class TransactionController {
    constructor(private readonly transactionRepository: AbsTransactionRepository){}

    public getTransaction: RequestHandler = (req, res) => {
        //? Get necessary data from query params
        const { transaction_id} = req.params;

        //? We use the specific use-case
        new TransactionUseCases(this.transactionRepository)
        .getTransactionById(Number(transaction_id))
        .then((transaction) => res.json(transaction))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public getTransactions:RequestHandler = (req, res) => {
        //? We use the specific use-case
        new TransactionUseCases(this.transactionRepository)
        .getAllTransactions()
        .then((transactions) => res.json(transactions))
        .catch((error) => res.status(500).json({error: error.message}));
    }

    public createTransaction:RequestHandler = (req, res) => {
        const [error, transaction] = CreateTransactionDto.create(req.body);
        
        if(error){
            res.status(400).json({error});
            return;
        }

        new TransactionUseCases(this.transactionRepository)
        .createTransaction(transaction!)
        .then((transaction) => res.json(transaction))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public updateTransaction: RequestHandler = (req, res) => {
        const { transaction_id } =  req.params;
        const obj = {...req.body, transaction_id};
        const [error, transaction] = UpdateTransactionDto.create(obj);

        if(error){
            res.status(400).json({error});
            return;
        }

        new TransactionUseCases(this.transactionRepository)
        .updateTransaction(transaction!)
        .then((transaction) => res.json(transaction))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public deleteTransaction: RequestHandler = (req, res) => {
        const {transaction_id} = req.params;

        new TransactionUseCases(this.transactionRepository)
        .deleteTransaction(Number(transaction_id))
        .then((transaction) => res.json(transaction))
        .catch((error) => res.status(404).json({error: error.message}));
    }

    public getTransactionsByPeriod: RequestHandler = (req, res) => {
        const { period, year } = req.params;
        if (!period || (period !== 'month' && period !== 'year')) {
            return res.status(400).json({ error: "'period' param is required and must be 'month' or 'year'" });
        }
        let yearNum: number | undefined = undefined;
        if (year) {
            yearNum = Number(year);
            if (isNaN(yearNum)) {
                return res.status(400).json({ error: "'year' query param must be a number" });
            }
        }
        new TransactionUseCases(this.transactionRepository)
            .getTransactionsByPeriod(period as 'month' | 'year', yearNum)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
}