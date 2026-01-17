import { Link, router, usePage } from '@inertiajs/react';
import React, { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react'
import { useLikes } from './provider/LikesProvider';
import { useCart } from './provider/CartProvider';
import { Heart, Search, ShoppingBag, TextAlignStart, X, User, LogOut } from 'lucide-react';
import clsx from 'clsx';
import ThemeToggle from '@/components/ThemeToggle';
import ClientOnly from '@/components/ClientOnly';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AuthModal from './auth/auth';

const NAVIGATION_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/blog', label: 'Blog' },
    { href: '/hot-deal', label: 'Hot Deal' },
]

const NavigationLinks = memo(({ links, url }) => {
    return (
        <>
            {links.map((link) => {
                const linkUrl = link.href;
                const isActive = url === linkUrl || (linkUrl !== '/' && url.startsWith(linkUrl));

                return (
                    <Link
                        key={linkUrl}
                        href={linkUrl}
                        prefetch="hover"
                        className={clsx(
                            'group hoverEffect relative transition-colors duration-150',
                            isActive ? 'text-[#3b9c3c]' : 'text-[#52525b] hover:text-[#3b9c3c]',
                            isActive
                                ? 'dark:text-[#4ade80]'
                                : 'dark:text-gray-300 dark:hover:text-[#4ade80]',
                        )}
                    >
                        {link.label}

                        <span
                            className={clsx(
                                'absolute -bottom-0.5 left-1/2 h-0.5 bg-[#3b9c3c] transition-all duration-150 pointer-events-none',
                                isActive ? 'left-0 w-1/2' : 'w-0 group-hover:left-0 group-hover:w-1/2',
                                'dark:bg-[#4ade80]',
                            )}
                        ></span>
                        <span
                            className={clsx(
                                'absolute right-1/2 -bottom-0.5 h-0.5 bg-[#3b9c3c] transition-all duration-150 pointer-events-none',
                                isActive ? 'right-0 w-1/2' : 'w-0 group-hover:right-0 group-hover:w-1/2',
                                'dark:bg-[#4ade80]',
                            )}
                        ></span>
                    </Link>
                );
            })}
        </>
    )
});

NavigationLinks.displayName = 'NavigationLinks';

