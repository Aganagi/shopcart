import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function NoProduct() {
    return (
        <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
                <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center rounded-lg w-full bg-white mt-0 dark:bg-[#1a1a1a]">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        No Product Available
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400">
                        We're sorry, but there are no products matching criteria.
                    </p>

                    <div className="flex items-center space-x-2 text-[#063c28] animate-pulse-scale dark:text-[#93D991]">
                        <LoaderCircle className="animate-spin" />
                        <span>We're restocking shortly</span>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please check back later or explore other categories.
                    </p>
                </div>
            </div>
        </div>
    )
}
