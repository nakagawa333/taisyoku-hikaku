import { HttpStatus } from "@/constants/common/httpStatus";
import supabase from "@/libs/supabase/supabaseClient";
import { AuthResponse, Session, User, UserMetadata, UserResponse } from "@supabase/supabase-js";
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
            {
                user: null,
                isLogin: false
            }
        )
    }

    //ユーザー情報取得
    const getUser: UserResponse = await supabase.auth.getUser(accessToken?.value);

    //エラー発生時  
    if (getUser?.error) {
        //403エラーの場合
        if (getUser?.error?.status === HttpStatus.FORBIDDEN) {
            if (refreshToken?.value) {
                const authResponse: AuthResponse = await supabase.auth.refreshSession({ refresh_token: refreshToken?.value });

                //リフレッシュトークンを取得する処理に失敗した場合
                if (authResponse.error) {
                    return NextResponse.json(
                        {
                            user: null,
                            isLogin: false
                        }
                    )
                }

                const session: Session | null = authResponse?.data?.session;
                //再度トークンを検証
                const getSessionUser: UserResponse = await supabase.auth.getUser(session?.access_token);
                if (getSessionUser.error) {
                    return NextResponse.json(
                        {
                            user: null,
                            isLogin: false
                        }
                    )
                }

                if (session && session.expires_at) {
                    // 有効期限を秒単位で計算
                    const expiresIn: number = session.expires_at - Math.floor(Date.now() / 1000);
                    const sessionUser: User | null = getSessionUser?.data?.user;
                    const userMetaData: UserMetadata = sessionUser.user_metadata;

                    let userData = {
                        email: null,
                        fullName: null,
                        picture: null
                    }

                    if (sessionUser && sessionUser?.user_metadata) {
                        const sessionUserMetaData: UserMetadata = sessionUser.user_metadata;
                        userData = {
                            email: sessionUserMetaData?.email,
                            fullName: sessionUserMetaData?.full_name,
                            picture: sessionUserMetaData?.picture
                        }
                    }

                    // 新しいクッキーを設定
                    const response: NextResponse = NextResponse.json(userData);

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
                    return response;
                }
            }

        } else {
            return NextResponse.json(
                {
                    user: null,
                    isLogin: false
                }
            )
        }
    }

    const user: User | null = getUser?.data?.user;

    if (!getUser || !user || !user?.user_metadata) {
        return NextResponse.json(
            {
                user: null,
                isLogin: false
            }
        )
    }

    const userMetaData: UserMetadata = user.user_metadata;
    return NextResponse.json(
        {
            email: userMetaData?.email,
            fullName: userMetaData?.full_name,
            picture: userMetaData?.picture
        }
    )
}