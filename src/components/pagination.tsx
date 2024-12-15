import Link from "next/link";

type Props = {
  currentPage: number;
  lastPage: number;
  path: string;
  params: string;
};

//ページネーションコンポーネント
export default function Pagination({ currentPage, lastPage, path, params }: Props) {
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(lastPage, currentPage + 1);

  if (startPage === 1 && 3 <= lastPage) {
    endPage = 3;
  } else if (currentPage === endPage) {
    if (2 < lastPage) {
      startPage = lastPage - 2;
    } else if (lastPage === 2) {
      startPage = lastPage - 1;
    } else {
      startPage = endPage;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4">

        {
          currentPage === 1 ? (
            <span
              aria-label="Previous Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border bg-gray-300 text-gray-500"
            >
              <button
                disabled={true}
              >
                &lt;
              </button>
            </span>
          ) : (
            <Link
              href={`${path}${params}p=${currentPage - 1}`}
              aria-label="Previous Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"
            >
              <button

              >
                &lt;
              </button>
            </Link>
          )
        }

        <div className="flex items-center gap-2">
          {pageNumbers.map((number) => (
            <Link
              key={number}
              href={`${path}${params}p=${number}`}
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"
            >
              <button
                className={`${currentPage === number ? "bg-indigo-500 text-white" : ""
                  }`}
              >
                {number}
              </button>
            </Link>
          ))}
        </div>

        {
          currentPage === lastPage ? (
            <span
              aria-label="Previous Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border bg-gray-300 text-gray-500"
            >
              <button
                disabled={true}
              >
                &gt;
              </button>
            </span>
          ) : (
            <Link
              href={`${path}${params}p=${currentPage + 1}`}
              aria-label="Next Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:text-white"
            >
              <button
              >
                &gt;
              </button>
            </Link>
          )
        }
      </div>
    </div>
  );
};
