import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { CartProvider } from "../provider/CartProvider";
import { LikesProvider } from "../provider/LikesProvider";
import SearchBar from "@/components/SearchBar";


export default function Privacy() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <CartProvider>
            <LikesProvider>
                <div className="bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-neutral-200">
                    <Header onOpenSearch={() => setIsSearchOpen(true)} />
                    <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                    <div className="mx-auto max-w-3xl px-4 py-12  sm:px-6 lg:px-8">
                        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
                        <div className="space-y-4">
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">1. Information Collection</h2>
                                <p>
                                    We collect information you provide directly to us when using our services, as well as information about your use
                                    of our services.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">2. Use of Information</h2>
                                <p>
                                    We use the information we collect to provide, maintain, and improve our services, as well as to communicate with
                                    you.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">3. Information Sharing</h2>
                                <p>
                                    We do not share your personal information with third parties except as described in this Privacy Policy or with
                                    your consent.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">4. Data Security</h2>
                                <p>
                                    We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized
                                    access.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">5. Your Rights</h2>
                                <p>
                                    You have the right to access, correct, or delete your personal information. Please contact us for assistance with
                                    these requests.
                                </p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </LikesProvider>
        </CartProvider>
    );
}