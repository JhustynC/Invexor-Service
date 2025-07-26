import { PrismaClient } from '@prisma/client';

interface ConnectionPostgresOptions {
    url?: string;
    dbName?: string;
}

export class PostgresDatabase {
    private static instance: PrismaClient;

    static async connect(options?: ConnectionPostgresOptions): Promise<PrismaClient> {
        try {
            if (!PostgresDatabase.instance) {
                PostgresDatabase.instance = new PrismaClient();
            }
            
            // Test the connection
            await PostgresDatabase.instance.$connect();
            console.log("Connected to PostgreSQL");
            
            return PostgresDatabase.instance;
        } catch (error) {
            throw `Error: Failed to connect to PostgreSQL\n ${error}`;
        }
    }

    static async disconnect(): Promise<void> {
        if (PostgresDatabase.instance) {
            await PostgresDatabase.instance.$disconnect();
            console.log("Disconnected from PostgreSQL");
        }
    }

    static getInstance(): PrismaClient {
        if (!PostgresDatabase.instance) {
            PostgresDatabase.instance = new PrismaClient();
        }
        return PostgresDatabase.instance;
    }
} 