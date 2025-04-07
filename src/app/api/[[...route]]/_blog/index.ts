import { Hono } from "hono";
import { getBlogPosts } from "./database";

const app = new Hono().get("/", async(c) => {
    const page = Number(c.req.param("page")) || 1;
    const perPage = Number(c.req.param("perPage")) || 20;
    const result = await getBlogPosts({ page, perPage });
    return c.json(result);
});

export default app;