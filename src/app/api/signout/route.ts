import { HttpStatus } from "@/constants/common/httpStatus";
import supabase from "@/libs/supabase/supabaseClient";
import { createErrorResponse } from "@/utils/common/createErrorResponse";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

/**
 * @swagger
 * /api/signout:
 *   post:
 *     summary: サインアウトAPI
 *     description: サインアウトを行う
 *     responses:
 *       200:
 *         description: サインアウト成功時のレスポンス
 * 　　　500:   
 *         description: サインアウト失敗時のレスポンス
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    //サインアウト
    const { error } = await supabase.auth.signOut();

    if (error) {
        return createErrorResponse("ログアウトに失敗しました", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const response = NextResponse.json({ message: 'ログアウト完了' });
    //クッキーからアクセストークンを削除する
    response.cookies.set('sb-access-token', '', {
        path: '/',
        maxAge: 0,
    });

    //クッキーからリフレッシュトークンを削除する
    response.cookies.set('sb-refresh-token', '', {
        path: '/',
        maxAge: 0,
    });

    return response;
}