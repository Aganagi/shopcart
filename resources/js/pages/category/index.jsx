import React, { useMemo, useState } from 'react'
import { LikesProvider } from '../provider/LikesProvider'
import Header from '../Header'
import Footer from '../Footer'
import SearchBar from '@/components/SearchBar';
import { usePage } from '@inertiajs/react';
import Category from './category';
import useFlashMessages from '@/hooks/useFlashMessages';

export default function Index() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { categories, products, selectedCategory } = usePage().props;
    useFlashMessages();
    return (
        <LikesProvider>
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <Category
                categories={categories}
                products={products}
                selectedCategory={selectedCategory}
            />
            <Footer />
        </LikesProvider>
    )
}
