import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { Service } from "@/types/service";

/**
 * @swagger
 * /api/services:
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

    const fieldMap = new Map([
        ["serviceName", {field: "service_name", type: "string"}],
        ["freeConsultation", {field: "free_consultation", type: "boolean"}],
        ["guaranteeSystem", {field: "guarantee_system", type: "boolean"}],
        ["freeGift", {field: "free_gift", type: "boolean"}],
        ["hourService", {field: "hour_service", type: "boolean"}],
        ["managementId", {field: "management_id", type: "array"}],
        ["contactInformationId", {field: "contact_information_id", type: "array"}]
    ]);

    for (let [param, {field, type}] of fieldMap) {
        if (params.has(param)) {
            let value = params.get(param);
            if (value !== null) {
                if (type === "string") {
                    //サービス名のみLIKE検索
                    if(param === "serviceName"){
                        servicesQuery = servicesQuery.like(field, `%${value}%`);
                    } else {
                        servicesQuery = servicesQuery.eq(field, value);
                    }
                } else if (type === "boolean" && (value === "true" || value === "false")) {
                    let bool = value === "true";
                    servicesQuery = servicesQuery.eq(field, bool);
                } else if (type === "array") {
                    let values = value.split(",");
                    servicesQuery = servicesQuery.in(field, values);
                }
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

    const services:Service[] = [];
    for(let servicesQuery of servicesQueryData){
        const contactInformationNames:string[] = [];
        for(let serviceManagement of servicesQuery.service_managements){
            let contactInformationName = serviceManagement.contact_information.contact_information_name;
            contactInformationNames.push(contactInformationName);
        }

        const { data } = supabase.storage.from('images').getPublicUrl(servicesQuery.image_file_path);

        let service:Service = {
            serviceId:servicesQuery.service_id,
            serviceName:servicesQuery.service_name,
            price:servicesQuery.price,
            managementName:servicesQuery.managements.management_name,
            contactInformationNames:contactInformationNames,
            freeConsultation:servicesQuery.free_consultation,
            guaranteeSystem:servicesQuery.guaranteeSystem,
            freeGift:servicesQuery.freeGift,
            hourService:servicesQuery.hourService,
            imgUrl:data.publicUrl
        }
        services.push(service);
    }

    return NextResponse.json({"services":services});
}