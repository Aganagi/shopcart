import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, usePage, useForm } from '@inertiajs/react';
import { Clock, Facebook, Github, Linkedin, Mail, MapPin, Phone, Slack, Youtube, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

export default function Footer() {
    const { footerCategories, flash } = usePage().props;
    const [year, setYear] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: '',
    });

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }

        if (flash?.info) {
            toast(flash.info);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        post('/subscribe', {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                if (errors.email) {
                    toast.error(errors.email);
                }
            },
            preserveScroll: true,
        });
    };

    return (
        <footer
            className={clsx(
                'mt-6 border-t bg-white transition-colors',
                'border-neutral-200',
                'dark:bg-[#0d0d0d] dark:border-neutral-700'
            )}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(
                        'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b',
                        'border-neutral-200',
                        'dark:border-neutral-700'
                    )}
                >
                    <div
                        className={clsx(
                            'flex items-center gap-3 group p-4 transition-colors',
                            'hover:bg-gray-50',
                            'dark:hover:bg-[#1a1a1a]'
                        )}
                    >
                        <MapPin
                            width={24}
                            height={24}
                            className={clsx(
                                'h-6 w-6 text-gray-600 transition-colors group-hover:text-black',
                                'dark:text-gray-300 dark:group-hover:text-white'
                            )}
                        />
                        <div>
                            <h3
                                className={clsx(
                                    'font-semibold text-gray-900 transition-colors group-hover:text-black',
                                    'dark:text-gray-100 dark:group-hover:text-white'
                                )}
                            >
                                Visit Us
                            </h3>
                            <p
                                className={clsx(
                                    'text-sm mt-1 text-gray-600 transition-colors group-hover:text-gray-900',
                                    'dark:text-gray-400 dark:group-hover:text-gray-200'
                                )}
                            >
                                Baku, Azerbaijan
                            </p>
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'flex items-center gap-3 group p-4 transition-colors',
                            'hover:bg-gray-50',
                            'dark:hover:bg-[#1a1a1a]'
                        )}
                    >
                        <Phone
                            width={24}
                            height={24}
                            className={clsx(
                                'h-6 w-6 text-gray-600 transition-colors group-hover:text-black',
                                'dark:text-gray-300 dark:group-hover:text-white'
                            )}
                        />
                        <div>
                            <h3
                                className={clsx(
                                    'font-semibold text-gray-900 group-hover:text-black transition-colors',
                                    'dark:text-gray-100 dark:group-hover:text-white'
                                )}
                            >
                                Call Us
                            </h3>
                            <p
                                className={clsx(
                                    'text-sm mt-1 text-gray-600 group-hover:text-gray-900 transition-colors',
                                    'dark:text-gray-400 dark:group-hover:text-gray-200'
                                )}
                            >
                                +11 111 111 111
                            </p>
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'flex items-center gap-3 group p-4 transition-colors',
                            'hover:bg-gray-50',
                            'dark:hover:bg-[#1a1a1a]'
                        )}
                    >
                        <Clock
                            width={24}
                            height={24}
                            className={clsx(
                                'h-6 w-6 text-gray-600 group-hover:text-black transition-colors',
                                'dark:text-gray-300 dark:group-hover:text-white'
                            )}
                        />
                        <div>
                            <h3
                                className={clsx(
                                    'font-semibold text-gray-900 group-hover:text-black transition-colors',
                                    'dark:text-gray-100 dark:group-hover:text-white'
                                )}
                            >
                                Working Hours
                            </h3>
                            <p
                                className={clsx(
                                    'text-sm mt-1 text-gray-600 group-hover:text-gray-900 transition-colors',
                                    'dark:text-gray-400 dark:group-hover:text-gray-200'
                                )}
                            >
                                Mon - Sat: 10:00 AM - 7:00 PM
                            </p>
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'flex items-center gap-3 group p-4 transition-colors',
                            'hover:bg-gray-50',
                            'dark:hover:bg-[#1a1a1a]'
                        )}
                    >
                        <Mail
                            width={24}
                            height={24}
                            className={clsx(
                                'h-6 w-6 text-gray-600 group-hover:text-black transition-colors',
                                'dark:text-gray-300 dark:group-hover:text-white'
                            )}
                        />
                        <div>
                            <h3
                                className={clsx(
                                    'font-semibold text-gray-900 group-hover:text-black transition-colors',
                                    'dark:text-gray-100 dark:group-hover:text-white'
                                )}
                            >
                                Email Us
                            </h3>
                            <p
                                className={clsx(
                                    'text-sm mt-1 text-gray-600 transition-colors group-hover:text-gray-900',
                                    'dark:text-gray-400 dark:group-hover:text-gray-200'
                                )}
                            >
                                Shopcart@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/">
                            <h2
                                className={clsx(
                                    'text-2xl font-black tracking-wider uppercase hoverEffect group',
                                    'text-[#063c28] hover:text-[#3b9c3c]',
                                    'dark:text-[#4ade80] dark:hover:text-[#3b9c3c]'
                                )}
                            >
                                Shopcar
                                <span
                                    className={clsx(
                                        'text-[#3b9c3c] group-hover:text-[#063c28] hoverEffect',
                                        'dark:text-[#3b9c3c] dark:group-hover:text-[#4ade80]'
                                    )}
                                >
                                    t
                                </span>
                            </h2>
                        </Link>

                        <p
                            className={clsx(
                                'text-sm text-gray-600',
                                'dark:text-gray-400'
                            )}
                        >
                            Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces.
                        </p>
                        <div
                            className={clsx(
                                'flex items-center gap-3.5 text-[#151515]/60',
                                'dark:text-gray-400'
                            )}
                        >
                            {[
                                Youtube,
                                Github,
                                Linkedin,
                                Facebook,
                                Slack,
                            ].map((Icon, idx) => (
                                <span
                                    key={idx}
                                    className={clsx(
                                        'p-2 border rounded-full hoverEffect',
                                        'border-[#151515]/60 hover:border-[#063c28] hover:text-[#063c28]',
                                        'dark:border-gray-500 dark:hover:border-[#4ade80] dark:hover:text-[#4ade80]'
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className={clsx('font-semibold mb-4 text-gray-900', 'dark:text-gray-100')}>Quick Links</h3>
                        <ul className="space-y-3">
                            {['about', 'contact-us', 'terms', 'privacy', 'faqs', 'help'].map((page, i) => (
                                <li key={i}>
                                    <Link
                                        href={`/${page}`}
                                        className={clsx(
                                            'text-sm font-medium text-gray-600 hover:text-[#063c28] hoverEffect',
                                            'dark:text-gray-400 dark:hover:text-[#4ade80]'
                                        )}
                                    >
                                        {page.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className={clsx('font-semibold text-gray-900 mb-4', 'dark:text-gray-100')}>Categories</h3>
                        <ul className="space-y-3">
                            {footerCategories.map(category => (
                                <li key={category.id}>
                                    <Link
                                        href={`/category/${category.name}`}
                                        className={clsx(
                                            'text-sm font-medium text-gray-600 hover:text-[#063c28] hoverEffect',
                                            'dark:text-gray-400 dark:hover:text-[#4ade80]'
                                        )}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className={clsx('font-semibold text-gray-900 mb-4', 'dark:text-gray-100')}>Newsletter</h3>

                        <p className={clsx('text-sm mb-4 text-gray-600', 'dark:text-gray-400')}>
                            Subscribe to receive updates about discounts and exclusive offers.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={clsx(
                                        'w-full px-4 py-2 border rounded-lg focus:outline-hidden focus:ring-2',
                                        errors.email
                                            ? 'border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
                                            : 'border-gray-300 focus:ring-gray-200 dark:border-gray-600 dark:focus:ring-gray-700',
                                        'dark:bg-[#0f0f0f] dark:text-gray-200'
                                    )}
                                    placeholder="Enter your email"
                                    disabled={processing}
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className={clsx(
                                    'w-full px-4 py-2 rounded-lg transition-colors',
                                    processing
                                        ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                                        : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-[#4ade80] dark:hover:bg-[#22c55e] dark:text-black'
                                )}
                            >
                                {processing ? 'Subscribing...' : 'Subscribe'}
                            </Button>
                        </form>
                    </div>
                </div>
                <div
                    className={clsx(
                        'py-6 text-center text-sm border-t',
                        'border-neutral-200 text-gray-600',
                        'dark:border-neutral-700 dark:text-gray-400'
                    )}
                >
                    <p>
                        &copy; {year}{' '}
                        <span
                            className={clsx(
                                'font-black tracking-wider uppercase hoverEffect group',
                                'text-[#063c28] hover:text-[#3b9c3c]',
                                'dark:text-[#4ade80] dark:hover:text-[#3b9c3c]'
                            )}
                        >
                            Shopcar
                            <span
                                className={clsx(
                                    'text-[#3b9c3c] group-hover:text-[#063c28] hoverEffect',
                                    'dark:text-[#3b9c3c] dark:group-hover:text-[#4ade80]'
                                )}
                            >
                                t
                            </span>
                        </span>
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}