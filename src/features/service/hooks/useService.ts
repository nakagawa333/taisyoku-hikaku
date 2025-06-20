import { ServiceResponse, TagsResponse } from "@/constants/api/response/serviceResponse";
import ReactQueryKeys from "@/constants/common/reactQueryKeys";
import { useQueryReviews } from "@/hooks/reactQuery/comments";
import { useQueryervice } from "@/hooks/reactQuery/service";
import { AuthContext } from "@/providers/authProviders";
import { Breadcrumb } from "@/types/ui/breadcrumb";
import { useQueryClient } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";

export const useService = () => {
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

    const [{ fetchService, fetchSimilarServices }] = useQueryervice();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    //口コミを投稿する表示状態
    const [openWriteReview, setOpenWriteReview] = useState<boolean>(false);

    //モーダルの表示状態
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

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

    const reviewWriteButtonStyle = {
        "&:hover": {
            background: "#289CAC"
        },
        borderColor: "#289CAC",
        color: "#289CAC",
    }

    //口コミ一覧
    const reviewRef = useRef<HTMLDivElement>(null);

    //認証
    const authCcontext = useContext(AuthContext);
    //ログイン情報
    const { isLoggedIn, setLoggedIn } = authCcontext;

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
        //口コミ詳細までスクロール
        handleReviewRefScroll();
    }, [page])

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
     * 口コミ詳細までスクロール
     */
    const handleReviewRefScroll = () => {
        if (reviewRef.current) {
            reviewRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    /**
     * 口コミを書くボタンクリック
     */
    const reviewWriteButtonClick = () => {
        //ログイン済
        if (isLoggedIn) {
            //ログインモーダルを表示
            setOpenWriteReview(true);
        } else {
            //未ログイン
            //ログインモーダルを表示
            setOpenLoginModal(true);
        }
    }

    const closeSuccessSnackbar = () => {
        setSnackbarData({
            state: "",
            message: "",
            time: 0,
            isOpen: false
        })
    }

    /**
     * 口コミを書くボタンクリック時
     */
    const writeReview = () => {

    }

    return {
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
        openWriteReview, setOpenWriteReview, reviewWriteButtonClick,
        openLoginModal, setOpenLoginModal
    }
}