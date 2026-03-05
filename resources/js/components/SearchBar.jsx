import { Search, X, Tag, Layers, Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

const SearchBar = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ products: [], brands: [], categories: [] });
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
            setResults({ products: [], brands: [], categories: [] });
        }
    }, [isOpen]);

    useEffect(() => {
        clearTimeout(debounceRef.current);

        if (query.length < 2) {
            setResults({ products: [], brands: [], categories: [] });
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const { data } = await axios.get("/search/live", { params: { q: query } });
                setResults(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }, 350);

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    const hasResults =
        results.products.length > 0 ||
        results.brands.length > 0 ||
        results.categories.length > 0;

    const goToShop = (params) => {
        router.get("/shop", params);
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        goToShop({ q: query });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80"
            onClick={onClose}
        >
            <div
                className="absolute left-1/2 top-12 -translate-x-1/2 w-full max-w-2xl 
                    bg-white dark:bg-neutral-900 shadow-lg rounded-lg px-4 py-3"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg text-neutral-900 dark:text-white font-semibold">
                        Product Search
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                    >
                        <X className="text-neutral-500 dark:text-neutral-300 w-4 h-4" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products, brands, categories..."
                        className="w-full h-11 border border-neutral-200 dark:border-neutral-700 
                            bg-transparent dark:bg-neutral-800 dark:text-white px-4 pr-12
                            rounded-md text-sm placeholder:text-neutral-400
                            focus:outline-none focus:ring-1 focus:ring-[#063c28]"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 w-11 h-full flex items-center justify-center
                            bg-[#063c28]/10 dark:bg-[#063c28]/30 rounded-tr-md rounded-br-md
                            hover:bg-[#063c28] hover:text-white text-black dark:text-white transition"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>
                {query.length >= 2 && (
                    <div className="mt-3 max-h-96 overflow-y-auto">
                        {loading && (
                            <p className="text-sm text-neutral-400 text-center py-4">Searching...</p>
                        )}

                        {!loading && !hasResults && (
                            <p className="text-sm text-neutral-400 text-center py-4">
                                Nothing found for "{query}"
                            </p>
                        )}
                        {results.categories.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1">
                                    <Layers size={12} /> Categories
                                </p>
                                {results.categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => goToShop({ category: cat.id })}
                                        className="w-full text-left px-3 py-2 rounded-md text-sm
                                            text-neutral-800 dark:text-neutral-200
                                            hover:bg-[#063c28]/10 dark:hover:bg-[#063c28]/20
                                            hover:text-[#063c28] dark:hover:text-green-300 transition"
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        {results.brands.length > 0 && (
                            <div className="mb-3">
                                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1">
                                    <Tag size={12} /> Brands
                                </p>
                                {results.brands.map((brand) => (
                                    <button
                                        key={brand.id}
                                        onClick={() => goToShop({ brand: brand.id })}
                                        className="w-full text-left px-3 py-2 rounded-md text-sm
                                            text-neutral-800 dark:text-neutral-200
                                            hover:bg-[#063c28]/10 dark:hover:bg-[#063c28]/20
                                            hover:text-[#063c28] dark:hover:text-green-300 transition"
                                    >
                                        {brand.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        {results.products.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-1 mb-1 flex items-center gap-1">
                                    <Package size={12} /> Products
                                </p>
                                {results.products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => { router.get(`/product/${product.id}`); onClose(); }}
                                        className="w-full text-left px-3 py-2 rounded-md text-sm
                                        flex items-center gap-3
                                        text-neutral-800 dark:text-neutral-200
                                        hover:bg-[#063c28]/10 dark:hover:bg-[#063c28]/20
                                        hover:text-[#063c28] dark:hover:text-green-300 transition"
                                    >
                                        {product.image && (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-10 h-10 rounded object-cover shrink-0"
                                            />
                                        )}
                                        <span className="flex-1 line-clamp-1">{product.name}</span>
                                        <span className="text-[#063c28] dark:text-green-300 font-semibold">
                                            {Number(product.sell_price).toFixed(2)}₼
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {hasResults && (
                            <button
                                onClick={() => goToShop({ q: query })}
                                className="w-full mt-3 py-2 text-sm text-center text-[#063c28] dark:text-green-300
                                    border border-[#063c28]/20 dark:border-green-300/20 rounded-md
                                    hover:bg-[#063c28] hover:text-white dark:hover:bg-green-300/10 transition"
                            >
                                See all results for "{query}"
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;