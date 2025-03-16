import Image from 'next/image';

export default function HeaderTitle() {
    return (
        <>

            <Image
                src="/logo.png"
                className=""
                alt=""
                width={34}
                height={15}
            />
            <h1 className="text-2xl font-bold mt-0 mb-4 ml-4">
                退職代行口コミランキング
            </h1>
        </>
    )
}