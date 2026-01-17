import React from 'react'
import { LikesProvider } from '../provider/LikesProvider'
import Header from '../Header'
import Footer from '../Footer'
import HotDeal from './hot-deal'
import { usePage } from '@inertiajs/react'
import useFlashMessages from '@/hooks/useFlashMessages'

export default function Index() {
  const { products } = usePage().props;
  useFlashMessages();
  return (
    <LikesProvider>
      <Header />
      <HotDeal products={products} />
      <Footer />
    </LikesProvider>
  )
}
