import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import AddModal from "./AddModal";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Post({ posts }) {
    const [openAdd, setOpenAdd] = useState(false);

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handlePerPageChange = (pageSize) => {
        router.get(route("post.index"), { page_size: pageSize });
    };

    const makeLabel = (label) => {
        if (label.includes("Previous")) {
            return "<";
        } else if (label.includes("Next")) {
            return ">";
        } else {
            return label;
        }
    };

    console.log(posts);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Post
                    </h2>
                    <Button onClick={handleOpenAdd}>Add Post</Button>
                </div>
            }
        >
            <Head title="Post" />

            <AddModal open={openAdd} onClose={handleCloseAdd} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        ID
                                    </TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Body</TableHead>
                                    <TableHead className="text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.data.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell className="font-medium">
                                            {post.id}
                                        </TableCell>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{post.body}</TableCell>
                                        <TableCell className="text-right">
                                            action
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow></TableRow>
                            </TableFooter>
                        </Table>

                        <div className="flex justify-end">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                Showing {posts.from} to {posts.to} of{" "}
                                {posts.total} results
                            </p>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationLink
                                            as="button"
                                            disabled={posts.current_page === 1}
                                            href={posts.first_page_url}
                                            isActive={posts.current_page === 1}
                                        >
                                            {"<<"}
                                        </PaginationLink>
                                    </PaginationItem>
                                    {posts.links.map((link) => (
                                        <PaginationItem key={link.label}>
                                            <PaginationLink
                                                as="button"
                                                href={link.url}
                                                isActive={link.active}
                                                disabled={link.url === null}
                                            >
                                                {makeLabel(link.label)}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationLink
                                            as="button"
                                            href={posts.last_page_url}
                                            isActive={
                                                posts.current_page ===
                                                posts.last_page
                                            }
                                            disabled={
                                                posts.current_page ===
                                                posts.last_page
                                            }
                                        >
                                            {">>"}
                                        </PaginationLink>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>

                            <Select
                                onValueChange={handlePerPageChange}
                                defaultValue={posts.per_page}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Choose per page
                                        </SelectLabel>
                                        <SelectItem value={5}>05</SelectItem>
                                        <SelectItem value={10}>10</SelectItem>
                                        <SelectItem value={20}>20</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
