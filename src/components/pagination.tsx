import Link from "next/link";

type Props = {
  currentPage: number;
  totalPage: number;
  path: string;
  params:string;
};

export default function Pagination({currentPage, totalPage, path,params}: Props) {
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPage, currentPage + 1);

  if(startPage === 1 && 3 <= totalPage) {
    endPage = 3;
  } else if(currentPage === endPage){
    startPage = endPage - 2;
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
        <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-2">
                {pageNumbers.map((number) => (
                    <Link 
                        key={number} 
                        href={`${path}${params}p=${number}`}
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
               href={`${path}${params}p=${currentPage + 1}`} 
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
