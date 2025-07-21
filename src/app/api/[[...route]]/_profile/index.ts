import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.json({ message: "プロフィールです。" }));

export default app;