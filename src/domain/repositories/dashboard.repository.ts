export abstract class AbsDashboardRepository {
    abstract getTransactionsByPeriod(period: 'month' | 'year', year?: number): Promise<{ period: string, total: number }[]>;
    abstract getTotalItems(): Promise<number>;
    abstract getItemsCountByType(): Promise<{ name: string; count: number }[]>;
    abstract getRecentTransactions(): Promise<any[]>;
}
