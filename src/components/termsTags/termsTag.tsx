
type Props = {
    tagName: string
    count?: number
    tagNameClick: (tagName: string) => void
}

export default function TermsTag(props: Props) {
    const { tagName, count, tagNameClick } = props;

    return (
        <div className="flex">
            <span
                className="hover:bg-slate-50 transform px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                onClick={() => tagNameClick(tagName)}
                style={{
                    borderWidth: "1px"
                }}
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