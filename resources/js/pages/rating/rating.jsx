import React, { useState, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { StarIcon } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function Rating({ rating: initialRating = 0, productId, ratingsCount = 0 }) {
    const [rating, setRating] = useState(initialRating);
    const [count, setCount] = useState(ratingsCount);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        if (rating !== initialRating) {
            setRating(initialRating);
        }
        if (count !== ratingsCount) {
            setCount(ratingsCount);
        }
    }, [initialRating, ratingsCount]);

    const handleClick = (index) => {
        const newRating = index + 1;
        if (!auth?.user) {
            toast.error('Please log in to rate this product.', {
                icon: '🔒',
                duration: 3000,
            });
            return;
        }

        if (productId && !isSubmitting) {
            setIsSubmitting(true);
            router.post(
                `/products/${productId}/rate`,
                { rating: newRating },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (page) => {
                        toast.success(flash?.message);
                        setIsSubmitting(false);
                    },
                    onError: (errors) => {
                        toast.error(flash?.error);
                        setIsSubmitting(false);
                    },
                    onFinish: () => {
                        setIsSubmitting(false);
                    }
                }
            );
        }
    };

    return (
        <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((_, i) => {
                const isActive = i < rating;
                return (
                    <button
                        key={i}
                        onClick={() => handleClick(i)}
                        className={`
                            p-0 m-0 
                            bg-transparent 
                            border-none 
                            shadow-none 
                            hover:bg-transparent 
                            focus:ring-0 
                            focus:outline-none 
                            active:bg-transparent 
                            rounded-none
                            flex items-center justify-center

                            [&_svg]:w-5 [&_svg]:h-5

                            ${!isActive ? "[&_svg]:stroke-gray-400" : ""}
                            dark:${!isActive ? "[&_svg]:stroke-white" : ""}

                            ${isActive ? "[&_svg]:stroke-[#3b9c3c]" : ""}
                            ${isActive ? "[&_svg]:fill-[#3b9c3c]" : ""}
                        `}
                    >
                        <StarIcon />
                    </button>

                );
            })}

            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {rating}
            </span>
            {count > 0 && (
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                    ({count})
                </span>
            )}
        </div>
    );
}