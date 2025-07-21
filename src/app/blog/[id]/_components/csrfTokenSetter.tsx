'use client'

import { useEffect } from 'react';
import { setCsrfToken } from '@/lib/csrf-client';

export function CsrfTokenSetter() {
  useEffect(() => {
    // マウント時にCSRFトークンを設定 (クライアント側関数でAPI呼び出し)
    const setCsrf = async () => {
      try {
        await setCsrfToken(); // クライアント関数を使用
      } catch (error) {
        console.error('CSRFトークン設定エラー:', error);
      }
    };
    
    setCsrf();
  }, []);
  
  // 何もレンダリングしない
  return null;
}
