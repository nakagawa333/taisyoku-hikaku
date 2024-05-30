import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest):NextResponse {
    const params:URLSearchParams = request.nextUrl.searchParams;
    
    return NextResponse.json({});
}