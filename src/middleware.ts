import { Endpoints } from "@/constants/common/endpoints";
import { NextRequest, NextResponse } from "next/server";
import { HttpMethod } from "./constants/common/httpMethod";
import { HttpStatus } from "./constants/common/httpStatus";
import { Paths } from "./constants/common/paths";
import { validateAndRefreshSession } from "./utils/common/validateAndRefreshSession";

//ミドルウェア
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    //API以外
    if (!pathname.startsWith("/api")) {
        //ログイン画面
        if (pathname === Paths.LOGIN) {
            const response: NextResponse = await validateAndRefreshSession(request);
            if (response.status === HttpStatus.OK) {
                //urlをコピーする
                const url = request.nextUrl.clone();
                url.pathname = Paths.HOME;
                //既に認証済の場合、ホームページに遷移
                return NextResponse.redirect(url);
            }
        }
        return NextResponse.next();
    }

    //口コミ投稿
    if (
        (Endpoints.SERVICEREVIEWS === pathname && request.method === HttpMethod.POST)
    ) {
        const response = await validateAndRefreshSession(request);
        return response;
    }

    return NextResponse.next();
}