"use client"

import { Star } from "@/components/ui/star"
import Link from "next/link"

// ポートフォリオアイテムの型定義
type PortfolioItem = {
  id: number
  title: string
  link: string
  x: number
  y: number
}

// サンプルデータ
const portfolioItems: PortfolioItem[] = [
  { id: 1, title: "自己紹介", link: "/user", x: 20, y: 30 },
  { id: 2, title: "プロジェクト2", link: "/user", x: 50, y: 60 },
  { id: 3, title: "プロジェクト3", link: "/user", x: 80, y: 40 },
  { id: 4, title: "プロジェクト4", link: "/user", x: 30, y: 70 },
  { id: 5, title: "プロジェクト5", link: "/user", x: 70, y: 20 },
]

export default function StarPortfolio() {
  return (
    <>
      {portfolioItems.map((item) => (
        <Link
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 hover:text-yellow-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 flex flex-col items-center gap-2"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          href={item.link}
        >
          <Star className="h-6 w-6" />
          <span>{item.title}</span>
        </Link>
      ))}
    </>
  )
}

