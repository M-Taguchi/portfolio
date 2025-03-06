import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import helloHandlers from './_hello'
import userHandlers from './_user'
import { Bindings } from '../_common/db';

export const runtime = 'edge';

const app = new Hono<{ Bindings: Bindings}>().basePath('/api').route("/hello", helloHandlers).route("/user", userHandlers)

// app.get("/query/customers", async (c) => {
//     const { results } = await process.env.DB.prepare("SELECT * FROM customers").all()
//     return c.json(results)
// })

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export type AppType = typeof app;