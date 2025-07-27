import { prisma } from "../../config/data/postgres/postgres.config";
import { AbsTransactionDatasource } from "../../domain/datasources/transaction.datasource";
import { TransactionEntity } from "../../domain/entities/transaction.entity";
import { CreateTransactionDto } from "../../domain/dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../../domain/dtos/transaction/update-transaction.dto";


export class PostgresTransactionDatasourceImp implements AbsTransactionDatasource{
    async getById(id: number): Promise<TransactionEntity | undefined> {
        const transaction = await prisma.transaction.findUnique({
            where: { id_transaction: id }
        });
        if(!transaction) return undefined
        return TransactionEntity.fromObject(transaction);
    }
    async saveTransaction(transaction: CreateTransactionDto): Promise<TransactionEntity> {
        const newTransaction = await prisma.transaction.create({
            data: {
                transaction_id: transaction.transaction_id,
                old_owner_id: transaction.old_owner_id,
                new_owner_id: transaction.new_owner_id,
                amount: transaction.amount
            }
        });

        return TransactionEntity.fromObject(newTransaction);
    }
    async getAll(): Promise<TransactionEntity[]> {
        const transactions = await prisma.transaction.findMany();
        return transactions.map((transaction) => TransactionEntity.fromObject(transaction));
    }
    async updateTransaction(transaction: UpdateTransactionDto): Promise<TransactionEntity | undefined> {
        //const currentEmail = user.email
        //const neew
        const updateData: any = {};
        if (transaction.old_owner_id) updateData.old_owner_id = transaction.old_owner_id;
        if (transaction.new_owner_id) updateData.new_owner_id = transaction.new_owner_id;
        if (transaction.amount) updateData.amount = transaction.amount;

        const updateTransaction = await prisma.transaction.update({
            where: {transaction_id: transaction.transaction_id},
            data: updateData
        })

        if (!updateTransaction) return undefined;
        return TransactionEntity.fromObject(updateTransaction)
    }

    async deleteTransaction(transaction_id: number): Promise<TransactionEntity> {
        const deleteTransaction = await prisma.transaction.delete({
            where: {transaction_id: transaction_id}
        })
        if (!deleteTransaction) throw new Error("Something happened while attempting to delete data");
        return TransactionEntity.fromObject(deleteTransaction);
    }

    async disconnect(): Promise<void> {
        await prisma.$disconnect();
    }
}