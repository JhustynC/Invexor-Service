import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../dtos/transaction/update-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";

//? Rules
export abstract class AbsTransactionDatasource {
    abstract saveTransaction(transaction: CreateTransactionDto): Promise<TransactionEntity>;
    abstract getById(id: string): Promise<TransactionEntity | undefined>;
    abstract getAll(): Promise<TransactionEntity[]>;
    abstract updateTransaction(transaction: UpdateTransactionDto): Promise<TransactionEntity | undefined>;
    abstract deleteTransaction(id: string): Promise<TransactionEntity>;
}