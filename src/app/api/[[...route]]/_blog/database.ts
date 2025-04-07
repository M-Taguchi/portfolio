import { asc, eq } from "drizzle-orm";
import { blogTable } from "../../../../../db/schema"
import { db } from "../../_common/db"

type PaginationParams = {
    page: number;
    perPage: number;
}

export const getBlogPosts = async ({page, perPage}: PaginationParams) => {
    const result = await db.select().from(blogTable).orderBy(asc(blogTable.id)).limit(perPage).offset((page - 1) * perPage).execute();
    return result;
}

export const getBlogPostById = async (id: number) => {
    const result = await db.select().from(blogTable).where(eq(blogTable.id, id)).execute();
    return result[0];
}