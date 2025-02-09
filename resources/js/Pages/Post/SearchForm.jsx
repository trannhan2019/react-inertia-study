import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function SearchForm() {
    const { search, page_size } = usePage().props; // Lấy dữ liệu search từ props của Inertia
    const [query, setQuery] = useState(search || ""); // Khởi tạo state với giá trị từ server

    useEffect(() => {
        setQuery(search || ""); // Cập nhật state khi props thay đổi
    }, [search]);
    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(
            route("post.index"),
            { search: query, page_size },
            { preserveState: true }
        );
    };
    // console.log(usePage().props);

    return (
        <div className="w-full max-w-sm ">
            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2"
            >
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <Button type="submit">Search</Button>
            </form>
        </div>
    );
}
