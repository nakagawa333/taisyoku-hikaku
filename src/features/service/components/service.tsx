"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import SpeechBubble from "@/components/bubble/speechBubble";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import Heading from "@/components/heading";
import OfficialWebsiteButton from "@/components/OfficialWebsiteButton";
import PartialLoading from "@/components/partialLoading";
import PromotionMessage from "@/components/promotionMessage";
import Snackbar from "@/components/snackbar";
import SimilarServicesSwiper from "@/components/swiper";
import TermsLists from "@/components/terms/termsLists";
import { useMatchMedia } from "@/hooks/common/useMatchMedia";
import StarRatings from "react-star-ratings";
import { useService } from "../hooks/useService";
import PostReview from "./postReview";
import ProgressReview from "./progressReview";
import Reviews from "./reviews";
import SeeDetailedReviews from "./seeDetailedReviews";
import ServiceDetails from "./serviceDetails";
import ServiceTags from "./serviceTags";


export default function Service() {

    const {
        page, setPage,
        params, setParams,
        currentPage, setCurrentPage,
        fetchService, fetchSimilarServices,
        breadcrumbs, setBreadcrumbs,
        postReviewData, setPostReviewData,
        snackbarData, setSnackbarData,
        resService, serviceData, serviceIsLoading, servicesIsError, servicesIsFetchedAfterMount,
        resSimilarServices, similarServicesData, similarServicesIsLoading, similarServicesIsError, similarServicesIsFetchedAfterMount,
        fetchReviews, fetchReviewsMetaData, createReview, resReviewsMetaData, reviewsMetaDataData, reviewsMetaDataIsLoading, reviewsMetaDataIsError, reviewsMetaDataIsAfterMount,
        reviewWithArgs, reviewWriteButtonStyle, reviewRef, closeSuccessSnackbar,
        service, tags, id, path,
        openWriteReview, setOpenWriteReview, reviewWriteButtonClick
    } = useService();

    const mathMedia: boolean = useMatchMedia("(min-width: 430px)");

    if (serviceIsLoading || similarServicesIsLoading || reviewsMetaDataIsLoading
        || !servicesIsFetchedAfterMount || !similarServicesIsFetchedAfterMount ||
        !reviewsMetaDataIsAfterMount) {
        return (
            <div className="min-h-screen" >
                <PartialLoading isOpen={true} />
            </div>
        )
    }

    if (servicesIsError || similarServicesIsError || reviewsMetaDataIsError) {
        return (
            <div className="container m-auto min-h-screen" >
                <ErrorSnackbar
                    message="エラーが発生しました"
                    time={5000}
                />
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <div className="p-4">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                />
            </div>

            <PromotionMessage />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="sm:col-span-2">
                    <div className="p-4">

                        {
                            service && (
                                <Heading
                                    title={service.serviceName + " 概要"}
                                />
                            )
                        }

                    </div>

                    {
                        service && (
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
                        )
                    }

                    <div className="p-4 flex">
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
                                        starDimension="20px"
                                        starSpacing="0px"
                                    />

                                    {
                                        service.avgRating ? (
                                            <p
                                                className="pl-1.5 font-bold text-sm mt-0.5"
                                                style={{ paddingTop: "3px" }}>
                                                {service?.avgRating}
                                            </p>
                                        ) : (null)
                                    }

                                </div>
                            ) : (
                                <StarRatings
                                    rating={0}
                                    numberOfStars={5}
                                    name='rating'
                                    starRatedColor="yellow"
                                    starHoverColor="yellow"
                                    ignoreInlineStyles={false}
                                    starDimension="20px"
                                    starSpacing="0px"
                                />
                            )
                        }

                        <div className="ml-3">
                            {
                                reviewsMetaDataIsAfterMount
                                && reviewsMetaDataData?.totalCount && (
                                    <SpeechBubble count={reviewsMetaDataData?.totalCount} />
                                )
                            }
                        </div>

                        <div className="ml-auto">
                            <button
                                className="border bg-white font-bold py-2 px-4 rounded flex"
                                style={reviewWriteButtonStyle}
                                onClick={() => reviewWriteButtonClick()}
                            >
                                <div className="">
                                    <svg width="30" height="23" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.375 0.990378C19.7079 1.91032 13.325 14.4182 10.1834 20.2074C9.39331 21.6634 10.7723 22.4202 11.5848 21.0277C12.1688 20.0267 13.5916 17.1214 14.3612 17.2718C18.036 17.8841 19.996 15.4876 18.6044 13.9797C23.2792 14.0754 25.5966 11.5042 24.2704 9.94164C25.665 10.3831 27.7128 10.3186 29.5059 9.34107C33.333 7.25312 33.1016 0.0626204 26.375 0.990378Z" fill="#289CAC" />
                                        <path d="M25.5745 13.5552C24.967 14.1266 23.885 14.9391 22.9778 15.2936V28.2351C22.9768 28.5231 22.8664 28.7682 22.6789 28.9577C22.4895 29.1453 22.2444 29.2556 21.9572 29.2566H4.08504C3.79791 29.2556 3.55184 29.1453 3.36234 28.9577C3.17484 28.7683 3.06447 28.5232 3.06353 28.2351V10.3638C3.06453 10.0767 3.17484 9.83065 3.36234 9.64115C3.55178 9.45365 3.79791 9.34327 4.08504 9.34234H14.1096C14.8117 8.27201 15.5304 7.24369 16.2648 6.27881H4.08504C2.96196 6.27781 1.93071 6.73781 1.19632 7.47513C0.460005 8.20951 -0.000935884 9.24077 1.62385e-06 10.3638V28.2351C-0.000998385 29.3581 0.459943 30.3894 1.19632 31.1247C1.93071 31.861 2.96196 32.322 4.08504 32.321H21.9572C23.0793 32.322 24.1106 31.8611 24.846 31.1247C25.5823 30.3893 26.0432 29.3581 26.0423 28.2351V13.4908C26.0423 13.4908 25.8753 13.2721 25.5745 13.5552Z" fill="#289CAC" />
                                    </svg>
                                </div>

                                <p className="">口コミを書く</p>
                            </button>
                        </div>

                    </div>

                    <ProgressReview
                        serviceId={id}
                    />

                    <SeeDetailedReviews
                        reviewRef={reviewRef}
                    />

                    <div
                        className="p-4"
                    >
                        {
                            service && (
                                <Heading
                                    title={service.serviceName}
                                />
                            )
                        }
                    </div>

                    <ServiceDetails
                        service={service}
                    />

                    <div className="flex items-center justify-center">
                        <div className="w-11/12 mt-8">
                            <ServiceTags
                                tags={tags}
                            />
                        </div>
                    </div>


                    {
                        service && (
                            <OfficialWebsiteButton
                                url={service.officialWebsite}
                            />
                        )
                    }

                    <div className="p-4">
                        <Heading
                            title={"口コミ詳細"}
                        />
                    </div>

                    <div className="container" ref={reviewRef}>
                        <Reviews
                            id={id}
                            page={page}
                            reviewsMetaDataIsAfterMount={reviewsMetaDataIsAfterMount}
                            reviewsMetaDataData={reviewsMetaDataData}
                            path={path}
                            currentPage={currentPage}
                            params={params} />

                        <PostReview
                            id={id}
                            setSnackbarData={setSnackbarData}
                            openWriteReview={openWriteReview}
                            setOpenWriteReview={setOpenWriteReview}
                        />
                    </div>

                    <div className="p-4">
                        <Heading
                            title="似た条件のサービス"
                        />
                    </div>

                    <div
                        className="w-4/5 m-auto"
                    >
                        {
                            similarServicesIsFetchedAfterMount && Array.isArray(similarServicesData?.similarServices) && (
                                <SimilarServicesSwiper
                                    similarServices={similarServicesData.similarServices}
                                />
                            )
                        }
                    </div>

                    <Snackbar
                        state={snackbarData.state}
                        message={snackbarData.message}
                        time={snackbarData.time}
                        isOpen={snackbarData.isOpen}
                        onClose={closeSuccessSnackbar}
                    />
                </div>

                <div className="p-4 mt-6">
                    <TermsLists
                    />
                </div>
            </div>
        </div >
    )
}