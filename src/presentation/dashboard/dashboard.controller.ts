import { Request, Response, RequestHandler } from "express";
import { AbsDashboardRepository } from "../../domain/repositories/dashboard.repository";
import { DashboardUseCases } from "../../domain/use-cases/dashboard.use-cases";
import PDFDocument from 'pdfkit';

export class DashboardController {
    constructor(private readonly dashboardRepository: AbsDashboardRepository) {}

    public getTotalItems: RequestHandler = (req, res) => {
        new DashboardUseCases(this.dashboardRepository)
            .getTotalItems()
            .then(total => res.json({ total }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    public getItemsCountByType: RequestHandler = (req, res) => {
        new DashboardUseCases(this.dashboardRepository)
            .getItemsCountByType()
            .then(counts => res.json(counts))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    public getRecentTransactions: RequestHandler = (req, res) => {
        new DashboardUseCases(this.dashboardRepository)
            .getRecentTransactions()
            .then(transactions => res.json(transactions))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    public generateReport: RequestHandler = async (req: Request, res: Response) => {
        try {
            const useCases = new DashboardUseCases(this.dashboardRepository);

            // Fetch all data in parallel
            const [
                totalItems,
                itemsByType,
                recentTransactions
            ] = await Promise.all([
                useCases.getTotalItems(),
                useCases.getItemsCountByType(),
                useCases.getRecentTransactions()
            ]);

            const doc = new PDFDocument({ margin: 50 });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');

            doc.pipe(res);

            // Header
            doc.fontSize(20).text('Reporte General de Invexor', { align: 'center' });
            doc.moveDown(2);

            // Summary Section
            doc.fontSize(16).text('Resumen General', { underline: true });
            doc.moveDown();
            doc.fontSize(12).text(`- Número total de ítems: ${totalItems}`);
            doc.moveDown();

            // Items by Type Section
            doc.fontSize(14).text('Ítems por Tipo:', { underline: true });
            doc.moveDown();
            itemsByType.forEach(item => {
                doc.fontSize(12).text(`- ${item.name}: ${item.count}`);
            });
            doc.moveDown();

            // Recent Transactions Section
            doc.fontSize(14).text('Transacciones Recientes:', { underline: true });
            doc.moveDown();
            recentTransactions.forEach(tx => {
                doc.fontSize(12).text(`- ID: ${tx.id}, Tipo: ${tx.type}, Monto: ${tx.amount}, Fecha: ${new Date(tx.date).toLocaleDateString()}`);
            });

            // Finalize the PDF and end the stream
            doc.end();

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to generate PDF report' });
        }
    }

    // public getTransactionsByPeriod: RequestHandler = (req, res) => {
    //     const { period, year } = req.query;
    //     new DashboardUseCases(this.dashboardRepository)
    //         .getTransactionsByPeriod(period as 'month' | 'year', year ? +year : undefined)
    //         .then(transactions => res.json(transactions))
    //         .catch(error => res.status(500).json({ error: error.message }));
    // }

    public getTransactionsByPeriod: RequestHandler = (req, res) => {
        const { period, year } = req.params;
        if (!period || (period !== 'month' && period !== 'year')) {
            return res.status(400).json({ error: "'period' param is required and must be 'month' or 'year'" });
        }
        let yearNum: number | undefined = undefined;
        if (year) {
            yearNum = Number(year);
            if (isNaN(yearNum)) {
                return res.status(400).json({ error: "'year' query param must be a number" });
            }
        }
        new DashboardUseCases(this.dashboardRepository)
            .getTransactionsByPeriod(period as 'month' | 'year', yearNum)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json({ error: error.message }));
    }
}
