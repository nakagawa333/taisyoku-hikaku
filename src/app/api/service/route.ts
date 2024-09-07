import { ServiceResponse } from "@/constants/api/response/serviceResponse";
import { fetchUniqueService } from "@/hooks/prisma/services/fetchUniqueService";
import { avgReviews } from "@/hooks/prisma/services/reviews/avgReviews";
import { getStoragePublicUrl } from "@/hooks/supabase/storage/images/getStoragePublicUrl";
import { DataPublicUrl } from "@/types/common/supabase/dataPublicUrl";
import validate from "@/utils/api/validate/service";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/service:
 *   get:
 *     summary: 退職代行サービス取得API
 *     description: 退職代行サービス取得
 *     parameters:
 *      - in: query
 *        name: serviceId
 *        schema:
 *           type: string
 *        required: true
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
    const serviceId: string = params.get("serviceId") ?? "";

    //バリデーションチェック
    let validateError = validate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let service: any;

    try {
        const query: Prisma.servicesFindUniqueArgs<DefaultArgs> = {
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
                service_contact_information: {
                    select: {
                        contact_information_id: true,
                        contact_information: {
                            select: {
                                contact_information_name: true
                            }
                        }
                    }
                },
                service_tags: {
                    select: {
                        tag_id: true,
                        tags: {
                            select: {
                                tag_name: true
                            }
                        }
                    }
                }
            },
            where: {
                service_id: serviceId
            },
        }

        service = await fetchUniqueService(query);

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

    //連絡先
    let contactInformationNames: string = "";

    const serviceContactInformation = service.service_contact_information;
    if (Array.isArray(serviceContactInformation)) {
        const serviceContactInformationLength: number = serviceContactInformation.length;

        for (let i = 0; i < serviceContactInformationLength; i++) {
            const contactInformationName = serviceContactInformation[i].contact_information.contact_information_name;
            contactInformationNames += contactInformationName;
            if (i !== serviceContactInformationLength - 1) {
                contactInformationNames += ",";
            }
        }
    }

    if (!contactInformationNames) contactInformationNames = "なし";

    //タグ
    let tags = [];
    for (let serviceTag of service.service_tags) {
        tags.push({
            tagName: serviceTag.tags.tag_name
        })
    }

    //平均点
    let avgRating: number | null = null;
    //サービスの平均点取得
    try {
        const query: Prisma.ReviewsAggregateArgs = {
            _avg: {
                rating: true
            },
            where: {
                service_id: serviceId
            }
        }

        const res = await avgReviews(query);
        if (res._avg?.rating) {
            avgRating = Math.floor(res._avg.rating * 100) / 100;
        }

    } catch (error: any) {
        console.error("取得失敗時のサービスID", serviceId);
        console.error("サービスの平均点取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "サービスの平均点取得に失敗しました" }, { status: 400 });
    }

    let publicUrl: string;
    try {
        //ストレージから画像取得
        const res: DataPublicUrl = getStoragePublicUrl("images", service.image_file_path);
        publicUrl = res.data.publicUrl;
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
        serviceId: serviceId,
        imgUrl: publicUrl,
        officialWebsite: service.official_website
    }

    return NextResponse.json(
        {
            "service": serviceResponse,
            "tags": tags,
            "avgRating": avgRating
        }
    );
}