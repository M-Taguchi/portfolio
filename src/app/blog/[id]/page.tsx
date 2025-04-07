import Link from "next/link"
import { ArrowLeft, Calendar, Star, Tag } from "lucide-react"

export const runtime = 'edge';

// ブログ記事のモックデータ
const blogPosts = [
  {
    id: 1,
    title: "Next.jsでポートフォリオサイトを作る方法",
    date: "2023-10-15",
    content: `
      # Next.jsでポートフォリオサイトを作る方法

      ポートフォリオサイトは、あなたのスキルや実績を効果的に紹介するための重要なツールです。Next.jsを使えば、パフォーマンスが高く、SEOに強いポートフォリオサイトを簡単に構築できます。

      ## Next.jsの利点

      - サーバーサイドレンダリング（SSR）とスタティックサイト生成（SSG）
      - ファイルベースのルーティング
      - 画像の最適化
      - APIルートの簡単な実装

      ## 実装手順

      1. Next.jsプロジェクトのセットアップ
      2. 基本的なレイアウトの作成
      3. ポートフォリオ項目の表示
      4. スタイリングの適用
      5. デプロイ

      詳細な手順については、以下のコードサンプルを参考にしてください...
    `,
    category: "Web開発",
    tags: ["Next.js", "React", "ポートフォリオ", "フロントエンド"],
  },
  {
    id: 2,
    title: "Tailwind CSSでスタイリングを効率化",
    date: "2023-09-28",
    content: `
      # Tailwind CSSでスタイリングを効率化

      Tailwind CSSは、ユーティリティファーストのCSSフレームワークで、クラス名を直接HTMLに適用することでスタイリングを行います。これにより、CSSファイルを別途作成する必要がなく、開発効率が大幅に向上します。

      ## Tailwind CSSの利点

      - ユーティリティクラスによる高速な開発
      - カスタマイズの柔軟性
      - 一貫したデザインシステム
      - 小さなバンドルサイズ（PurgeCSS統合）

      ## 導入方法

      1. Tailwind CSSのインストール
      2. 設定ファイルの作成
      3. ビルドプロセスの設定
      4. ユーティリティクラスの使用例

      実際のプロジェクトでの活用例を見ていきましょう...
    `,
    category: "CSS",
    tags: ["Tailwind CSS", "CSS", "スタイリング", "フロントエンド"],
  },
  {
    id: 3,
    title: "フロントエンド開発のベストプラクティス",
    date: "2023-09-10",
    content: `
      # フロントエンド開発のベストプラクティス

      現代のフロントエンド開発は複雑化しており、効率的な開発のためにはベストプラクティスを理解することが重要です。このポストでは、実務で役立つフロントエンド開発のベストプラクティスを紹介します。

      ## コードの品質

      - ESLintとPrettierの導入
      - コンポーネント設計のパターン
      - テストの自動化
      - パフォーマンス最適化

      ## 開発フロー

      1. 効率的な開発環境のセットアップ
      2. バージョン管理の戦略
      3. CIパイプラインの構築
      4. デプロイ自動化

      これらのプラクティスを実際のプロジェクトに適用する方法を見ていきましょう...
    `,
    category: "フロントエンド",
    tags: ["ベストプラクティス", "開発フロー", "コード品質", "自動化"],
  },
  {
    id: 4,
    title: "React Hooksの使い方と実践例",
    date: "2023-08-22",
    content: `
      # React Hooksの使い方と実践例

      React Hooksは、関数コンポーネントでステート管理やライフサイクルメソッドなどの機能を使えるようにする機能です。このポストでは、基本的なHooksの使い方と実践的な例を紹介します。

      ## 基本的なHooks

      - useState: ステート管理
      - useEffect: 副作用の処理
      - useContext: コンテキストの利用
      - useReducer: 複雑なステート管理

      ## カスタムHooks

      カスタムHooksを作成することで、ロジックを再利用可能なユニットとして抽出できます。以下は、よく使われるカスタムHooksの例です：

      1. useFetch: データフェッチング
      2. useLocalStorage: ローカルストレージの操作
      3. useMediaQuery: メディアクエリの監視
      4. useForm: フォーム管理

      これらのHooksを実際のプロジェクトで活用する方法を見ていきましょう...
    `,
    category: "React",
    tags: ["React", "Hooks", "JavaScript", "フロントエンド"],
  },
]

export default async function BlogPost({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const postId = parseInt(id, 10)
  const post = blogPosts.find((post) => post.id === postId)

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

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-yellow-300 hover:text-yellow-200 transition-colors mb-6">
            <ArrowLeft className="mr-2" size={20} />
            <span>ブログ一覧に戻る</span>
          </Link>

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
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-[#1a1f2e] text-yellow-300 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="prose prose-invert prose-yellow max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => {
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
              )
            }
          })}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="mr-2 text-yellow-300" size={18} />
            関連記事
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {blogPosts
              .filter((relatedPost) => relatedPost.id !== postId)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id}>
                  <div className="bg-[#111827] bg-opacity-70 border border-[#2d3748] rounded-lg p-4 hover:bg-opacity-90 transition-all hover:border-yellow-500 group">
                    <h4 className="font-medium group-hover:text-yellow-300 transition-colors">{relatedPost.title}</h4>
                    <div className="flex items-center text-gray-400 text-xs mt-2">
                      <Calendar size={12} className="mr-1" />
                      {relatedPost.date}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

