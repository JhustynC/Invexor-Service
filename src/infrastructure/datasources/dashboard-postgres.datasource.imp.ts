import { AbsDashboardDatasource } from "../../domain/datasources/dashboard.datasource";
import { prisma } from "../../config/data/postgres/postgres.config";

export class PostgresDashboardDatasourceImp implements AbsDashboardDatasource {
    async getTotalItems(): Promise<number> {
        return await prisma.item.count();
    }

    async getItemsCountByType(): Promise<{ name: string; count: number }[]> {
        const result = await prisma.item.groupBy({
            by: ['id_item_type'],
            _count: {
                id_item: true,
            },
        });

        const itemTypes = await prisma.itemType.findMany({
            where: {
                id_item_type: {
                    in: result.map(item => item.id_item_type),
                },
            },
        });

        const itemTypeMap = new Map(itemTypes.map(it => [it.id_item_type, it.name]));

        return result.map(item => ({
            name: itemTypeMap.get(item.id_item_type) || 'Unknown',
            count: item._count.id_item,
        }));
    }

    async getRecentTransactions(): Promise<any[]> {
        const transactions = await prisma.transaction.findMany({
            take: 10,
            orderBy: {
                transaction_date: 'desc',
            },
            include: {
                transaction_entities: {
                    include: {
                        entity: {
                            include: {
                                entity_type: true
                            }
                        }
                    }
                }
            }
        });

        return transactions.map(tx => {
            const firstEntity = tx.transaction_entities[0]?.entity;
            return {
                id: tx.transaction_id,
                type: firstEntity?.entity_type.name_entity_type || 'N/A',
                amount: tx.amount,
                date: tx.transaction_date,
            }
        });
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
}
