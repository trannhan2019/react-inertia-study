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

import PaginationComponent from "@/Components/PaginationComponent";
import SearchForm from "./SearchForm";

export default function Post({ posts }) {
    const [openAdd, setOpenAdd] = useState(false);

    const handleOpenAdd = () => {
        setOpenAdd(true);
    };
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    // console.log(posts);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Post
                    </h2>
                    <SearchForm />
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

                        <PaginationComponent
                            links={posts.links}
                            info={{
                                from: posts.from,
                                to: posts.to,
                                total: posts.total,
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
