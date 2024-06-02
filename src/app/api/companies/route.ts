import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: 退職代行取得一覧API
 *     description: 退職代行取得一覧API
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:
 *         description: 退職サービス一覧情報取得失敗時のレスポンス
 */
export async function GET(request: NextRequest):Promise<NextResponse> {
    const params:URLSearchParams = request.nextUrl.searchParams;

    const SUPABASE_URL:string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const API_KEY:string | undefined = process.env.NEXT_PUBLIC_API_KEY;

    if(!SUPABASE_URL || !API_KEY){
        console.error("url",SUPABASE_URL);
        console.error("APIキー",API_KEY);
        throw new Error("環境変数が正しく設定されていません。");
    }

    const supabase = createClient(SUPABASE_URL, API_KEY);
    let servicesQuery = supabase
    .from("services")
    .select(`
       service_id,
       service_name,
       price,
       free_consultation,
       guarantee_system,
       free_gift,
       image_file_path,
       hour_service,
       managements(
        management_name
       ),
       service_managements(
          contact_information(
            contact_information_name
          )
       )
    `)

    const fieldMap = new Map([
        ["serviceName","service_name"],
        ["free_consultation","free_consultation"],
        ["guaranteeSystem","guarantee_system"],
        ["freeGift","free_gift"],
        ["hourService","hour_service"],
        ["managementId","management_id"],
        ["contactInformationId","contact_information_id"]
    ]);

    //サービス名
    if(params.has("serviceName")){
        let value:string | null = params.get("serviceName");
        if(value !== null){
            let field:string | undefined = fieldMap.get("serviceName");
            if(field !== undefined) servicesQuery = servicesQuery.eq(field,value);
        }
    }

    //運営元
    if(params.has("managementId")){
        let value:string[] | undefined = params.get("managementId")?.split(",");
        if(value !== undefined){
            let field:string | undefined = fieldMap.get("managementId");
            //複数条件
            if(field !== undefined) servicesQuery = servicesQuery.in(field,value);
        }
    }

    //連絡先
    if(params.has("contactInformationId")){
        let value:string[] | undefined = params.get("contactInformationId")?.split(",");
        if(value !== undefined){
            let field:string | undefined = fieldMap.get("contactInformationId");
            //複数条件
            if(field !== undefined) servicesQuery = servicesQuery.in(field,value);
        }
    }

    //無料相談
    if(params.has("freeConsultation")){
        let value:string | null = params.get("freeConsultation");
        if(value !== null){
            let field:string | undefined = fieldMap.get("freeConsultation");
            if(value === "true" || value === "false"){
                let bool:boolean = value === "true";
                if(field !== undefined) servicesQuery = servicesQuery.eq(field,bool);                
            }
        }
    }

    //保証制度
    if(params.get("guaranteeSystem")){
        let value:string | null = params.get("guaranteeSystem");
        if(value !== null){
            let field:string | undefined = fieldMap.get("guaranteeSystem");
            if(value === "true" || value === "false"){
                let bool:boolean = value === "true";
                if(field !== undefined) servicesQuery = servicesQuery.eq(field,bool);                
            }
        }
    }

    //24時間受付
    if(params.get("hourService")){
        let value:string | null = params.get("hourService");
        if(value !== null){
            let field:string | undefined = fieldMap.get("hourService");
            if(value === "true" || value === "false"){
                let bool:boolean = value === "true";
                if(field !== undefined) servicesQuery = servicesQuery.eq(field,bool);                
            }
        }
    }

    //無料プレゼント
    if(params.get("freeGift")){
        let value:string | null = params.get("freeGift");
        if(value !== null){
            let field:string | undefined = fieldMap.get("freeGift");
            if(value === "true" || value === "false"){
                let bool:boolean = value === "true";
                if(field !== undefined) servicesQuery = servicesQuery.eq(field,bool);                
            }
        }
    }

    //クエリ実行
    const servicesQueryRes:any = await servicesQuery;
    const servicesQueryData:any = servicesQueryRes.data;
    const servicesQueryError:any = servicesQueryRes.error;

    if(servicesQueryError){
        console.error(servicesQueryError);
        return NextResponse.json({"msg":"退職サービス一覧情報の取得に失敗しました"},{status:500});
    }
    
    let res:any = {
        "services":servicesQueryData,
    }

    return NextResponse.json({res});
}