import type { Config } from 'drizzle-kit';


import fs from "fs";
import path from "path";


const getLocalD1 = () => {
    try {
        const basePath = path.resolve('.wrangler');
        const dbFile = fs
            .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
            .find((f) => f.endsWith('.sqlite'));

        if (!dbFile) {
            throw new Error(`.sqlite file not found in ${basePath}`);
        }

        const url = path.resolve(basePath, dbFile);
        return url;
    } catch (err) {
        console.log(`Error  ${err}`);
    }
}

const isProd = () => process.env.NODE_ENV === 'production'

const getCredentials = () => {
    const prod = {
        driver: 'd1-http',
        dbCredentials: {
            accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID,
            databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID,
            token: process.env.CLOUDFLARE_D1_API_TOKEN
        }

    }

    const dev = {
        dbCredentials: {
            url: getLocalD1()
        }
    }
    return isProd() ? prod : dev

}

export default {
    schema: './db/*.ts',
    out: './db/migrations',
    dialect: "sqlite",
    ...getCredentials()
} satisfies Config;