import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomeContainer() {
  return (
<div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            <Home />
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="#about" className="text-sm font-medium hover:underline">
              自己紹介
            </Link>
            <Link href="#projects" className="text-sm font-medium hover:underline">
              プロジェクト
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline">
              連絡先
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="about" className="py-20 bg-muted">
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/placeholder.svg?height=150&width=150"
                alt="山田太郎"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h1 className="text-4xl font-bold mb-4">山田太郎</h1>
              <p className="text-xl mb-6">フロントエンドデベロッパー</p>
              <p className="max-w-2xl mb-8">
                Next.js、React、TypeScriptを使用したWebアプリケーション開発に5年以上の経験があります。
                ユーザー体験を重視し、パフォーマンスと保守性の高いコードを書くことを心がけています。
              </p>
              <div className="flex gap-4">
                <Button>履歴書をダウンロード</Button>
                <Button variant="outline">お問い合わせ</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold mb-10 text-center">プロジェクト</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>ECサイト</CardTitle>
                  <CardDescription>Next.js, TypeScript, Prisma</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="ECサイトのスクリーンショット"
                    width={400}
                    height={200}
                    className="rounded-md mb-4"
                  />
                  <p>高性能なECサイトを開発。カート機能、決済システム、在庫管理を実装。</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>タスク管理アプリ</CardTitle>
                  <CardDescription>React, Redux, Firebase</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="タスク管理アプリのスクリーンショット"
                    width={400}
                    height={200}
                    className="rounded-md mb-4"
                  />
                  <p>リアルタイムで同期するタスク管理アプリ。チーム協業機能を搭載。</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>天気予報アプリ</CardTitle>
                  <CardDescription>Vue.js, Vuex, OpenWeather API</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="天気予報アプリのスクリーンショット"
                    width={400}
                    height={200}
                    className="rounded-md mb-4"
                  />
                  <p>位置情報を利用した天気予報アプリ。5日間の予報と詳細な気象データを表示。</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-muted py-10">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-6">お問い合わせ</h2>
          <div className="flex justify-center gap-4 mb-6">
            <Button variant="outline" size="icon">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2025 山田太郎. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
