import { NextResponse } from "next/dist/server/web/spec-extension/response";

/**
 * エラーレスポンスを作成する
 * @param message メッセージ
 * @param status HTTPステータス
 * @returns レスポンス
 */
export function createErrorResponse(message: string, status: number) {
    return NextResponse.json({ message: message }, { status: status });
}