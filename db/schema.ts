import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const profileTable = sqliteTable("profile", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  name: text("name").notNull(),
});

export const authTable = sqliteTable("auth", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  userId: integer("userId").notNull().references(() => profileTable.id),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  lastLogin: text("lastLogin"),
  createdAt: text("createdAt").notNull(),
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