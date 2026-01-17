import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: name => {
            const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
            return pages[`./pages/${name}.jsx`]
            if (!module) throw new Error(`Page not found: ${name}`)
            return module.default
        },
        setup: ({ App, props }) => <App {...props} />,
    }),
)