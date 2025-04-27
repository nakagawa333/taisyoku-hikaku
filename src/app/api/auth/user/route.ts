import supabase from "@/libs/supabase/supabaseClient";
import { User, UserMetadata, UserResponse } from "@supabase/supabase-js";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/user:
 *   get:
 *     summary: ユーザー情報取得API
 *     description: ユーザー情報取得
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:   
 *         description: ユーザー情報取得取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    //アクセストークン
    const accessToken: RequestCookie | undefined = request.cookies.get('sb-access-token');

    //リフレッシュトークン
    const refreshToken: RequestCookie | undefined = request.cookies.get('sb-refresh-token');

    if (!accessToken || !refreshToken) {
        return NextResponse.json(
            { message: "トークンがありません。" }
        )
    }

    //ユーザー情報取得
    const getUser: UserResponse = await supabase.auth.getUser(accessToken?.value);

    //エラー発生時  
    if (getUser?.error) {
        return NextResponse.json(
            { message: getUser?.error?.message },
            { status: getUser?.error?.status }
        )
    }

    const user: User = getUser?.data?.user;

    if (!getUser || !user || !user?.user_metadata) {
        return NextResponse.json(
            {
                user: null,
                isLogin: false
            }
        )
    }

    const userMetaData: UserMetadata = user.user_metadata;

    const userData = {
        email: userMetaData?.email,
        fullName: userMetaData?.full_name,
        picture: userMetaData?.picture
    }

    return NextResponse.json(
        {
            user: userData,
            isLogin: true
        }
    )
}