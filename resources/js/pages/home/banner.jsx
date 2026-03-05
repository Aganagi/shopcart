import { Link } from '@inertiajs/react'
import React from 'react'

export default function Banner() {
    return (
        <div className='px-4'>
            <div className='max-w-7xl mx-auto py-16 md:py-0 bg-[#FCF0E4] dark:bg-[#0f1814] rounded-lg px-10 lg:px-24 flex items-center justify-between'>
                <div>
                    <h2 className='text-[#063c28] dark:text-[#d8f3e5] capitalize tracking-wide font-semibold text-3xl mb-5 font-poppins'>
                        Grab Upto 50% Off on
                        <br />
                        Selected headphone
                    </h2>

                    <Link
                        href="/shop"
                        className="bg-[#063d29e6] dark:bg-[#0d6d4c] text-white/90 dark:text-white px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-[#063d29] hoverEffect dark:hover:bg-[#0b5038]"
                    >
                        By Now
                    </Link>
                </div>

                <img
                    src="/storage/images/banner.webp"
                    alt="Banner Image"
                    loading='lazy'
                    className="hidden md:inline-flex w-96"
                />
            </div>
        </div>
    )
}
