import { D1Database } from '@cloudflare/workers-types';
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import helloHandlers from './_hello/get'

export const runtime = 'edge';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
    }
  }
}

type Bindings = {
    DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings}>().basePath('/api');

app.route("/hello", helloHandlers);

// app.get("/query/customers", async (c) => {
//     const { results } = await process.env.DB.prepare("SELECT * FROM customers").all()
//     return c.json(results)
// })

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)