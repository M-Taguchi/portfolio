import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import helloHandlers from './_hello'
import profileHandlers from './_profile'
import blogHandlers from './_blog'
import loginHandlers from './_login'
import authHandlers from './_auth'
import { Bindings } from '../_common/db';
import { csrfProtection } from '@/lib/csrf';

export const runtime = 'edge';

const app = new Hono<{ Bindings: Bindings}>()
.basePath('/api')
// CSRFトークン検証のミドルウェアを追加するのだ
.use('*', csrfProtection())
.route("/hello", helloHandlers)
.route("/profile", profileHandlers)
.route("/blog", blogHandlers)
.route("/login", loginHandlers)
.route("/auth", authHandlers);

// app.get("/query/customers", async (c) => {
//     const { results } = await process.env.DB.prepare("SELECT * FROM customers").all()
//     return c.json(results)
// })

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export type AppType = typeof app;