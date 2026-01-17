import React, { useState } from 'react'
import { LikesProvider } from '../provider/LikesProvider'
import Header from '../Header'
import Footer from '../Footer'
import Sidebar from './sidebar'
import { usePage } from '@inertiajs/react'
import SearchBar from '@/components/SearchBar'
import useFlashMessages from '@/hooks/useFlashMessages'

export default function Index() {
    const { brands, categories } = usePage().props;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    useFlashMessages();
    return (
        <LikesProvider>
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <Sidebar brands={brands} categories={categories} />
            <Footer />
        </LikesProvider>
    )
}