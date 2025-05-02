import { HttpStatus } from "@/constants/common/httpStatus";
import supabase from "@/libs/supabase/supabaseClient";
import { AuthResponse, Session, UserResponse } from "@supabase/supabase-js";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "./createErrorResponse";
import { setSessionCookies } from "./setSessionCookies";

/**
 * セッションのアクセストークンを検証し、無効な場合はリフレッシュトークンを使用してセッションを更新する
 * @param request リクエスト情報
 * @returns レスポンス情報
 */
export async function validateAndRefreshSession(request: NextRequest): Promise<NextResponse<unknown>> {
    //アクセストークン
    const accessToken: RequestCookie | undefined = request.cookies.get('sb-access-token');

    //リフレッシュトークン
    const refreshToken: RequestCookie | undefined = request.cookies.get('sb-refresh-token');

    if (!accessToken || !accessToken.value || !refreshToken || !refreshToken.value) {
        //エラーレスポンス返却
        return createErrorResponse("トークンが存在しません", HttpStatus.UNAUTHORIZED);
    }

    //ユーザー情報取得
    const user: UserResponse = await supabase.auth.getUser(accessToken.value);
    //レスポンス情報
    const response: NextResponse = NextResponse.next();
    //エラーの場合
    if (user?.error) {
        //403エラーの場合
        if (user?.error?.status === HttpStatus.FORBIDDEN) {
            if (refreshToken?.value) {
                //リフレッシュトークンからユーザー情報を取得する
                const authResponse: AuthResponse = await supabase.auth.refreshSession({ refresh_token: refreshToken.value });

                //リフレッシュトークンを取得する処理に失敗した場合
                if (authResponse.error) {
                    //エラーレスポンス返却
                    return createErrorResponse("トークン新規発行に失敗しました", HttpStatus.UNAUTHORIZED);
                }

                //セッション情報
                const session: Session | null = authResponse?.data?.session;

                //再度トークンを検証
                const sessionUser: UserResponse = await supabase.auth.getUser(session?.access_token);
                if (sessionUser.error) {
                    //エラーレスポンス返却
                    return createErrorResponse("ユーザー情報の取得に失敗しました", HttpStatus.UNAUTHORIZED);
                }

                //新しいクッキーを設定
                setSessionCookies(response, session);
            }
        } else {
            //エラーレスポンス返却
            return createErrorResponse("トークンが有効ではありません", HttpStatus.UNAUTHORIZED);
        }
    }
    return response;
}