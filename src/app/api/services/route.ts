import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'
import { Service } from "@/types/service";
import { TableNames } from "@/constants/db/tableName";
import validate from "@/utils/api/validate/services";
import prisma from "@/libs/prisma/prismaClient";
import { ServicesResponse } from "@/constants/api/response/ServicesResponse";
import supabase from "@/libs/supabase/supabaseClient";

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

    const minPrice:string | null = params.get("minPrice");
    const maxPrice:string | null = params.get("maxPrice");

    //料金の大小チェック
    if(minPrice && maxPrice){
        //バリデーションチェック
        let validateError = validate(Number(minPrice),Number(maxPrice));
        if(validateError) return NextResponse.json({"msg":validateError.details[0].message},{status:400});
    }

    const fieldMap = new Map([
        ["minPrice", {field: "price", type: "string"}],
        ["maxPrice", {field: "price", type: "string"}],
        ["freeConsultation", {field: "free_consultation", type: "boolean"}],
        ["guaranteeSystem", {field: "guarantee_system", type: "boolean"}],
        ["freeGift", {field: "free_gift", type: "boolean"}],
        ["hourService", {field: "hour_service", type: "boolean"}],
        ["managements", {field: "management_id", type: "array"}],
        ["contactInformations", {field: "contact_information_id", type: "array"}]
    ]);

    const andConditions = [];
    const orConditions = [];

    const priceConditions:any = {
        price:{}
    }

    for(let key of params.keys()){
        let value = fieldMap.get(key);
        let param = params.get(key);
        if (value !== undefined && param !== null) {
            let type = value.type;
            let field = value.field;
            if (type === "boolean" && (param === "true" || param === "false")) {
                let bool = param === "true";
                const condition:any = {};
                condition[field] = bool;
                andConditions.push(condition);
            } else if (type === "array") {
                let values = param.split(",");
                for(let value of values){
                    if(field === "contact_information_id"){
                        const condition:any = {
                            "service_managements":{
                                "some":{
                                    "contact_information":{

                                    }
                                }
                            }
                        };

                        condition["service_managements"]["some"]["contact_information"]["contact_information_id"] = value;
                        orConditions.push(condition);
                    } else {
                        const condition:any = {};
                        condition[field] = value;
                        orConditions.push(condition);
                    }

                }
            }

            if(key === "minPrice"){
                priceConditions["price"]["gte"] = Number(param);
            } else if(key === "maxPrice"){
                priceConditions["price"]["lte"] = Number(param);
            }
        }
    }

    if(0 < Object.keys(priceConditions.price).length){
        andConditions.push(priceConditions);
    }

    const where:any = {}

    if(Array.isArray(orConditions) && 0 < orConditions.length){
        where["OR"] = orConditions;
    }

    if(Array.isArray(andConditions) && 0 < andConditions.length){
        where["AND"] = andConditions;
    }

    let services;
    try{
        services = await prisma.services.findMany({
            select: {
                service_id:true,
                service_name:true,
                image_file_path:true,
                image_bucketss:true
            },
            where:where
        });

    } catch(error:any){
        console.error(`検索条件: ${where}`)
        console.error("退職サービス一覧情報の取得に失敗しました");
        console.error(error);
        return NextResponse.json({"msg":"退職サービス一覧情報の取得に失敗しました"},{status:500});
    }

    const servicesResponses:ServicesResponse[] = [];
    for(let service of services){
        let publicUrl:string = "";
        try{
            const { data } = supabase.storage.from('images').getPublicUrl(service.image_file_path);
            publicUrl = data.publicUrl;
        } catch(error:any){
            console.error(error);
            console.error(`サービスID名${service.service_id}の画像取得に失敗しました`);
        }

        const servicesResponse:ServicesResponse = {
            serviceId: service.service_id,
            serviceName: service.service_name,
            imgUrl: publicUrl
        }
        servicesResponses.push(servicesResponse);
    }

    return NextResponse.json({"services":servicesResponses});
}