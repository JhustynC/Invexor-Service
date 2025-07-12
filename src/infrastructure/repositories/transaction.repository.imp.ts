import { CreateTransactionDto } from "../../domain/dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../../domain/dtos/transaction/update-transaction.dto";
import { TransactionEntity } from "../../domain/entities/transaction.entity";
import { AbsTransactionRepository } from "../../domain/repositories/transaction.repository";

export class TransactionRepositoryImp implements AbsTransactionRepository{

    constructor(private readonly datasource: AbsTransactionRepository){}
    saveTransaction(item: CreateTransactionDto): Promise<TransactionEntity> {
        return this.datasource.saveTransaction(item);
    }
    getTransactionById(id: string): Promise<TransactionEntity | undefined> {
        return this.datasource.getTransactionById(id);
    }
    getAllTransactions(): Promise<TransactionEntity[]> {
        return this.datasource.getAllTransactions();
    }
    updateTransaction(item: UpdateTransactionDto): Promise<TransactionEntity | undefined> {
        return this.datasource.updateTransaction(item);
    }
    deleteTransaction(id: string): Promise<TransactionEntity> {
        return this.datasource.deleteTransaction(id);
    }
    
}