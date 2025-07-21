import { Context } from 'hono'
import { jwt, sign, verify } from 'hono/jwt'

// 本番環境では環境変数から取得するなどセキュアな方法を使うべきなのだ
// 今回はわかりやすさのために直接定義しているけど、実際はこんなことしちゃダメなのだ！
const JWT_SECRET = 'ずんだもちパワー爆発なのだ_jwt_secret_123456789'

// JWT認証ミドルウェア
export const jwtAuth = jwt({
  secret: JWT_SECRET
})

// 認証トークンを生成するヘルパー関数
export const generateToken = (userId: number, username: string): Promise<string> => {
  return sign({
    userId,
    username,
    // トークン発行時間（秒）
    iat: Math.floor(Date.now() / 1000),
    // トークン有効期限（24時間）
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
  }, JWT_SECRET);
}

// トークンを検証して復号するヘルパー関数
export const verifyToken = async (token: string): Promise<{ userId: number; username: string } | null> => {
  try {
    // トークンを検証・復号するのだ (非同期処理なので await するのだ！)
    const payload = await verify(token, JWT_SECRET);
    return {
      userId: payload.userId as number,
      username: payload.username as string
    };
  } catch (error) {
    console.error('トークン検証エラー:', error);
    return null;
  }
}

// 認証エラーレスポンス用ヘルパー
export const unauthorizedResponse = (c: Context) => {
  return c.json({
    success: false,
    message: '認証が必要なのだ！ログインしてからもう一度試すのだ！'
  }, 401)
}

// リクエストからユーザー情報を取得するヘルパー
export const getUserFromToken = (c: Context) => {
  const payload = c.get('jwtPayload')
  if (!payload) return null
  
  return {
    userId: payload.userId,
    username: payload.username
  }
}