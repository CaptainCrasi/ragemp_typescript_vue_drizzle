import { datetime, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { v4 } from '../../node_modules/uuid';
import { sql } from '../../node_modules/drizzle-orm';
export const accounts = mysqlTable('accounts', {
    id: varchar('id', { length: 36 }).$defaultFn(() => v4()),
    username: varchar('username', { length: 25 }).notNull().unique(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', {length: 100}).notNull(),
    ip: varchar("ip", {length: 15}).notNull(),
    hwid: varchar("hwid", {length: 130}).notNull(),
    socialClub: varchar("social_club_name", {length:100}).notNull(),
    rockstarId: varchar("social_club_id", {length: 12}).notNull(),

    createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});