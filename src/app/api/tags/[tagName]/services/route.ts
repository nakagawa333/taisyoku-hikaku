import { Take } from "@/constants/db/take";
import { fetchRankingServices } from "@/hooks/prisma/ranking/services/fetchRankingServices";
import { fetchReviews } from "@/hooks/prisma/services/reviews/fetchReviews";
import { fetchServiceTags } from "@/hooks/prisma/serviceTags/fetchServiceTags";
import { getStoragePublicUrl } from "@/hooks/supabase/storage/images/getStoragePublicUrl";
import { DataPublicUrl } from "@/types/common/supabase/dataPublicUrl";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
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

    const params: URLSearchParams = request.nextUrl.searchParams;

    const take: number = Take.SERVICES;
    let skip: number = 0;
    if (params.has("p")) {
        let page = Number(params.get("p"));
        skip = (page - 1) * take;
    }

    let tagsOfServices: any;

    try {
        const query = {
            select: {
                services: {
                    select: {
                        service_id: true,
                        service_name: true,
                        image_file_path: true,
                        official_website: true,
                    }
                }
            },
            where: {
                tags: {
                    tag_name: tagName
                }
            },
            take: take,
            skip: skip,
            orderBy: {
                id: "asc"
            }
        }
        tagsOfServices = await fetchServiceTags(query);

    } catch (error: any) {
        console.error(error);
        console.error("タグ関連退職サービス情報の取得に失敗しました");
        return NextResponse.json(
            { "msg": 'タグ関連退職サービス情報の取得に失敗しました' }, { status: 500 }
        );
    }

    if (!Array.isArray(tagsOfServices) && 0 < tagsOfServices.length) {
        return NextResponse.json(
            {
                tagsOfServicesResponse: [],
            }
        );
    }

    const serviceIds: string[] = tagsOfServices.map((tagsOfService: any) => {
        return tagsOfService.services.service_id
    })

    let serviceTags: any;

    let rankServices: any;
    try {
        const query: Prisma.ranking_servicesFindManyArgs = {
            select: {
                service_id: true,
                rank: true,
                services: {
                    select: {
                        service_name: true,
                        hour_service: true,
                        image_file_path: true,
                        official_website: true,
                        image_bucketss: true,
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
                    }
                },
            },

            where: {
                service_id: {
                    in: serviceIds
                }
            },
            take: take,
            skip: skip,
            orderBy: {
                id: "asc"
            }
        }

        rankServices = await fetchRankingServices(query);

    } catch (error: any) {
        console.error(error);
        console.error("タグ一覧の取得に失敗しました");
        return NextResponse.json(
            { "msg": 'タグ一覧の取得に失敗しました' }, { status: 500 }
        );
    }

    if (Array.isArray(rankServices)) {
        for (let rankService of rankServices) {
            const service = rankService.services;
            const res: DataPublicUrl = getStoragePublicUrl("images", service.image_file_path);
            const publicUrl = res.data.publicUrl;
            service["imgUrl"] = publicUrl;

            let reviews: any;

            try {
                const query: Prisma.reviewsFindManyArgs<DefaultArgs> = {
                    select: {
                        good_title: true,
                        concern_title: true,
                        reviews_satisfaction_scores: {
                            select: {
                                comprehensive_evaluation: true
                            }
                        }
                    },
                    where: {
                        service_id: rankService.service_id
                    }
                }
                reviews = await fetchReviews(query);
            } catch (ex: any) {
                console.error(ex);
            }

            // レビューがあれば、評価の平均値を計算
            let comprehensiveEvaluationAvg: number = 0;
            if (Array.isArray(reviews) && reviews.length > 0) {
                const totalEvaluation = reviews.reduce((sum, review) =>
                    sum + (Number(review?.reviews_satisfaction_scores?.comprehensive_evaluation) || 0), 0);

                // 平均スコアを計算
                comprehensiveEvaluationAvg = Math.floor((totalEvaluation / reviews.length) * 100) / 100;
            }

            // サービスに評価とレビュー数を追加
            service.comprehensiveEvaluationAvg = comprehensiveEvaluationAvg;
            service.reviewCount = reviews.length;

            if (Array.isArray(reviews) && 0 < reviews.length) {
                service.goodTitle = reviews[0].good_title;
                service.concernTitle = reviews[0].concern_title;
            }

            rankService.services = service;
        }
    }

    //全サービスの平均評価
    const serviceAvg: number = rankServices.reduce((sum: number, service: any) => sum + service.services.comprehensiveEvaluationAvg, 0) / rankServices.length;
    // 各サービスのスコアを計算（加重平均）
    const servicesWithScore = rankServices.map((service: any) => {
        const score = (service.services.comprehensiveEvaluationAvg * (service.services.reviewCount + serviceAvg) * 10) / (service.services.reviewCount + 10);
        return { ...service, score };
    });

    const rankingServices = [...servicesWithScore];

    const resServices = rankingServices.map((rankingService) => {
        const services = rankingService.services;
        const serviceTags = services.service_tags.map((serviceTag: any) => {
            return {
                tagId: serviceTag.tag_id,
                tagName: serviceTag.tags.tag_name
            }
        });

        return {
            rank: rankingService.rank,
            serviceId: rankingService.service_id,
            serviceName: services.service_name,
            hourService: services.hour_service,
            officialWebsite: services.official_website,
            serviceTags: serviceTags,
            imgUrl: services.imgUrl,
            comprehensiveEvaluationAvg: services.comprehensiveEvaluationAvg,
            reviewCount: services.reviewCount,
            goodTitle: services.goodTitle,
            concernTitle: services.concernTitle
        }
    });

    return NextResponse.json(
        {
            services: resServices,
        }
    );
}