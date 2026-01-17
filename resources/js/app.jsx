import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './pages/provider/Cartprovider'
import { Toaster } from 'react-hot-toast'

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        return pages[`./pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <CartProvider>
                <App {...props} />
                <Toaster
                    position="right-bottom"
                    reverseOrder={false}
                    gutter={8}
                    toastOptions={{
                        duration: 3000,
                        style: {
                            fontSize: '14px',
                            borderRadius: '10px',
                            padding: '12px 20px',
                            fontWeight: '500',
                        },
                        success: {
                            duration: 3000,
                            style: {
                                background: '#22c55e',
                                color: '#fff',
                            },
                            iconTheme: {
                                primary: '#fff',
                                secondary: '#22c55e',
                            },
                        },
                        error: {
                            duration: 4000,
                            style: {
                                background: '#ef4444',
                                color: '#fff',
                            },
                            iconTheme: {
                                primary: '#fff',
                                secondary: '#ef4444',
                            },
                        },
                        loading: {
                            style: {
                                background: '#3b82f6',
                                color: '#fff',
                            },
                        },
                    }}
                />
            </CartProvider>
        )
    },
    progress: {
        color: '#3b9c3c'
    }
})
