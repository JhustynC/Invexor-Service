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
                        entity: true
                    }
                }
            }
        });

        return transactions.map(tx => {
            const firstEntity = tx.transaction_entities[0]?.entity;
            return {
                id: tx.transaction_id,
                type: firstEntity?.entity_type || 'N/A',
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

    async getGraphData(): Promise<{ nodes: any[], links: any[] }> {
        try {
            // Obtener todas las entidades con sus relaciones
            const [branches, areas, users, items, resources, transactions] = await Promise.all([
                // Branches con sus entidades
                prisma.branch.findMany({
                    include: {
                        entity: true
                    }
                }),
                // Areas con sus entidades
                prisma.area.findMany({
                    include: {
                        entity: true
                    }
                }),
                // Users con sus roles
                prisma.user.findMany({
                    include: {
                        entity: true,
                        user_roles: {
                            include: {
                                user_role: true
                            }
                        }
                    }
                }),
                // Items con sus tipos
                prisma.item.findMany({
                    include: {
                        entity: true,
                        item_type: true
                    }
                }),
                // Resources
                prisma.resource.findMany({
                    include: {
                        entity: true
                    }
                }),
                // Ownership relationships
                prisma.entityOwnership.findMany({
                    include: {
                        owner_entity: true,
                        owned_entity: true
                    }
                })
            ]);

            const nodes: any[] = [];
            const links: any[] = [];

            // Crear nodos para branches
            branches.forEach(branch => {
                nodes.push({
                    id: `branch-${branch.id_branch}`,
                    label: branch.name_branch,
                    group: 'branch',
                    type: 'branch',
                    city: branch.city,
                    entity_id: branch.id_entity
                });
            });

            // Crear nodos para areas y enlaces con branches
            areas.forEach(area => {
                nodes.push({
                    id: `area-${area.area_id}`,
                    label: area.areaname,
                    group: 'area',
                    type: 'area',
                    description: area.description,
                    entity_id: area.id_entity
                });

                // Enlace area -> branch usando branch_id
                if (area.branch_id) {
                    links.push({
                        source: `area-${area.area_id}`,
                        target: `branch-${area.branch_id}`,
                        type: 'belongs_to'
                    });
                }

                // Enlaces jerárquicos entre areas
                if (area.pattern_area_id && area.pattern_area_id !== area.area_id) {
                    links.push({
                        source: `area-${area.area_id}`,
                        target: `area-${area.pattern_area_id}`,
                        type: 'reports_to'
                    });
                }
            });

            // Crear nodos para users
            users.forEach(user => {
                const roles = user.user_roles.map(ur => ur.user_role.name_user_rol).join(', ');
                nodes.push({
                    id: `user-${user.user_id}`,
                    label: user.username,
                    group: 'user',
                    type: 'user',
                    email: user.email,
                    roles: roles,
                    entity_id: user.id_entity
                });
            });

            // Crear nodos para items
            items.forEach(item => {
                nodes.push({
                    id: `item-${item.id_item}`,
                    label: item.name_item,
                    group: 'item',
                    type: 'item',
                    description: item.description,
                    provider: item.provider,
                    item_type: item.item_type.name,
                    entity_id: item.id_entity
                });
            });

            // Crear nodos para resources
            resources.forEach(resource => {
                nodes.push({
                    id: `resource-${resource.resource_id}`,
                    label: resource.resourcename,
                    group: 'resource',
                    type: 'resource',
                    description: resource.description,
                    measure: resource.measure,
                    currency: resource.currency,
                    entity_id: resource.id_entity
                });
            });

            // Crear enlaces basados en ownership
            transactions.forEach(ownership => {
                const ownerNode = nodes.find(n => n.entity_id === ownership.id_owner_entity);
                const ownedNode = nodes.find(n => n.entity_id === ownership.id_owned_entity);
                
                if (ownerNode && ownedNode) {
                    links.push({
                        source: ownerNode.id,
                        target: ownedNode.id,
                        type: 'owns',
                        amount: ownership.amount
                    });
                }
            });

            return { nodes, links };
        } catch (error) {
            console.error('Error getting graph data:', error);
            throw error;
        }
    }
}
