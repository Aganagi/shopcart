import { Link } from "@inertiajs/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Category({ categories = [], loading = false }) {
    const topCategories = [...categories]
        .sort((a, b) => (b.products_count ?? 0) - (a.products_count ?? 0))
        .slice(0, 6);
    return (
        <div className="
            relative max-w-7xl mx-auto w-full 
            bg-white dark:bg-[#1e1e1e] 
            border border-[#3b9c3c]/20 dark:border-[#3b9c3c]/30 
            mt-10 lg:mt-20 p-5 lg:p-7 rounded-md overflow-hidden
        ">
            <h2 className="
                font-semibold text-2xl border-b 
                border-neutral-200 dark:border-neutral-700 
                pb-3 text-neutral-800 dark:text-neutral-100
            ">
                {loading ? <Skeleton className="h-7 w-56" /> : "Popular Categories"}
            </h2>

            <div className="relative mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-500 ease-in-out">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-[#f6f6f6] dark:bg-[#2a2a2a] p-5 flex items-center gap-3"
                            >
                                <Skeleton className="w-20 h-20" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            </div>
                        ))
                    ) : topCategories.length > 0 ? (
                        topCategories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-[#f6f6f6] dark:bg-[#2a2a2a] p-5 flex items-center gap-3 group"
                            >
                                <div className="
                                overflow-hidden 
                                border border-[#fb6c08]/30 dark:border-[#fb6c08]/20 
                                hover:border-[#fb6c08] 
                                hoverEffect w-20 h-20 p-1
                                ">
                                    <Link href={`/category/${category.name}`}>
                                        <img
                                            src={
                                                category.image
                                                    ? `/storage/${category.image}`
                                                    : "/placeholder.png"
                                            }
                                            alt={category.name}
                                            loading="lazy"
                                            className="
                                        w-full h-full object-contain 
                                        group-hover:scale-110 hoverEffect 
                                        transition-transform duration-500 ease-in-out
                                    "
                                        />
                                    </Link>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-base font-semibold text-neutral-700 dark:text-neutral-200">
                                        {category.name}
                                    </p>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                        <span className="font-bold text-[#063c28] dark:text-[#4cc78a] mr-1">
                                            ({category.products_count ?? 0})
                                        </span>
                                        items Available
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-neutral-600 dark:text-neutral-400">
                            No Category Found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}