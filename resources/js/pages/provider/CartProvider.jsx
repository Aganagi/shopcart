import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import React from "react";
import toast from "react-hot-toast";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = localStorage.getItem("cartItems");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    return Array.isArray(parsed)
                        ? parsed.map(item => ({
                            ...item,
                            price: Number(item.price) || 0,
                            discount: Number(item.discount) || 0,
                            stock: Number(item.stock) || 0,
                            quantity: Number(item.quantity) || 1,
                        }))
                        : [];
                }
            } catch (e) {
                // console.error("Error loading cart from localStorage:", e);
                localStorage.removeItem("cartItems");
            }
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addCart = useCallback((userId, product) => {
        let showSuccess = false;
        let showLimit = false;
        setCartItems(prev => {
            const existing = prev.find(i => i.product_id === product.id);

            if (existing) {
                if (existing.quantity < product.stock) {
                    showSuccess = true;
                    return prev.map(i =>
                        i.product_id === product.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                }
                showLimit = true;
                return prev;
            }
            showSuccess = true;
            return [
                ...prev,
                {
                    user_id: userId ?? 0,
                    product_id: product.id,
                    name: product.name,
                    price: product.sell_price,
                    stock: product.stock,
                    discount: product.discount,
                    image: product.image,
                    quantity: 1,
                    category: product.category?.name ?? "",
                }
            ];
        });
        if (showSuccess) {
            toast.success("Product added to cart.");
        }
        if (showLimit) {
            toast.error("Product limit reached.");
        }
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems(prev => prev.filter(i => i.product_id !== productId));
    }, []);

    const increment = useCallback((productId, stock) => {
        setCartItems(prev =>
            prev.map(item =>
                item.product_id === productId && item.quantity < stock
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
        toast.success("Product added to cart.")
    }, []);

    const decrement = useCallback((productId) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.product_id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
        toast.success("Product removed from cart.");
    }, []);

    const getQuantity = useCallback((productId) => {
        const item = cartItems.find(i => i.product_id === productId);
        return item ? item.quantity : 0;
    }, [cartItems]);

    const resetCart = useCallback(() => {
        setCartItems([]);
        if (typeof window !== "undefined") {
            localStorage.removeItem("cartItems");
            localStorage.removeItem("cart");
        }
    }, []);

    const totalCount = useMemo(
        () => cartItems.reduce((sum, i) => sum + i.quantity, 0),
        [cartItems]
    );

    const contextValue = useMemo(
        () => ({
            cartItems,
            addCart,
            removeFromCart,
            increment,
            decrement,
            getQuantity,
            totalCount,
            resetCart
        }),
        [
            cartItems,
            addCart,
            removeFromCart,
            increment,
            decrement,
            getQuantity,
            totalCount,
            resetCart
        ]
    );

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
