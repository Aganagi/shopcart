import React, { useState } from 'react'
import FavoriteButton from '@/components/FavoriteButton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { usePage } from '@inertiajs/react'
import { useCart } from '../provider/CartProvider'
import {
    CircleQuestionMark,
    CornerDownLeft,
    Heart,
    Minus,
    Plus,
    Share2,
    ShoppingBag,
    SquarePlus,
    Star,
    Truck
} from 'lucide-react'
import Rating from '../rating/rating'

export default function Product() {
    const { product: initialProduct, relatedProducts } = usePage().props;
    const [currentProduct, setCurrentProduct] = useState(initialProduct);
    const [viewedProducts, setViewedProducts] = useState([initialProduct]);
    const { auth } = usePage().props
    const userId = auth?.user?.id || 0
    const { addCart, increment, decrement, getQuantity } = useCart()

    const handleThumbnailClick = (product) => {
        setCurrentProduct(product);
        if (!viewedProducts.find(p => p.id === product.id)) {
            setViewedProducts(prev => [...prev, product]);
        }
    }

    const allThumbnails = [
        ...viewedProducts,
        ...relatedProducts.filter(p => !viewedProducts.find(v => v.id === p.id))
    ];

    return (
        <div className="mx-auto max-w-(--breakpoint-xl) px-4">
            <div className="flex flex-col gap-10 py-10 md:flex-row">
                <div className="w-full space-y-2 md:w-1/2 md:space-y-4" key={currentProduct.id}>
                    <div className="group max-h-[550px] min-h-[450px] w-full overflow-hidden rounded-md border border-[#151515]/10 dark:border-white/10 opacity-[1]">
                        <img
                            src={`/storage/${currentProduct.image}`}
                            alt={currentProduct.name}
                            loading="lazy"
                            className="hoverEffect h-96 max-h-[550px] min-h-[500px] w-full rounded-md object-contain group-hover:scale-110"
                        />
                    </div>

                    <div className="grid h-20 grid-cols-6 gap-2 md:h-24 overflow-x-auto">
                        {allThumbnails.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleThumbnailClick(item)}
                                className={`overflow-hidden rounded-md border dark:ring-white/20
                                    ${item.id === currentProduct.id ? 'border-[#063c28] dark:border-[#3b9c3c]' : ''}`}
                            >
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.name}
                                    className="h-auto w-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex w-full flex-col gap-5 md:w-1/2">
                    <div className="space-y-1">
                        <p className="text-2xl font-semibold text-black dark:text-white">{currentProduct.name}</p>
                        <p className="text-sm tracking-wide text-gray-600 dark:text-gray-400">{currentProduct.short_description}</p>

                        <div className="flex items-center gap-0 text-xs">
                            <Rating rating={currentProduct.average_rating || 0}
                                productId={currentProduct.id} />
                        </div>
                    </div>

                    <div className="space-y-2 border-t border-b border-gray-200 dark:border-white/10 py-5">
                        <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-2">
                                {currentProduct.discount > 0 ? (
                                    <>
                                        <span className="text-lg font-semibold text-[#063c28] dark:text-green-300">
                                            {(currentProduct.sell_price - (currentProduct.sell_price * currentProduct.discount) / 100).toFixed(2)}₼
                                        </span>
                                        <span className="text-lg font-semibold text-zinc-500 line-through dark:text-zinc-400">
                                            {currentProduct.sell_price}₼
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-lg font-semibold text-[#063c28] dark:text-green-300">
                                        {currentProduct.sell_price}₼
                                    </span>
                                )}
                            </div>
                        </div>
                        {currentProduct.stock > 0 ? (
                            <p className="w-20 rounded-md bg-green-100 dark:bg-green-800 py-1.5 text-center text-xs font-semibold text-green-600 dark:text-green-200">
                                In Stock
                            </p>
                        ) : (
                            <p className="w-20 rounded-md bg-gray-200 dark:bg-gray-700 py-1.5 text-center text-xs font-semibold text-gray-600 dark:text-gray-300">
                                Out of Stock
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2.5 lg:gap-5">
                        <div className="flex h-12 w-full items-center">
                            {getQuantity(currentProduct.id) > 0 ? (
                                <div className="flex h-12 w-full items-center">
                                    <div className="w-full text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-[#737373] dark:text-gray-300">Quantity</span>

                                            <div className="flex items-center gap-1 pb-1 text-[1rem]">
                                                <Button
                                                    onClick={() => decrement(currentProduct.id)}
                                                    className="inline-flex h-6 w-6 items-center justify-center bg-white dark:bg-gray-800 text-neutral-900 dark:text-white border-0"
                                                >
                                                    <Minus />
                                                </Button>

                                                <span className="w-6 text-center text-sm font-semibold text-neutral-900 dark:text-white">
                                                    {getQuantity(currentProduct.id)}
                                                </span>

                                                <Button
                                                    onClick={() => increment(currentProduct.id, currentProduct.stock)}
                                                    disabled={getQuantity(currentProduct.id) >= currentProduct.stock}
                                                    className="inline-flex h-6 w-6 items-center justify-center bg-white dark:bg-gray-800 text-neutral-900 dark:text-white border-0"
                                                >
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t dark:border-white/10 pt-1">
                                            <span className="text-xs font-semibold text-neutral-900 dark:text-white">Subtotal</span>
                                            <span className="text-sm font-semibold text-neutral-950 dark:text-gray-200">
                                                ${((currentProduct.sell_price - currentProduct.sell_price * (currentProduct.discount / 100)) * getQuantity(currentProduct.id)).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex h-12 w-full items-center">
                                    <Button
                                        onClick={() => addCart(userId, currentProduct)}
                                        disabled={currentProduct.stock <= 0}
                                        className="inline-flex h-9 w-full items-center justify-center gap-2 bg-[#063c28]/80 hover:bg-[#063c28] text-white"
                                    >
                                        <ShoppingBag />
                                        Add to Cart
                                    </Button>
                                </div>
                            )}
                        </div>
                        <FavoriteButton product={currentProduct}>
                            {(isLiked) => (
                                <button
                                    type="button"
                                    className="group relative rounded-sm border border-[#3b9c3c]/80 dark:border-[#3b9c3c] p-1.5 text-[#3b9c3c]/80 dark:text-[#3b9c3c] hover:text-[#3b9c3c]"
                                >
                                    <Heart
                                        className={`h-5 w-5 ${isLiked ? 'fill-[#063c28] text-[#3b9c3c]' : ''}`}
                                    />
                                </button>
                            )}
                        </FavoriteButton>

                    </div>
                    <Accordion type="single" collapsible defaultValue="item">
                        <AccordionItem value="item">
                            <AccordionTrigger className="text-black dark:text-white">{currentProduct.name}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1 pt-0 pb-4">
                                <p className="flex items-center justify-between text-neutral-800 dark:text-gray-300">
                                    Brand:
                                    <span className="font-semibold text-neutral-900 dark:text-white"> {currentProduct.brand?.name}</span>
                                </p>
                                <p className="flex items-center justify-between text-neutral-800 dark:text-gray-300">
                                    Category:
                                    <span className="font-semibold text-neutral-900 dark:text-white">
                                        {currentProduct.category?.name}
                                    </span>
                                </p>
                                <p className="flex items-center justify-between text-neutral-800 dark:text-gray-300">
                                    Stock:
                                    <span className="font-semibold text-neutral-900 dark:text-white">
                                        {currentProduct.stock > 0 ? "Available" : "Unavailable"}
                                    </span>
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-gray-200 dark:border-white/10 py-5">
                        <div className="hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]">
                            <SquarePlus />
                            <p>Compare color</p>
                        </div>
                        <div className="hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]">
                            <CircleQuestionMark />
                            <p>Ask a question</p>
                        </div>
                        <div className="hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]">
                            <Truck />
                            <p>Delivery & Return</p>
                        </div>
                        <div className="hoverEffect flex items-center gap-2 text-sm text-black dark:text-gray-200 hover:text-red-600 dark:hover:text-[#3b9c3c]">
                            <Share2 />
                            <p>Share</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2.5 border border-b-0 border-[#52525b]/25 dark:border-white/10 p-3">
                            <Truck width={30} height={30} className="text-[#fb6c08]" />
                            <div>
                                <p className="text-[1rem] font-semibold text-black dark:text-white">Free Delivery</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 underline underline-offset-2">
                                    Enter your Postal code for Delivery Availability.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 border border-[#52525b]/25 dark:border-white/10 p-3">
                            <CornerDownLeft width={30} height={30} className="text-[#fb6c08]" />
                            <div>
                                <p className="text-[1rem] font-semibold text-black dark:text-white">Return Delivery</p>
                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                    Free 30days Delivery Returns.
                                    <span className="ml-1 underline underline-offset-2">Details</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
