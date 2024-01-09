import 'dotenv/config';
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';
import { Connect } from './connection';

// This will run migrations on the database, skipping the ones already applied
(async () => {
    const db = Connect();
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations ran successfully');
})()
// Don't forget to close the connection, otherwise the script will hang
