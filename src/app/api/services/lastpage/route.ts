import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { Service } from "@/types/service";
import { TableNames } from "@/constants/db/tableName";
import validate from "@/utils/api/validate/services";
import prisma from "@/libs/prisma/prismaClient";
import { ServicesResponse } from "@/constants/api/response/ServicesResponse";
import supabase from "@/libs/supabase/supabaseClient";
import { createNestedArrays } from "@/utils/common/createNestedArrays";

/**
 * @swagger
 * /api/services/lastpage:
 *   get:
 *     summary: 退職代行一覧最終ページの取得
 *     description: 退職代行一覧最終ページ取得API
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:
 *         description: 退職代行一覧最終ページ取得失敗時のレスポンス
 */
export async function GET(request: NextRequest):Promise<NextResponse> {

    let services;
    try{
        services = await prisma.services.findMany();

    } catch(error:any){
        console.error("退職サービス一覧最終ページの取得に失敗しました");
        console.error(error);
        return NextResponse.json({"msg":"退職サービス一覧情報の取得に失敗しました"},{status:500});
    }

    let nestServices = createNestedArrays(services,1);
    let lastPage:number = 0;
    for(let services of nestServices){
        lastPage += 1;
    }

    return NextResponse.json({"lastPage":lastPage});
}