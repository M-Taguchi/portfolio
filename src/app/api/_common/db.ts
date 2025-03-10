import { drizzle } from "drizzle-orm/d1";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
      interface ProcessEnv {
        DB: D1Database;
      }
    }
}

export type Bindings = {
    DB: D1Database;
}

export const db = drizzle(process.env.DB);