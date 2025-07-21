import { csrf } from 'hono/csrf';
import { cookies } from 'next/headers';

// CSRFトークンのクッキー名
export const CSRF_COOKIE_NAME = 'csrf-token';

/**
 * CSRFミドルウェアを作成する関数
 * Honoの公式CSRFミドルウェアを使用
 */
export function csrfProtection(options = {}) {
  return csrf(options);
}

/**
 * CSRFトークンをクッキーに保存する関数
 */
export async function setCsrfToken(): Promise<string> {
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

/**
 * CSRFトークンを取得する関数
 */
export async function getCsrfToken(): Promise<string | null> {
  const cookiesStore = await cookies();
  return cookiesStore.get(CSRF_COOKIE_NAME)?.value || null;
}

/**
 * CSRFトークンを検証する関数
 */
export async function validateCsrfToken(formToken: string): Promise<boolean> {
  const cookieToken = await getCsrfToken();
  return cookieToken === formToken;
}