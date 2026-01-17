import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Brand({ brands, loading = false }) {
    const [page, setPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const perPage = 8;
    const totalPages = Math.ceil(brands.length / perPage);
    const visibleBrands = brands.slice(page * perPage, (page + 1) * perPage);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => {
            const mobile = window.matchMedia("(max-width: 1023px)").matches;
            setIsMobile(mobile);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrev = () => page > 0 && setPage(page - 1);
    const handleNext = () => page < totalPages - 1 && setPage(page + 1);

    return (
        <div
            className="
                max-w-7xl mx-auto mt-10 lg:mt-20 
                bg-[#f8f8fb] dark:bg-[#1e1e1e] 
                p-5 lg:p-7 rounded-md
            "
        >
            <div className="flex items-center gap-5 justify-between mb-10">
                {loading ? (
                    <>
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-5 w-20" />
                    </>
                ) : (
                    <>
                        <h2 className="font-semibold text-2xl text-neutral-800 dark:text-neutral-100">
                            Shop By Brands
                        </h2>
                        <Link
                            href="/shop"
                            className="
                                text-sm text-neutral-800 dark:text-neutral-200 
                                font-semibold tracking-wide 
                                hover:text-[#063c28] dark:hover:text-[#4cc78a] 
                                hoverEffect
                            "
                        >
                            View All
                        </Link>
                    </>
                )}
            </div>

            <div
                className={
                    isMobile
                        ? "h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide"
                        : "flex items-center gap-2.5 justify-between relative"
                }
            >
                {!loading && !isMobile && brands.length > 8 && page > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                        <Button
                            onClick={handlePrev}
                            variant="secondary"
                            size="icon"
                            className="rounded-full shadow-md bg-white/90 dark:bg-[#2a2a2a] hover:bg-white dark:hover:bg-[#333]"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </Button>
                    </div>
                )}

                {!loading && !isMobile && brands.length > 8 && page < totalPages - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                        <Button
                            onClick={handleNext}
                            variant="secondary"
                            size="icon"
                            className="rounded-full shadow-md bg-white/90 dark:bg-[#2a2a2a] hover:bg-white dark:hover:bg-[#333]"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </Button>
                    </div>
                )}

                <div className={isMobile ? "grid grid-cols-2 gap-2 px-8 mx-auto" : "flex items-center gap-2"}>
                    {loading ? (
                        Array.from({ length: isMobile ? 8 : 8 }).map((_, idx) => (
                            <div key={idx}>
                                <Skeleton className="bg-white dark:bg-[#2a2a2a] w-36 h-24 rounded-md" />
                            </div>
                        ))
                    ) : (
                        (isMobile ? brands : visibleBrands).map((brand) => (
                            <div key={brand.id}>
                                <Link
                                    href={`/shop?brand=${brand.id}`}
                                    className="
                                        bg-white 
                                        w-36 h-24 flex items-center justify-center 
                                        rounded-md overflow-hidden hover:shadow-lg 
                                        shadow-[#063c2833] hoverEffect
                                    "
                                >
                                    <img
                                        src={brand.logo ? `/storage/${brand.logo}` : "/images/placeholder.webp"}
                                        alt={brand.name}
                                        loading="lazy"
                                        className="w-32 h-20 object-contain"
                                    />
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div
                className="
                    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 
                    mt-16 p-2 shadow-xs shadow-[#3b9c3c]/20 py-5
                "
            >
                {[
                    { icon: Truck, title: "Free Delivery", desc: "Free shipping over $100" },
                    { icon: GitCompareArrows, title: "Free Return", desc: "Free shipping over $100" },
                    { icon: Headset, title: "Customer Support", desc: "Friendly 27/7 customer support" },
                    { icon: ShieldCheck, title: "Money Back guarantee", desc: "Quality checked by our team" }
                ].map((item, idx) => (
                    <div
                        key={idx}
                        className="
                            flex items-center gap-3 group 
                            text-[#52525b] dark:text-neutral-400 
                            hover:text-[#3b9c3c] dark:hover:text-[#3b9c3c]
                        "
                    >
                        <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
                            <item.icon size={24} width={45} height={45} />
                        </span>
                        <div className="text-sm">
                            <p className="text-[#151515]/80 dark:text-neutral-200 font-bold capitalize">
                                {item.title}
                            </p>
                            <p className="text-[#52525b] dark:text-neutral-400">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}