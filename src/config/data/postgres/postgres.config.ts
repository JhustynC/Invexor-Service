import { PrismaClient } from '@prisma/client';
import { PostgresDatabase } from './init';

class PostgresConfig {
    private static instance: PrismaClient;

    public static async getInstance(): Promise<PrismaClient> {
        if (!PostgresConfig.instance) {
            PostgresConfig.instance = await PostgresDatabase.connect();
        }
        return PostgresConfig.instance;
    }

    public static async disconnect(): Promise<void> {
        await PostgresDatabase.disconnect();
    }
}

// Initialize and export the prisma instance
export const prisma = PostgresDatabase.getInstance();
export default PostgresConfig; 