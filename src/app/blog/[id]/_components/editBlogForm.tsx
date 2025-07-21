"use client"
import Link from "next/link"
import { useState } from "react"
import { getCsrfTokenFromCookie } from "@/lib/csrf-client"

/**
 * フォームの初期データ型
 */
interface InitialData {
  title: string;
  content: string;
}

/**
 * フォームの状態を表す型
 */
type FormState = {
  message: string;
  success: boolean;
  isLoading: boolean;
};

interface EditBlogFormProps {
  id: string;
  initialData: InitialData;
}

/**
 * 編集フォームコンポーネント
 * サーバーアクションではなくクライアント側でフェッチを行う単純な実装なのだ
 */
export function EditBlogForm({ id, initialData }: EditBlogFormProps) {
  // フォームの状態を管理する
  const [formState, setFormState] = useState<FormState>({
    message: "",
    success: false,
    isLoading: false
  });
  
  // フォームの入力値を管理する
  const [formValues, setFormValues] = useState({
    title: initialData.title,
    content: initialData.content
  });
  
  // 入力値の変更を処理する
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ message: "", success: false, isLoading: true });
    
    try {
      const { title, content } = formValues;

      if (!title || !content) {
        setFormState({
          message: "タイトルとコンテンツは必須なのだ！",
          success: false,
          isLoading: false
        });
        return;
      }

      // CSRFトークンを取得するのだ
      const csrfToken = getCsrfTokenFromCookie();
      
      // トークンが無効ならエラーを返すのだ
      if (!csrfToken) {
        setFormState({
          message: "セキュリティトークンが見つからないのだ。ページを再読み込みしてほしいのだ！",
          success: false,
          isLoading: false
        });
        return;
      }

      // ブログ更新APIを呼び出す
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify({ 
          title, 
          content, 
          _csrf: csrfToken // クライアント側で取得したトークンを使うのだ！
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json() as {
        success: boolean;
        message?: string;
      };

      if (data.success) {
        setFormState({
          message: "ブログが更新されたのだ！",
          success: true,
          isLoading: false
        });
      } else {
        setFormState({
          message: data.message || "ブログの更新に失敗したのだ…",
          success: false,
          isLoading: false
        });
      }
    } catch (error) {
      setFormState({
        message: `エラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}`,
        success: false,
        isLoading: false
      });
    }
  };

  return (
    <>
      {formState.message && formState.success && (
        <div className="bg-green-900/50 border border-green-400 text-green-200 px-4 py-3 rounded mb-6">
          {formState.message}
        </div>
      )}
      
      {formState.message && !formState.success && (
        <div className="bg-red-900/50 border border-red-400 text-red-200 px-4 py-3 rounded mb-6">
          {formState.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-[#111827] bg-opacity-70 border border-[#2d3748] rounded-lg p-6">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-yellow-300 font-medium">タイトル:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formValues.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#2d3748] rounded-lg bg-[#0a0e1a] text-white focus:border-yellow-500 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 text-yellow-300 font-medium">コンテンツ:</label>
          <textarea
            id="content"
            name="content"
            value={formValues.content}
            onChange={handleInputChange}
            className="w-full p-3 border border-[#2d3748] rounded-lg h-64 bg-[#0a0e1a] text-white focus:border-yellow-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-3">
          <button 
            type="submit" 
            disabled={formState.isLoading} 
            className="px-4 py-2 bg-[#1a1f2e] text-yellow-300 rounded hover:bg-[#2d3748] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-500"
          >
            {formState.isLoading ? "保存中..." : "変更を保存"}
          </button>
          <Link 
            href={`/blog/${id}`}
            className="px-4 py-2 bg-[#2d3748] text-gray-300 rounded hover:bg-[#3a4759] transition-colors"
          >
            キャンセル
          </Link>
        </div>
      </form>
    </>
  );
}
