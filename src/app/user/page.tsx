import { InferResponseType } from "hono/client";
import { UserDetail } from "./_presenter/userDetail.presenter"
import { client } from "@/lib/hono";
import { fetcher } from "@/lib/utils";

// お作法：https://zenn.dev/barabara/articles/56f43740d5d2f6#api%E4%BD%9C%E6%88%90%E3%83%BB%E3%83%87%E3%83%BC%E3%82%BF%E5%8F%96%E5%BE%97
export const dynamic = "force-dynamic";
export const runtime = 'edge';

const url = client.api.user.$url();
type ResType = InferResponseType<typeof client.api.user.$get>;

export default async function UserContainer() {
    console.log(url);
    const data = await fetcher<ResType>(url);
    const item = {
        title: "Who am I?",
        content: data.message
    }
    return (
        <UserDetail item={item} />
    )
}