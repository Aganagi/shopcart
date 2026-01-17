import { Calendar } from 'lucide-react'
import React from 'react'

export default function Blog() {
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='max-w-7xl mx-auto px-4 py-10 dark:bg-[#0A0A0A]'>
            <h2 className='text-2xl font-semibold text-neutral-900 dark:text-neutral-100'>
                Our Blogs
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10'>
                <div className='rounded-md overflow-hidden dark:bg-neutral-800'>
                    <img src="/images/blog1.webp" alt="First blog" className='w-full max-h-80 object-cover' />
                    <div className='bg-white dark:bg-neutral-800 p-5'>
                        <div className='text-xs flex items-center gap-5'>
                            <div className='flex items-center relative group cursor-pointer'>
                                <p className='font-semibold text-[#063c28] dark:text-green-300 tracking-wider'>Technologies</p>
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </div>
                            <p className='flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                                <Calendar size={15} />
                                {date}
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </p>
                        </div>
                        <span className='text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                            How to Plan Your Next Big Move Step by Step
                        </span>
                    </div>
                </div>
                <div className='rounded-md overflow-hidden dark:bg-neutral-800'>
                    <img src="/images/blog2.webp" alt="blog" className='w-full max-h-80 object-cover' />
                    <div className='bg-white dark:bg-neutral-800 p-5'>
                        <div className='text-xs flex items-center gap-5'>
                            <div className='flex items-center relative group cursor-pointer'>
                                <p className='font-semibold text-[#063c28] dark:text-green-300 tracking-wider'>Lifestyle</p>
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </div>
                            <p className='flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                                <Calendar size={15} />
                                {date}
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </p>
                        </div>
                        <span className='text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                            Cheerful Loving Couple Bakers Drinking Coffee
                        </span>
                    </div>
                </div>
                <div className='rounded-md overflow-hidden dark:bg-neutral-800'>
                    <img src="/images/blog4.webp" alt="blog" className='w-full max-h-80 object-cover' />
                    <div className='bg-white dark:bg-neutral-800 p-5'>
                        <div className='text-xs flex items-center gap-5'>
                            <div className='flex items-center relative group cursor-pointer'>
                                <p className='font-semibold text-[#063c28] dark:text-green-300 tracking-wider'>Sosial Media</p>
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </div>
                            <p className='flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                                <Calendar size={15} />
                                {date}
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </p>
                        </div>
                        <span className='text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                            Traveller Visiting Ice Cave With Amazing Eye-catching Scenes
                        </span>
                    </div>
                </div>
                <div className='rounded-md overflow-hidden dark:bg-neutral-800'>
                    <img src="/images/blog3.webp" alt="blog" className='w-full max-h-80 object-cover' />
                    <div className='bg-white dark:bg-neutral-800 p-5'>
                        <div className='text-xs flex items-center gap-5'>
                            <div className='flex items-center relative group cursor-pointer'>
                                <p className='font-semibold text-[#063c28] dark:text-green-300 tracking-wider'>Technologies</p>
                                <p className='font-semibold text-[#063c28] dark:text-green-300 tracking-wider'>Lifestyle</p>
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </div>
                            <p className='flex items-center gap-1 text-[#52525b] dark:text-neutral-300 relative group hover:cursor-pointer hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                                <Calendar size={15} />
                                {date}
                                <span className='absolute left-0 -bottom-1.5 bg-[#52525b]/30 dark:bg-neutral-600 inline-block w-full h-0.5 group-hover:bg-[#063c28] dark:group-hover:bg-green-300 hoverEffect'></span>
                            </p>
                        </div>
                        <span className='text-[1rem] text-black dark:text-neutral-100 font-semibold tracking-wide mt-5 line-clamp-2 hover:text-[#063c28] dark:hover:text-green-300 hoverEffect'>
                            Learning from Past Mistakes
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}