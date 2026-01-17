import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { LikesProvider } from '../provider/LikesProvider'
import Banner from './banner'
import Content from './content'
import { usePage } from '@inertiajs/react'
import Category from './category'
import Brand from './brand'
import SearchBar from '@/components/SearchBar'
import useFlashMessages from '@/hooks/useFlashMessages'


export default function index() {
  const { brands, categories, products } = usePage().props;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useFlashMessages();
  return (
    <LikesProvider>
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Banner />
      <Content brands={brands} categories={categories} products={products} />
      <Category categories={categories} />
      <Brand brands={brands} />
      <Footer />
    </LikesProvider>
  )
}
