import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  userId: integer("userId", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  userName: text("userName").notNull(),
});

export const postTable = sqliteTable("post", {
  postId: integer("postId", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  title: text("title").notNull(),
  createdAt: text("createdAt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags", { mode: "json" }).notNull().$type<string[]>(),
});