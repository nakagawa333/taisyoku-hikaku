import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { Service } from "@/types/service";
import validate from "@/utils/api/validate/company";

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: 退職代行サービス取得API
 *     description: 退職代行サービス取得
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス取得失敗時のレスポンス
 */
export async function GET(request: NextRequest):Promise<NextResponse> {
    const params:URLSearchParams = request.nextUrl.searchParams;
    const serviceId:string | null = params.get("service_id");

    //バリデーションチェック
    let validateError = validate(serviceId);
    if(validateError) return NextResponse.json({"msg":validateError.details[0].message},{status:400});

    const SUPABASE_URL:string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const API_KEY:string | undefined = process.env.NEXT_PUBLIC_API_KEY;

    if(!SUPABASE_URL || !API_KEY){
        console.error("url",SUPABASE_URL);
        console.error("APIキー",API_KEY);
        return NextResponse.json({"msg":"環境変数が正しく設定されていません。"},{status:500});
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
        image_bucketss,
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
    .eq("service_id",serviceId);

    //クエリ実行
    const servicesQueryRes:any = await servicesQuery;
    const servicesQueryData:any = servicesQueryRes.data;
    const servicesQueryError:any = servicesQueryRes.error;

    if(servicesQueryError){
        console.error(servicesQueryError);
        return NextResponse.json({"msg":"退職サービスの取得に失敗しました"},{status:500});
    }

    if(0 === servicesQueryData.length){
        console.error("対象の退職代行サービスが存在しません");
        return NextResponse.json({"msg":"対象の退職代行サービスが存在しません"},{status:500});
    }

    if(1 < servicesQueryData.length){
        console.error("テーブル定義が不正です");
        return NextResponse.json({"msg":"テーブル定義が不正です"},{status:500});
    }

    let serviceQueryData = servicesQueryData[0];
    const contactInformationNames:string[] = [];
    for(let serviceManagement of serviceQueryData.service_managements){
        let contactInformationName = serviceManagement.contact_information.contact_information_name;
        contactInformationNames.push(contactInformationName);
    }

    //ストレージから画像取得
    const { data } = supabase.storage.from('images').getPublicUrl(serviceQueryData.image_file_path);

    let service:Service = {
        serviceId:serviceQueryData.service_id,
        serviceName:serviceQueryData.service_name,
        price:serviceQueryData.price,
        managementName:serviceQueryData.managements.management_name,
        contactInformationNames:contactInformationNames,
        freeConsultation:serviceQueryData.free_consultation,
        guaranteeSystem:serviceQueryData.guaranteeSystem,
        freeGift:serviceQueryData.freeGift,
        hourService:serviceQueryData.hourService,
        imgUrl:data.publicUrl
    }
    return NextResponse.json({"service":service});

}