const MobileMenu = memo(({ isMenuOpen, toggleMenu, links, url }) => {
    return (
        <div
            className={clsx(
                `fixed inset-0 left-0 z-50 h-screen w-full transform bg-[#171717]/50 shadow-xl backdrop-blur-sm transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`,
                'bg-black/40',
                'dark:bg-[#171717]/60',
            )}
        >
            <div
                className={clsx(
                    'z-50 flex h-screen max-w-96 min-w-72 flex-col gap-6 border-r p-10',
                    'bg-white text-zinc-800 border-r-[#0e6a3f]',
                    'dark:bg-black dark:text-[#fafafa] dark:border-r-[#063c28]',
                )}
                style={{ opacity: 1 }}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" prefetch="hover" onClick={toggleMenu}>
                        <h2
                            className={clsx(
                                'hoverEffect group font-sans text-2xl font-black tracking-wider uppercase transition-colors',
                                'text-black hover:text-[#3b9c3c]',
                                'dark:text-white dark:hover:text-[#3b9c3c]',
                            )}
                        >
                            Shopcar
                            <span className="hoverEffect text-[#3b9c3c] group-hover:text-[#063c28]">t</span>
                        </h2>
                    </Link>

                    <button
                        className={clsx(
                            'hoverEffect transition-colors',
                            'text-black hover:text-[#063c28]',
                            'dark:text-white dark:hover:text-[#063c28]',
                        )}
                        onClick={toggleMenu}
                    >
                        <X />
                    </button>
                </div>

                <div
                    className={clsx(
                        'flex flex-col gap-3.5 text-base font-semibold tracking-wide transition-colors',
                        'bg-white text-zinc-600',
                        'dark:bg-black dark:text-zinc-400',
                    )}
                >
                    {links.map((link) => {
                        const linkUrl = link.href;
                        const isActive = url === linkUrl || (linkUrl !== '/' && url.startsWith(linkUrl));

                        return (
                            <Link
                                key={linkUrl}
                                href={linkUrl}
                                prefetch="hover"
                                onClick={toggleMenu}
                                className={clsx(
                                    'hoverEffect transition-colors duration-150',
                                    isActive ? 'text-[#3b9c3c]' : 'text-gray-600 hover:text-[#3b9c3c]',
                                    isActive ? 'dark:text-[#4ade80]' : 'dark:text-gray-400 dark:hover:text-[#4ade80]',
                                )}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
MobileMenu.displayName = 'MobileMenu';

function Header({ onOpenSearch }) {
    const [loginOpen, setLoginOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const { url, props } = usePage();
    const auth = props?.auth;
    const user = auth?.user;

    const { likedItems } = useLikes();
    const { cartItems } = useCart();

    const totalCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false)
            }
        }

        if (userMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [userMenuOpen])

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                setUserMenuOpen(false)
            }
        })
    }

    return (
        <header
            className={clsx(
                'sticky top-0 z-50 py-5 backdrop-blur-md transition-colors',
                'bg-white/70 text-[#52525b]',
                'dark:bg-[#0e0e0e]/70 dark:text-gray-300',
            )}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-7 px-4">
                <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
                    <button type="button" onClick={toggleMenu} className="md:hidden">
                        <TextAlignStart
                            className={clsx(
                                'hoverEffect h-6 w-6 transition-colors',
                                'text-[#52525b] hover:text-[#3b9c3c]',
                                'dark:text-gray-300 dark:hover:text-[#4ade80]',
                            )}
                        />
                    </button>

                    {isMenuOpen && (
                        <MobileMenu
                            isMenuOpen={isMenuOpen}
                            toggleMenu={toggleMenu}
                            links={NAVIGATION_LINKS}
                            url={url}
                        />
                    )}

                    <Link href="/" prefetch="hover">
                        <h2
                            className={clsx(
                                'hoverEffect group font-poppins text-2xl font-extrabold tracking-wider uppercase transition-colors',
                                'text-[#063c28] hover:text-[#3b9c3c]',
                                'dark:text-[#4ade80] dark:hover:text-[#3b9c3c]',
                            )}
                        >
                            Shopcar
                            <span className="hoverEffect text-[#3b9c3c] group-hover:text-[#063c28] dark:group-hover:text-[#4ade80]">
                                t
                            </span>
                        </h2>
                    </Link>
                </div>
                <div
                    className={clsx(
                        'hidden w-1/3 items-center justify-center gap-7 text-sm font-semibold capitalize md:inline-flex',
                        'text-[#52525b]',
                        'dark:text-gray-300',
                    )}
                >
                    <NavigationLinks links={NAVIGATION_LINKS} url={url} />
                </div>
                <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
                    <button type="button" className="flex items-center" onClick={onOpenSearch}>
                        <Search
                            size={22}
                            className={clsx(
                                'hoverEffect transition-colors',
                                'text-gray-600 hover:text-[#3b9c3c]',
                                'dark:text-gray-300 dark:hover:text-[#4ade80]',
                            )}
                        />
                    </button>
                    <Link href="/basket" prefetch="hover" className="group relative">
                        <ShoppingBag
                            size={22}
                            className={clsx(
                                'hoverEffect transition-colors',
                                'text-gray-600 hover:text-[#3b9c3c]',
                                'dark:text-gray-300 dark:hover:text-[#4ade80]',
                            )}
                        />
                        {totalCount > 0 && (
                            <span
                                className={clsx(
                                    'absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold',
                                    'bg-[#063d29] text-white',
                                    'dark:bg-[#4ade80] dark:text-black',
                                )}
                            >
                                {totalCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/wishlist" prefetch="hover" className="group hoverEffect relative">
                        <Heart
                            size={22}
                            className={clsx(
                                'hoverEffect transition-colors',
                                'text-gray-600 hover:text-[#3b9c3c]',
                                'dark:text-gray-300 dark:hover:text-[#4ade80]',
                            )}
                        />

                        {likedItems.length > 0 && (
                            <span
                                className={clsx(
                                    'absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold',
                                    'bg-[#063d29] text-white',
                                    'dark:bg-[#4ade80] dark:text-black',
                                )}
                            >
                                {likedItems.length}
                            </span>
                        )}
                    </Link>
                    <ClientOnly fallback={<div className="p-2 w-9 h-9"></div>}>
                        <ThemeToggle />
                    </ClientOnly>
                    {user ? (
                        <div
                            className="relative"
                            ref={menuRef}
                        >
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="cursor-pointer"
                            >
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || 'User'}
                                        className={clsx(
                                            'hoverEffect h-8 w-8 rounded-full border-2 object-cover transition-colors',
                                            'border-gray-300 hover:border-[#3b9c3c]',
                                            'dark:border-gray-500 dark:hover:border-[#4ade80]',
                                        )}
                                    />
                                ) : (
                                    <div
                                        className={clsx(
                                            'hoverEffect flex h-8 w-8 items-center justify-center rounded-full font-semibold transition-colors',
                                            'bg-[#063c28] text-white hover:bg-[#3b9c3c]',
                                            'dark:bg-[#4ade80] dark:text-black dark:hover:bg-[#22c55e]',
                                        )}
                                    >
                                        {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                                    </div>
                                )}
                            </button>
                            {userMenuOpen && (
                                <div
                                    className={clsx(
                                        'absolute right-0 mt-2 w-48 rounded-lg shadow-lg backdrop-blur-md z-50',
                                        'bg-white/95 border border-gray-200',
                                        'dark:bg-[#1a1a1a]/95 dark:border-[#333]'
                                    )}
                                >
                                    <div className="py-2">
                                        <div className="px-4 py-2 border-b border-gray-200 dark:border-[#333]">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>

                                        <button
                                            onClick={handleLogout}
                                            className={clsx(
                                                'flex items-center gap-2 px-4 py-2.5 text-sm w-full text-left transition-colors cursor-pointer',
                                                'text-red-600 hover:bg-red-50',
                                                'dark:text-red-400 dark:hover:bg-red-900/20'
                                            )}
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                            <DialogTrigger asChild>
                                <button
                                    onClick={() => setLoginOpen(true)}
                                    className={clsx(
                                        'hoverEffect text-sm font-semibold transition-colors',
                                        'hover:text-[#0a0a0a]',
                                        'dark:text-gray-300 dark:hover:text-white',
                                    )}
                                >
                                    Login
                                </button>
                            </DialogTrigger>
                            <AuthModal defaultTab="login" isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
                        </Dialog>
                    )}
                </div>
            </div>
        </header>
    );
}
export default memo(Header);