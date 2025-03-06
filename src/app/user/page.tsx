import { InferResponseType } from "hono/client";
import { UserDetail } from "./_presenter/userDetail.presenter"
import { client } from "@/lib/hono";
import { fetcher } from "@/lib/utils";

const url = client.api.user.$url();
type ResType = InferResponseType<typeof client.api.user.$get>;

export default async function UserContainer() {
    const data = await fetcher<ResType>(url);
    const item = {
        title: "Who am I?",
        content: data.message
    }
    return (
        <UserDetail item={item} />
    )
}