import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Star } from "@/components/ui/star"

// ブログ記事のモックデータ
const blogPosts = [
  {
    id: 1,
    title: "Next.jsでポートフォリオサイトを作る方法",
    date: "2023-10-15",
    excerpt: "Next.jsを使って素敵なポートフォリオサイトを作成する方法を紹介します。",
    category: "Web開発",
  },
  {
    id: 2,
    title: "Tailwind CSSでスタイリングを効率化",
    date: "2023-09-28",
    excerpt: "Tailwind CSSを使ったスタイリングの効率化について解説します。",
    category: "CSS",
  },
  {
    id: 3,
    title: "フロントエンド開発のベストプラクティス",
    date: "2023-09-10",
    excerpt: "現代のフロントエンド開発におけるベストプラクティスをまとめました。",
    category: "フロントエンド",
  },
  {
    id: 4,
    title: "React Hooksの使い方と実践例",
    date: "2023-08-22",
    excerpt: "React Hooksの基本的な使い方と実践的な例を紹介します。",
    category: "React",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-yellow-300 hover:text-yellow-200 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            <span>ホームに戻る</span>
          </Link>
          <h1 className="text-3xl font-bold ml-auto text-center text-yellow-300 flex items-center">
            <Star className="inline mr-2 fill-yellow-300 w-6 h-6" />
            ブログ
          </h1>
          <div className="ml-auto w-[100px]"></div> {/* バランス用の空白 */}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <div className="bg-[#111827] bg-opacity-70 border border-[#2d3748] rounded-lg p-6 hover:bg-opacity-90 transition-all hover:border-yellow-500 group h-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 text-xs bg-[#1a1f2e] rounded-full text-yellow-300">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    {post.date}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-yellow-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-300 text-sm">{post.excerpt}</p>
                <div className="mt-4 text-yellow-400 text-sm font-medium flex justify-end">続きを読む →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

