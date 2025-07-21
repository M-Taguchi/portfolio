import { db } from "../../_common/db"
import { profileTable } from "../../../../../db/schema"

export const getProfile = async() => {
    const result = await db.select().from(profileTable).execute();
    return result;
}