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
import StarRatings from "react-star-ratings";
import { useService } from "../hooks/useService";
import PostReview from "./postReview";
import ProgressReview from "./progressReview";
import Reviews from "./reviews";
import SeeDetailedReviews from "./seeDetailedReviews";
import ServiceDetails from "./serviceDetails";
import ServiceTags from "./serviceTags";
import TermsLists from "./TermsLists";

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
        <div className="container">
            <div className="p-4">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                />
            </div>

            <PromotionMessage />

            <div className="p-4">

                {
                    service && (
                        <Heading
                            title={service.serviceName}
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
                        className="border bg-white font-bold py-2 px-4 rounded"
                        style={reviewWriteButtonStyle}
                        onClick={() => reviewWriteButtonClick()}
                    >
                        口コミを書く
                    </button>
                </div>

            </div>

            <ProgressReview
                serviceId={id}
            />

            <SeeDetailedReviews
                reviewRef={reviewRef}
            />
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

            <Snackbar
                state={snackbarData.state}
                message={snackbarData.message}
                time={snackbarData.time}
                isOpen={snackbarData.isOpen}
                onClose={closeSuccessSnackbar}
            />

            <TermsLists
            />

        </div >
    )
}