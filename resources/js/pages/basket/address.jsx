import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router, useForm, usePage } from "@inertiajs/react";
import clsx from "clsx";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Address({ onAddressSubmit, cartItems }) {
    const page = usePage();
    const auth = page.props?.auth;

    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        surname: "",
        address: "",
        phone: "",
        payment_type: "",
        items: [],
    });

    const [localError, setLocalError] = useState({});

    const validate = (field, value) => {
        if (!value || !value.toString().trim()) {
            return (
                field.charAt(0).toUpperCase() +
                field.slice(1).replace("_", " ") +
                " is required"
            );
        }

        if (field === "phone") {
            const phoneRegex = /^[\+]?[1-9][\d]{9,14}$/;
            if (!phoneRegex.test(value)) {
                return "Please enter a valid phone number (10-15 digits)";
            }
        }

        return "";
    };

    const handleChange = (field, value) => {
        setData(field, value);

        const error = validate(field, value);

        setLocalError((prev) => {
            const updated = { ...prev };
            if (error) updated[field] = error;
            else delete updated[field];
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!auth || !auth.user) {
            toast.error("Please login to place an order.");
            router.visit("/login");
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const newErrors = {};
        const requiredFields = [
            "name",
            "surname",
            "address",
            "phone",
            "payment_type",
        ];

        requiredFields.forEach((field) => {
            const err = validate(field, data[field]);
            if (err) newErrors[field] = err;
        });

        if (Object.keys(newErrors).length > 0) {
            setLocalError(newErrors);
            toast.error("Please fill all required fields correctly");
            return;
        }

        const itemsPayload = cartItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: Number(item.price) || 0,
            discount_price:
                item.discount > 0
                    ? Number((item.price * (item.discount / 100)).toFixed(2))
                    : null,
        }));

        // Если выбрана оплата картой - сохраняем в sessionStorage и редиректим
        if (data.payment_type === 'card') {
            sessionStorage.setItem('orderData', JSON.stringify({
                name: data.name,
                surname: data.surname,
                address: data.address,
                phone: data.phone,
                payment_type: data.payment_type,
            }));

            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

            const total = cartItems.reduce((sum, item) => {
                const price = Number(item.price) || 0;
                const discount = Number(item.discount) || 0;
                const finalPrice = price * (1 - discount / 100);
                return sum + (finalPrice * item.quantity);
            }, 0);
            sessionStorage.setItem('cartTotal', total.toString());

            toast.success("Proceeding to payment...");
            router.visit('/payment');
            setOpen(false);
            reset();
            setLocalError({});
            return;
        }

        router.post(
            "/basket",
            {
                name: data.name,
                surname: data.surname,
                address: data.address,
                phone: data.phone,
                payment_type: data.payment_type,
                items: itemsPayload,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Order placed successfully! Pay cash on delivery.");

                    try {
                        sessionStorage.setItem(
                            "addressData",
                            JSON.stringify({
                                name: data.name,
                                surname: data.surname,
                                address: data.address,
                                phone: data.phone,
                            })
                        );
                    } catch (e) { }

                    reset();
                    setOpen(false);
                    setLocalError({});
                    onAddressSubmit?.();
                },
                onError: (err) => {
                    if (err && typeof err === "object") {
                        setLocalError((p) => ({ ...p, ...err }));
                    }
                    toast.error(
                        "Error creating order. Please check all fields."
                    );
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1
                focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border
                border-neutral-300 bg-white text-black dark:bg-neutral-800 dark:text-white dark:border-neutral-700
                shadow-xs hover:bg-[#f5f5f5] dark:hover:bg-neutral-700
                hover:text-[#171717] h-9 px-4 py-2 w-full mt-4"
            >
                Add Address
            </Button>

            <DialogContent className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">
                        Delivery Address
                    </DialogTitle>
                    <DialogDescription className="dark:text-neutral-300">
                        Please fill in your delivery address below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={clsx(
                            "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
                            localError.name
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
                        )}
                    />
                    {(localError.name || errors.name) && (
                        <p className="text-sm text-red-500">
                            {localError.name || errors.name}
                        </p>
                    )}
                    <Input
                        type="text"
                        placeholder="Surname"
                        value={data.surname}
                        onChange={(e) =>
                            handleChange("surname", e.target.value)
                        }
                        className={clsx(
                            "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
                            localError.surname
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
                        )}
                    />
                    {(localError.surname || errors.surname) && (
                        <p className="text-sm text-red-500">
                            {localError.surname || errors.surname}
                        </p>
                    )}
                    <Input
                        type="text"
                        placeholder="Address"
                        value={data.address}
                        onChange={(e) =>
                            handleChange("address", e.target.value)
                        }
                        className={clsx(
                            "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
                            localError.address
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
                        )}
                    />
                    {(localError.address || errors.address) && (
                        <p className="text-sm text-red-500">
                            {localError.address || errors.address}
                        </p>
                    )}
                    <Input
                        type="text"
                        placeholder="Phone Number"
                        value={data.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={clsx(
                            "transition-colors border bg-white dark:bg-neutral-800 dark:text-white",
                            localError.phone
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
                        )}
                    />
                    {(localError.phone || errors.phone) && (
                        <p className="text-sm text-red-500">
                            {localError.phone || errors.phone}
                        </p>
                    )}
                    <Select
                        value={data.payment_type}
                        onValueChange={(value) =>
                            handleChange("payment_type", value)
                        }
                    >
                        <SelectTrigger
                            className={clsx(
                                "bg-white text-neutral-900 w-full dark:bg-neutral-800 dark:text-white transition-colors border",
                                localError.payment_type
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 dark:border-neutral-700 focus:ring-gray-400"
                            )}
                        >
                            <SelectValue placeholder="Select Payment Method" />
                        </SelectTrigger>

                        <SelectContent className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-md">
                            <SelectGroup>
                                <SelectLabel className="text-neutral-600 dark:text-neutral-400">
                                    Payment Method
                                </SelectLabel>

                                <SelectItem
                                    value="cash"
                                    className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    Cash on Delivery
                                </SelectItem>

                                <SelectItem
                                    value="card"
                                    className="hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                >
                                    Credit/Debit Card
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {(localError.payment_type || errors.payment_type) && (
                        <p className="text-sm text-red-500">
                            {localError.payment_type || errors.payment_type}
                        </p>
                    )}

                    <DialogFooter className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="cursor-pointer hover:bg-neutral-100 hover:text-black dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            className="bg-neutral-800 border dark:border-neutral-950 dark:bg-neutral-900 text-white hover:bg-neutral-950 dark:hover:bg-neutral-950 cursor-pointer"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Continue"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
