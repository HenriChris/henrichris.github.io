'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Start as 'dark' to match the default class on <html> set by layout.tsx.
    // The blocking script + useEffect will correct this to the user's preference.
    const [theme, setThemeState] = useState<Theme>('dark');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        applyTheme(saved ?? preferred);
    }, []);

    function applyTheme(t: Theme) {
        setThemeState(t);
        document.documentElement.classList.toggle('dark', t === 'dark');
        localStorage.setItem('theme', t);
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme: applyTheme,
                toggleTheme: () => applyTheme(theme === 'dark' ? 'light' : 'dark'),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}
