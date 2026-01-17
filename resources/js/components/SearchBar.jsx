import { Search, X } from "lucide-react";

const SearchBar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-black/60 dark:bg-black/80 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
        >
            <div
                className={`absolute left-1/2 top-12 -translate-x-1/2 w-full max-w-2xl 
                bg-white dark:bg-neutral-900 shadow-lg rounded-lg px-4 py-3 flex items-center gap-3
                transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                    }`}
            >
                <div className="flex flex-col space-y-1.5 text-center sm:text-left w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg text-neutral-900 dark:text-white font-semibold leading-none tracking-tight mb-1">
                            Product Searchbar
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        >
                            <X className="text-[#737373] dark:text-neutral-300 hover:text-neutral-700 dark:hover:text-white w-4 h-4" />
                        </button>
                    </div>

                    <form className="relative">
                        <input
                            type="text"
                            placeholder="Search products here..."
                            className="flex h-9 w-full border border-input bg-transparent dark:bg-neutral-800 dark:border-neutral-700 dark:text-white px-3 text-base shadow-xs 
                                transition-colors placeholder:text-muted-foreground dark:placeholder:text-neutral-400 
                                focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring 
                                disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1 rounded-md py-5"
                        />

                        <button
                            type="button"
                            className="absolute right-0 top-0 text-black dark:text-white bg-[#063c28]/10 dark:bg-[#063c28]/30 w-10 h-full flex items-center justify-center 
                            rounded-tr-md hover:bg-[#063c28] hover:text-white hoverEffect"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;