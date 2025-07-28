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

            // Validate data
            if (typeof totalItems !== 'number') {
                throw new Error('Invalid totalItems data');
            }
            if (!Array.isArray(itemsByType)) {
                throw new Error('Invalid itemsByType data');
            }
            if (!Array.isArray(recentTransactions)) {
                throw new Error('Invalid recentTransactions data');
            }

            const doc = new PDFDocument({ 
                margin: 40,
                size: 'A4',
                info: {
                    Title: 'Reporte General de Invexor',
                    Author: 'Sistema Invexor',
                    Subject: 'Reporte de Dashboard',
                    CreationDate: new Date()
                }
            });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=invexor-report-${new Date().toISOString().split('T')[0]}.pdf`);

            doc.pipe(res);

            // Colors
            const primaryColor = '#2563eb';
            const secondaryColor = '#64748b';
            const accentColor = '#f1f5f9';
            const textColor = '#1e293b';

            // Helper function to draw a table
            const drawTable = (data: any[], headers: string[], startY: number, columnWidths: number[]) => {
                const tableTop = startY;
                const itemHeight = 25;
                const headerHeight = 30;
                let currentY = tableTop;

                // Draw header background
                doc.rect(40, currentY, 515, headerHeight)
                   .fill(primaryColor)
                   .stroke();

                // Draw header text
                doc.fillColor('white')
                   .fontSize(10)
                   .font('Helvetica-Bold');
                
                let currentX = 50;
                headers.forEach((header, i) => {
                    doc.text(header, currentX, currentY + 8, {
                        width: columnWidths[i] - 10,
                        align: 'left'
                    });
                    currentX += columnWidths[i];
                });

                currentY += headerHeight;

                // Draw data rows
                data.forEach((row, index) => {
                    // Alternate row colors
                    const fillColor = index % 2 === 0 ? 'white' : accentColor;
                    doc.rect(40, currentY, 515, itemHeight)
                       .fill(fillColor)
                       .stroke('#e2e8f0');

                    doc.fillColor(textColor)
                       .fontSize(9)
                       .font('Helvetica');
                    
                    currentX = 50;
                    Object.values(row).forEach((value: any, i) => {
                        const displayValue = typeof value === 'number' ? 
                            (headers[i].includes('Monto') ? `$${value.toLocaleString()}` : value.toString()) :
                            value?.toString() || '';
                        
                        doc.text(displayValue, currentX, currentY + 6, {
                            width: columnWidths[i] - 10,
                            align: headers[i].includes('Monto') ? 'right' : 'left',
                            ellipsis: true
                        });
                        currentX += columnWidths[i];
                    });

                    currentY += itemHeight;
                });

                return currentY + 10;
            };

            // Header with logo placeholder and title
            doc.rect(0, 0, 595, 80)
               .fill(primaryColor);
            
            doc.fillColor('white')
               .fontSize(24)
               .font('Helvetica-Bold')
               .text('INVEXOR', 50, 25);
            
            doc.fontSize(14)
               .font('Helvetica')
               .text('Reporte General del Sistema', 50, 50);

            // Date and time
            const now = new Date();
            doc.fontSize(10)
               .text(`Generado el: ${now.toLocaleDateString('es-ES')} a las ${now.toLocaleTimeString('es-ES')}`, 350, 35);

            let currentY = 120;

            // Summary Cards Section
            doc.fillColor(textColor)
               .fontSize(18)
               .font('Helvetica-Bold')
               .text('Resumen Ejecutivo', 50, currentY);
            
            currentY += 40;

            // Summary cards
            const cardWidth = 150;
            const cardHeight = 80;
            const cardSpacing = 20;

            // Total Items Card
            doc.rect(50, currentY, cardWidth, cardHeight)
               .fill(accentColor)
               .stroke('#e2e8f0');
            
            doc.fillColor(primaryColor)
               .fontSize(24)
               .font('Helvetica-Bold')
               .text(totalItems.toString(), 60, currentY + 15);
            
            doc.fillColor(secondaryColor)
               .fontSize(10)
               .font('Helvetica')
               .text('Total de Ítems', 60, currentY + 45);

            // Items by Type Card
            doc.rect(50 + cardWidth + cardSpacing, currentY, cardWidth, cardHeight)
               .fill(accentColor)
               .stroke('#e2e8f0');
            
            doc.fillColor(primaryColor)
               .fontSize(24)
               .font('Helvetica-Bold')
               .text(itemsByType.length.toString(), 60 + cardWidth + cardSpacing, currentY + 15);
            
            doc.fillColor(secondaryColor)
               .fontSize(10)
               .font('Helvetica')
               .text('Tipos de Ítems', 60 + cardWidth + cardSpacing, currentY + 45);

            // Recent Transactions Card
            doc.rect(50 + (cardWidth + cardSpacing) * 2, currentY, cardWidth, cardHeight)
               .fill(accentColor)
               .stroke('#e2e8f0');
            
            doc.fillColor(primaryColor)
               .fontSize(24)
               .font('Helvetica-Bold')
               .text(recentTransactions.length.toString(), 60 + (cardWidth + cardSpacing) * 2, currentY + 15);
            
            doc.fillColor(secondaryColor)
               .fontSize(10)
               .font('Helvetica')
               .text('Transacciones Recientes', 60 + (cardWidth + cardSpacing) * 2, currentY + 45);

            currentY += cardHeight + 40;

            // Items by Type Table
            doc.fillColor(textColor)
               .fontSize(16)
               .font('Helvetica-Bold')
               .text('Distribución de Ítems por Tipo', 50, currentY);
            
            currentY += 30;

            const itemsTableData = itemsByType.map(item => ({
                tipo: item.name,
                cantidad: item.count,
                porcentaje: `${((item.count / totalItems) * 100).toFixed(1)}%`
            }));

            currentY = drawTable(
                itemsTableData,
                ['Tipo de Ítem', 'Cantidad', 'Porcentaje'],
                currentY,
                [200, 150, 165]
            );

            // Check if we need a new page
            if (currentY > 650) {
                doc.addPage();
                currentY = 50;
            }

            // Recent Transactions Table
            doc.fillColor(textColor)
               .fontSize(16)
               .font('Helvetica-Bold')
               .text('Transacciones Recientes', 50, currentY);
            
            currentY += 30;

            const transactionsTableData = recentTransactions.slice(0, 10).map(tx => ({
                id: tx.id.toString().substring(0, 8) + (tx.id.toString().length > 8 ? '...' : ''),
                tipo: tx.type?.toString() || 'N/A',
                monto: parseFloat(tx.amount.toString()),
                fecha: new Date(tx.date).toLocaleDateString('es-ES')
            }));

            currentY = drawTable(
                transactionsTableData,
                ['ID', 'Tipo', 'Monto', 'Fecha'],
                currentY,
                [120, 150, 120, 125]
            );

            // Footer
            const pageCount = doc.bufferedPageRange().count;
            for (let i = 0; i < pageCount; i++) {
                doc.switchToPage(i);
                
                // Footer line
                doc.rect(40, 762, 515, 1)
                   .fill(secondaryColor);
                
                doc.fillColor(secondaryColor)
                   .fontSize(8)
                   .font('Helvetica')
                   .text('Sistema Invexor - Reporte Generado Automáticamente', 50, 770);
                
                doc.text(`Página ${i + 1} de ${pageCount}`, 450, 770);
            }

            // Finalize the PDF and end the stream
            doc.end();

        } catch (error) {
            console.error('Error generating PDF report:', error);
            
            // Check if response has already been sent
            if (!res.headersSent) {
                res.status(500).json({ error: 'Failed to generate PDF report' });
            }
        }
    }
}
