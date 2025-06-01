import { HttpStatus } from "@/constants/common/httpStatus";
import supabase from "@/libs/supabase/supabaseClient";
import { AuthResponse, Session, UserResponse } from "@supabase/supabase-js";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function getUser(request: NextRequest): Promise<string | undefined> {
    //ユーザーID
    let userId: string | undefined;
    //アクセストークン
    const accessToken: RequestCookie | undefined = request.cookies.get('sb-access-token');

    //リフレッシュトークン
    const refreshToken: RequestCookie | undefined = request.cookies.get('sb-refresh-token');

    if (!accessToken || !accessToken.value || !refreshToken || !refreshToken.value) {
        //エラーレスポンス返却
        return userId;
    }

    //ユーザー情報取得
    const user: UserResponse = await supabase.auth.getUser(accessToken.value);

    if (!user) return userId;

    if (user?.error) {
        if (user?.error?.status === HttpStatus.FORBIDDEN) {
            if (refreshToken?.value) {
                //リフレッシュトークンからユーザー情報を取得する
                const authResponse: AuthResponse = await supabase.auth.refreshSession({ refresh_token: refreshToken.value });
                //リフレッシュトークンを取得する処理に失敗した場合
                if (authResponse.error) {
                    return userId;
                }

                //セッション情報
                const session: Session | null = authResponse?.data?.session;

                //再度トークンを検証
                const sessionUser: UserResponse = await supabase.auth.getUser(session?.access_token);
                if (sessionUser.error) {
                    return userId;
                }
            }
        } else {
            return userId;
        }
    }

    userId = user?.data?.user?.id;
    return userId;
}