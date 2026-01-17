import { Button } from '@/components/ui/button'
import { Link, usePage } from '@inertiajs/react'
import { Flame, LoaderCircle, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../provider/CartProvider'
import FavoriteButton from '@/components/FavoriteButton'
import Rating from '../rating/rating'
import NoProduct from '@/components/NoProduct'

export default function HotDeal({ products }) {
    const { auth } = usePage().props || { auth: {} }
    const userId = auth?.user?.id || 0
    const { addCart, increment, decrement, getQuantity } = useCart()
    return (
        <div className="py-10 bg-[#f1f3f8] dark:bg-[#0A0A0A]">
            <div className="max-w-(--breakpoint-xl) mx-auto px-4">
                <h2 className="font-semibold mb-5 underline underline-offset-4 decoration-1 text-[1rem] text-neutral-900 dark:text-neutral-100 uppercase tracking-wide">
                    Hot Deals of the Week
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {products.map((product) => (
                        <div style={{ opacity: 1 }} key={product.id}>
                            <div className="text-sm border rounded-md border-[#6c7fd8]/20 group bg-white dark:bg-neutral-800 dark:border-neutral-700 overflow-hidden">
                                <div className="relative group overflow-hidden bg-[#f6f6f6] dark:bg-neutral-700">
                                    <Link href={`/product/${product.id}`}>
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-64 object-contain overflow-hidden transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </Link>

                                    <div className="absolute top-2 right-2">
                                        <FavoriteButton product={product} />
                                    </div>

                                    {product.discount > 0 ? (
                                        <p className="absolute top-2 left-2 z-10 text-xs text-black dark:text-neutral-200 border border-[#15151580]/50 dark:border-neutral-400 px-2 rounded-full group-hover:border-[#016630] hover:text-[#063c28cc] hoverEffect animate-pulse-scale">
                                            Sale!
                                        </p>
                                    ) : (
                                        <Link
                                            href={`/product/${product.id}`}
                                            className="absolute top-2 left-2 z-10 border border-[#fb6c0880] p-1 rounded-full group-hover:border-[#fb6c08]/50 hover:text-[#016630] hoverEffect"
                                        >
                                            <Flame size={16} fill="#fb6c08" className="text-[#fb6c08]/50 group-hover:text-[#fb6c08] hoverEffect" />
                                        </Link>
                                    )}
                                </div>

                                <div className="p-3 flex flex-col gap-2">
                                    <p className="uppercase line-clamp-1 text-xs font-medium text-[#ababab] dark:text-neutral-400">
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
                                                <p className="font-medium text-neutral-800 dark:text-neutral-200">In Stock</p>
                                                <p className="text-[#063c28]/80 dark:text-green-300 font-semibold">{product.stock}</p>
                                            </>
                                        ) : (
                                            <p className="text-[#737373] dark:text-neutral-500 font-semibold">Out of Stock</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between gap-5">
                                        <div className="flex items-center gap-2">
                                            {product.discount > 0 ? (
                                                <div>
                                                    <span className="font-semibold text-[#063c28] dark:text-green-300 text-sm">
                                                        {(
                                                            Number(product.sell_price) -
                                                            (Number(product.sell_price) * Number(product.discount)) / 100
                                                        ).toFixed(2)}₼
                                                    </span>
                                                    <span className="line-through font-normal text-zinc-500 dark:text-neutral-400 text-sm">
                                                        {(Number(product.sell_price) || 0).toFixed(2)}₼
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="font-semibold text-[#063c28] dark:text-green-300 text-sm">
                                                    {(Number(product.sell_price) || 0).toFixed(2)}₼
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {getQuantity(product.id) > 0 ? (
                                        <div className="w-full h-12 flex items-center">
                                            <div className="text-sm w-full">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-[#737373] dark:text-neutral-400">Quantity</span>
                                                    <div className="flex items-center gap-1 pb-1 text-[1rem]">
                                                        <Button
                                                            onClick={() => decrement(product.id)}
                                                            className="w-6 h-6 bg-white dark:bg-neutral-700 border-0 hover:bg-[#063c28]/20 dark:hover:bg-neutral-600"
                                                        >
                                                            <Minus />
                                                        </Button>

                                                        <span className="font-semibold text-sm w-6 text-center text-neutral-900 dark:text-neutral-200">
                                                            {getQuantity(product.id)}
                                                        </span>

                                                        <Button
                                                            onClick={() => increment(product.id, product.stock)}
                                                            disabled={getQuantity(product.id) >= product.stock}
                                                            className="w-6 h-6 bg-white dark:bg-neutral-700 border-0 hover:bg-[#063c28]/20 dark:hover:bg-neutral-600"
                                                        >
                                                            <Plus />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t pt-1 border-neutral-200 dark:border-neutral-700">
                                                    <span className="text-xs text-neutral-900 dark:text-neutral-200 font-semibold">Subtotal</span>
                                                    <span className="text-sm font-semibold text-neutral-950 dark:text-neutral-100">
                                                        ${(
                                                            (product.sell_price - product.sell_price * (product.discount / 100)) *
                                                            getQuantity(product.id)
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-12 flex items-center">
                                            <Button
                                                onClick={() => addCart(userId, product)}
                                                disabled={product.stock <= 0}
                                                className="h-9 px-4 py-2 bg-[#063c28]/80 text-[#f8f8fb] hover:bg-[#063c28] w-36 rounded-full font-semibold tracking-wide dark:bg-green-800 dark:hover:bg-green-700"
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
                {products.length === 0 && (
                    <NoProduct />
                )}
            </div>
        </div>
    )
}