import { ServiceResponse } from "@/constants/api/response/serviceResponse";
import prisma from "@/libs/prisma/prismaClient";
import supabase from "@/libs/supabase/supabaseClient";
import validate from "@/utils/api/validate/service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service:
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
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    const serviceId: string | null = params.get("serviceId");

    //バリデーションチェック
    let validateError = validate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    const SUPABASE_URL: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const API_KEY: string | undefined = process.env.NEXT_PUBLIC_API_KEY;

    if (!SUPABASE_URL || !API_KEY) {
        console.error("url", SUPABASE_URL);
        console.error("APIキー", API_KEY);
        return NextResponse.json({ "msg": "環境変数が正しく設定されていません。" }, { status: 500 });
    }

    let service;

    try {
        service = await prisma.services.findUnique({
            select: {
                service_id: true,
                service_name: true,
                price: true,
                free_consultation: true,
                guarantee_system: true,
                free_gift: true,
                hour_service: true,
                image_file_path: true,
                image_bucketss: true,
                official_website: true,
                managements: {
                    select: {
                        management_id: true,
                        management_name: true
                    }
                },
                service_managements: {
                    select: {
                        contact_information_id: true
                    }
                }
            },
            where: {
                service_id: serviceId ? serviceId : ""
            }
        });
    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("退職サービス詳細情報の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "退職サービス詳細情報の取得に失敗しました" }, { status: 400 });
    }

    if (!service) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("サービスIDに紐づく退職サービス詳細情報が存在しません。");
        return NextResponse.json({ "msg": "サービスIDに紐づく退職サービス詳細情報が存在しません。" }, { status: 400 });
    }

    let contactInformations;
    let contactInformationMap: Map<string, string> = new Map();
    const managementId = service.managements.management_id;
    try {
        contactInformations = await prisma.contact_information.findMany({
            select: {
                contact_information_id: true,
                contact_information_name: true
            }
        });

        for (let contactInformation of contactInformations) {
            contactInformationMap.set(contactInformation.contact_information_id, contactInformation.contact_information_name);
        }

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ "msg": "連絡先取得に失敗しました" }, { status: 400 });
    }

    let contactInformationNames: string = "";
    const serviceManagements = service.service_managements;
    const serviceManagementsLength: number = serviceManagements.length;

    for (let i = 0; i < serviceManagementsLength; i++) {
        let serviceManagement = serviceManagements[i];
        let contactInformationName = contactInformationMap.get(serviceManagement.contact_information_id);
        contactInformationNames += contactInformationName;
        if (i !== serviceManagementsLength - 1) {
            contactInformationNames += ",";
        }
    }

    if (!contactInformationNames) contactInformationNames = "なし";

    let imgData: any;
    try {
        //ストレージから画像取得
        const res: any = supabase.storage.from('images').getPublicUrl(service.image_file_path);
        imgData = res.data;
    } catch (error: any) {
        console.error(serviceId, "画像取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "画像取得に失敗しました" }, { status: 400 });
    }


    let freeConsultation: string = service.free_consultation ? "あり" : "なし";
    let guaranteeSystem: string = service.guarantee_system ? "あり" : "なし";
    let freeGift: string = service.free_gift ? "あり" : "なし";
    let hourService: string = service.hour_service ? "あり" : "なし";

    let serviceResponse: ServiceResponse = {
        serviceName: service.service_name,
        price: service.price,
        managementName: service.managements.management_name,
        contactInformationNames: contactInformationNames,
        freeConsultation: freeConsultation,
        guaranteeSystem: guaranteeSystem,
        freeGift: freeGift,
        hourService: hourService,
    }

    return NextResponse.json(
        {
            "service": serviceResponse,
            "serviceId": serviceId,
            "imgUrl": imgData.publicUrl,
            "officialWebsite": service.official_website
        }
    );

}