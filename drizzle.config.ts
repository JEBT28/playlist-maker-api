import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from "./src/config/config";


export default {
    schema: "./src/db/schemas/*",
    out: './drizzle',
    driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        user: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
    },
} satisfies Config;