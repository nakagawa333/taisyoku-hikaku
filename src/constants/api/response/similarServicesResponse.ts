export type Tag = {
    tagId: string,
    tagName: string
}

export type SimilarServicesResponse = {
    similarServiceId: string,
    similarServiceName: string,
    imgUrl: string,
    tags: Tag[]
}