import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../dtos/transaction/update-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

//? Rules
export abstract class AbsTransactionRepository {
    abstract saveTransaction(item: CreateTransactionDto): Promise<TransactionEntity>;
    abstract getTransactionById(id: string): Promise<TransactionEntity | undefined>;
    abstract getAllTransactions(): Promise<TransactionEntity[]>;
    abstract updateTransaction(item: UpdateTransactionDto): Promise<TransactionEntity | undefined>;
    abstract deleteTransaction(id: string): Promise<TransactionEntity>;
}