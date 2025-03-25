import { SimilarServicesResponse, Tag } from "@/constants/api/response/similarServicesResponse";
import { fetchServices } from "@/hooks/prisma/services/fetchServices";
import { fetchSimilarServices } from "@/hooks/prisma/similarServices/fetchSimilarServices";
import { getStoragePublicUrl } from "@/hooks/supabase/storage/images/getStoragePublicUrl";
import validate from "@/utils/api/validate/similarServices";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/similar/services:
 *   get:
 *     summary: 類似退職代行取得一覧API
 *     description: 類似退職代行取得一覧API
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:
 *         description: 類似退職サービス一覧情報取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;
    const serviceId: string | null = params.get("serviceId");

    //バリデーションチェック
    let validateError = validate(serviceId);
    if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });

    let similarServices;

    let similarServicesQuery = {
        select: {
            similar_service_id: true,
        },
        where: {
            service_id: serviceId
        }
    };

    try {
        similarServices = await fetchSimilarServices(similarServicesQuery);
    } catch (error: any) {
        console.error("類似退職代行サービスの取得失敗時のサービスID", serviceId);
        console.error(error);
        console.error("類似退職代行サービスの取得に失敗しました");
        return NextResponse.json({ "msg": "類似退職代行サービスの取得に失敗しました" }, { status: 400 });
    }

    //取得件数が0件の場合
    if (!Array.isArray(similarServices) || 0 === similarServices.length) {
        return NextResponse.json(
            {
                similarServices: []
            }
        );
    }

    let services;
    let servicesQuery = {
        select: {
            service_id: true,
            service_name: true,
            image_file_path: true,
            image_bucketss: true,
            service_tags: {
                select: {
                    tags: {
                        select: {
                            tag_id: true,
                            tag_name: true
                        }
                    }
                }
            }
        },
    };

    try {
        services = await fetchServices(servicesQuery);
    } catch (error: any) {
        console.error(error);
        console.error("退職代行サービスの取得に失敗しました");
        return NextResponse.json({ "msg": "退職代行サービスの取得に失敗しました" }, { status: 400 });
    }

    const servicesMap: Map<string, any> = new Map();
    for (let service of services) {
        servicesMap.set(service.service_id, service);
    }

    const similarServicesResponses: SimilarServicesResponse[] = [];

    for (let similarService of similarServices) {
        const similarServiceId: string = similarService.similar_service_id;
        const service: any | undefined = servicesMap.get(similarServiceId);

        if (service !== undefined) {
            let publicUrl: string = "";

            try {
                const { data } = getStoragePublicUrl('images', service.image_file_path);
                publicUrl = data.publicUrl;
            } catch (error: any) {
                console.error(error);
                console.error(`サービスID名${service.service_id}の画像取得に失敗しました`);
            }

            let tags: Tag[] = [];
            const serviceTags = service.service_tags;
            if (Array.isArray(serviceTags)) {
                tags = serviceTags.map((serviceTag) => {
                    return {
                        tagId: serviceTag?.tags?.tag_id,
                        tagName: serviceTag?.tags?.tag_name
                    }
                })
            }

            const similarServicesResponse: SimilarServicesResponse = {
                similarServiceId: similarService.similar_service_id,
                similarServiceName: service.service_name,
                imgUrl: publicUrl,
                tags: tags
            }
            similarServicesResponses.push(similarServicesResponse);
        }
    }

    return NextResponse.json(
        {
            similarServices: similarServicesResponses
        }
    );
}
