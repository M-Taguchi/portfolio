import { InferResponseType } from "hono/client";
import { ProfileDetail } from "./_presenter/profileDetail.presenter"
import { client } from "@/lib/hono";
import { fetcher } from "@/lib/utils";

// お作法：https://zenn.dev/barabara/articles/56f43740d5d2f6#api%E4%BD%9C%E6%88%90%E3%83%BB%E3%83%87%E3%83%BC%E3%82%BF%E5%8F%96%E5%BE%97
export const dynamic = "force-dynamic";
export const runtime = 'edge';

const url = client.api.profile.$url();
export type ProfileDetailResType = InferResponseType<typeof client.api.profile.$get>;

export default async function ProfileContainer() {
    const data = await fetcher<ProfileDetailResType>(url);
    const item = {
        title: "Who am I?",
        content: data?.message || "プロフィール情報を取得できなかったのだ..."
    }
    return (
        <ProfileDetail item={item} />
    )
}