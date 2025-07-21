import Link from "next/link"
import { Calendar } from "lucide-react"
import { Star } from "@/components/ui/star"
import { BlogListResType } from "../page"

type BlogListProps = {
  blogPosts: BlogListResType
}

export const BlogList = ({ blogPosts }: BlogListProps) => {
  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-center text-yellow-300 flex items-center">
            <Star className="inline mr-2 fill-yellow-300 w-6 h-6" />
            ブログ
          </h1>
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
                    {post.createdAt}
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-yellow-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-300 text-sm">{post.category}</p>
                <div className="mt-4 text-yellow-400 text-sm font-medium flex justify-end">続きを読む →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}