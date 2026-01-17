import React, {useState} from 'react'
import {LikesProvider} from '../provider/LikesProvider'
import Header from '../Header'
import Footer from '../Footer'
import Wishlist from './wishlist'
import {usePage} from '@inertiajs/react'
import SearchBar from "@/components/SearchBar.jsx";

export default function Index() {
    const {products} = usePage().props;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <LikesProvider>
            <Header onOpenSearch={() => setIsSearchOpen(true)}/>
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}/>
            <Wishlist products={products}/>
            <Footer/>
        </LikesProvider>
    )
}
