import { CreateTransactionDto } from "../dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../dtos/transaction/update-transaction.dto";
import { TransactionEntity } from "../entities/transaction.entity";
import { AbsTransactionRepository } from "../repositories/transaction.repository";

export class TransactionUseCases {
    constructor(public readonly repository: AbsTransactionRepository){}

    async createTransaction(dto: CreateTransactionDto): Promise<TransactionEntity>{
        return await this.repository.saveTransaction(dto);
    }

    async deleteTransaction(id: string): Promise<TransactionEntity>{
        return await this.repository.deleteTransaction(id);
    }

    async getTransactionById(id: string): Promise<TransactionEntity | undefined>{
        return await this.repository.getTransactionById(id);
    }

    async getAllTransactions(): Promise<TransactionEntity[]>{
        return await this.repository.getAllTransactions();
    }

    async updateTransaction(dto: UpdateTransactionDto): Promise<TransactionEntity | undefined>{
        return await this.repository.updateTransaction(dto);
    }
}