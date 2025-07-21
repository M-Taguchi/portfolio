"use client";

import { useFormStatus } from "react-dom";
import { Star } from "@/components/ui/star";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// サブミットボタンコンポーネント - フォームの送信状態を監視するのだ
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full text-yellow-300 border border-yellow-500 hover:bg-[#2d3748]"
    >
      {pending ? "ログイン中..." : "ログイン"}
    </Button>
  );
}

type FormState = {
  message: string;
  success: boolean;
  isLoading: boolean;
};

interface LoginFormPresenterProps {
  formAction: (formData: FormData) => void;
  state: FormState;
}

export function LoginFormPresenter({ formAction, state }: LoginFormPresenterProps) {
  // シンプルにフォームを表示してサーバーアクションを呼び出すだけなのだ
  // CSRFトークンの処理はサーバー側で完結するのだ！
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-[#111827] bg-opacity-70 border border-[#2d3748]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <Star className="fill-yellow-300 w-10 h-10" />
          </div>
          <CardTitle className="text-2xl text-center text-yellow-300">
            ログイン
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            アカウント情報を入力してログインしてください
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {state.message && !state.success && (
            <div className="bg-red-900/50 border border-red-400 text-red-200 px-4 py-3 rounded mb-6">
              {state.message}
            </div>
          )}
        
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm text-yellow-300 font-medium">ユーザー名:</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full p-3 border border-[#2d3748] rounded-lg bg-[#0a0e1a] text-white focus:border-yellow-500 focus:outline-none"
                placeholder="ユーザー名を入力"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-yellow-300 font-medium">パスワード:</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full p-3 border border-[#2d3748] rounded-lg bg-[#0a0e1a] text-white focus:border-yellow-500 focus:outline-none"
                placeholder="パスワードを入力"
              />
            </div>
            
            <SubmitButton />
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">
            アカウントをお持ちでない場合は、管理者にお問い合わせください
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}