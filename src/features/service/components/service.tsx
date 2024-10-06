"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import OfficialWebsiteButton from "@/components/OfficialWebsiteButton";
import Pagination from "@/components/pagination";
import PartialLoading from "@/components/partialLoading";
import PromotionMessage from "@/components/promotionMessage";
import Snackbar from "@/components/snackbar";
import SimilarServicesSwiper from "@/components/swiper";
import { Tag } from "@/components/tag";
import { ServiceResponse, TagsResponse } from "@/constants/api/response/serviceResponse";
import { Paths } from "@/constants/common/paths";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { useService } from "@/hooks/reactQuery/service";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { useQueryClient } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import PostReview from "./postReview";
import ProgressReview from "./progressReview";
import Reviews from "./reviews";

export default function Service() {
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
    const pathname = usePathname();
    let pathnameSplit = pathname?.split("/");
    //パス
    const path: string = pathname !== null ? pathname : "";

    const queryClient = useQueryClient();
    let id: string = "";
    if (pathnameSplit) {
        id = pathnameSplit[pathnameSplit?.length - 1];
    }

    const [page, setPage] = useState("1");
    const [params, setParams] = useState("?");
    const [currentPage, setCurrentPage] = useState(1);

    const [{ fetchService, fetchSimilarServices }] = useService();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const [postReviewData, setPostReviewData] = useState<any>({
        reviewCharacterCount: 0,
        name: "",
        reviewRating: 5,
        gender: "MEN",
        title: "",
        review: "",
    });

    const [snackbarData, setSnackbarData] = useState<any>({
        state: "",
        message: "",
        time: 0,
        isOpen: false
    })

    const router: AppRouterInstance = useRouter();
    const resService = fetchService(id);
    const serviceData: any = resService.data;
    const service: ServiceResponse | null = serviceData?.service;
    const tags: TagsResponse[] | null = serviceData?.tags;
    const serviceIsLoading: boolean = resService.isLoading;
    const servicesIsError: boolean = resService.isError;
    const servicesIsFetchedAfterMount: boolean = resService.isFetchedAfterMount;

    const resSimilarServices = fetchSimilarServices(id);
    const similarServicesData: any = resSimilarServices.data;
    const similarServicesIsLoading: boolean = resSimilarServices.isLoading;
    const similarServicesIsError: boolean = resSimilarServices.isError;
    const similarServicesIsFetchedAfterMount: boolean = resSimilarServices.isFetchedAfterMount;

    const [{ fetchReviews, fetchReviewsMetaData, createReview }] = useQueryReviews();

    const resReviewsMetaData = fetchReviewsMetaData(id);
    const reviewsMetaDataData: any = resReviewsMetaData.data;
    const reviewsMetaDataIsLoading: boolean = resReviewsMetaData.isLoading;
    const reviewsMetaDataIsError: boolean = resReviewsMetaData.isError;
    const reviewsMetaDataIsAfterMount: boolean = resReviewsMetaData.isFetchedAfterMount;

    const reviewWithArgs = createReview();

    useEffect(() => {
        let params: string = "?";
        if (searchParams !== null) {
            for (const [key, value] of searchParams) {
                if (key === "p" && value !== page) {
                    if (value !== page) {
                        setPage(value);
                        setCurrentPage(Number(value));
                    }
                } else {
                    params += `${key}=${value}&`;
                    setParams(params);
                }
            }
        }

    }, [searchParams])

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWS] });
    }, [page])

    if (serviceIsLoading || similarServicesIsLoading || reviewsMetaDataIsLoading
        || !servicesIsFetchedAfterMount || !similarServicesIsFetchedAfterMount ||
        !reviewsMetaDataIsAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (servicesIsError || similarServicesIsError || reviewsMetaDataIsError) {
        return (
            <div className="container m-auto min-h-screen">
                <ErrorSnackbar
                    message="エラーが発生しました"
                    time={5000}
                />
            </div>
        )
    }

    if (servicesIsFetchedAfterMount && serviceData?.service) {
        const isExistBreadcrumbsId = breadcrumbs.some((breadcrumb: Breadcrumb) => breadcrumb.path === `/${id}`);
        if (!isExistBreadcrumbsId) {
            const breadcrumbs: Breadcrumb[] = [
                { path: "/", breadcrumb: "ホーム" },
                { path: "/services", breadcrumb: "サービス" }
            ]

            breadcrumbs.push({
                path: `/${id}`,
                breadcrumb: serviceData.service.serviceName
            })
            setBreadcrumbs(breadcrumbs);
        }
    }

    /**
     * タグ名クリック時処理
     * @param tagName タグ名
     */
    const tagNameClick = (tagName: string) => {
        //ページ遷移
        router.push(`${Paths.TAGS}/${tagName}`);
    }

    const closeSuccessSnackbar = () => {
        setSnackbarData({
            state: "",
            message: "",
            time: 0,
            isOpen: false
        })
    }

    return (
        <div className="container">
            <div className="p-4">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                />
            </div>

            <PromotionMessage />

            <div className="p-4">
                <h1 className="text-2xl font-bold mt-0 mb-4">
                    {
                        service && (
                            <h1 className="text-2xl font-bold mt-0 mb-4 border-b-2 mt-6">{service.serviceName}</h1>
                        )
                    }
                </h1>
                {
                    service?.avgRating ? (
                        <div className="flex">
                            <StarRatings
                                rating={service?.avgRating ? service.avgRating : 0}
                                numberOfStars={5}
                                name='rating'
                                starRatedColor="yellow"
                                starHoverColor="yellow"
                                ignoreInlineStyles={false}
                                starDimension="30px"
                                starSpacing="0px"
                            />
                            <p className="pl-2.5 font-bold text-lg" style={{ paddingTop: "3px" }}>{service?.avgRating ? service.avgRating : 0}</p>
                        </div>
                    ) : (
                        <StarRatings
                            rating={0}
                            numberOfStars={5}
                            name='rating'
                            starRatedColor="yellow"
                            starHoverColor="yellow"
                            ignoreInlineStyles={false}
                            starDimension="30px"
                            starSpacing="0px"
                        />
                    )
                }

            </div>

            <div className="">
                {
                    service && Array.isArray(tags) && (
                        <div className="">
                            <div className="flex items-center justify-center">
                                <img
                                    src={service.imgUrl}
                                    className="hover:scale-105 w-11/12"
                                    style={{
                                        maxHeight: "180px"
                                    }}
                                >
                                </img>
                            </div>

                            <div className="flex items-center justify-center">
                                <table className="table-auto w-11/12 mt-8">
                                    <tbody>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">料金</td>
                                            <td className="border px-4 py-2 w-3/4">{service.price}円</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">運営元</td>
                                            <td className="border px-4 py-2 w-3/4">{service.managementName}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">連絡先</td>
                                            <td className="border px-4 py-2 w-3/4">{service.contactInformationNames}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">無料相談</td>
                                            <td className="border px-4 py-2 w-3/4">{service.freeConsultation}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">送金保証</td>
                                            <td className="border px-4 py-2 w-3/4">{service.guaranteeSystem}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">無料プレゼント</td>
                                            <td className="border px-4 py-2 w-3/4">{service.freeGift}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">24時間受付</td>
                                            <td className="border px-4 py-2 w-3/4">{service.hourService}</td>
                                        </tr>
                                        <tr>
                                            <td className="border px-4 py-2 bg-gray-200 w-1/4">タグ</td>
                                            <td className="border px-4 py-2 w-3/4">
                                                <div className="flex">
                                                    {
                                                        tags.map((tag: TagsResponse, index: number) => {
                                                            return (
                                                                <Tag
                                                                    key={index}
                                                                    tagName={tag.tagName}
                                                                    tagNameClick={tagNameClick}
                                                                >

                                                                </Tag>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                            <div className="">
                                <OfficialWebsiteButton
                                    url={service.officialWebsite}
                                />
                            </div>
                        </div>

                    )
                }

            </div>

            <div className="p-4">
                <h1 className="text-2xl font-bold mt-0 mb-4">
                    <h1 className="text-2xl font-bold mt-0 mb-4 border-b-2 mt-6">似た条件のサービス</h1>
                </h1>
            </div>

            <div
                className="container"
            >
                {
                    similarServicesIsFetchedAfterMount && Array.isArray(similarServicesData?.similarServices) && (
                        <SimilarServicesSwiper
                            similarServices={similarServicesData.similarServices}
                        />
                    )
                }
            </div>

            <div className="p-4">
                <h1 className="text-2xl font-bold mt-0 mb-4">
                    {
                        reviewsMetaDataIsAfterMount
                            && reviewsMetaDataData?.totalCount ? (
                            <h1 className="text-2xl font-bold mt-0 mb-4 border-b-2 mt-6">口コミ {reviewsMetaDataData.totalCount}件</h1>
                        ) : (
                            <h1 className="text-2xl font-bold mt-0 mb-4 border-b-2 mt-6">口コミ 0件</h1>
                        )
                    }
                </h1>
            </div>

            <ProgressReview
                serviceId={id}
            />

            <div className="container">

                <Reviews
                    id={id}
                    page={page}
                />
                <div className="mb-5">
                    {
                        reviewsMetaDataIsAfterMount
                            && reviewsMetaDataData?.lastPage
                            && reviewsMetaDataData?.totalCount ? (
                            <Pagination
                                currentPage={currentPage}
                                lastPage={reviewsMetaDataData.lastPage}
                                path={path}
                                params={params}
                            />
                        ) : (
                            <></>
                        )
                    }
                </div>

                <div className="px-5">
                    <PostReview
                        id={id}
                        setSnackbarData={setSnackbarData}
                    />
                </div>
            </div>

            <Snackbar
                state={snackbarData.state}
                message={snackbarData.message}
                time={snackbarData.time}
                isOpen={snackbarData.isOpen}
                onClose={closeSuccessSnackbar}
            />
        </div>
    )
}