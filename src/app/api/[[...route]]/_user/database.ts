import { db } from "../../_common/db"

export const getUserProfile = async() => {
    const { results } = await db.prepare("SELECT * FROM profile").first();
}