import React, { useState } from 'react'
import { LikesProvider } from '../provider/LikesProvider'
import Header from '../Header'
import Footer from '../Footer'
import Blog from './blog'
import SearchBar from '@/components/SearchBar'

export default function Index() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <LikesProvider>
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Blog />
      <Footer />
    </LikesProvider>
  )
}
