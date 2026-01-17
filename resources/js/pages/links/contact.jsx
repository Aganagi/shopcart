import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CartProvider } from '../provider/CartProvider';
import { LikesProvider } from '../provider/LikesProvider';
import Header from '../Header';
import Footer from '../Footer';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';


export default function Contact() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <CartProvider>
            <LikesProvider>
                <div className="bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-white">
                    <Header onOpenSearch={() => setIsSearchOpen(true)} />
                    <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                        <div>
                            <h1 className="mb-6 text-3xl font-bold">Contact Us</h1>
                            <p className="mb-6 text-neutral-800 dark:text-neutral-200">
                                We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.
                            </p>
                            <form className="space-y-4">
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="name"
                                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        type="text"
                                        className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        placeholder="Your mail"
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Email
                                    </Label>
                                    <Textarea
                                        className="flex min-h-[60px] w-full resize-none rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                        rows={6}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="hoverEffect rounded-md bg-[#063d29]/80 px-6 py-3 text-sm font-semibold text-white hover:bg-[#063d29]"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </LikesProvider>
        </CartProvider>
    );
}