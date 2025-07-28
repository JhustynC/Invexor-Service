import { AbsDashboardDatasource } from "../../domain/datasources/dashboard.datasource";
import { AbsDashboardRepository } from "../../domain/repositories/dashboard.repository";

export class DashboardRepositoryImp implements AbsDashboardRepository {
    constructor(private readonly datasource: AbsDashboardDatasource) {}

    getTotalItems(): Promise<number> {
        return this.datasource.getTotalItems();
    }

    getItemsCountByType(): Promise<{ name: string; count: number }[]> {
        return this.datasource.getItemsCountByType();
    }

    getRecentTransactions(): Promise<any[]> {
        return this.datasource.getRecentTransactions();
    }

    getTransactionsByPeriod(period: 'month' | 'year', year?: number): Promise<{ period: string, total: number }[]> {
        return this.datasource.getTransactionsByPeriod(period, year);
    }

    getGraphData(): Promise<{ nodes: any[], links: any[] }> {
        return this.datasource.getGraphData();
    }
}
