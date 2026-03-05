import { usePage, router } from "@inertiajs/react";
import { createContext, useCallback, useContext, useEffect, useState, useRef } from "react";

const LikesContext = createContext(undefined);
const LS_IDS = "wishlist_ids";
const LS_PRODUCTS = "wishlist";

if (typeof window !== "undefined" && !window.__wishlistStore) {
    let savedIds = [];
    let savedProducts = [];
    try {
        savedIds = JSON.parse(localStorage.getItem("wishlist_ids") || "[]");
        savedProducts = JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch { }

    window.__wishlistStore = {
        likedItems: Array.isArray(savedIds) ? savedIds : [],
        guestProducts: Array.isArray(savedProducts) ? savedProducts : [],
        initialized: false,
        currentUserId: null,
        listeners: new Set()
    };
}

const getGlobalStore = () => {
    if (typeof window === "undefined") {
        return { likedItems: [], guestProducts: [], initialized: false, currentUserId: null, listeners: new Set() };
    }
    return window.__wishlistStore;
}

const notifyListeners = () => {
    const store = getGlobalStore();
    store.listeners.forEach(listener => listener());
};

export const LikesProvider = ({ children }) => {
    const { props } = usePage();
    const auth = props?.auth;
    const initialLikedIds = props?.initialLikedIds ?? [];
    const store = getGlobalStore();
    const [updateCounter, setUpdateCounter] = useState(0);
    const syncInProgressRef = useRef(false);
    const hasLoadedGuestDataRef = useRef(false);

    useEffect(() => {
        const currentUserId = auth?.user?.id ?? null;
        const userChanged = store.currentUserId !== currentUserId;

        if (userChanged) {
            console.log('User changed, reinitializing...', {
                prevUser: store.currentUserId,
                newUser: currentUserId
            });
            store.initialized = false;
            store.currentUserId = currentUserId;
            syncInProgressRef.current = false;
            hasLoadedGuestDataRef.current = false;
        }

        if (store.initialized && !userChanged) {
            if (auth?.user && Array.isArray(initialLikedIds)) {
                const currentIds = JSON.stringify([...initialLikedIds].sort());
                const storedIds = JSON.stringify([...(store.likedItems || [])].sort());

                if (currentIds !== storedIds) {
                    console.log('Updating from server:', initialLikedIds);
                    store.likedItems = [...initialLikedIds];
                    notifyListeners();
                }
            }
            return;
        }

        if (auth?.user) {
            let guestIds = [];

            if (!hasLoadedGuestDataRef.current) {
                try {
                    const rawIds = JSON.parse(localStorage.getItem(LS_IDS) || "[]");
                    guestIds = Array.isArray(rawIds) ? rawIds.filter((i) => typeof i === "number") : [];
                    hasLoadedGuestDataRef.current = true;
                } catch {
                    guestIds = [];
                }
            }

            if (guestIds.length > 0 && !syncInProgressRef.current) {
                syncInProgressRef.current = true;

                const serverIds = Array.isArray(initialLikedIds) ? [...initialLikedIds] : [];
                const mergedIds = [...new Set([...serverIds, ...guestIds])];
                store.likedItems = mergedIds;
                store.guestProducts = [];

                console.log('Syncing guest likes with server...', guestIds);

                if (typeof window !== "undefined") {
                    localStorage.removeItem(LS_PRODUCTS);
                    localStorage.removeItem(LS_IDS);
                }

                router.post('/wishlist/sync',
                    { product_ids: guestIds },
                    {
                        preserveState: false,
                        preserveScroll: true,
                        onSuccess: () => {
                            syncInProgressRef.current = false;
                        },
                        onError: (errors) => {
                            syncInProgressRef.current = false;
                        }
                    }
                );
            } else {
                store.likedItems = Array.isArray(initialLikedIds) ? [...initialLikedIds] : [];
                store.guestProducts = [];

                if (typeof window !== "undefined") {
                    localStorage.removeItem(LS_PRODUCTS);
                    localStorage.removeItem(LS_IDS);
                }

                notifyListeners();
            }
        } else {
            try {
                const rawIds = JSON.parse(localStorage.getItem(LS_IDS) || "[]");
                const rawProducts = JSON.parse(localStorage.getItem(LS_PRODUCTS) || "[]");
                store.likedItems = Array.isArray(rawIds) ? rawIds.filter((i) => typeof i === "number") : [];
                store.guestProducts = Array.isArray(rawProducts) ? rawProducts : [];
                console.log('Guest mode - loaded from localStorage:', {
                    ids: store.likedItems,
                    products: store.guestProducts
                });
            } catch {
                store.likedItems = [];
                store.guestProducts = [];
            }
            notifyListeners();
        }

        store.initialized = true;
        notifyListeners();
    }, [auth?.user?.id, initialLikedIds]);

    useEffect(() => {
        const listener = () => setUpdateCounter(prev => prev + 1);
        store.listeners.add(listener);

        return () => {
            store.listeners.delete(listener);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || auth?.user) return;

        localStorage.setItem(LS_PRODUCTS, JSON.stringify(store.guestProducts || []));
        localStorage.setItem(LS_IDS, JSON.stringify(store.likedItems || []));
    }, [updateCounter, auth?.user]);

    const addGuestProduct = useCallback((p) => {
        const store = getGlobalStore();
        if (!store.guestProducts.some((x) => x.id === p.id)) {
            store.guestProducts = [...store.guestProducts, p];
        }
        if (!store.likedItems.includes(p.id)) {
            store.likedItems = [...store.likedItems, p.id];
        }
        if (typeof window !== "undefined" && !auth?.user) {
            localStorage.setItem(LS_PRODUCTS, JSON.stringify(store.guestProducts));
            localStorage.setItem(LS_IDS, JSON.stringify(store.likedItems));
        }
        notifyListeners();
    }, [auth?.user]);

    const removeGuestProduct = useCallback((id) => {
        const store = getGlobalStore();
        store.guestProducts = store.guestProducts.filter((p) => p.id !== id);
        store.likedItems = store.likedItems.filter((i) => i !== id);
        if (typeof window !== "undefined" && !auth?.user) {
            localStorage.setItem(LS_PRODUCTS, JSON.stringify(store.guestProducts));
            localStorage.setItem(LS_IDS, JSON.stringify(store.likedItems));
        }
        notifyListeners();
    }, [auth?.user]);

    const resetGuestWishlist = useCallback(() => {
        const store = getGlobalStore();
        store.guestProducts = [];
        store.likedItems = [];
        if (typeof window !== "undefined") {
            localStorage.removeItem(LS_PRODUCTS);
            localStorage.removeItem(LS_IDS);
        }
        notifyListeners();
    }, []);

    const toggleLikeById = useCallback((p) => {
        const store = getGlobalStore();

        if (store.likedItems.includes(p.id)) {
            removeGuestProduct(p.id);
        } else {
            addGuestProduct(p);
        }
    }, [removeGuestProduct, addGuestProduct]);

    const addLikedIdLocal = useCallback((id) => {
        const store = getGlobalStore();

        if (!store.likedItems.includes(id)) {
            store.likedItems = [...store.likedItems, id];
            notifyListeners();
        }
    }, []);

    const removeLikedIdLocal = useCallback((id) => {
        const store = getGlobalStore();

        store.likedItems = store.likedItems.filter((x) => x !== id);
        notifyListeners();
    }, []);

    const setLikedIds = useCallback((ids) => {
        const store = getGlobalStore();

        store.likedItems = Array.isArray(ids) ? [...ids] : [];
        notifyListeners();
    }, []);

    const contextValue = {
        likedItems: store.likedItems || [],
        guestProducts: store.guestProducts || [],
        addGuestProduct,
        removeGuestProduct,
        resetGuestWishlist,
        toggleLikeById,
        addLikedIdLocal,
        removeLikedIdLocal,
        setLikedIds,
    };

    return (
        <LikesContext.Provider value={contextValue}>
            {children}
        </LikesContext.Provider>
    );
};

export const useLikes = () => {
    const ctx = useContext(LikesContext);
    if (!ctx) throw new Error("useLikes must be used within LikesProvider");
    return ctx;
};