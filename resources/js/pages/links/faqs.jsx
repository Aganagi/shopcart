import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CartProvider } from '../provider/CartProvider';
import { LikesProvider } from '../provider/LikesProvider';
import Header from '../Header';
import Footer from '../Footer';
import SearchBar from '@/components/SearchBar';


export default function Faqs() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <CartProvider>
            <LikesProvider>
                <div className="bg-white text-gray-900 dark:text-neutral-200 dark:bg-[#0D0D0D]">
                    <Header onOpenSearch={() => setIsSearchOpen(true)}/>
                    <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                    <div className="mx-auto max-w-(--breakpoint-xl) px-4">
                        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                            <h1 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h1>

                            <div className="w-full" data-orientation="vertical">
                                {[
                                    {
                                        q: 'What services does Shopcart offer?',
                                        a: 'Shopcart offers a wide range of technology solutions including custom software development, cloud services, and digital transformation consulting.',
                                    },
                                    {
                                        q: 'How can I get support for Shopcart products?',
                                        a: 'You can reach our support team through our contact page or by emailing support@Shopcart.com.',
                                    },
                                    {
                                        q: 'Does Shopcart offer training for its products?',
                                        a: 'Yes, we offer comprehensive training programs for all our products and services. Please contact our sales team for more information.',
                                    },
                                    {
                                        q: 'What industries does Shopcart serve?',
                                        a: 'Shopcart serves a wide range of industries including finance, healthcare, retail, and manufacturing.',
                                    },
                                    {
                                        q: 'How does Shopcart ensure data security?',
                                        a: "We employ industry-standard security measures and comply with all relevant data protection regulations to ensure the security of our clients' data.",
                                    },
                                ].map((item, index) => {
                                    const isOpen = openIndex === index;
                                    return (
                                        <div key={index} data-state={isOpen ? 'open' : 'closed'} className="group border-b">
                                            <h3 className="flex">
                                                <button
                                                    type="button"
                                                    aria-expanded={isOpen}
                                                    onClick={() => toggleAccordion(index)}
                                                    className="hoverEffect flex flex-1 items-center justify-between py-4 text-left text-lg font-semibold text-neutral-950/80 dark:text-neutral-200/80 transition-all group-hover:text-neutral-950 dark:group-hover:text-neutral-200 hover:no-underline [&[data-state=open]>svg]:rotate-180"
                                                    data-state={isOpen ? 'open' : 'closed'}
                                                >
                                                    {item.q}
                                                    <ChevronDown
                                                        className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
                                                            }`}
                                                    />
                                                </button>
                                            </h3>
                                            <div
                                                data-state={isOpen ? 'open' : 'closed'}
                                                className={`overflow-hidden text-sm transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'} ${isOpen ? 'animate-accordion-down' : 'animate-accordion-up'
                                                    }`}
                                            >
                                                {isOpen && <div className="pt-0 pb-4 text-gray-600 dark:text-gray-300">{item.a}</div>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </LikesProvider>
        </CartProvider>
    );
}