/**
 * クライアント側でCSRFトークンを扱うためのユーティリティ
 */

// CSRFトークンのクッキー名
export const CSRF_COOKIE_NAME = 'csrf-token';
export const CSRF_FORM_FIELD = '_csrf';

/**
 * クッキーからCSRFトークンを取得する関数
 */
export function getCsrfTokenFromCookie(): string | null {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === CSRF_COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * FormDataにCSRFトークンを追加する関数
 */
export function addCsrfToken(formData: FormData): FormData {
  const token = getCsrfTokenFromCookie();
  if (token) {
    formData.set(CSRF_FORM_FIELD, token);
  }
  return formData;
}

/**
 * APIレスポンスの型定義
 */
interface CsrfResponse {
  success: boolean;
  token: string;
}

/**
 * APIを呼び出してCSRFトークンを設定する関数
 */
export async function setCsrfToken(): Promise<string | null> {
  try {
    const response = await fetch('/api/csrf');
    if (!response.ok) {
      console.error('CSRFトークンの設定に失敗しました');
      return null;
    }
    const data = await response.json() as CsrfResponse;
    return data.token;
  } catch (error) {
    console.error('CSRFトークンの設定エラー:', error);
    return null;
  }
}

/**
 * フェッチリクエストにCSRFトークンを追加する関数
 */
export function fetchWithCsrf(url: string, options: RequestInit = {}): Promise<Response> {
  // GETリクエストなどの場合は通常のfetchを使用
  if (!options.method || ['GET', 'HEAD', 'OPTIONS'].includes(options.method)) {
    return fetch(url, options);
  }
  
  // ヘッダーを準備
  const headers = new Headers(options.headers);
  
  // 念のためX-CSRF-Tokenヘッダーを追加
  const token = getCsrfTokenFromCookie();
  if (token) {
    headers.set('X-CSRF-Token', token);
  }
  
  return fetch(url, {
    ...options,
    headers
  });
}