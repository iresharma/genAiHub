import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '~/lib/schema';

// Initialize postgres client for migrations
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

// Initialize postgres client for queries
const queryClient = postgres(process.env.DATABASE_URL!);

// Initialize drizzle with the postgres client and schema
export const db = drizzle(queryClient, { schema });

// Create tables if they don't exist
const initDb = async () => {
//   try {
//     // Run migrations
//     await migrate(drizzle(migrationClient), {
//       migrationsFolder: './drizzle',
//     });
//     console.log('Database migration completed successfully');
//   } catch (error) {
//     console.error('Error initializing database:', error);
//     throw error;
//   } finally {
//     await migrationClient.end();
//   }
};

// Initialize database tables
initDb();
