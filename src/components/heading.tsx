type Props = {
    title: string
}

export default function Heading(props: Props) {

    const { title } = props;
    return (
        <h1 className="text-2xl font-bold mt-0 mb-4">
            <h1 className="text-2xl font-bold mt-0 mb-4 border-b-2 mt-6">{title}</h1>
        </h1>
    )
}