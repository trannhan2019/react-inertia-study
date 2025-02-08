import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { DOTS, usePagination } from "@/hooks/use-pagination";
import useQueryParams from "@/hooks/use-query-params";

export default function PaginationLink({
    totalCount,
    siblingCount = 1,
    currentPage = 1,
    pageSize = 10,
}) {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    const { queryObject, updateQueryParams } = useQueryParams();

    const handleChangePage = (page) => {
        updateQueryParams({ ...queryObject, page: page.toString() });
    };

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
    }

    const lastPage =
        paginationRange && paginationRange[paginationRange.length - 1];

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handleChangePage(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                        className={
                            currentPage <= 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                        }
                    />
                </PaginationItem>

                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index} className="cursor-pointer">
                            <PaginationLink
                                onClick={() =>
                                    handleChangePage(Number(pageNumber))
                                }
                                isActive={pageNumber === currentPage}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleChangePage(currentPage + 1)}
                        aria-disabled={
                            lastPage ? currentPage >= Number(lastPage) : false
                        }
                        tabIndex={
                            lastPage
                                ? currentPage >= Number(lastPage)
                                    ? -1
                                    : undefined
                                : undefined
                        }
                        className={
                            lastPage
                                ? currentPage >= Number(lastPage)
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                                : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
