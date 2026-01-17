import { Link, router, usePage } from "@inertiajs/react";
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Address from "./address";
import { useCart } from "../provider/CartProvider";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AuthModal from "../auth/auth";

export default function Basket() {
    const auth = usePage().props.auth;
    const { cartItems, increment, decrement, removeFromCart, resetCart } = useCart();
    const subTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);
    const totalDiscount = cartItems.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const discount = Number(item.discount) || 0;
        return sum + (price * (discount / 100)) * item.quantity;
    }, 0);
    const total = subTotal - totalDiscount;
    const [addressFilled, setAddressFilled] = useState(false);

    const handleProceed = () => {
        if (!addressFilled) {
            toast.error("Please fill in your delivery address first!", {
                duration: 4000,
                style: {
                    background: '#ef4444',
                    color: '#fff',
                },
            });
            return;
        }
        toast.success("Proceeding to checkout...");
        router.visit('/payment');
    };

    const formatPrice = (value) => {
        const num = Number(value);
        return isNaN(num) ? "0.00" : num.toFixed(2);
    };
    const [loginOpen, setLoginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)

    // Обработчик успешного создания заказа
    const handleOrderSuccess = () => {
        // Очищаем корзину после успешного заказа
        resetCart();
        setAddressFilled(false);
    };

    // Обработчик кнопки Reset Cart
    const handleResetCart = () => {
        resetCart();
        toast.success("Cart cleared.");
    };

    if (cartItems.length === 0) {
        return (
            <div className="py-10 md:py-20 bg-gradient-to-bottom from-blue-50 dark:from-[#111] to-white dark:to-[#1a1a1a] flex items-center justify-center p-4">
                <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl shadow-xl dark:shadow-none p-8 max-w-md w-full space-y-8">
                    <div className="relative w-48 h-48 mx-auto">
                        <img
                            src="/storage/images/emptyCart.png"
                            alt="Empty Cart"
                            loading="lazy"
                            className="drop-shadow-lg absolute h-full w-full inset-0 object-contain animate-swingZoom"
                        />
                        <div className="absolute -top-4 -right-4 bg-blue-500 rounded-full p-2 animate-floatZoom">
                            <ShoppingCart className="text-white" />
                        </div>
                    </div>
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                            Your cart is feeling lonely
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            It looks like you haven't added anything to your cart yet. Let's
                            change that and find some amazing products for you!
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/shop"
                            className="block bg-black/5 dark:bg-gray-800 border border-black/20 dark:border-[#333] text-center py-2.5 rounded-full text-sm text-black dark:text-white font-semibold tracking-wide hover:border-black hover:bg-black dark:hover:bg-[#222] hover:text-white transition"
                        >
                            Discover Products
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    if (!auth?.user) {
        return (
            <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 dark:bg-[#0A0A0A] p-4">
                <div className="rounded-xl border border-neutral-200 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-sm w-full max-w-md">
                    <div className="flex flex-col p-6 space-y-1">
                        <div className="flex justify-center">
                            <Link href="/">
                                <h2 className="text-2xl text-[#063c28] dark:text-[#7fc17f] font-black tracking-wider uppercase hover:text-[#3b9c3c] dark:hover:text-[#063c28] hoverEffect group">
                                    Shopcar
                                    <span className="text-[#3b9c3c] dark:text-[#063c28] group-hover:text-[#063c28] dark:group-hover:text-[#7fc17f] hoverEffect">t</span>
                                </h2>
                            </Link>
                        </div>
                        <div className="tracking-tight text-2xl font-semibold text-center">
                            Welcome Back!
                        </div>
                    </div>
                    <div className="p-6 pt-0 space-y-4">
                        <p className="text-[#737373] dark:text-gray-300 text-center font-medium">
                            Log in to view your cart items and checkout. Don't miss out on your favorite products!
                        </p>
                        <Dialog open={loginOpen} onOpenChange={setLoginOpen} onClose={() => setLoginOpen(false)}>
                            <DialogTrigger asChild>
                                <button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm
                                    transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring
                                    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4
                                    [&_svg]:shrink-0 bg-[#063d29cc] text-white shadow-sm hover:bg-[#063c28]
                                    dark:bg-[#2a6a2a] dark:hover:bg-[#1e4f1e] hoverEffect h-10 rounded-md px-8 w-full font-semibold"
                                >
                                    Sign in
                                </button>
                            </DialogTrigger>
                            <AuthModal defaultTab="login" isOpen={loginOpen} onClose={() => setRegisterOpen(false)} />
                        </Dialog>
                    </div>
                    <div className="items-center p-6 pt-0 flex flex-col space-y-2">
                        <div className="text-sm text-muted-foreground dark:text-gray-400 text-center">
                            Don't have an account?
                        </div>
                        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                            <DialogTrigger asChild>
                                <button
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm
                                    font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1
                                    focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
                                    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-[#e5e5e5] dark:border-[#444]
                                    bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-xs hover:bg-[#f5f5f5] dark:hover:bg-[#222] hover:text-black h-10 rounded-md px-8 w-full"
                                >
                                    Create an account
                                </button>
                            </DialogTrigger>
                            <AuthModal defaultTab="register" isOpen={registerOpen} />
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 dark:bg-[#0A0A0A] pb-52 md:pb-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-2 py-5">
                    <ShoppingBag className="w-6 h-6 text-black dark:text-white" />
                    <h1 className="text-2xl text-black dark:text-white font-semibold">Shopping Cart</h1>
                </div>
                <div className="grid lg:grid-cols-3 md:gap-8">
                    <div className="lg:col-span-2 rounded-lg">
                        <div className="border border-neutral-300 dark:border-[#333] bg-white dark:bg-[#1a1a1a] rounded-md">
                            {cartItems.map((item) => (
                                <div key={`${item.product_id}-${item.name}`}
                                     className="border-b border-neutral-300 dark:border-[#333] p-2.5 last:border-b-0 flex items-center justify-between gap-5">
                                    <div className="flex flex-1 items-start gap-2 h-36 md:h-44">
                                        <Link href={`/product/${item.product_id}`} className="border border-neutral-300 dark:border-[#444] p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                loading="lazy"
                                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500 bg-transparent"
                                            />
                                        </Link>
                                        <div className="h-full flex flex-1 flex-col justify-between py-1">
                                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                                                <h2 className="text-[1rem] text-neutral-900 dark:text-white font-semibold line-clamp-1">
                                                    {item.name}
                                                </h2>
                                                <p className="text-sm text-neutral-800 dark:text-gray-300 capitalize">
                                                    Category:
                                                    <span className="font-semibold text-black dark:text-white ml-1.5">
                                                        {item.category}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-neutral-800 dark:text-gray-300 capitalize">
                                                    Discount:
                                                    <span className="font-semibold text-black dark:text-white ml-1.5">
                                                        {item.discount > 0 ? item.discount : 0}%
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div>
                                                    <FavoriteButton product={{ id: item.product_id, name: item.name, image: item.image, price: item.price }} />
                                                </div>
                                                <button type="button" onClick={() => removeFromCart(item.product_id)}>
                                                    <Trash className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 hoverEffect" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1">
                                        {item.discount > 0 ? (
                                            <div>
                                                <span className="font-semibold text-[#063c28] dark:text-[#7fc17f] text-lg">
                                                    ${formatPrice(item.price - (item.price * item.discount / 100))}
                                                </span> <br />
                                                <span className="line-through font-normal text-zinc-500 dark:text-gray-500 text-md">
                                                    ${formatPrice(item.price)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="font-semibold text-[#063c28] dark:text-[#7fc17f] text-lg">
                                                ${formatPrice(item.price)}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1 pb-1 text-[1rem]">
                                            <button type="button" onClick={() => decrement(item.product_id)}
                                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-neutral-900 dark:text-white font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-white dark:bg-[#222] shadow-xs dark:shadow-none hover:text-[#171717] dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20">
                                                <Minus />
                                            </button>
                                            <span className="font-semibold text-sm w-6 text-center text-black dark:text-white">{item.quantity}</span>
                                            <button type="button" onClick={() => increment(item.product_id, item.stock)}
                                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-neutral-900 dark:text-white font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-input bg-white dark:bg-[#222] shadow-xs dark:shadow-none hover:text-[#171717] dark:hover:text-white w-6 h-6 border-0 hover:bg-[#063c28]/20">
                                                <Plus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={handleResetCart}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#ef4444] dark:bg-[#cc3333] text-white shadow-xs dark:shadow-none hover:bg-[#ef4444]/90 dark:hover:bg-[#dd5555] h-9 px-4 py-2 m-5 font-semibold cursor-pointer">
                                Reset Cart
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="lg:col-span-1">
                            <div className="hidden md:inline-block w-full bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-neutral-300 dark:border-[#333]">
                                <h2 className="text-xl text-neutral-800 dark:text-white font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-800 dark:text-white">SubTotal</span>
                                        <span className="text-sm font-semibold text-black dark:text-white">${subTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-800 dark:text-white">Total Discount</span>
                                        <span className="text-sm font-semibold text-black dark:text-white">${totalDiscount.toFixed(2)}</span>
                                    </div>
                                    <div className="shrink-0 bg-[#e5e5e5] dark:bg-[#333] h-px w-full"></div>
                                    <div className="flex justify-between font-semibold text-lg text-neutral-800 dark:text-white">
                                        <span>Total</span>
                                        <span className="text-lg font-semibold text-black dark:text-white">${total.toFixed(2)}</span>
                                    </div>
                                    <button type="button"
                                            onClick={handleProceed}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#063d29cc] dark:bg-[#2a6a2a] text-white shadow-sm dark:shadow-none hover:bg-[#063c28] dark:hover:bg-[#1e4f1e] hoverEffect h-10 px-8 w-full rounded-full font-semibold tracking-wide">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-[#1a1a1a] rounded-md mt-5">
                                <div className="rounded-xl border border-neutral-300 dark:border-[#333] bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-sm dark:shadow-none">
                                    <div className="flex flex-col space-y-1.5 p-6">
                                        <div className="font-semibold leading-none tracking-tight text-neutral-800 dark:text-white">
                                            Delivery Address
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <Address
                                            onAddressSubmit={handleOrderSuccess}
                                            cartItems={cartItems}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
