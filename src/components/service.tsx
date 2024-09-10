"use client";

import { ServiceResponse, ServiceReview, TagsResponse } from "@/constants/api/response/serviceResponse";
import { Paths } from "@/constants/common/paths";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { Take } from "@/constants/db/take";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { useService } from "@/hooks/reactQuery/service";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { useQueryClient } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Breadcrumbs from "./breadcrumbs";
import ErrorSnackbar from "./ErrorSnackbar";
import OfficialWebsiteButton from "./OfficialWebsiteButton";
import Pagination from "./pagination";
import PartialLoading from "./partialLoading";
import PromotionMessage from "./promotionMessage";
import PostReview from "./review/postReview";
import ProgressReview from "./review/progressReview";
import Snackbar from "./snackbar";
import SimilarServicesSwiper from "./swiper";
import { Tag } from "./tag";

export default function Page() {
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
    const resReviews = fetchReviews(id, Take.REVIEWS, page);
    const reviewsData: any = resReviews.data;
    const reviewsIsLoading: boolean = resReviews.isLoading;
    const reviewsIsError: boolean = resReviews.isError;
    const reviewsIsAfterMount: boolean = resReviews.isFetchedAfterMount;

    const resReviewsMetaData = fetchReviewsMetaData(id);
    const reviewsMetaDataData: any = resReviewsMetaData.data;
    const reviewsMetaDataIsLoading: boolean = resReviews.isLoading;
    const reviewsMetaDataIsError: boolean = resReviews.isError;
    const reviewsMetaDataIsAfterMount: boolean = resReviews.isFetchedAfterMount;

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

    if (serviceIsLoading || similarServicesIsLoading || reviewsIsLoading || reviewsMetaDataIsLoading
        || !servicesIsFetchedAfterMount || !similarServicesIsFetchedAfterMount ||
        !reviewsIsAfterMount || !reviewsMetaDataIsAfterMount) {
        return (
            <div className="min-h-screen">
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (servicesIsError || similarServicesIsError || reviewsIsError || reviewsMetaDataIsError) {
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

    /**
     * 口コミ投稿時 
     */
    const postReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const reviewData = {
            serviceId: id,
            name: postReviewData.name.trim(),
            rating: postReviewData.reviewRating,
            gender: postReviewData.gender,
            title: postReviewData.title.trim(),
            review: postReviewData.review.trim()
        }

        try {
            const res = await reviewWithArgs.mutateAsync(reviewData);
        } catch (error: any) {
            console.error(error);
            setSnackbarData({
                state: "error",
                message: "口コミ投稿に失敗しました",
                time: 5000,
                isOpen: true
            })
            return;
        }

        setSnackbarData({
            state: "success",
            message: "口コミ投稿に成功しました",
            time: 5000,
            isOpen: true
        })

        //値の初期化
        setPostReviewData({
            reviewCharacterCount: 0,
            name: "",
            reviewRating: 5,
            gender: "MEN",
            title: "",
            review: "",
        });

        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWS] });
        queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.SERVICEREVIEWSMETADATA] });
    }

    /**
     * 口コミ入力値変更イベント
     * @param e 変更イベント
     * @param element 要素
     */
    const postReviewInputOnChange = (e: React.ChangeEvent<HTMLInputElement>, element: string) => {
        const value: string = e.target.value;
        if (postReviewData.hasOwnProperty(element)) {
            const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
            copyPostReviewData[element] = value;
            setPostReviewData(copyPostReviewData);
        }
    }

    /**
     * 口コミセレクトボックス変更時イベント
     * @param e 変更イベント
     * @param element 要素
     */
    const postReviewSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>, element: string) => {
        const value: string = e.target.value;
        if (postReviewData.hasOwnProperty(element)) {
            const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
            copyPostReviewData[element] = value;
            setPostReviewData(copyPostReviewData);
        }
    }

    /**
     * レビュー入力欄変更時
     * @param value 入力値
     */
    const reviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value: string = e.target.value;
        const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
        copyPostReviewData["review"] = value;
        copyPostReviewData["reviewCharacterCount"] = value.length
        setPostReviewData(copyPostReviewData);
    }

    /**
     * 口コミ評価変更イベント
     * @param rating 評価
     */
    const changeReviewRating = (rating: number) => {
        const copyPostReviewData = JSON.parse(JSON.stringify(postReviewData));
        copyPostReviewData["reviewRating"] = rating;

        setPostReviewData(copyPostReviewData)
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
                {
                    reviewsIsAfterMount && Array.isArray(reviewsData?.reviews) && (
                        <div className="px-5">
                            {
                                reviewsData.reviews.map((review: ServiceReview) =>
                                    <article key={review.reviewId}>
                                        <div className="flex items-center mb-4">
                                            {
                                                review.gender === "MEN" ? (
                                                    <img className="w-10 h-10 me-4 rounded-full" src="/men.jpg" alt="" />
                                                ) : (
                                                    <img className="w-10 h-10 me-4 rounded-full" src="/women.jpg" alt="" />
                                                )
                                            }
                                            <div className="font-medium">
                                                <p> {review.name} <p className="block text-sm">{review.createDay}</p></p>
                                            </div>
                                        </div>

                                        <div className="pointer-events-none flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                            <StarRatings
                                                rating={review.rating}
                                                numberOfStars={5}
                                                name='rating'
                                                starRatedColor="yellow"
                                                starHoverColor="yellow"
                                                ignoreInlineStyles={false}
                                                starDimension="14px"
                                                starSpacing="0px"
                                            />

                                            <h3 className="ms-2 text-sm pt-1">
                                                {review.title}
                                            </h3>
                                        </div>

                                        <article className="break-words break-all whitespace-normal">
                                            <p className="mb-2 whitespace-pre-line">
                                                {review.review}
                                            </p>
                                        </article>
                                    </article>
                                )
                            }
                        </div>
                    )
                }

                {
                    !Array.isArray(reviewsData?.reviews) || reviewsData.reviews.length === 0 && (
                        <div className="px-5">
                            <p className="text-lg mb-4 border-b-2">
                                まだコメントは投稿されていません
                            </p>
                        </div>
                    )
                }

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
                        postData={postReviewData}
                        onSubmit={postReviewSubmit}
                        onInputChange={postReviewInputOnChange}
                        onSelectChange={postReviewSelectOnChange}
                        onChangeRating={changeReviewRating}
                        reviewChange={reviewChange}
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