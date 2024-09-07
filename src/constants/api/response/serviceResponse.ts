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

export type ServiceReview = {
    reviewId: string,
    name: string,
    title: string,
    review: string,
    rating: number,
    createDay: string,
    gender: Gender
}