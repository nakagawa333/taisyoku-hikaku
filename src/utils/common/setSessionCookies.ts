import { Session } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

/**
 * クッキーにセッション情報を作成する
 * @param session セッション
 * @returns レスポンス情報
 */
export function setSessionCookies(response: NextResponse, session: Session | null) {
    if (session && session.expires_at) {
        // 有効期限を秒単位で計算
        const expiresIn: number = session.expires_at - Math.floor(Date.now() / 1000);
        response.cookies.set('sb-access-token', session.access_token,
            {
                httpOnly: true,
                path: '/',
                maxAge: expiresIn,
                secure: true,
                sameSite: "strict"
            });
        response.cookies.set('sb-refresh-token', session.refresh_token,
            {
                httpOnly: true,
                path: '/',
                maxAge: expiresIn,
                secure: true,
                sameSite: "strict"
            });
    }
}