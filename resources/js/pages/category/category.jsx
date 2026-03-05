import { Button } from '@/components/ui/button'
import { Link, router, usePage } from '@inertiajs/react'
import { Flame, LoaderCircle, Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../provider/CartProvider';
import FavoriteButton from '@/components/FavoriteButton';
import Rating from '../rating/rating';
import NoProduct from '@/components/NoProduct';

export default function Category({ products, categories, selectedCategory }) {
    const { auth } = usePage().props;
    const userId = auth?.user?.id || 0;

    const { addCart, increment, decrement, getQuantity } = useCart();

    const [selectedCategoryId, setSelectedCategoryId] = useState(selectedCategory?.id);
    const [currentCategory, setCurrentCategory] = useState(selectedCategory);

    useEffect(() => {
        if (selectedCategory) {
            setCurrentCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const filteredProducts = currentCategory
        ? products.filter(p => p.category_id === currentCategory.id)
        : products;
    return (
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 py-10">
            <h2 className="font-semibold text-xl text-black dark:text-gray-100">
                Products by Category:
                <span className="font-semibold text-green-600 capitalize tracking-wide ml-1.5 dark:text-green-400">
                    {currentCategory?.name}
                </span>
            </h2>
            <div className="py-5 flex flex-col md:flex-row items-start gap-5">
                <div className="flex flex-col md:min-w-40 border border-neutral-200 dark:border-gray-700">
                    {categories.map(category => (
                        <div key={category.id}>
                            <button
                                type="button"
                                onClick={() => {
                                    router.get(`/category/${category.name}`);
                                }}
                                className={`inline-flex w-full items-center justify-center gap-2 whitespace-nowrap text-sm
                                    focus-visible:outline-hidden transition-colors
                                    h-9 border-0 p-0 rounded-none shadow-none font-semibold 
                                    border-b border-b-neutral-200 dark:border-gray-700 capitalize
                                    ${selectedCategoryId === category.id
                                        ? "bg-[#f02757] text-white dark:bg-[#f02757]"
                                        : "text-black dark:text-gray-100 hover:bg-[#f02757] hover:text-white bg-transparent"
                                    }`}
                            >
                                <p className="w-full text-left px-2 truncate ">{category.name}</p>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                        {filteredProducts.map(product => (
                            <div className="opacity-[1]" key={product.id}>
                                <div className="text-sm border rounded-md overflow-hidden border-[#6c7fd8]/20 group bg-white dark:bg-[#1a1a1a] dark:border-gray-700">
                                    <div className="relative group overflow-hidden bg-[#f6f6f6] dark:bg-[#2a2a2a]">
                                        <Link href={`/product/${product.id}`}>
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                loading="lazy"
                                                className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </Link>
                                        <div className="absolute top-2 right-2">
                                            <FavoriteButton product={product} />
                                        </div>
                                        {product.discount > 0 ? (
                                            <p className="absolute top-2 left-2 z-10 text-xs text-black dark:text-green-300 border border-[#15151580] dark:border-gray-600 px-2 rounded-full group-hover:border-[#016630] hover:text-[#063c28cc] hoverEffect animate-pulse-scale">
                                                Sale!
                                            </p>
                                        ) : (
                                            <Link
                                                href="/hot-deal"
                                                className="absolute top-2 left-2 z-10 border border-[#fb6c0880] dark:border-[#fb6c08] p-1 rounded-full group-hover:border-[#fb6c08]/50"
                                            >
                                                <Flame size={16} fill="#fb6c08" className="text-[#fb6c08]/50 group-hover:text-[#fb6c08]" />
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
                                        <div className="flex items-center">
                                            <Rating rating={product.average_rating || 0}
                                                productId={product.id} />
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            {product.stock > 0 ? (
                                                <>
                                                    <p className="font-medium text-neutral-800 dark:text-gray-200">In Stock</p>
                                                    <p className="text-[#063c28]/80 dark:text-[#93D991] font-semibold">{product.stock}</p>
                                                </>
                                            ) : (
                                                <p className="text-[#737373] dark:text-gray-500 font-semibold">Out of Stock</p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between gap-5">
                                            <div className="flex items-center gap-2">
                                                {product.discount > 0 ? (
                                                    <div>
                                                        <span className="font-semibold text-[#063c28] dark:text-[#93D991] text-sm">
                                                            ${(Number(product.sell_price) - (Number(product.sell_price) * Number(product.discount) / 100)).toFixed(2)}
                                                        </span>
                                                        <span className="line-through font-normal text-zinc-500 dark:text-gray-500 text-sm">
                                                            ${Number(product.sell_price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="font-semibold text-[#063c28] dark:text-[#93D991] text-sm">
                                                        ${Number(product.sell_price).toFixed(2)}
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
                                                                className="w-6 h-6 bg-white dark:bg-[#2a2a2a] text-neutral-700 dark:text-gray-200 rounded-md hover:bg-[#063c28]/20"
                                                            >
                                                                <Minus />
                                                            </Button>

                                                            <span className="font-semibold text-sm w-6 text-center text-neutral-900 dark:text-gray-200">
                                                                {getQuantity(product.id)}
                                                            </span>

                                                            <Button
                                                                onClick={() => increment(product.id, product.stock)}
                                                                disabled={getQuantity(product.id) >= product.stock}
                                                                className="w-6 h-6 bg-white dark:bg-[#2a2a2a] text-neutral-700 dark:text-gray-200 rounded-md hover:bg-[#063c28]/20"
                                                            >
                                                                <Plus />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between border-t pt-1 dark:border-gray-700">
                                                        <span className="text-xs text-neutral-900 dark:text-gray-200 font-semibold">Subtotal</span>

                                                        <span className="text-sm font-semibold text-neutral-950 dark:text-gray-100">
                                                            ${(
                                                                (Number(product.sell_price) -
                                                                    Number(product.sell_price) * (Number(product.discount) / 100)) *
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
                                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm
                                                    h-9 px-4 py-2 bg-[#063c28]/80 dark:bg-[#063c28]/80
                                                    text-[#f8f8fb] border border-[#063c28]/80 dark:border-[#063c28]/80
                                                    tracking-wide w-36 rounded-full hover:bg-[#063c28]"
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
                        <NoProduct />
                    )}
                </div>
            </div>
        </div>
    );
}