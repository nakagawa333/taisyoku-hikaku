import { ServicesResponse } from "@/constants/api/response/ServicesResponse";
import { Tags } from "@/constants/common/tags";
import { Take } from "@/constants/db/take";
import { fetchServices } from "@/hooks/prisma/services/fetchServices";
import { fetchTags } from "@/hooks/prisma/tags/fetchTags";
import { getStoragePublicUrl } from "@/hooks/supabase/storage/images/getStoragePublicUrl";
import validate from "@/utils/api/validate/services";
import { NextRequest, NextResponse } from "next/server";

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
export async function GET(request: NextRequest): Promise<NextResponse> {
    const params: URLSearchParams = request.nextUrl.searchParams;

    const minPrice: string | null = params.get("minPrice");
    const maxPrice: string | null = params.get("maxPrice");

    //料金の大小チェック
    if (minPrice && maxPrice) {
        //バリデーションチェック
        let validateError = validate(Number(minPrice), Number(maxPrice));
        if (validateError) return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });
    }

    const fieldMap = new Map([
        ["minPrice", { field: "price", type: "string" }],
        ["maxPrice", { field: "price", type: "string" }],
        ["freeConsultation", { field: "free_consultation", type: "boolean" }],
        ["guaranteeSystem", { field: "guarantee_system", type: "boolean" }],
        ["freeGift", { field: "free_gift", type: "boolean" }],
        ["hourService", { field: "hour_service", type: "boolean" }],
        ["managements", { field: "management_id", type: "array" }],
        ["contactInformations", { field: "contact_information_id", type: "array" }]
    ]);

    const andConditions = [];
    const orConditions = [];

    const priceConditions: any = {
        price: {}
    }

    for (let key of params.keys()) {
        let value = fieldMap.get(key);
        let param = params.get(key);
        if (value !== undefined && param !== null) {
            let type = value.type;
            let field = value.field;
            if (type === "boolean" && (param === "true" || param === "false")) {
                let bool = param === "true";
                const condition: any = {};
                condition[field] = bool;
                andConditions.push(condition);
            } else if (type === "array") {
                let values = param.split(",");
                for (let value of values) {
                    if (field === "contact_information_id") {
                        const condition: any = {
                            "service_contact_information": {
                                "some": {
                                    "contact_information": {

                                    }
                                }
                            }
                        };

                        condition["service_contact_information"]["some"]["contact_information"]["contact_information_id"] = value;
                        orConditions.push(condition);
                    } else {
                        const condition: any = {};
                        condition[field] = value;
                        orConditions.push(condition);
                    }

                }
            }

            if (key === "minPrice") {
                priceConditions["price"]["gte"] = Number(param);
            } else if (key === "maxPrice") {
                priceConditions["price"]["lte"] = Number(param);
            }
        }
    }

    if (0 < Object.keys(priceConditions.price).length) {
        andConditions.push(priceConditions);
    }

    let orderBy: any = {
        id: "asc"
    }

    const take: number = Take.SERVICES;
    let skip: number = 0;

    if (params.has("p")) {
        let page = Number(params.get("p"));
        skip = (page - 1) * take;
    }

    let query: any = {
        select: {
            service_id: true,
            service_name: true,
            image_file_path: true,
            image_bucketss: true,
            service_tags: {
                select: {
                    tag_id: true
                }
            }
        },
        orderBy: orderBy,
        take: take,
        skip: skip
    }

    const where: any = {}
    let hasWhereQuery: boolean = false;

    if (Array.isArray(orConditions) && 0 < orConditions.length) {
        where["OR"] = orConditions;
        hasWhereQuery = true;
    }

    if (Array.isArray(andConditions) && 0 < andConditions.length) {
        where["AND"] = andConditions;
        hasWhereQuery = true;
    }

    if (hasWhereQuery) {
        query["where"] = where;
    }

    let services: any;
    try {
        services = await fetchServices(query);

    } catch (error: any) {
        console.error(`検索条件: ${where}`)
        console.error("退職サービス一覧情報の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "退職サービス一覧情報の取得に失敗しました" }, { status: 500 });
    }

    let tags: any;
    let tagsQuery: any = {
        select: {
            tag_id: true,
            tag_name: true
        }
    }

    try {
        tags = await fetchTags(tagsQuery);
    } catch (error: any) {
        console.error("タグ覧情報の取得に失敗しました");
        console.error(error);
        return NextResponse.json({ "msg": "退職サービス一覧情報の取得に失敗しました" }, { status: 500 });
    }

    const tagsMap = new Map();
    for (let tag of tags) {
        tagsMap.set(tag.tag_id, tag.tag_name)
    }

    const servicesResponses: ServicesResponse[] = [];
    for (let service of services) {
        let publicUrl: string = "";
        try {
            const { data } = getStoragePublicUrl('images', service.image_file_path);
            publicUrl = data.publicUrl;
        } catch (error: any) {
            console.error(error);
            console.error(`サービスID名${service.service_id}の画像取得に失敗しました`);
        }

        let tags: Tags[] = [];

        for (let tag of service.service_tags) {

            const tagId = tag.tag_id;
            const tagName = tagsMap.get(tagId);
            tags.push({
                tagId: tagId,
                tagName: tagName
            });
        }

        const servicesResponse: ServicesResponse = {
            serviceId: service.service_id,
            serviceName: service.service_name,
            imgUrl: publicUrl,
            tags: tags
        }
        servicesResponses.push(servicesResponse);
    }

    return NextResponse.json({ "services": servicesResponses });
}