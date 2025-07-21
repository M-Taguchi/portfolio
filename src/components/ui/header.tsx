"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Star } from "@/components/ui/star"

const pageList = [
  { name: "ブログ", path: "/blog" },
  { name: "自己紹介", path: "/user" },
  { name: "プロジェクト", path: "/project" },
  { name: "ホーム", path: "/" },
]

export default function Header() {
  const pathname = usePathname()

  // ホームページの場合はヘッダーを表示しない
  if (pathname === "/") {
    return null
  }

  return (
    <header className="bg-[#0a0e1a] border-b border-[#1a1f2e] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors">
          <Star className="fill-yellow-300 w-6 h-6" />
          <span className="font-bold text-lg">ポートフォリオ</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            {pageList.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className={`text-gray-400 hover:text-gray-300 transition-colors ${pathname === page.path ? "text-yellow-300" : ""}`}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}