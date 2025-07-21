import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Edit } from "lucide-react"
import { cookies } from "next/headers"
import { client } from "@/lib/hono";
import { fetcher } from "@/lib/utils";
import { verifyToken } from "@/app/api/_common/auth";
import { BlogViewMode } from "./_components/blogViewMode";
import { EditBlogForm } from "./_components/editBlogForm";
import { CsrfTokenSetter } from "./_components/csrfTokenSetter";

export const runtime = 'edge';

// 適切な型定義を追加するのだ
type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
  category: string;
  tags: string[];
};

export default async function BlogPost({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: { mode?: string };
}) {
  const { id } = await params;
  const mode = searchParams.mode || "view";
    // 認証状態を確認するのだ
  let isAuthenticated = false;
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("authToken")?.value;
  
  if (authToken) {
    const userData = await verifyToken(authToken);
    isAuthenticated = !!userData;
  }
  // CSRFトークンはクライアントコンポーネントで設定するのだ
  
  // fetcher の戻り値の型を明示的に指定するのだ
  const post = await fetcher<BlogPost>(client.api.blog[":id"].$url({ param: { id } }));

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">記事が見つかりませんでした</h1>
          <Link href="/blog" className="text-yellow-300 hover:text-yellow-200 transition-colors">
            ブログ一覧に戻る
          </Link>
        </div>
      </div>
    )
  }
    // モードに応じて表示するコンテンツを切り替えるのだ
  // ログインしていないか、モードがviewの場合は閲覧モードを表示するのだ
  if (!isAuthenticated || mode === "view") {
    return (
      <div className="min-h-screen text-white p-6">
        {/* CSRFトークンをクライアント側で設定するコンポーネント */}
        <CsrfTokenSetter />
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <Link href="/blog" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors">
                <ArrowLeft size={20} />
                <span>ブログ一覧に戻る</span>
              </Link>
              
              {isAuthenticated && (
                <BlogViewMode currentMode="view" postId={id} />
              )}
            </div>

            <h1 className="text-3xl font-bold mb-4 text-yellow-300">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm mb-8">
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-1" />
                {post.date}
              </div>
              <div className="flex items-center text-gray-400">
                <Tag size={16} className="mr-1" />
                {post.category}
              </div>
            </div>            <div className="flex flex-wrap gap-2 mb-8">
              {Array.isArray(post.tags) ? post.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-[#1a1f2e] text-yellow-300 rounded-full text-xs">
                  {tag}
                </span>
              )) : null}
            </div>
          </div>          <div className="prose prose-invert prose-yellow max-w-none">
            {typeof post.content === 'string' ? post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h1 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.substring(2)}
                  </h1>
                )
              } else if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
                    {paragraph.substring(3)}
                  </h2>
                )
              } else if (paragraph.startsWith("- ")) {
                return (
                  <ul key={index} className="list-disc pl-5 my-4">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="mb-1">
                        {item.substring(2)}
                      </li>
                    ))}
                  </ul>
                )
              } else if (paragraph.match(/^\d\./)) {
                return (
                  <ol key={index} className="list-decimal pl-5 my-4">
                    {paragraph.split("\n").map((item, i) => {
                      const match = item.match(/^\d\.\s(.*)/)
                      return match ? (
                        <li key={i} className="mb-1">
                          {match[1]}
                        </li>
                      ) : null
                    })}
                  </ol>
                )
              } else {
                return (
                  <p key={index} className="my-4">
                    {paragraph}
                  </p>
                )              }
            }) : <p>コンテンツがありません</p>}
          </div>
        </div>
      </div>
    )
  }
    // 編集モードの場合は編集フォームを表示するのだ
  // ログイン済みで、モードがeditの場合は編集モードを表示するのだ
  return (
    <div className="min-h-screen text-white p-6">
      {/* CSRFトークンをクライアント側で設定するコンポーネント */}
      <CsrfTokenSetter />
      
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link href={`/blog/${id}`} className="flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors">
              <ArrowLeft size={20} />
              <span>記事に戻る</span>
            </Link>
            
            <BlogViewMode currentMode="edit" postId={id} />
          </div>

          <div className="flex items-center justify-center mb-8">
            <h1 className="text-3xl font-bold text-center text-yellow-300 flex items-center">
              <Edit className="inline mr-2 w-6 h-6" />
              ブログ編集
            </h1>
          </div>
        </div>
        
        <EditBlogForm 
          id={id} 
          initialData={{
            title: post.title,
            content: post.content
          }} 
        />
      </div>
    </div>
  )
}

