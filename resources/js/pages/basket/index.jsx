import React, { useState } from 'react'
import { LikesProvider } from '../provider/LikesProvider'
import Header from '../Header'
import SearchBar from '@/components/SearchBar'
import Footer from '../Footer'
import Basket from './basket'

export default function Index() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <LikesProvider>
            <Header onOpenSearch={() => setIsSearchOpen(true)} />
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                <Basket/>
            <Footer />
        </LikesProvider>
    )
}