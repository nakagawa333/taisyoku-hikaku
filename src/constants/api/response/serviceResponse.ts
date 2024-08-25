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
}

export type TagsResponse = {
    tagName: string
}

export type ServiceComment = {
    commentId: string,
    name: string,
    title: string,
    comment: string,
    rating: number,
    createDay: string,
    gender: number
}