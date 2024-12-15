
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
                className="hover:bg-gray-50 px-1 py-1 text-sm text-gray-700 mr-1 mb-1"
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