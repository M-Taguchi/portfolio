import { eq, and } from "drizzle-orm";
import { authTable } from "../../../../../db/schema";
import { db } from "../../_common/db";

/**
 * ユーザー認証情報を取得する関数
 */
export const getAuthByUserId = async (userId: number) => {
  try {
    const result = await db
      .select()
      .from(authTable)
      .where(eq(authTable.userId, userId))
      .execute();
    
    if (result.length === 0) {
      return { 
        success: false, 
        message: "認証情報が見つからないのだ..." 
      };
    }
    
    return { 
      success: true, 
      auth: result[0] 
    };
  } catch (error) {
    console.error("認証情報取得エラー:", error);
    return { 
      success: false, 
      message: `認証情報の取得中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}`
    };
  }
};

/**
 * 認証情報を更新する関数
 */
export const updateAuth = async (userId: number, data: Partial<{username: string, password: string}>) => {
  try {
    // ユーザー名の変更なら既存チェック
    if (data.username) {
      const existingAuth = await db
        .select()
        .from(authTable)
        .where(
          and(
            eq(authTable.username, data.username),
            eq(authTable.userId, userId)
          )
        )
        .execute();
      
      if (existingAuth.length > 0) {
        return { 
          success: false, 
          message: "このユーザー名は既に使われているのだ！" 
        };
      }
    }
    
    // 認証情報の更新
    await db.update(authTable)
      .set(data)
      .where(eq(authTable.userId, userId))
      .execute();
      
    return { 
      success: true, 
      message: "認証情報を更新したのだ！" 
    };
  } catch (error) {
    console.error("認証情報更新エラー:", error);
    return { 
      success: false, 
      message: `認証情報の更新中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}`
    };
  }
};