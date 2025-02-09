import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function PaginationComponent({ links, info }) {
    if (!links.length) return null;

    const currentPageObj = links.find((link) => link.active);
    const currentPage = currentPageObj ? parseInt(currentPageObj.label) : 1;
    const totalPages = links.length - 2;

    const range = 2;
    const visiblePages = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - range && i <= currentPage + range)
        ) {
            visiblePages.push(i);
        } else if (visiblePages[visiblePages.length - 1] !== "...") {
            visiblePages.push("...");
        }
    }

    const { page_size, search } = usePage().props; // Lấy giá trị hiện tại từ backend
    const [size, setSize] = useState(page_size || 10); // Giá trị mặc định

    useEffect(() => {
        setSize(page_size || 10); // Cập nhật state khi props thay đổi
    }, [page_size]);

    const handlePerPageChange = (pageSize) => {
        setSize(pageSize);
        router.get(
            route("post.index"),
            { page_size: pageSize, search },
            {
                preserveState: true,
            }
        );
    };

    // console.log(size, page_size);

    return (
        <div className="flex justify-end">
            {/* Page Info */}
            <p className="text-slate-600 dark:text-slate-400 text-sm">
                Showing {info.from} to {info.to} of {info.total} results
            </p>
            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    {links[0].url && (
                        <PaginationItem>
                            <Link
                                preserveScroll
                                preserveState
                                href={links[0].url}
                                className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: links[0].label,
                                }}
                            />
                        </PaginationItem>
                    )}

                    {visiblePages.map((page, index) => {
                        const link = links.find((l) => l.label == page);
                        return (
                            <PaginationItem key={index}>
                                {page === "..." ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <Link
                                        preserveScroll
                                        preserveState
                                        href={link?.url}
                                        className={clsx(
                                            "px-3 py-2 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800",
                                            page == currentPage &&
                                                "bg-gray-200 dark:bg-gray-700"
                                        )}
                                    >
                                        {page}
                                    </Link>
                                )}
                            </PaginationItem>
                        );
                    })}

                    {links[links.length - 1].url && (
                        <PaginationItem>
                            <Link
                                preserveScroll
                                preserveState
                                href={links[links.length - 1].url}
                                className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: links[links.length - 1].label,
                                }}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
            {/* Select Page Size */}
            <Select onValueChange={handlePerPageChange} defaultValue={size}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select per page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Choose per page</SelectLabel>
                        <SelectItem value={5}>05</SelectItem>
                        <SelectItem value={10}>10</SelectItem>
                        <SelectItem value={20}>20</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
