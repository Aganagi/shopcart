import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import PaymentForm from './PaymentForm';
import {LikesProvider} from "@/pages/provider/LikesProvider.jsx";
import Header from "@/pages/Header.jsx";
import Footer from "@/pages/Footer.jsx";

export default function Index() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <LikesProvider>
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <PaymentForm />
            <Footer />
        </LikesProvider>
    );
}
