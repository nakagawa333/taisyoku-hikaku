"use client";
import { useMatchMedia } from '@/hooks/common/useMatchMedia';
import Image from 'next/image';

export default function HeaderImage() {

    const mathMedia: boolean = useMatchMedia("(min-width: 430px)");
    return (
        <>

            {
                mathMedia ? (
                    <Image
                        src="/fv_pc-tablet.png"
                        alt="ヘッダーイメージ"
                        width={100}
                        height={250}
                        style={{ width: '100%', height: 'auto' }}
                        quality={100}
                        layout="responsive"
                    ></Image>
                ) : (
                    <Image
                        src="/fv_mobile.png"
                        alt="ヘッダーイメージ"
                        width={100}
                        height={250}
                        style={{ width: '100%', height: 'auto' }}
                        quality={100}
                        layout="responsive"
                    ></Image>
                )
            }

        </>
    )
}