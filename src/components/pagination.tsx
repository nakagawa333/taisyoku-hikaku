import Link from "next/link";

type Props = {
  currentPage: number;
  limit: number;
  count: number;
  path: string;
};

export default function Pagination({currentPage, limit, count, path}: Props) {
  const totalPages = Math.ceil(count / limit);
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
        <div className="flex items-center gap-4">
            <Link 
              href={`${path}?p=${currentPage - 1}`} 
              aria-label="Previous Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"
            >
                <button

                >
                    &lt;
                </button>
            </Link>
            <div className="flex items-center gap-2">
                {pageNumbers.map((number) => (
                    <Link 
                        key={number} 
                        href={`${path}?p=${number}`}
                        className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"
                    >
                        <button
                            className={`${
                            currentPage === number ? "bg-indigo-500 text-white" : ""
                            }`}
                        >
                            {number}
                        </button>
                    </Link>
                ))}
            </div>

            <Link 
               href={`${path}?p=${currentPage + 1}`} 
               aria-label="Next Page"
               className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"   
            >
                <button
                >
                    &gt;
                </button>
            </Link>
        </div>
    </div>
  );
};
