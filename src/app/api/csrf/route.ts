import { NextResponse } from "next/server";
import { CSRF_COOKIE_NAME } from "@/lib/csrf";

export const runtime = 'edge';

// CSRFトークンを設定するためのRoute Handler
export async function GET() {
  // ランダムなCSRFトークンを生成
  const token = Math.random().toString(36).substring(2, 15);
  
  // レスポンスオブジェクトを作成
  const response = NextResponse.json({ success: true, token });
  
  // クッキーを設定
  response.cookies.set({
    name: CSRF_COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1時間
    // secure: process.env.NODE_ENV === 'production',
  });
  
  return response;
}