
import { InferResponseType } from "hono/client";
import { client } from "@/lib/hono";
import { fetcher } from "@/lib/utils";
import { BlogList } from "./_presenter/blogList.presenter";

export const dynamic = "force-dynamic";
export const runtime = 'edge';

const url = client.api.blog.$url();
export type BlogListResType = InferResponseType<typeof client.api.blog.$get>;

export default async function BlogPage() {
  const blogPosts = await fetcher<BlogListResType>(url);
  return (
    <BlogList blogPosts={blogPosts} />
  )
}

