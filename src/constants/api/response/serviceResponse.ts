
export type ServiceResponse = {
    serviceName: string,
    price: number,
    managementName: string,
    contactInformationNames: string,
    freeConsultation: string,
    guaranteeSystem: string,
    freeGift: string,
    hourService: string,
    serviceId: string,
    imgUrl: string,
    officialWebsite: string
    avgRating: number | null
}

export type TagsResponse = {
    tagName: string
}

export type Gender = "MEN" | "WOMEN";

export type ReviewRatings = {
    id: number,
    review_category_id: number,
    rating: number,
    review_id: string,
    review_categories: {
        name: string,
    },
}

export type ServiceReview = {
    reviewId: string,
    name: string,
    title: string,
    createDay: string,
    gender: Gender,
    goodTitle: string,
    goodDetail: string,
    concernTitle: string,
    concernDetail: string,
    price_satisfaction: number, //価格の満足度
    speed_satisfaction: number, //スピードの満足度
    response_satisfaction: number, // 対応の満足度
    cost_performance_satisfaction: number //コスパの満足度
    comprehensive_evaluation: number //総合評価
}