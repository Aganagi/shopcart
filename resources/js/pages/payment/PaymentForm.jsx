import { Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { CreditCard, Lock, ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "../provider/CartProvider";

export default function PaymentForm() {
    const { auth } = usePage().props;
    const { resetCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [total, setTotal] = useState(0);

    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedCartItems = sessionStorage.getItem('cartItems');
        const storedOrderData = sessionStorage.getItem('orderData');
        const storedTotal = sessionStorage.getItem('cartTotal');

        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
        if (storedOrderData) {
            setOrderData(JSON.parse(storedOrderData));
        }
        if (storedTotal) {
            setTotal(parseFloat(storedTotal));
        }

        if (!storedCartItems || !storedOrderData) {
            toast.error("No order data found. Please start from cart.");
            router.visit('/basket');
        }
    }, []);

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\D/g, '');
        const limited = cleaned.slice(0, 16);
        return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const formatExpiryDate = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const handleInputChange = (field, value) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        } else if (field === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setCardData(prev => ({ ...prev, [field]: formattedValue }));

        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
        if (!cleanCardNumber || cleanCardNumber.length !== 16) {
            newErrors.cardNumber = "Card number must be 16 digits";
        }

        if (!cardData.cardHolder.trim()) {
            newErrors.cardHolder = "Card holder name is required";
        }

        const cleanExpiry = cardData.expiryDate.replace(/\D/g, '');
        if (!cleanExpiry || cleanExpiry.length !== 4) {
            newErrors.expiryDate = "Expiry date must be MM/YY format";
        } else {
            const month = parseInt(cleanExpiry.slice(0, 2));
            if (month < 1 || month > 12) {
                newErrors.expiryDate = "Invalid month";
            }
        }

        if (!cardData.cvv || cardData.cvv.length !== 3) {
            newErrors.cvv = "CVV must be 3 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill all fields correctly");
            return;
        }

        if (!cartItems.length || !orderData) {
            toast.error("Invalid order data");
            return;
        }

        setLoading(true);

        const items = cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: Number(item.price) || 0,
            discount_price: item.discount > 0
                ? Number((item.price * (item.discount / 100)).toFixed(2))
                : null,
        }));

        router.post('/payment/processPayment', {
            items: items,
            name: orderData.name,
            surname: orderData.surname,
            address: orderData.address,
            phone: orderData.phone,
            card_number: cardData.cardNumber.replace(/\s/g, ''),
            card_holder: cardData.cardHolder,
            expiry_date: cardData.expiryDate,
            cvv: cardData.cvv,
        }, {
            onSuccess: () => {
                toast.success("Payment successful!");
                resetCart();
                sessionStorage.removeItem('cartItems');
                sessionStorage.removeItem('orderData');
                sessionStorage.removeItem('cartTotal');
            },
            onError: (errors) => {
                toast.error("Payment failed. Please try again.");
                setLoading(false);
            },
            onFinish: () => {
                setLoading(false);
            }
        });
    };

    const formatPrice = (value) => {
        const num = Number(value);
        return isNaN(num) ? "0.00" : num.toFixed(2);
    };

    if (!cartItems.length) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <Link href="/basket" className="inline-flex items-center gap-2 text-[#063c28] dark:text-[#7fc17f] hover:underline mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                </Link>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-neutral-300 dark:border-[#333] p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <ShoppingBag className="w-5 h-5 text-[#063c28] dark:text-[#7fc17f]" />
                            <h2 className="text-xl font-semibold text-black dark:text-white">Order Summary</h2>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto">
                            {cartItems.map((item) => {
                                const finalPrice = item.discount > 0
                                    ? item.price - (item.price * item.discount / 100)
                                    : item.price;

                                return (
                                    <div key={item.product_id} className="flex gap-4 border-b border-neutral-200 dark:border-[#333] pb-4 last:border-b-0">
                                        <div className="w-20 h-20 rounded-md overflow-hidden border border-neutral-300 dark:border-[#444]">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-black dark:text-white line-clamp-1">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                Quantity: {item.quantity}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                {item.discount > 0 ? (
                                                    <>
                                                        <span className="font-semibold text-[#063c28] dark:text-[#7fc17f]">
                                                            {formatPrice(finalPrice)}₼
                                                        </span>
                                                        <span className="text-sm line-through text-gray-500">
                                                            {formatPrice(item.price)}₼
                                                        </span>
                                                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">
                                                            -{item.discount}%
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-[#063c28] dark:text-[#7fc17f]">
                                                        {formatPrice(item.price)}₼
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-black dark:text-white">
                                                {formatPrice(finalPrice * item.quantity)}₼
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 pt-4 border-t border-neutral-300 dark:border-[#333]">
                            <div className="flex justify-between text-lg font-semibold text-black dark:text-white">
                                <span>Total Amount</span>
                                <span className="text-[#063c28] dark:text-[#7fc17f]">
                                    {formatPrice(total)}₼
                                </span>
                            </div>
                        </div>

                        {orderData && (
                            <div className="mt-6 pt-4 border-t border-neutral-300 dark:border-[#333]">
                                <h3 className="font-semibold text-black dark:text-white mb-3">Delivery Address</h3>
                                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <p><span className="font-medium text-black dark:text-white">Name:</span> {orderData.name} {orderData.surname}</p>
                                    <p><span className="font-medium text-black dark:text-white">Address:</span> {orderData.address}</p>
                                    <p><span className="font-medium text-black dark:text-white">Phone:</span> {orderData.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-neutral-300 dark:border-[#333] p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <CreditCard className="w-5 h-5 text-[#063c28] dark:text-[#7fc17f]" />
                            <h2 className="text-xl font-semibold text-black dark:text-white">Payment Details</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardData.cardNumber}
                                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.cardNumber
                                            ? 'border-red-500'
                                            : 'border-neutral-300 dark:border-[#444]'
                                    } bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`}
                                />
                                {errors.cardNumber && (
                                    <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Card Holder Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="JOHN DOE"
                                    value={cardData.cardHolder}
                                    onChange={(e) => handleInputChange('cardHolder', e.target.value.toUpperCase())}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.cardHolder
                                            ? 'border-red-500'
                                            : 'border-neutral-300 dark:border-[#444]'
                                    } bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`}
                                />
                                {errors.cardHolder && (
                                    <p className="text-sm text-red-500 mt-1">{errors.cardHolder}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={cardData.expiryDate}
                                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.expiryDate
                                                ? 'border-red-500'
                                                : 'border-neutral-300 dark:border-[#444]'
                                        } bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`}
                                    />
                                    {errors.expiryDate && (
                                        <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        value={cardData.cvv}
                                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-lg border ${
                                            errors.cvv
                                                ? 'border-red-500'
                                                : 'border-neutral-300 dark:border-[#444]'
                                        } bg-white dark:bg-[#0A0A0A] text-black dark:text-white focus:ring-2 focus:ring-[#063c28] dark:focus:ring-[#7fc17f] focus:border-transparent outline-none transition`}
                                    />
                                    {errors.cvv && (
                                        <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                                    )}
                                </div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                                        Secure Payment
                                    </p>
                                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                                        This is a demo payment system. No real transactions will be processed.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#063d29cc] dark:bg-[#2a6a2a] text-white py-3 rounded-lg font-semibold hover:bg-[#063c28] dark:hover:bg-[#1e4f1e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        Pay {formatPrice(total)}₼
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
