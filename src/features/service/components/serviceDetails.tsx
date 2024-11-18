import { ServiceResponse } from "@/constants/api/response/serviceResponse";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";


type Props = {
    service: ServiceResponse | null
}
//サービス詳細
export default function ServiceDetails(props: Props) {
    const { service } = props;
    const router: AppRouterInstance = useRouter();

    return (
        <div className="">
            {
                service && (
                    <div className="">
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
                                </tbody>

                            </table>
                        </div>
                    </div>
                )
            }

        </div>
    )
}