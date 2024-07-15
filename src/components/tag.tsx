
type Props = {
    tagName: string
    count?: number
    tagNameClick: (tagName: string) => void
}

export const Tag = (props: Props) => {
    const { tagName, count, tagNameClick } = props;

    return (
        <div className="flex">
            <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                onClick={() => tagNameClick(tagName)}
            >
                #{tagName}

                {
                    count !== undefined && count !== null ? (
                        <span
                            className=""
                        >
                            ({count})
                        </span>
                    ) : (null)
                }
            </span>

        </div>
    )
}