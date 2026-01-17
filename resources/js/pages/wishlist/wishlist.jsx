import { Link, router, usePage } from '@inertiajs/react'
import { Heart, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../provider/CartProvider'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useLikes } from '../provider/LikesProvider'
import useFlashMessages from '@/hooks/useFlashMessages'

export default function Wishlist({ products = [] }) {
    const { auth, flash } = usePage().props
    const userId = auth?.user?.id || 0
    const { addCart, increment, decrement, getQuantity } = useCart()
    const {
        guestProducts,
        removeGuestProduct,
        resetGuestWishlist,
        removeLikedIdLocal,
        setLikedIds
    } = useLikes()

    const displayedProducts = auth?.user ? products : guestProducts

    useEffect(() => {
        if (flash?.success) toast.success(flash.success)
        if (flash?.error) toast.error(flash.error)
    }, [flash])
    const removeFromWishlist = (id) => {
        if (auth?.user) {
            router.delete(`/wishlist/${id}`, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    removeLikedIdLocal(id)
                }
            })
        } else {
            removeGuestProduct(id)
        }
    }
    const resetWishlist = () => {
        if (auth?.user) {
            router.delete('/wishlist/reset', {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setLikedIds([])
                }
            })
        } else {
            resetGuestWishlist()
        }
    }

    useFlashMessages();

    if (!displayedProducts || displayedProducts.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
                <div className="relative mb-4">
                    <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#737373]/20 animate-ping"></div>
                    <Heart className="w-12 h-12 text-[#737373] dark:text-gray-300" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl text-neutral-900 dark:text-white font-semibold tracking-tight">
                        Your wishlist is empty
                    </h2>
                    <p className="text-sm text-[#737373] dark:text-gray-400">
                        Items added to your wishlist will appear here
                    </p>
                </div>
                <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                    text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring
                    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
                    [&_svg]:size-4 [&_svg]:shrink-0 bg-[#063d29]/80 text-white font-semibold
                    shadow-sm hover:bg-[#063d29] hoverEffect h-9 px-4 py-2"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 my-10">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="border-b border-neutral-200 dark:border-neutral-700">
                        <tr className="bg-white/10 dark:bg-[#0A0A0A] rounded-md">
                            <th className="p-2 text-left text-black dark:text-gray-200 font-semibold">Image</th>
                            <th className="p-2 text-left text-black dark:text-gray-200 font-semibold hidden md:table-cell">Category</th>
                            <th className="p-2 text-left text-black dark:text-gray-200 font-semibold hidden md:table-cell">Brand</th>
                            <th className="p-2 text-left text-black dark:text-gray-200 font-semibold hidden md:table-cell">Status</th>
                            <th className="p-2 text-left text-black dark:text-gray-200 font-semibold">Price</th>
                            <th className="p-2 text-center text-black dark:text-gray-200 font-semibold md:text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProducts.map((product, idx) => (
                            <tr
                                className="border-b border-neutral-200 dark:border-neutral-700"
                                key={`${product.id ?? 'p'}-${idx}`}
                            >
                                <td className="px-2 py-4 flex items-center gap-2">
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="cursor-pointer"
                                        type="button"
                                    >
                                        <X
                                            width={18}
                                            height={18}
                                            className="text-gray-700 dark:text-gray-300 hover:text-[#063c28] hoverEffect"
                                        />
                                    </button>
                                    <Link
                                        href={`/product/${product.id}`}
                                        className="border border-neutral-200 dark:border-neutral-700 rounded-md group hidden md:inline-flex"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            loading="lazy"
                                            className="rounded-md group-hover:scale-105 hoverEffect h-20 w-20 object-contain"
                                        />
                                    </Link>
                                    <p className="line-clamp-1 text-black dark:text-white">
                                        {product.name}
                                    </p>
                                </td>
                                <td className="p-2 capitalize hidden md:table-cell">
                                    <p className="uppercase line-clamp-1 text-xs text-black dark:text-gray-300 font-medium">
                                        {product.category?.name}
                                    </p>
                                </td>
                                <td className="p-2 capitalize hidden md:table-cell text-black dark:text-gray-300">
                                    {product.brand?.name}
                                </td>
                                <td className="p-2 w-24 text-green-600 font-medium text-sm hidden md:table-cell">
                                    {product.is_active ? 'In Stock' : 'Out of Stock'}
                                </td>
                                <td className="p-2">
                                    {Number(product.discount) > 0 ? (
                                        <span className="font-semibold text-[#063c28] dark:text-[#60d394] text-sm">
                                            {(
                                                Number(product.sell_price) *
                                                (1 - Number(product.discount) / 100)
                                            ).toFixed(2)}₼
                                        </span>
                                    ) : (
                                        <span className="text-sm font-semibold text-black dark:text-gray-200">
                                            {Number(product.sell_price).toFixed(2)}₼
                                        </span>
                                    )}
                                </td>
                                <td className="p-2">
                                    <div className="w-full h-12 flex items-center">
                                        {getQuantity(product.id) > 0 ? (
                                            <div className="w-full h-12 flex items-center">
                                                <div className="text-sm w-full">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-[#737373] dark:text-gray-300">
                                                            Quantity
                                                        </span>

                                                        <div className="flex items-center gap-1 pb-1 text-[1rem]">
                                                            <Button
                                                                onClick={() => decrement(product.id)}
                                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                                                                rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden
                                                                focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none
                                                                disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                                                border-[#e5e5e5] dark:border-neutral-700 dark:text-white bg-white dark:bg-neutral-900 shadow-xs
                                                                hover:text-neutral-900 dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20"
                                                            >
                                                                <Minus />
                                                            </Button>

                                                            <span className="font-semibold text-sm w-6 text-center text-neutral-900 dark:text-white">
                                                                {getQuantity(product.id)}
                                                            </span>

                                                            <Button
                                                                onClick={() => increment(product.id, product.stock)}
                                                                disabled={getQuantity(product.id) >= product.stock}
                                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                                                                rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden
                                                                focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none
                                                                disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
                                                                border-[#e5e5e5] dark:border-neutral-700 dark:text-white bg-white dark:bg-neutral-900 shadow-xs
                                                                hover:text-neutral-900 dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20"
                                                            >
                                                                <Plus />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between border-t dark:border-neutral-700 pt-1">
                                                        <span className="text-xs text-neutral-900 dark:text-gray-300 font-semibold">
                                                            Subtotal
                                                        </span>

                                                        <span className="text-sm font-semibold text-neutral-950 dark:text-white">
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
                                                <button
                                                    type="button"
                                                    onClick={() => addCart(userId, product)}
                                                    disabled={product.stock <= 0}
                                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                                                    text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1
                                                    focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                                                    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hoverEffect h-9 px-4 py-2
                                                    bg-[#063c28]/80 text-white shadow-none border border-[#063c28]/80
                                                    font-semibold tracking-wide hover:text-white hover:bg-[#063c28] hover:border-[#063c28]
                                                    dark:bg-[#063c28] dark:border-[#063c28] w-full"
                                                >
                                                    <ShoppingBag />
                                                    Add to Cart
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div  className='flex justify-between'>
                <button
                    type="button"
                    onClick={resetWishlist}
                    className="m-2.5 border px-6 py-3 border-[#063c28]/50 dark:border-[#4b725f] font-semibold text-black
                dark:text-white hover:text-[#063c28] hover:border-[#063c28] hover:bg-[#063c28]/10
                dark:hover:text-[#60d394] dark:hover:border-[#60d394] rounded-md hoverEffect"
                >
                    Reset Favorite
                </button>
                <Link href="/basket" className='m-2.5 border px-6 py-3 border-[#063c28]/50 dark:border-[#4b725f] font-semibold text-black
                dark:text-white hover:text-[#063c28] hover:border-[#063c28] hover:bg-[#063c28]/10
                dark:hover:text-[#60d394] dark:hover:border-[#60d394] rounded-md hoverEffect'>
                    Buy
                </Link>
            </div>
        </div>
    )
}