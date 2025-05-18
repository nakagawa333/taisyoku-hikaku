import { HttpStatus } from "@/constants/common/httpStatus";
import supabase from "@/libs/supabase/supabaseClient";
import supabaseServer from "@/libs/supabase/supabaseServer";
import magicLinkValidate from "@/utils/api/validate/magicLinkValidate";
import { User } from "@supabase/supabase-js";
import axios from "axios";
import { ValidationError } from "joi";
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
            { "msg": '認証処理に失敗しました' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }

    let json: any = {};

    try {
        json = await request.json();
    } catch (err: any) {
        return NextResponse.json(
            { "msg": '不正なJSON形式です' },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    //メールアドレス
    const email = json.email;

    //バリデーションチェックを行う
    let validateError: ValidationError | undefined = magicLinkValidate(email);
    if (validateError) {
        //エラーメッセージ取得成功時
        if (Array.isArray(validateError.details) && 0 < validateError.details.length) {
            return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });
        }
        return NextResponse.json({ "msg": "リクエスト情報が不正です" }, { status: 400 });
    }

    //ユーザー一覧取得
    const { data: listUsers, error: usersError } = await supabaseServer.auth.admin.listUsers();

    //ユーザー一覧取得に失敗した場合
    if (usersError) {
        return NextResponse.json(
            {},
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }

    //既にメールアドレスが登録されているかを確認する
    const user: User | undefined = listUsers.users.find((user: User) => user.email === email);

    if (user) {
        //メールアドレスが登録されている場合の処理を行う
        return NextResponse.json(
            { "msg": "メールアドレスは既に登録されています" },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    //マジックリンクを送信する
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
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
