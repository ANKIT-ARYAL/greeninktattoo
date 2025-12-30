import { Pool, types } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// This ensures dates are handled correctly between PG and Prisma
types.setTypeParser(1114, (str) => str);

const connectionString = process.env.DATABASE_URL?.replace('?sslmode=require', '');

const pool = new Pool({ 
  connectionString,
  max: 10, // Recommended for serverless/Next.js
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Pass the adapter inside the PrismaClient constructor
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ 
  adapter,
  log: ['query', 'error', 'warn'] // This helps you see what's happening in terminal
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;