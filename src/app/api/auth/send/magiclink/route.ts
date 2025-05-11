import { HttpStatus } from "@/constants/common/httpStatus";
import supabase from "@/libs/supabase/supabaseClient";
import axios from "axios";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

/**
 * @swagger
 * /api/auth/send/magiclink:
 *   post:
 *     summary: マジックリンク送信API
 *     description: マジックリンクの送信を行う
 *     responses:
 *       200:
 *         description: マジックリンク送信成功時のレスポンス
 * 　　　500:   
 *         description: マジックリンク送信失敗時のレスポンス
 */
export async function POST(request: NextRequest): Promise<NextResponse> {

    //TODO cloudflare turnliteの認証処理の共通化を行う
    const headers: Headers = new Headers(request.headers);

    const verifyURL: string = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    //Cloudflare turnliteのトークン
    const xAuthToken = headers.get("X-Auth-Token");

    try {
        const body = {
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: xAuthToken,
        }

        //トークンの認証確認
        const res = await axios.post(verifyURL, body);

        if (!res?.data.success) {
            return NextResponse.json(
                { "msg": "認証に失敗しました" },
                { status: HttpStatus.FORBIDDEN }
            );
        }

    } catch (err: any) {
        console.error('Turnstile検証エラー:', err)
        return NextResponse.json(
            { error: '認証処理に失敗しました' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }
    const json = await request.json();

    //TODO リクエスト情報のバリデーションチェックを行う

    //マジックリンクを送信する
    const { data, error } = await supabase.auth.signInWithOtp({
        email: json.email,
        options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_URL
        }
    })

    if (error) {
        return NextResponse.json(
            {},
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }

    return NextResponse.json(
        {},
        { status: HttpStatus.CREATED }
    )
}
