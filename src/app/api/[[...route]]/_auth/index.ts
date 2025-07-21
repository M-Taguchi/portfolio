import { Hono } from "hono";
import { getAuthByUserId, updateAuth } from "./database";
import { authenticateUser } from "../_login/database";
import { generateToken } from "../../_common/auth";
import { verifyToken } from "../../_common/auth";

const app = new Hono()
  // ログインエンドポイント
  .post("/login", async (c) => {
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
          token: token 
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
  })
  
  // 認証情報取得エンドポイント (要認証)
  .get("/me", async (c) => {
    try {
      // トークン検証
      const auth = c.req.header("Authorization");
      if (!auth || !auth.startsWith("Bearer ")) {
        return c.json({ 
          success: false, 
          message: "認証が必要なのだ！" 
        }, 401);
      }
      
      const token = auth.replace("Bearer ", "");
      const decoded = await verifyToken(token);
      
      if (!decoded || !decoded.userId) {
        return c.json({ 
          success: false, 
          message: "無効なトークンなのだ！" 
        }, 401);
      }
      
      const result = await getAuthByUserId(decoded.userId);
      
      if (result.success) {
        return c.json({ 
          success: true, 
          auth: result.auth
        });
      } else {
        return c.json({ 
          success: false, 
          message: result.message 
        }, 404);
      }
    } catch (error) {
      console.error("認証情報取得エラー:", error);
      return c.json({ 
        success: false, 
        message: `認証情報の取得中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}` 
      }, 500);
    }
  })
  
  // 認証情報更新エンドポイント (要認証)
  .put("/update", async (c) => {
    try {
      // トークン検証
      const auth = c.req.header("Authorization");
      if (!auth || !auth.startsWith("Bearer ")) {
        return c.json({ 
          success: false, 
          message: "認証が必要なのだ！" 
        }, 401);
      }
      
      const token = auth.replace("Bearer ", "");
      const decoded = await verifyToken(token);
      
      if (!decoded || !decoded.userId) {
        return c.json({ 
          success: false, 
          message: "無効なトークンなのだ！" 
        }, 401);
      }
      
      const body = await c.req.json();
      const { username, password } = body;
      
      // どちらか一つは必要
      if (!username && !password) {
        return c.json({ 
          success: false, 
          message: "更新するデータが提供されていないのだ！" 
        }, 400);
      }
      
      const updateData: Partial<{username: string, password: string}> = {};
      if (username) updateData.username = username;
      if (password) updateData.password = password;
      
      const result = await updateAuth(decoded.userId, updateData);
      return c.json(result, result.success ? 200 : 400);
    } catch (error) {
      console.error("認証情報更新エラー:", error);
      return c.json({ 
        success: false, 
        message: `認証情報の更新中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}` 
      }, 500);
    }
  });

export default app;