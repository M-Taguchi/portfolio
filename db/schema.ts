import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  userId: integer("userId", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  userName: text("userName").notNull(),
});