import { Hono } from "hono";
import { authenticateUser } from "./database";
import { generateToken } from "../../_common/auth";

const app = new Hono()
  .post("/", async (c) => {
    try {
      const body = await c.req.json();
      const { username, password } = body;

      if (!username || !password) {
        return c.json({ 
          success: false, 
          message: "ユーザー名とパスワードは必須なのだ！" 
        }, 400);
      }

      const result = await authenticateUser({ username, password });

      if (result.success && result.user) {
        // JWTトークンを生成するのだ
        const token = generateToken(result.user.id, result.user.name);
        
        return c.json({ 
          success: true, 
          message: result.message,
          user: result.user,
          token: token // JWTトークンを返すのだ
        });
      } else {
        return c.json({ 
          success: false, 
          message: result.message 
        }, 401);
      }
    } catch (error) {
      console.error("ログインエラー:", error);
      return c.json({ 
        success: false, 
        message: `ログイン処理中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}` 
      }, 500);
    }
  });

export default app;