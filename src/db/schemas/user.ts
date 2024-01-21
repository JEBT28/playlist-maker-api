import { boolean, datetime, mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users', {
    id: serial('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 50 }).notNull(),
    username: varchar('username', { length: 30 }).unique().notNull(),
    password: text('password').notNull(),
    email: varchar('email', { length: 50 }).unique().notNull(),
    created_at: datetime('created_at').notNull().default(new Date()),
    updated_at: datetime('updated_at').notNull().default(new Date()),
    status: boolean('status').notNull().default(true),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // return type when inserting
export type UserUpdate = Partial<User>; // return type when updating