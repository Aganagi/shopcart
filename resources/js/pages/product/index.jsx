import React, { useState } from 'react'
import { LikesProvider } from '../provider/LikesProvider'
import Header from '../Header'
import Footer from '../Footer'
import Product from './product'
import SearchBar from '@/components/SearchBar'
import useFlashMessages from '@/hooks/useFlashMessages'

export default function Index() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useFlashMessages();
  return (
    <LikesProvider>
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Product />
      <Footer />
    </LikesProvider>
  )
}
