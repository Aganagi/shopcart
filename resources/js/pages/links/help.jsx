import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronRight, CircleQuestionMark, Clock, Mail, MapPin, MessageSquare, Phone, Search } from 'lucide-react';
import React, { useState } from 'react';
import { CartProvider } from '../provider/CartProvider';
import { LikesProvider } from '../provider/LikesProvider';
import Header from '../Header';
import Footer from '../Footer';
import SearchBar from '@/components/SearchBar';


export default function Help() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <CartProvider>
            <LikesProvider>
                <section className="bg-white text-neutral-900 dark:bg-[#0D0D0D] dark:text-white">
                    <Header onOpenSearch={() => setIsSearchOpen(true)} />
                    <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
                    <div className="container mx-auto max-w-7xl px-4 py-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-medium tracking-tight  sm:text-4xl md:text-5xl">Help Center</h1>
                                <p className="text-[#737373]">Find answers, get support, and resolve issues with your orders.</p>
                            </div>
                            <div className="relative">
                                <Search className="absolute top-2 left-3 h-5 w-5 text-[#737373]" />
                                <Input
                                    type="search"
                                    className="flex h-9 w-full rounded-md border border-neutral-200 dark:border-neutral-800 dark:text-white bg-white px-3 py-1 pl-10 text-base text-zinc-900 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#737373] placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3 md:text-sm lg:w-1/2"
                                />
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-xl border border-neutral-200 bg-white dark:bg-[#0D0D0D] dark:border-neutral-800 text-[#0a0a0a] dark:text-white shadow-sm">
                                    <div className="flex flex-col space-y-1.5 p-6 pb-3">
                                        <div className="flex items-center gap-2 leading-none font-semibold tracking-tight">
                                            <Phone className="h-5 w-5 text-neutral-950 dark:text-white" />
                                            Emergency Contact
                                        </div>
                                        <div className="text-sm text-[#737373] dark:text-gray-500">
                                            Get immediate assistance for urgent issues
                                        </div>
                                    </div>
                                    <div className="space-y-2 p-6 pt-0">
                                        <div className="font-medium">Customer Support Hotline</div>
                                        <div className="text-lg font-semibold">1-800-SHOP-HELP</div>
                                        <div className="flex items-center gap-2 text-sm text-[#737373] dark:text-gray-500">
                                            <Clock className="h-4 w-4" />
                                            Available 24/7 for emergencies
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 pt-0">
                                        <Button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                            Call Now
                                        </Button>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-neutral-200 bg-white dark:bg-[#0D0D0D] dark:border-neutral-800 text-[#0a0a0a] dark:text-white shadow-sm">
                                    <div className="flex flex-col space-y-1.5 p-6 pb-3">
                                        <div className="flex items-center gap-2 leading-none font-semibold tracking-tight">
                                            <Mail className="h-5 w-5 text-neutral-950 dark:text-white" />
                                            Email Support
                                        </div>
                                        <div className="text-sm text-[#737373] dark:text-gray-500">Get help via email for non-urgent issues</div>
                                    </div>
                                    <div className="space-y-2 p-6 pt-0">
                                        <div className="font-medium">Customer Service Email</div>
                                        <div className="text-lg font-semibold">support@shopcart.com</div>
                                        <div className="flex items-center gap-2 text-sm text-[#737373] dark:text-gray-500">
                                            <Clock className="h-4 w-4" />
                                            Response within 24 hours
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 pt-0">
                                        <Button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                            Send Email
                                        </Button>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-[#0a0a0a] dark:text-white shadow-sm">
                                    <div className="flex flex-col space-y-1.5 p-6 pb-3">
                                        <div className="flex items-center gap-2 leading-none font-semibold tracking-tight">
                                            <MessageSquare className="h-5 w-5 text-neutral-950 dark:text-neutral-200" />
                                            Live Chat
                                        </div>
                                        <div className="text-sm text-[#737373] dark:text-gray-500">Chat with our support team in real-time</div>
                                    </div>
                                    <div className="space-y-2 p-6 pt-0">
                                        <div className="font-medium">Chat Support Hours</div>
                                        <div className="text-lg font-semibold">9 AM - 9 PM (Mon-Sat)</div>
                                        <div className="flex items-center gap-2 text-sm text-[#737373] dark:text-gray-500">
                                            <Clock className="h-4 w-4" />
                                            Average wait time: 2 minutes
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 pt-0">
                                        <Button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-[#063d29]/80 dark:bg-[#06d29] px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-colors hover:bg-[#063D29] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                            Start Chat
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Tabs defaultValue="faqs" className="w-full">
                                    <TabsList className="bg-[#F5F5F5] dark:bg-neutral-800">
                                        <TabsTrigger
                                            value="faqs"
                                            className="h-7 w-28 px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-black"
                                        >
                                            FAQs
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="orders"
                                            className="h-7 w-28 px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-black"
                                        >
                                            Orders
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="returns"
                                            className="h-7 w-28 px-3 py-1 data-[state=active]:bg-white data-[state=active]:text-black"
                                        >
                                            Returns
                                        </TabsTrigger>
                                    </TabsList>
                                    <div className="mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-900 dark:text-neutral-200 shadow-sm">
                                        <TabsContent value="faqs">
                                            <div className="flex flex-col space-y-1.5 p-6">
                                                <div className="leading-none font-semibold tracking-tight">Frequently Asked Questions</div>
                                                <div className="text-sm text-[#737373] dark:text-gray-300">
                                                    Find answers to the most common questions about our services
                                                </div>
                                            </div>
                                            <div className="p-6 pt-0">
                                                <div className="w-full" data-orientation="vertical">
                                                    {[
                                                        {
                                                            q: 'How do I track my order?',
                                                            a: 'You can track your order by logging into your account and visiting the Order History section. Alternatively, you can use the tracking number provided in your shipping confirmation email.',
                                                        },
                                                        {
                                                            q: 'What payment methods do you accept?',
                                                            a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For select regions, we also offer buy-now-pay-later options.',
                                                        },
                                                        {
                                                            q: 'How long will shipping take?',
                                                            a: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and international shipping options are also available.',
                                                        },
                                                        {
                                                            q: 'What is your return policy?',
                                                            a: 'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some items like intimate apparel or personalized products may not be eligible for return.',
                                                        },
                                                        {
                                                            q: 'Do you ship internationally?',
                                                            a: 'Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by location. You can see the shipping options available to your country during checkout.',
                                                        },
                                                    ].map((item, index) => {
                                                        const isOpen = openIndex === index;
                                                        return (
                                                            <div key={index} data-state={isOpen ? 'open' : 'closed'} className="group border-b">
                                                                <h3 className="flex text-gray-900 dark:text-white">
                                                                    <button
                                                                        type="button"
                                                                        aria-expanded={isOpen}
                                                                        onClick={() => toggleAccordion(index)}
                                                                        className="hoverEffect flex flex-1 items-center justify-between py-4 text-left text-sm font-normal text-neutral-950/80 dark:text-white transition-all group-hover:text-neutral-950 dark:group-hover:text-neutral-300 hover:underline [&[data-state=open]>svg]:rotate-180"
                                                                        data-state={isOpen ? 'open' : 'closed'}
                                                                    >
                                                                        {item.q}
                                                                        <ChevronDown
                                                                            className={`h-5 w-5 transform text-gray-900 dark:text-gray-300 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
                                                                                }`}
                                                                        />
                                                                    </button>
                                                                </h3>
                                                                <div
                                                                    data-state={isOpen ? 'open' : 'closed'}
                                                                    className={`overflow-hidden text-sm transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'} ${isOpen ? 'animate-accordion-down' : 'animate-accordion-up'
                                                                        }`}
                                                                >
                                                                    {isOpen && <div className="pt-0 pb-4 text-gray-600 dark:text-neutral-300">{item.a}</div>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="orders">
                                            <div className="flex flex-col space-y-1.5 p-6">
                                                <div className="leading-none font-semibold tracking-tight">Order Help</div>
                                                <div className="text-sm text-[#737373] dark:text-neutral-300">Get assistance with your orders</div>
                                            </div>
                                            <div className="p-6 pt-0">
                                                <div className="w-full" data-orientation="vertical">
                                                    {[
                                                        {
                                                            q: 'How do I cancel my order?',
                                                            a: "If your order hasn't shipped yet, you can cancel it by going to your account's Order History section and selecting Cancel Order. If it has already shipped, you'll need to initiate a return once you receive it.",
                                                        },
                                                        {
                                                            q: 'Can I modify my order after placing it?',
                                                            a: "Order modifications (such as changing size, color, or shipping address) may be possible if the order hasn't been processed yet. Please contact customer service immediately with your order number.",
                                                        },
                                                        {
                                                            q: 'How long will shipping take?',
                                                            a: 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and international shipping options are also available.',
                                                        },
                                                        {
                                                            q: 'What if my order arrives damaged?',
                                                            a: "If your order arrives damaged, please take photos of the damaged items and packaging, and contact our customer service within 48 hours of delivery. We'll arrange a replacement or refund.",
                                                        },
                                                        {
                                                            q: 'My order is missing items. What should I do?',
                                                            a: 'If items are missing from your order, please check your order confirmation to verify what was purchased. If items are indeed missing, contact customer service with your order number for immediate assistance.',
                                                        },
                                                    ].map((item, index) => {
                                                        const isOpen = openIndex === index;
                                                        return (
                                                            <div key={index} data-state={isOpen ? 'open' : 'closed'} className="group border-b">
                                                                <h3 className="flex text-gray-900 dark:text-white">
                                                                    <button
                                                                        type="button"
                                                                        aria-expanded={isOpen}
                                                                        onClick={() => toggleAccordion(index)}
                                                                        className="hoverEffect flex flex-1 items-center justify-between py-4 text-left text-sm font-normal text-neutral-950/80 dark:text-white transition-all group-hover:text-neutral-950 dark:group-hover:text-gray-300 hover:underline [&[data-state=open]>svg]:rotate-180"
                                                                        data-state={isOpen ? 'open' : 'closed'}
                                                                    >
                                                                        {item.q}
                                                                        <ChevronDown
                                                                            className={`h-5 w-5 transform text-gray-900 dark:text-neutral-300 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
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
                                        </TabsContent>
                                        <TabsContent value="returns">
                                            <div className="flex flex-col space-y-1.5 p-6">
                                                <div className="leading-none font-semibold tracking-tight">Returns & Refunds</div>
                                                <div className="text-sm text-[#737373] dark:text-neutral-300">Information about our return and refund processes</div>
                                            </div>
                                            <div className="p-6 pt-0">
                                                <div className="w-full" data-orientation="vertical">
                                                    {[
                                                        {
                                                            q: 'How do I start to return?',
                                                            a: 'To initiate a return, log into your account, go to Order History, select the order containing the item(s) you wish to return, and click Return Items. Follow the prompts to complete the return request.',
                                                        },
                                                        {
                                                            q: 'How long do refunds take a process?',
                                                            a: 'Once we receive your returned items, it typically takes 3-5 business days to process the return. After processing, refunds usually appear in your account within 5-10 business days, depending on your payment method and financial institution.',
                                                        },
                                                        {
                                                            q: 'Do I have to pay for return shipping?',
                                                            a: 'For standard returns, customers are responsible for return shipping costs unless the return is due to our error (wrong item shipped, defective product, etc.). Premium members receive free return shipping on all orders.',
                                                        },
                                                        {
                                                            q: 'Can I exchange an item instead of a returing it?',
                                                            a: "Yes, you can request an exchange for a different size or color of the same item during the return process. If the item you want is in stock, we'll ship it once we receive your return.",
                                                        },
                                                    ].map((item, index) => {
                                                        const isOpen = openIndex === index;
                                                        return (
                                                            <div key={index} data-state={isOpen ? 'open' : 'closed'} className="group border-b">
                                                                <h3 className="flex text-gray-900 dark:text-white">
                                                                    <button
                                                                        type="button"
                                                                        aria-expanded={isOpen}
                                                                        onClick={() => toggleAccordion(index)}
                                                                        className="hoverEffect flex flex-1 items-center justify-between py-4 text-left text-sm font-normal text-neutral-950/80 dark:text-neutral-300 transition-all group-hover:text-neutral-950 dark:group-hover:text-neutral-100 hover:underline [&[data-state=open]>svg]:rotate-180"
                                                                        data-state={isOpen ? 'open' : 'closed'}
                                                                    >
                                                                        {item.q}
                                                                        <ChevronDown
                                                                            className={`h-5 w-5 transform text-gray-900 dark:text-gray-300 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
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
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-950 dark:text-neutral-200 shadow-sm">
                                    <div className="flex flex-col space-y-1.5 p-6">
                                        <div className="flex items-center gap-2 leading-none font-semibold tracking-tight">
                                            <MapPin className="h-5 w-5 text-shadow-gray-950" />
                                            Visit Our Store
                                        </div>
                                        <div className="text-sm text-[#737373]">Get in-person assistance at our locations</div>
                                    </div>
                                    <div className="space-y-4 p-6 pt-0">
                                        <div>
                                            <div className="font-normal">Main Store - New York</div>
                                            <div className="text-sm text-[#737373]">123 Shopping Avenue, New York, NY 10001</div>
                                            <div className="text-sm text-[#737373]">Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 6 PM</div>
                                        </div>
                                        <div>
                                            <div className="font-normal">West Coast Branch - Los Angeles</div>
                                            <div className="text-sm text-[#737373]">456 Retail Boulevard, Los Angeles, CA 90001</div>
                                            <div className="text-sm text-[#737373]">Mon-Sat: 10 AM - 9 PM, Sun: 11 AM - 6 PM</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 pt-0">
                                        <Button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                            Find Nearest Store
                                        </Button>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-950 dark:text-neutral-200 shadow-sm">
                                    <div className="flex flex-col space-y-1.5 p-6">
                                        <div className="flex items-center gap-2 leading-none font-semibold tracking-tight">
                                            <CircleQuestionMark className="h-5 w-5 text-shadow-gray-950" />
                                            Additional Resources
                                        </div>
                                        <div className="text-sm text-[#737373]">Explore more ways to get help</div>
                                    </div>
                                    <div className="space-y-4 p-6 pt-0">
                                        <div className="grid gap-2">
                                            <div className="group flex items-center justify-between">
                                                <span className="font-normal transition-colors group-hover:text-black dark:group-hover:text-white">Size Guide</span>
                                                <ChevronRight className="h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" />
                                            </div>
                                            <div className="group flex items-center justify-between">
                                                <span className="font-normal transition-colors group-hover:text-black dark:group-hover:text-white">Shipping Information</span>
                                                <ChevronRight className="h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" />
                                            </div>
                                            <div className="group flex items-center justify-between">
                                                <span className="font-normal transition-colors group-hover:text-black dark:group-hover:text-white">
                                                    Product Care Instructions
                                                </span>
                                                <ChevronRight className="h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" />
                                            </div>
                                            <div className="group flex items-center justify-between">
                                                <span className="font-normal transition-colors group-hover:text-black dark:group-hover:text-white">Gift Card Balance</span>
                                                <ChevronRight className="h-4 w-4 text-[#737373] transition-colors group-hover:text-black dark:group-hover:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-6 pt-0">
                                        <Button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 hover:text-[#171717] focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                            View All Resources
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-neutral-950 dark:text-neutral-200 shadow-sm">
                                <div className="flex flex-col space-y-1.5 p-6">
                                    <div className="leading-none font-semibold tracking-tight">Still Need Help?</div>
                                    <div className="text-sm text-[#737373] dark:text-gray-400">
                                        Our customer service team is here to assist you with any questions or concerns.
                                    </div>
                                </div>
                                <div className="p-6 pt-0">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 text-center">
                                            <Phone className="mb-2 h-10 w-10 text-black dark:text-white" />
                                            <h3 className="text-lg font-medium">Call Us</h3>
                                            <p className="text-sm text-[#737373] dark:text-gray-400">Speak directly with our support team</p>
                                            <Button className="hoverEffect mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#063d29]/80 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-[#063d29] focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                                1-800-SHOP-HELP
                                            </Button>
                                        </div>
                                        <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 text-center">
                                            <MessageSquare className="mb-2 h-10 w-10 text-black dark:text-white" />
                                            <h3 className="text-lg font-medium">Message Us</h3>
                                            <p className="text-sm text-[#737373]">Send us a message and we'll get back to you</p>
                                            <Button className="font-noraml hoverEffect mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md bg-white dark:bg-neutral-800 px-4 py-2 text-sm whitespace-nowrap text-black dark:text-white shadow-sm transition-colors hover:bg-[#f5f5f5] dark:hover:bg-neutral-950 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                                                Contact Form
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            </LikesProvider>
        </CartProvider>
    );
}