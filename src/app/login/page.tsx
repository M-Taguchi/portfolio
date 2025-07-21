// サーバーコンポーネントなのだ
import { LoginFormPresenter } from "./_presenter/loginForm.presenter";
import { setCsrfToken, getCsrfToken } from "@/lib/csrf";

type FormState = {
  message: string;
  success: boolean;
  isLoading: boolean;
};

// APIからのレスポンス型を定義するのだ
type LoginResponse = {
  success: boolean;
  message?: string;
  token?: string;
};

export default async function LoginPage() {
  // ページコンポーネント内では直接クッキー操作はできないのだ
  // 代わりにサーバーアクション内で行うのだ！
  
  // ログインフォームのアクションなのだ
  async function loginFormAction(formData: FormData): Promise<FormState> {
    'use server'; // これがサーバーアクションの印なのだ！
    
    try {
      // サーバーアクション内でCSRFトークンを生成するのだ！
      await setCsrfToken();
      
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      if (!username || !password) {
        return {
          message: "ユーザー名とパスワードは必須なのだ！",
          success: false,
          isLoading: false,
        };
      }

      // ここでCSRFトークンをサーバー側で取得するのだ
      // クッキーから現在のトークンを取得するのだ
      const cookieToken = await getCsrfToken();
      
      // トークンが無効ならエラーを返すのだ
      if (!cookieToken) {
        return {
          message: "セキュリティトークンが見つからないのだ。ページを再読み込みしてほしいのだ！",
          success: false,
          isLoading: false,
        };
      }

      // ログインAPIを呼び出す
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/login`, {
        method: "POST",
        body: JSON.stringify({ 
          username, 
          password, 
          _csrf: cookieToken // サーバーサイドで取得したトークンを使うのだ
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json() as LoginResponse;

      if (data.success && data.token) {
        // 実際の実装ではここでリダイレクトするか、cookieにトークンをセットするのだ
        return {
          message: "ログイン成功なのだ！",
          success: true,
          isLoading: false,
        };
      } else {
        return {
          message: data.message || "ログインに失敗したのだ…認証情報を確認してみるのだ",
          success: false,
          isLoading: false,
        };
      }
    } catch (error) {
      return {
        message: `ログイン中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}`,
        success: false,
        isLoading: false,
      };
    }
  }

  // プレゼンターには formAction を渡すだけでCSRFについては気にさせないのだ
  return <LoginFormPresenter 
    formAction={loginFormAction} 
    state={{ message: "", success: false, isLoading: false }} 
  />;
}