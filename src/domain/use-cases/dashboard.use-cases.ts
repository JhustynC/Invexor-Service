import { AbsDashboardRepository } from "../repositories/dashboard.repository";

export class DashboardUseCases {
    constructor(private readonly repository: AbsDashboardRepository) {}

    async getTotalItems() {
        return this.repository.getTotalItems();
    }

    async getItemsCountByType() {
        return this.repository.getItemsCountByType();
    }

    async getRecentTransactions() {
        return this.repository.getRecentTransactions();
    }

    async getTransactionsByPeriod(period: 'month' | 'year', year?: number) {
        return this.repository.getTransactionsByPeriod(period, year);
    }
}
