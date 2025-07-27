import { AbsTransactionDatasource } from "../../domain/datasources/transaction.datasource";
import { CreateTransactionDto } from "../../domain/dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../../domain/dtos/transaction/update-transaction.dto";
import { TransactionEntity } from "../../domain/entities/transaction.entity";
import { AbsTransactionRepository } from "../../domain/repositories/transaction.repository";

export class TransactionRepositoryImp implements AbsTransactionRepository{

    constructor(private readonly datasource: AbsTransactionDatasource){}
    saveTransaction(item: CreateTransactionDto): Promise<TransactionEntity> {
        return this.datasource.saveTransaction(item);
    }
    getTransactionById(id: number): Promise<TransactionEntity | undefined> {
        return this.datasource.getById(id);
    }
    getAllTransactions(): Promise<TransactionEntity[]> {
        return this.datasource.getAll();
    }
    updateTransaction(item: UpdateTransactionDto): Promise<TransactionEntity | undefined> {
        return this.datasource.updateTransaction(item);
    }
    deleteTransaction(id: number): Promise<TransactionEntity> {
        return this.datasource.deleteTransaction(id);
    }

    getTransactionsByPeriod(period: 'month' | 'year', year?: number): Promise<{ period: string, total: number }[]> {
        return this.datasource.getTransactionsByPeriod(period, year);
    }
}