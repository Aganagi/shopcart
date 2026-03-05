import { Check } from "lucide-react";
import React from "react";
import ProductList from "./product-list";
import { router, usePage } from "@inertiajs/react";
import clsx from "clsx";

const price = [
    { value: "Under 100", label: "Under $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200-300", label: "$200 - $300" },
    { value: "300-400", label: "$300 - $400" },
    { value: "Over 500", label: "Over $500" }
];

export default function Sidebar({ categories = [], brands = [], initialCategory = null }) {
    const { products, filters } = usePage().props;

    const selectedCategory = filters?.category ? String(filters.category) : null;
    const selectedBrand = filters?.brand ? Number(filters.brand) : null;
    const selectedPrice = filters?.price || null;

    const safeProducts = Array.isArray(products?.data) ? products.data : [];
    const safeBrands = Array.isArray(brands) ? brands : [];
    const safeCategories = Array.isArray(categories) ? categories : [];

    const activeFiltersCount =
        (selectedCategory ? 1 : 0) +
        (selectedBrand ? 1 : 0) +
        (selectedPrice ? 1 : 0);

    const applyFilter = (newFilters) => {
        const merged = { selectedCategory, selectedBrand, selectedPrice, ...newFilters };
        const query = {};
        if (merged.selectedCategory) query.category = merged.selectedCategory;
        if (merged.selectedBrand) query.brand = merged.selectedBrand;
        if (merged.selectedPrice) query.price = merged.selectedPrice;

        router.get("/shop", query, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    return (
        <div className={clsx('border-t', 'border-neutral-200', 'dark:border-neutral-700')}>
            <div className='max-w-7xl mx-auto px-4 mt-5'>
                <div className='sticky top-0 z-10 mb-5'>
                    <h2 className={clsx('font-semibold text-lg uppercase tracking-wide', 'text-neutral-900', 'dark:text-neutral-100')}>
                        Get the products as your needs
                    </h2>
                </div>
                <div className={clsx('flex flex-col md:flex-row gap-5 border-t', 'border-t-[#063d29]/50', 'dark:border-t-[#4ade80]/30')}>
                    <div className={clsx('md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 scrollbar-hide border-r', 'border-r-[#063d29]/50', 'dark:border-r-[#4ade80]/30')}>
                        <div className={clsx('w-full p-5', 'bg-white', 'dark:bg-neutral-900')}>
                            <h2 className={clsx('text-[1rem] font-semibold', 'text-neutral-900', 'dark:text-neutral-100')}>
                                Product Categories
                            </h2>
                            <div role='radiogroup' className='grid gap-2 mt-2 space-y-1'>
                                {safeCategories.length > 0 ? (
                                    safeCategories.map((category) => (
                                        <div key={category.id} onClick={() => applyFilter({ selectedCategory: String(category.id) })}
                                            className='flex items-center space-x-2 hover:cursor-pointer'>
                                            <button type="button" role="radio"
                                                className={clsx(
                                                    'aspect-square h-4 w-4 border shadow-sm rounded flex items-center justify-center',
                                                    selectedCategory === String(category.id)
                                                        ? 'border-[#063c28] dark:border-[#4ade80]'
                                                        : 'border-black dark:border-neutral-400',
                                                    'bg-white dark:bg-neutral-800'
                                                )}>
                                                {selectedCategory === String(category.id) && (
                                                    <Check className={clsx('h-3.5 w-3.5', 'text-[#063c28]', 'dark:text-[#4ade80]')} />
                                                )}
                                            </button>
                                            <label className={clsx('text-sm', selectedCategory === String(category.id)
                                                ? 'text-[#063c28] font-bold dark:text-[#4ade80]'
                                                : 'text-neutral-900 dark:text-neutral-300')}>
                                                {category.name}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">No categories</p>
                                )}
                            </div>
                            {selectedCategory && (
                                <button onClick={() => applyFilter({ selectedCategory: null })}
                                    className={clsx('text-sm font-medium mt-2 underline', 'text-neutral-900 hover:text-[#063d29]', 'dark:text-neutral-300 dark:hover:text-[#4ade80]')}>
                                    Reset
                                </button>
                            )}
                        </div>
                        <div className={clsx('w-full p-5', 'bg-white', 'dark:bg-neutral-900')}>
                            <h2 className={clsx('text-[1rem] font-semibold', 'text-neutral-900', 'dark:text-neutral-100')}>
                                Brands
                            </h2>
                            <div role='radiogroup' className='grid gap-2 mt-2 space-y-1'>
                                {safeBrands.length > 0 ? (
                                    safeBrands.map((brand) => (
                                        <div key={brand.id} onClick={() => applyFilter({ selectedBrand: Number(brand.id) })}
                                            className='flex items-center space-x-2 hover:cursor-pointer'>
                                            <button type="button" role="radio"
                                                className={clsx(
                                                    'aspect-square h-4 w-4 border shadow-sm rounded flex items-center justify-center',
                                                    selectedBrand === Number(brand.id)
                                                        ? 'border-[#063c28] dark:border-[#4ade80]'
                                                        : 'border-black dark:border-neutral-400',
                                                    'bg-white dark:bg-neutral-800'
                                                )}>
                                                {selectedBrand === Number(brand.id) && (
                                                    <Check className={clsx('h-3.5 w-3.5', 'text-[#063c28]', 'dark:text-[#4ade80]')} />
                                                )}
                                            </button>
                                            <label className={clsx('text-sm', selectedBrand === Number(brand.id)
                                                ? 'text-[#063c28] font-bold dark:text-[#4ade80]'
                                                : 'text-neutral-900 dark:text-neutral-300')}>
                                                {brand.name}
                                            </label>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">No brands</p>
                                )}
                            </div>
                            {selectedBrand && (
                                <button onClick={() => applyFilter({ selectedBrand: null })}
                                    className={clsx('text-sm font-medium mt-2 underline', 'text-neutral-900 hover:text-[#063d29]', 'dark:text-neutral-300 dark:hover:text-[#4ade80]')}>
                                    Reset
                                </button>
                            )}
                        </div>
                        <div className={clsx('w-full p-5', 'bg-white', 'dark:bg-neutral-900')}>
                            <h2 className={clsx('text-[1rem] font-semibold', 'text-neutral-900', 'dark:text-neutral-100')}>
                                Price
                            </h2>
                            <div role='radiogroup' className='grid gap-2 mt-2 space-y-1'>
                                {price.map((p) => (
                                    <div key={p.value} onClick={() => applyFilter({ selectedPrice: p.value })}
                                        className='flex items-center space-x-2 hover:cursor-pointer'>
                                        <button type="button" role="radio"
                                            className={clsx(
                                                'aspect-square h-4 w-4 border shadow-sm rounded flex items-center justify-center',
                                                selectedPrice === p.value
                                                    ? 'border-[#063c28] dark:border-[#4ade80]'
                                                    : 'border-black dark:border-neutral-400',
                                                'bg-white dark:bg-neutral-800'
                                            )}>
                                            {selectedPrice === p.value && (
                                                <Check className={clsx('h-3.5 w-3.5', 'text-[#063c28]', 'dark:text-[#4ade80]')} />
                                            )}
                                        </button>
                                        <label className={clsx('text-sm', selectedPrice === p.value
                                            ? 'text-[#063c28] font-bold dark:text-[#4ade80]'
                                            : 'text-neutral-900 dark:text-neutral-300')}>
                                            {p.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {selectedPrice && (
                                <button onClick={() => applyFilter({ selectedPrice: null })}
                                    className={clsx('text-sm font-medium mt-2 underline', 'text-neutral-900 hover:text-[#063d29]', 'dark:text-neutral-300 dark:hover:text-[#4ade80]')}>
                                    Reset
                                </button>
                            )}
                            {activeFiltersCount >= 2 && (
                                <div className="mt-2 flex justify-start">
                                    <button
                                        onClick={() => router.get('/shop', {}, { replace: true, preserveScroll: true })}
                                        className={clsx('text-sm font-medium mt-2 underline', 'text-neutral-900 hover:text-[#063d29]', 'dark:text-neutral-300 dark:hover:text-[#4ade80]')}
                                    >
                                        Reset All
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <ProductList products={safeProducts} />
                </div>
            </div>
        </div>
    );
}