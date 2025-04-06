import Link from "next/link";

type Props = {
  currentPage: number;
  lastPage: number;
  path: string;
  params: string;
};

//ページネーションコンポーネント
export default function Pagination({ currentPage, lastPage, path, params }: Props) {

  const buildQueryString = (params: string, page: number) => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("p");
    searchParams.set("p", page.toString());
    const query = searchParams.toString();
    return query ? `?${query}` : "";
  }

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
              href={`${path}${buildQueryString(params, currentPage - 1)}`}
              aria-label="Previous Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              <button
              >
                &lt;
              </button>
            </Link>
          )
        }

        <div className="flex items-center gap-2">
          {
            pageNumbers.map((pageNumber: number) =>
              <div key={pageNumber}>
                {
                  pageNumber === currentPage ? (
                    <span
                      className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight 
                      bg-gray-300 dark:text-white text-gray-700 border border-gray-300"
                    >
                      <button
                        className={`text-white`}
                      >
                        {pageNumber}
                      </button>
                    </span>
                  ) : (
                    <Link
                      href={`${path}${buildQueryString(params, pageNumber)}`}
                      className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-300 hover:text-gray-700 dark:hover:text-white"
                    >
                      <button
                      >
                        {pageNumber}
                      </button>
                    </Link>
                  )
                }
              </div>
            )
          }
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
              href={`${path}${buildQueryString(params, currentPage + 1)}`}
              aria-label="Next Page"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              <button
              >
                &gt;
              </button>
            </Link>
          )
        }
      </div>
    </div >
  );
};
