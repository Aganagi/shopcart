import React, { useState } from "react";
import { CartProvider } from "../provider/CartProvider";
import { LikesProvider } from "../provider/LikesProvider";
import Header from "../Header";
import Footer from "../Footer";
import SearchBar from "@/components/SearchBar";

export default function Terms() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <CartProvider>
            <LikesProvider>
                <div className="bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-neutral-200">
                    <Header onOpenSearch={() => setIsSearchOpen(true)} />
                    <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                        <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>
                        <div className="space-y-4">
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Shopcart's services, you agree to be bound by these Terms and Conditions.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">2. Use of Services</h2>
                                <p>
                                    You agree to use Shopcart's services only for lawful purposes and in accordance with these Terms and Conditions.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">3. Intellectual Property</h2>
                                <p>
                                    All content and materials available on Shopcart's services are the property of Shopcart and are protected by
                                    applicable intellectual property laws.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">4. Limitation of Liability</h2>
                                <p>
                                    Shopcart shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting
                                    from your use of our services.
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">5. Governing Law</h2>
                                <p>
                                    These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in
                                    which Shopcart operates.
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