import { fetchRankingServices } from "@/hooks/prisma/ranking/services/fetchRankingServices";
import { fetchServices } from "@/hooks/prisma/services/fetchServices";
import { fetchReviews } from "@/hooks/prisma/services/reviews/fetchReviews";
import { getStoragePublicUrl } from "@/hooks/supabase/storage/images/getStoragePublicUrl";
import { DataPublicUrl } from "@/types/common/supabase/dataPublicUrl";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
                }
            }
        }
        rankServices = await fetchRankingServices(query);
    } catch (ex: any) {
        return NextResponse.json({ "msg": "退職サービス詳細情報の取得に失敗しました" }, { status: 400 });
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
                        service_id: service.service_id
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

    const rankingServices = [...servicesWithScore].sort((serviceA, serviceB) => {
        return serviceB.score - serviceA.score;
    });

    const resServices = rankingServices.map((rankingService) => {
        const services = rankingService.services;
        const serviceTags = services.service_tags.map((serviceTag: any) => {
            return {
                tagId: serviceTag.tag_id,
                tagName: serviceTag.tags.tag_name
            }
        });

        return {
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
    //TODO 評価を判定する加重平均の処理を実装

    return NextResponse.json({
        services: resServices
    });
}

/**
 * @swagger
 * /api/ranking/services:
 *   get:
 *     summary: 退職代行サービス ランキング取得API
 *     description: 退職代行サービス ランキング取得
 *     parameters:
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス ランキング取得取得失敗時のレスポンス
 */
export async function POST(request: NextRequest) {
    let services: any;
    try {
        const query: Prisma.servicesFindManyArgs<DefaultArgs> = {
            select: {
                service_id: true,
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
        }

        services = await fetchServices(query);
    } catch (ex: any) {
        return NextResponse.json({ "msg": "退職サービス詳細情報の取得に失敗しました" }, { status: 400 });
    }

    if (Array.isArray(services)) {
        for (let service of services) {
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
                        service_id: service.service_id
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
        }
    }

    //全サービスの平均評価
    const serviceAvg: number = services.reduce((sum: number, service: any) => sum + service.comprehensiveEvaluationAvg, 0) / services.length;

    // 各サービスのスコアを計算（加重平均）
    const servicesWithScore = services.map((service: any) => {
        const score = (service.comprehensiveEvaluationAvg * (service.reviewCount + serviceAvg) * 10) / (service.reviewCount + 10);
        return { ...service, score };
    });

    const rankingServices = [...servicesWithScore].sort((serviceA, serviceB) => {
        return serviceB.score - serviceA.score;
    });

    const resServices = rankingServices.map((rankingService) => {

        const serviceTags = rankingService.service_tags.map((serviceTag: any) => {
            return {
                tagId: serviceTag.tag_id,
                tagName: serviceTag.tags.tag_name
            }
        });

        return {
            serviceId: rankingService.service_id,
            serviceName: rankingService.service_name,
            hourService: rankingService.hour_service,
            officialWebsite: rankingService.official_website,
            serviceTags: serviceTags,
            imgUrl: rankingService.imgUrl,
            comprehensiveEvaluationAvg: rankingService.comprehensiveEvaluationAvg,
            reviewCount: rankingService.reviewCount,
            goodTitle: rankingService.goodTitle,
            concernTitle: rankingService.concernTitle
        }
    });
    //TODO 評価を判定する加重平均の処理を実装

    return NextResponse.json({
        services: resServices
    });
}