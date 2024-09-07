import { Breadcrumb } from "@/types/ui/breadcrumb";
import Link from 'next/link';
import { memo } from "react";

type Props = {
    breadcrumbs: Breadcrumb[]
}
//パンくずリスト
function Breadcrumbs(props: Props) {
    const { breadcrumbs } = props;

    const breadcrumbsLength: number = breadcrumbs.length;

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {
                    Array.isArray(breadcrumbs) &&
                    breadcrumbs.map((breadcrumb: Breadcrumb, index: number) =>
                        <li key={index}>
                            {
                                index === 0 ? (
                                    <div className="flex items-center">
                                        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                        <Link
                                            href={breadcrumb.path}
                                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                            key={index}
                                        >
                                            {breadcrumb.breadcrumb}
                                        </Link>
                                    </div>
                                ) : breadcrumbsLength - 1 === index ? (
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span
                                            className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            {breadcrumb.breadcrumb}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <Link
                                            href={breadcrumb.path}
                                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                                            key={index}
                                        >
                                            {breadcrumb.breadcrumb}
                                        </Link>
                                    </div>
                                )
                            }
                        </li>
                    )
                }
            </ol>
        </nav>
    )
}

export default memo(Breadcrumbs);