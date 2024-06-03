export type Service = {
    serviceId:string,
    serviceName:string,
    managementName:string,
    contactInformationNames:string[],
    price:number,
    freeConsultation?:boolean,
    guaranteeSystem?:boolean,
    freeGift?:boolean,
    hourService?:boolean,
    imgUrl?:string
}
