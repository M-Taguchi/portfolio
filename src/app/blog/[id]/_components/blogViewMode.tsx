"use client"
import { Eye, Edit } from "lucide-react"
import Link from "next/link"

interface BlogViewModeProps {
  currentMode: "view" | "edit";
  postId: string;
}

/**
 * ブログの表示モードを切り替えるコンポーネント
 * URLのクエリパラメータを使って切り替えるシンプルな実装
 */
export function BlogViewMode({ currentMode, postId }: BlogViewModeProps) {
  return (
    <div className="flex items-center gap-2 bg-[#1a1f2e] rounded-lg p-1">
      <Link 
        href={`/blog/${postId}`} 
        className={`flex items-center gap-1 px-3 py-2 rounded ${
          currentMode === "view" 
            ? "bg-yellow-500 text-[#0a0e1a]" 
            : "text-gray-300 hover:text-white"
        }`}
      >
        <Eye size={16} />
        <span>閲覧</span>
      </Link>
      <Link 
        href={`/blog/${postId}?mode=edit`} 
        className={`flex items-center gap-1 px-3 py-2 rounded ${
          currentMode === "edit" 
            ? "bg-yellow-500 text-[#0a0e1a]" 
            : "text-gray-300 hover:text-white"
        }`}
      >
        <Edit size={16} />
        <span>編集</span>
      </Link>
    </div>
  )
}
