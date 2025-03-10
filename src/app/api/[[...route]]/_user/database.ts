import { db } from "../../_common/db"
import { userTable } from "../../../../../db/schema"

export const getUserProfile = async() => {
    const result = await db.select().from(userTable).execute();
    return result;
}