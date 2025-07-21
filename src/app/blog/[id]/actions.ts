'use server'

import { cookies } from "next/headers";
import { CSRF_COOKIE_NAME } from "@/lib/csrf";

/**
 * CSRFトークンをクッキーに保存するサーバーアクション
 * Route HandlerではなくServer Actionに変更するのだ
 */
export async function setCsrfTokenAction(): Promise<string> {
  // ランダムなCSRFトークンを生成
  const token = Math.random().toString(36).substring(2, 15);
  
  const cookieStore = await cookies();
  cookieStore.set({
    name: CSRF_COOKIE_NAME,
    value: token,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1時間
    // secure: process.env.NODE_ENV === 'production',
  });
  
  return token;
}
