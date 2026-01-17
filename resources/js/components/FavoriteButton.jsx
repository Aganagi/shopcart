import { router, usePage } from "@inertiajs/react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useLikes } from "@/pages/provider/LikesProvider";

export default function FavoriteButton({ product, children }) {
    const { auth } = usePage().props;
    const { likedItems, toggleLikeById, addLikedIdLocal, removeLikedIdLocal } = useLikes();
    const isFavorite = likedItems.includes(product.id);
    const handleGuestToggle = () => {
        const item = {
            id: product.id,
            name: product.name || "",
            image: typeof product.image === "string"
                ? product.image.startsWith("http") || product.image.startsWith("/storage/")
                    ? product.image
                    : `/storage/${product.image}`
                : "",
            category: product.category ?? null,
            brand: product.brand ?? null,
            is_active: product.is_active ?? true,
            sell_price: product.sell_price ?? 0,
            discount: product.discount ?? 0,
            stock: product.stock ?? 0,
        };
        toggleLikeById(item);
    };
    const handleAuthToggle = () => {
        if (isFavorite) {
            removeLikedIdLocal(product.id);

            router.delete(`/wishlist/${product.id}`, {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    addLikedIdLocal(product.id);
                }
            });
        } else {
            addLikedIdLocal(product.id);
            router.post(
                "/wishlist",
                { product_id: product.id },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onError: () => {
                        removeLikedIdLocal(product.id);
                    }
                }
            );
        }
    };
    const onClick = () => {
        auth?.user ? handleAuthToggle() : handleGuestToggle();
    };
    if (children) {
        return <div onClick={onClick}>{children(isFavorite)}</div>;
    }
    return (
        <Button
            onClick={onClick}
            className={`p-2.5 rounded-full border-0 hoverEffect
            hover:bg-[#063c28cc] hover:text-white
            dark:hover:bg-[#3B9C3Ccc] dark:hover:text-white
                ${isFavorite
                ? "text-white bg-[#063c28cc] dark:bg-[#3B9C3Ccc] dark:text-white"
                : "bg-transparent text-black dark:text-neutral-400"
            }`
            }
            type="button"
            aria-pressed={isFavorite}
        >
            <Heart size={16} />
        </Button>
    );
}
