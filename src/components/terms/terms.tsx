"use client";

import { Breadcrumb } from "@/types/ui/breadcrumb";
import Breadcrumbs from "../breadcrumbs";
import Heading from "../heading";

//プライバシーポリシー
export default function Terms() {

    const breadcrumbs: Breadcrumb[] = [
        {
            path: "/",
            breadcrumb: "ホーム"
        },
        {
            path: "/",
            breadcrumb: "利用規約"
        }
    ]
    return (
        <>
            <div className="p-4">
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                />
            </div>

            <div className="container mx-auto">
                <div className="min-h-screen flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 w-full mx-4">
                        <Heading
                            title={"退職代行口コミランキング 利用規約"}
                        />

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">【免責事項】</h2>
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">1. 情報の正確性について</h3>
                                <li className="text-gray-700">
                                    当サイトに掲載される口コミ情報はユーザーによる投稿を基にしており、その正確性・信憑性・速報性を保証するものではありません。
                                    掲載内容の誤り、不備、またはそれらに起因する損害について、当サイトは一切の責任を負いません。
                                </li>

                                <li className="text-gray-700">
                                    掲載内容の誤り、不備、またはそれらに起因する損害について、当サイトは一切の責任を負いません。
                                </li>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">2.退職代行サービスの利用について</h3>
                                <li className="text-gray-700">
                                    当サイトは退職代行サービスを提供する事業者とは一切関係がなく、サービスの品質・成果を保証するものではありません。
                                </li>

                                <li className="text-gray-700">
                                    ユーザーが退職代行サービスを利用する際は、各サービスの公式サイトや契約内容を十分に確認した上で自己責任のもと判断してください。
                                </li>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">3.損害の責任について</h3>
                                <li className="text-gray-700">
                                    当サイトの利用により生じた損害や、事業者とのトラブル・紛争について、当サイトは一切の責任を負いません
                                </li>

                                <li className="text-gray-700">
                                    口コミの内容により第三者とのトラブルが発生した場合、当該ユーザー間での解決とするものとし、当サイトは一切関与いたしません。
                                </li>
                            </div>


                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">4.リンク先の責任について</h3>
                                <li className="text-gray-700">
                                    当サイトからリンクする外部サイト・サービスについては審査しておらず、リンク先の利用によるトラブル・損害について当サイトは責任を負いません。
                                </li>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">【プライバシーポリシー】</h2>
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">1. 個人情報の収集について</h3>
                                <li className="text-gray-700">
                                    当サイトは、ユーザーに対し、必要に応じて以下の情報を収集する場合があります。
                                </li>
                                <li className="text-gray-700">
                                    ニックネーム
                                </li>
                                <li className="text-gray-700">
                                    メールアドレス（任意）
                                </li>
                                <li className="text-gray-700">
                                    IPアドレス、アクセスログ
                                </li>
                                <li className="text-gray-700">
                                    これらの情報は、スパム防止や不正アクセス防止、運営改善のためにのみ使用し、ユーザーの許可なく第三者に提供することはありません。
                                </li>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">2. 個人情報の利用目的</h3>
                                <li className="text-gray-700">
                                    収集した個人情報は、以下の目的のためにのみ利用します。
                                </li>
                                <li className="text-gray-700">
                                    不正投稿の防止、サイト運営の適正化
                                </li>
                                <li className="text-gray-700">
                                    サイト改善のための分析
                                </li>
                                <li className="text-gray-700">
                                    法令や規約に基づく対応
                                </li>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">3. 個人情報の管理</h3>
                                <li className="text-gray-700">
                                    当サイトは、収集した個人情報の適切な管理に努め、不正アクセス・紛失・改ざん・漏洩などを防止するための合理的な措置を講じます。
                                </li>
                            </div>


                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">4. クッキー（Cookie）について</h3>
                                <li className="text-gray-700">
                                    当サイトでは、利用状況の把握のためにCookieを使用する場合があります。
                                </li>
                                <li className="text-gray-700">
                                    ユーザーは、ブラウザの設定によりCookieの利用を拒否することができますが、一部の機能が制限される場合があります。
                                </li>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">5. プライバシーポリシーの変更について</h3>
                                <li className="text-gray-700">
                                    本ポリシーの内容は、必要に応じて随時改訂することがあります。変更後の内容は当サイトに掲載された時点から有効となります。
                                </li>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">【追加の注意事項】</h2>
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">1. 利用者への推奨事項</h3>
                                <li className="text-gray-700">
                                    口コミは、体験に基づき公平な視点で投稿してください。
                                </li>
                                <li className="text-gray-700">
                                    特定の個人や企業を貶める表現は避け、適切な表現を心がけてください。
                                </li>
                                <li className="text-gray-700">
                                    個人情報（氏名・住所・連絡先など）を含めた投稿は禁止されています。
                                </li>
                            </div>
                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">2. トラブル防止のための対応</h3>
                                <li className="text-gray-700">
                                    ユーザーが投稿した口コミに関する紛争が発生した場合、当サイトは関与する可能性があります。
                                </li>
                                <li className="text-gray-700">
                                    当サイトは中立的な立場を維持し、必要に応じて情報の提供や助言を第三者に行うなど円滑な解決を促します。
                                </li>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-4">【お問い合わせ】</h2>
                            <li className="text-gray-700">
                                本規約およびプライバシーポリシーに関するお問い合わせは、当サイトの「お問い合わせフォーム」よりご連絡ください。
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}