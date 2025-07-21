import { eq } from "drizzle-orm";
import { profileTable, authTable } from "../../../../../db/schema";
import { db } from "../../_common/db";

type LoginParams = {
  username: string;
  password: string;
};

export const authenticateUser = async ({ username, password }: LoginParams) => {
  try {
    // ユーザー名で認証情報を検索
    const result = await db
      .select({
        auth: authTable,
        profile: {
          id: profileTable.id,
          name: profileTable.name
        }
      })
      .from(authTable)
      .innerJoin(profileTable, eq(authTable.userId, profileTable.id))
      .where(eq(authTable.username, username))
      .execute();
    
    // ユーザーが存在しない場合
    if (result.length === 0) {
      return { success: false, message: "ユーザーが見つからないのだ..." };
    }
    
    const { auth, profile } = result[0];
    
    // パスワードの検証
    // 注: 実際の製品ではパスワードはハッシュ化して保存・比較すべきなのだ！
    // このサンプルでは簡略化のため単純比較を行うのだ
    if (auth.password === password) {
      // 最終ログイン日時を更新
      await db.update(authTable)
        .set({ lastLogin: new Date().toISOString() })
        .where(eq(authTable.id, auth.id))
        .execute();
        
      return { 
        success: true, 
        message: "ログイン成功なのだ！", 
        user: { id: profile.id, name: profile.name }
      };
    } else {
      return { success: false, message: "パスワードが間違っているのだ！" };
    }
  } catch (error) {
    console.error("認証エラー:", error);
    return { 
      success: false, 
      message: `認証中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}`
    };
  }
};