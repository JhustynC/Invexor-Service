import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../dtos/transaction/update-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

//? Rules
export abstract class AbsTransactionRepository {
    abstract saveTransaction(item: CreateTransactionDto): Promise<TransactionEntity>;
    abstract getTransactionById(id: number): Promise<TransactionEntity | undefined>;
    abstract getAllTransactions(): Promise<TransactionEntity[]>;
    abstract getTransactionsByPeriod(period: 'month' | 'year', year?: number): Promise<{ period: string, total: number }[]>;
    abstract updateTransaction(item: UpdateTransactionDto): Promise<TransactionEntity | undefined>;
    abstract deleteTransaction(id: number): Promise<TransactionEntity>;
}