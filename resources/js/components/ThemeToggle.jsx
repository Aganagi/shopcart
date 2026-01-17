import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            return savedTheme || systemTheme;
        }
        return 'light';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full cursor-pointer hoverEffect transition-colors focus:outline-none"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-[#3b9c3c] dark:hover:text-[#3b9c3c]" />
            ) : (
                <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-[#3b9c3c] dark:hover:text-[#3b9c3c]" />
            )}
        </button>
    );
}