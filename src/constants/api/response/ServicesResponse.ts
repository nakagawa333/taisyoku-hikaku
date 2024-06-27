import { Tags } from "@/constants/common/tags"

export type ServicesResponse = {
    serviceId:string,
    serviceName:string,
    imgUrl:string,
    tags:Tags[]
}