import { fetchServiceTags } from "@/hooks/prisma/serviceTags/fetchServiceTags";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/tags/{tagName}/services:
 *   get:
 *     summary: タグ関連退職サービス一覧取得API
 *     description: タグ関連退職サービス一覧取得API
 *     parameters:
 *      - in: path
 *        name: tagName
 *        schema:
 *           type: string
 *        required: true
 *        description: タグ名
 * 
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 * 　　　500:   
 *         description: タグ関連退職サービス一覧取得失敗時のレスポンス
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const url = new URL(request.url);
    const pathname: string = url.pathname;
    const splitPathName: string[] = pathname.split("/");
    //タグ名
    const tagName: string = decodeURIComponent(splitPathName[splitPathName.length - 2]);

    let tagsOfServices: any;

    //TODO エラー発生時、エラーレスポンス返却
    try {
        const query = {
            select: {
                services: {
                    select: {
                        service_id: true,
                        service_name: true,
                    }
                }
            },
            where: {
                tags: {
                    tag_name: tagName
                }
            }
        }
        tagsOfServices = await fetchServiceTags(query);

    } catch (error: any) {
        console.error(error);
        console.error("タグ関連退職サービス情報の取得に失敗しました");
    }

    if (!Array.isArray(tagsOfServices) && 0 < tagsOfServices.length) {
        return NextResponse.json(
            {
                tagsOfServices: tagsOfServices
            }
        );
    }

    const serviceIds: string[] = tagsOfServices.map((tagsOfService: any) => {
        return tagsOfService.services.service_id
    })

    let serviceTags: any;
    try {
        const query = {
            select: {
                tag_id: true,
                service_id: true,
                tags: {
                    select: {
                        tag_name: true
                    }
                }
            },

            where: {
                service_id: {
                    in: serviceIds
                }
            }
        }
        serviceTags = await fetchServiceTags(query);

    } catch (error: any) {
        console.error(error);
        console.error("タグ一覧の取得に失敗しました");
    }

    const serviceTagsMap = new Map();
    for (let serviceTag of serviceTags) {
        const serviceId = serviceTag.service_id;
        const serviceTagsValues = serviceTagsMap.get(serviceId);
        if (serviceTagsValues) {
            serviceTagsValues.push({
                tagId: serviceTag.tag_id,
                tagName: serviceTag.tags.tag_name
            });
            serviceTagsMap.set(serviceId, serviceTagsValues);
        } else {
            serviceTagsMap.set(serviceId, [{
                tagId: serviceTag.tag_id,
                tagName: serviceTag.tags.tag_name
            }])
        }
    }

    const tagsOfServicesResponse: any[] = [];

    //TODO 画像取得処理実装
    for (let tagsOfService of tagsOfServices) {
        const serviceId = tagsOfService.services.service_id;
        const serviceName = tagsOfService.services.service_name;
        const tags: any[] = serviceTagsMap.get(serviceId);
        tagsOfServicesResponse.push({
            serviceId: serviceId,
            serviceName: serviceName,
            tags: tags
        })
    }

    return NextResponse.json(
        {
            tagsOfServicesResponse: tagsOfServicesResponse,
        }
    );
}