import { prisma } from "../../config/data/postgres/postgres.config";
import { AbsTransactionDatasource } from "../../domain/datasources/transaction.datasource";
import { TransactionEntity } from "../../domain/entities/transaction.entity";
import { CreateTransactionDto } from "../../domain/dtos/transaction/create-transaction.dto";
import { UpdateTransactionDto } from "../../domain/dtos/transaction/update-transaction.dto";


export class PostgresTransactionDatasourceImp implements AbsTransactionDatasource{
    async getById(id: number): Promise<TransactionEntity | undefined> {
        const transaction = await prisma.transaction.findUnique({
            where: { transaction_id: id }
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

    async getTransactionsByPeriod(period: 'month' | 'year', year?: number): Promise<{ period: string, total: number }[]> {
        let groupBy: any;
        let where: any = {};
        if (year) {
            where.date = {
                gte: new Date(`${year}-01-01T00:00:00.000Z`),
                lte: new Date(`${year}-12-31T23:59:59.999Z`)
            };
        }
        if (period === 'month') {
            groupBy = {
                by: ['month'],
                _sum: { amount: true },
                where: where,
                orderBy: { month: 'asc' },
            };
        } else {
            groupBy = {
                by: ['year'],
                _sum: { amount: true },
                where: where,
                orderBy: { year: 'asc' },
            };
        }
        // Prisma no soporta group by month/year directo, usamos raw query
        const results = await prisma.$queryRawUnsafe<any[]>(`
            SELECT ${period === 'month' ? 'EXTRACT(MONTH FROM "transaction_date") as period' : 'EXTRACT(YEAR FROM "transaction_date") as period'}, COUNT(*) as total
            FROM "Transaction"
            ${year ? `WHERE EXTRACT(YEAR FROM "transaction_date") = ${year}` : ''}
            GROUP BY period
            ORDER BY period ASC
        `);
        return results.map(r => ({ period: r.period.toString(), total: Number(r.total) }));
    }

    async disconnect(): Promise<void> {
        await prisma.$disconnect();
    }
}