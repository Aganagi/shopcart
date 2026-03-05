import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Flame, LoaderCircle, Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FavoriteButton from '@/components/FavoriteButton';
import { useCart } from '../provider/CartProvider';
import Rating from '../rating/rating';
import NoProduct from '@/components/NoProduct';


export default function ProductList({ products }) {
    const { auth } = usePage().props;
    const userId = auth?.user?.id || 0;
    const { addCart, increment, decrement, getQuantity } = useCart();
    const safeProducts = Array.isArray(products) ? products : [];

    return (
        <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {safeProducts.map((product) => (
                        <div key={product.id} className="opacity-100">
                            <div className="text-sm border rounded-md border-[#6c7fd8]/20 group bg-white dark:bg-[#0f0f13] dark:border-[#2b2b36] overflow-hidden">
                                <div className="relative group overflow-hidden bg-[#f6f6f6] dark:bg-[#1a1a1f]">
                                    <Link href={`/product/${product.id}`}>
                                        <img
                                            src={`/storage/${product.image}`}
                                        alt={product.name}
                                        className="w-full h-64 object-contain transition-transform duration-500 bg-shop_light_bg group-hover:scale-105 dark:bg-[#1a1a1f]"
                                        />
                                    </Link>
                                    <div className="absolute top-2 right-2">
                                        <FavoriteButton product={product} />
                                    </div>

                                    {product.discount > 0 ? (
                                        <p className="absolute top-2 left-2 z-10 text-xs text-black border border-[#15151580] px-2 rounded-full group-hover:border-[#016630] hover:text-[#063c28cc] hoverEffect animate-pulse-scale dark:text-green-800 dark:border-white/40 dark:hover:border-[#3dd68c]">
                                            Sale!
                                        </p>
                                    ) : (
                                        <Link href="/hot-deal" className="absolute top-2 left-2 z-10 border border-[#fb6c0880] p-1 rounded-full group-hover:border-[#fb6c08]/50 hover:text-[#016630] hoverEffect dark:border-[#ff8a3d80] dark:hover:border-[#ff8a3d]">
                                            <Flame size={16} fill="#fb6c08" className="text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect dark:text-[#ff8a3d]" />
                                        </Link>
                                    )}
                                </div>
                                <div className="p-3 flex flex-col gap-2">
                                    <p className="uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-gray-400">
                                        {product.category?.name}
                                    </p>
                                    <h2 className="font-semibold text-[1rem] line-clamp-1 text-neutral-800 dark:text-gray-100">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center gap-0 -ml-2">
                                        <Rating rating={product.average_rating || 0}
                                            productId={product.id} />
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        {product.stock > 0 ? (
                                            <>
                                                <p className="font-medium text-neutral-800 dark:text-gray-100">In Stock</p>
                                                <p className="text-[#063c28]/80 font-semibold dark:text-[#4ade80]">{product.stock}</p>
                                            </>
                                        ) : (
                                            <p className="text-[#737373] font-semibold dark:text-gray-500">Out of Stock</p>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between gap-5">
                                        <div className="flex items-center gap-2">
                                            {Number(product.discount) > 0 ? (
                                                <div>
                                                    <span className="font-semibold text-[#063c28] text-sm dark:text-[#4ade80]">
                                                        {(
                                                            Number(product.sell_price) -
                                                            (Number(product.sell_price) * Number(product.discount)) / 100
                                                        ).toFixed(2)}₼
                                                    </span>

                                                    <span className="line-through ml-1 font-normal text-zinc-500 text-sm dark:text-gray-500">
                                                        {(Number(product.sell_price) || 0).toFixed(2)}₼
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="font-semibold text-[#063c28] text-sm dark:text-[#4ade80]">
                                                    {(Number(product.sell_price) || 0).toFixed(2)}₼
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {getQuantity(product.id) > 0 ? (
                                        <div className="w-full h-12 flex items-center">
                                            <div className="text-sm w-full">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-[#737373] dark:text-gray-300">Quantity</span>
                                                    <div className="flex items-center gap-1 pb-1 text-[1rem]">
                                                        <Button onClick={() => decrement(product.id)} className="w-6 h-6 border-0 bg-white hover:bg-[#063c28]/20 text-neutral-900 dark:bg-[#1a1a1f] dark:text-gray-100 dark:hover:bg-[#1a4030]">
                                                            <Minus />
                                                        </Button>

                                                        <span className="font-semibold text-sm w-6 text-center text-neutral-900 dark:text-gray-100">
                                                            {getQuantity(product.id)}
                                                        </span>

                                                        <Button onClick={() => increment(product.id, product.stock)} disabled={getQuantity(product.id) >= product.stock} className="w-6 h-6 border-0 bg-white hover:bg-[#063c28]/20 text-neutral-900 dark:bg-[#1a1a1f] dark:text-gray-100 dark:hover:bg-[#1a4030]">
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between border-t pt-1 dark:border-gray-700">
                                                    <span className="text-xs text-neutral-900 font-semibold dark:text-gray-300">
                                                        Subtotal
                                                    </span>
                                                    <span className="text-sm font-semibold text-neutral-950 dark:text-gray-100">
                                                        {(
                                                            (product.sell_price - product.sell_price * (product.discount / 100)) *
                                                            getQuantity(product.id)
                                                        ).toFixed(2)}₼
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-12 flex items-center">
                                            <Button onClick={() => addCart(userId, product)} disabled={product.stock <= 0} className="h-9 px-4 py-2 w-36 rounded-full bg-[#063c28]/80 text-[#f8f8fb] border border-[#063c28]/80 hover:bg-[#063c28] hover:text-white hover:border-[#063c28] font-semibold tracking-wide dark:bg-[#063c28]/80 dark:border-[#063c28]/80 dark:hover:bg-[#063c28]">
                                                <ShoppingBag /> Add to Cart
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {safeProducts.length === 0 && (
                    <NoProduct />
                )}
            </div>
        </div>
    );
}
