import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { toast } from "react-toastify";

export default function AddModal({ open, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("post.store"), {
            onSuccess: () => {
                reset("title", "body");
                onClose();
                toast.success("Post created successfully");
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={data.title}
                                className="col-span-3"
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            {errors.title && (
                                <InputError
                                    message={errors.title}
                                    className="col-span-3 text-center"
                                />
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="body" className="text-right">
                                Body
                            </Label>
                            <Input
                                id="body"
                                value={data.body}
                                className="col-span-3"
                                onChange={(e) =>
                                    setData("body", e.target.value)
                                }
                            />
                            {errors.body && (
                                <InputError
                                    message={errors.body}
                                    className="col-span-3 text-center"
                                />
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
