import { React, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { Flame, LoaderCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../provider/CartProvider";
import FavoriteButton from "@/components/FavoriteButton";
import Rating from "../rating/rating";
import NoProduct from "@/components/NoProduct";

export default function Content({ products, categories }) {
    const { auth } = usePage().props;
    const userId = auth?.user?.id || 0;

    const [selectedCategory, setSelectedCategory] = useState("All");

    const { topCategories, otherCategories } = useMemo(() => {
        const sorted = [...categories].sort(
            (a, b) => (b.products_count ?? 0) - (a.products_count ?? 0)
        );
        return {
            topCategories: sorted.slice(0, 3),
            otherCategories: sorted.slice(3),
        };
    }, [categories]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "All") return products;

        return products.filter((p) => p.category_id === selectedCategory);
    }, [selectedCategory, products]);

    const { addCart, increment, decrement, getQuantity } = useCart();
   
    return (
        <div className="py-10">
            <div className="max-w-7xl mx-auto px-4 flex flex-col lg:px-0">
                <div className="flex items-center flex-wrap gap-5 justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-semibold">
                        <div
                            className="flex flex-wrap gap-2
                    w-full md:flex-nowrap md:overflow-x-auto md:whitespace-nowrap
                    md:gap-2 scrollbar-hide"
                        >
                            <Button
                                onClick={() => setSelectedCategory("All")}
                                className={`whitespace-nowrap border border-[#3b9c3c4d] px-4 py-1.5 rounded-full hoverEffect
                                ${selectedCategory === "All"
                                        ? "bg-[#3b9c3c] text-white hover:bg-[#3b9c3c]"
                                        : "bg-[#3b9c3c]/10 text-neutral-800 hover:bg-[#3b9c3c] hover:text-white dark:bg-[#3b9c3c]/20 dark:text-gray-200 dark:hover:bg-[#3b9c3c]"
                                    }`}
                            >
                                All
                            </Button>
                            {topCategories.map((cat) => (
                                <Button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`whitespace-nowrap border border-[#3b9c3c4d] px-5 py-2 rounded-full hoverEffect
                                    ${selectedCategory === cat.id
                                            ? "bg-[#3b9c3c] text-white hover:bg-[#3b9c3c]"
                                            : "bg-[#3b9c3c]/10 text-neutral-800 hover:bg-[#3b9c3c] hover:text-white dark:bg-[#3b9c3c]/20 dark:text-gray-200 dark:hover:bg-[#3b9c3c]"
                                        }`}
                                >
                                    {cat.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Link
                        href="/shop"
                        className="border border-[#151515] px-4 py-1 text-neutral-800
                        rounded-full hover:bg-[#3b9c3c] hover:text-white hover:border-[#3b9c3c]
                        hoverEffect shadow dark:text-gray-200 dark:border-gray-600"
                    >
                        See All
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-6">
                    {filteredProducts.map((product) => (
                        <div style={{ opacity: 1 }} key={product.id}>
                            <div className="text-sm border rounded-md border-[#6c7fd8]/20 group bg-white dark:bg-[#1a1a1a] dark:border-gray-700 overflow-hidden">
                                <div className="relative group overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a]">
                                    <Link href={`/product/${product.id}`}>
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-64 object-contain overflow-hidden
                                            transition-transform bg-shop_light_bg duration-500
                                            group-hover:scale-105"
                                        />
                                    </Link>
                                    <div className="absolute top-2 right-2">
                                        <FavoriteButton product={product} />
                                    </div>
                                    {product.discount > 0 ? (
                                        <p
                                            className="absolute top-2 left-2 z-10 text-xs text-black border
                                            border-[#15151580]/50 px-2 rounded-full group-hover:border-[#016630]
                                            hover:text-[#063c28cc] hoverEffect animate-pulse-scale
                                            dark:text-green-800 dark:border-gray-600 dark:hover:text-[#3b9c3c]"
                                        >
                                            Sale!
                                        </p>
                                    ) : (
                                        <Link
                                            href="/hot-deal"
                                            className="absolute top-2 left-2 z-10 border border-[#fb6c0880] p-1 rounded-full group-hover:border-[#fb6c08]/50 hover:text-[#016630] hoverEffect dark:border-[#fb6c08]"
                                        >
                                            <Flame
                                                size={16}
                                                fill="#fb6c08"
                                                className="text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect"
                                            />
                                        </Link>
                                    )}
                                </div>
                                <div className="p-3 flex flex-col gap-2">
                                    <p className="uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-gray-400">
                                        {product.category?.name}
                                    </p>

                                    <h2 className="font-semibold text-[1rem] line-clamp-1 text-neutral-800 dark:text-white">
                                        {product.name}
                                    </h2>

                                    <div className="flex items-center gap-0 -ml-2">
                                        <Rating rating={product.average_rating || 0}
                                            productId={product.id} />
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        {product.stock > 0 ? (
                                            <>
                                                <p className="font-medium text-neutral-800 dark:text-gray-200">In Stock</p>
                                                <p className="text-[#063c28]/80 font-semibold dark:text-[#93D991]">
                                                    {product.stock}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-[#737373] font-semibold dark:text-gray-500">Out of Stock</p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between gap-5">
                                        <div className="flex items-center gap-2">
                                            {Number(product.discount) > 0 ? (
                                                <div>
                                                    <span className="font-semibold text-[#063c28] text-sm dark:text-[#93D991]">
                                                        {(
                                                            Number(product.sell_price) -
                                                            (Number(product.sell_price) *
                                                                Number(product.discount)) /
                                                            100
                                                        ).toFixed(2)}₼
                                                    </span>
                                                    <span className="line-through ml-1 font-normal text-zinc-500 text-sm dark:text-gray-500">
                                                        {(Number(product.sell_price) || 0).toFixed(2)}₼
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="font-semibold text-[#063c28] text-sm dark:text-[#93D991]">
                                                    {(Number(product.sell_price) || 0).toFixed(2)}₼
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {getQuantity(product.id) > 0 ? (
                                        <div className="w-full h-12 flex items-center">
                                            <div className="text-sm w-full">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-[#737373] dark:text-gray-400">Quantity</span>

                                                    <div className="flex items-center gap-1 pb-1 text-[1rem]">
                                                        <Button
                                                            onClick={() => decrement(product.id)}
                                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                                                            rounded-md text-sm font-medium
                                                            border-[#e5e5e5] bg-white shadow-xs text-neutral-700
                                                            hover:text-neutral-900 w-6 h-6 border-0 hover:bg-[#063c28]/20
                                                            dark:bg-[#2a2a2a] dark:text-gray-200"
                                                        >
                                                            <Minus />
                                                        </Button>

                                                        <span className="font-semibold text-sm w-6 text-center text-neutral-900 dark:text-gray-200">
                                                            {getQuantity(product.id)}
                                                        </span>

                                                        <Button
                                                            onClick={() => increment(product.id, product.stock)}
                                                            disabled={getQuantity(product.id) >= product.stock}
                                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                                                            rounded-md text-sm font-medium
                                                            border-[#e5e5e5] bg-white shadow-xs text-neutral-700
                                                            hover:text-neutral-900 w-6 h-6 border-0 hover:bg-[#063c28]/20
                                                            dark:bg-[#2a2a2a] dark:text-gray-200"
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between border-t pt-1 dark:border-gray-700">
                                                    <span className="text-xs text-neutral-900 font-semibold dark:text-gray-200">
                                                        Subtotal
                                                    </span>
                                                    <span className="text-sm font-semibold text-neutral-950 dark:text-gray-100">
                                                        {(
                                                            (product.sell_price -
                                                                product.sell_price *
                                                                (product.discount / 100)) *
                                                            getQuantity(product.id)
                                                        ).toFixed(2)}₼
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-12 flex items-center">
                                            <Button
                                                onClick={() => addCart(userId, product)}
                                                disabled={product.stock <= 0}
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm
                                                hoverEffect h-9 px-4 py-2 bg-[#063c28]/80
                                                text-[#f8f8fb] shadow-none border border-[#063c28]/80
                                                font-semibold tracking-wide hover:bg-[#063c28] hover:border-[#063c28]
                                                w-36 rounded-full dark:bg-[#063c28]/80 dark:border-[#063c28]/80 dark:hover:bg-[#063c28]"
                                            >
                                                <ShoppingBag />
                                                Add to Cart
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <NoProduct/>
                )}
            </div>
        </div>
    );
}