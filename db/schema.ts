import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});

export const blogTable = sqliteTable("blog", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  title: text("title").notNull(),
  createdAt: text("createdAt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags", { mode: "json" }).notNull().$type<string[]>(),
});