import { Endpoints } from "@/constants/common/endpoints";
import { AuthResponse, Session, UserResponse } from "@supabase/supabase-js";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import { HttpMethod } from "./constants/common/httpMethod";
import { HttpStatus } from "./constants/common/httpStatus";
import supabase from "./libs/supabase/supabaseClient";

//ミドルウェア
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    //API以外
    if (!pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    //口コミ投稿
    if (
        (Endpoints.SERVICEREVIEWS === pathname && request.method === HttpMethod.POST)
    ) {
        //アクセストークン
        const accessToken: RequestCookie | undefined = request.cookies.get('sb-access-token');

        //リフレッシュトークン
        const refreshToken: RequestCookie | undefined = request.cookies.get('sb-refresh-token');

        if (!accessToken || !refreshToken) {
            return NextResponse.json(
                { message: "トークンがありません。" },
                { status: HttpStatus.UNAUTHORIZED },
            )
        }

        //ユーザー情報取得
        const user: UserResponse = await supabase.auth.getUser(accessToken?.value);

        //エラーの場合
        if (user?.error) {
            //403エラーの場合
            if (user?.error?.status === HttpStatus.FORBIDDEN) {
                if (refreshToken?.value) {
                    const authResponse: AuthResponse = await supabase.auth.refreshSession({ refresh_token: refreshToken?.value });

                    //リフレッシュトークンを取得する処理に失敗した場合
                    if (authResponse.error) {
                        return NextResponse.json(
                            { message: "トークン新規発行に失敗しました" },
                            { status: HttpStatus.UNAUTHORIZED },
                        )
                    }

                    const session: Session | null = authResponse?.data?.session;

                    //再度トークンを検証
                    const sessionUser: UserResponse = await supabase.auth.getUser(session?.access_token);
                    if (sessionUser.error) {
                        return NextResponse.json(
                            { message: "ユーザー情報の取得に失敗しました" },
                            { status: HttpStatus.UNAUTHORIZED }
                        );
                    }

                    if (session && session.expires_at) {
                        // 有効期限を秒単位で計算
                        const expiresIn: number = session.expires_at - Math.floor(Date.now() / 1000);

                        // 新しいクッキーを設定
                        const response: NextResponse = NextResponse.next();
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
                    { message: "トークンが有効ではありません" },
                    { status: HttpStatus.UNAUTHORIZED },
                )
            }
        }
    }

    return NextResponse.next();
}