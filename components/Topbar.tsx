'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LangContext';
import type { LangCode } from '@/context/LangContext';

interface Props {
    onToggleNav: () => void;
    navOpen: boolean;
}

export default function Topbar({ onToggleNav, navOpen }: Props) {
    const { theme, setTheme } = useTheme();
    const { lang, setLang, availableLanguages } = useLang();
    const isDark = theme === 'dark';

    return (
        <div className="flex items-center justify-between mb-12">
            {/* Hamburger */}
            <button
                onClick={onToggleNav}
                aria-label="Toggle navigation"
                aria-expanded={navOpen}
                className={`hamburger flex flex-col items-center justify-center gap-[5px] w-[34px] h-[34px] bg-transparent border border-border rounded-[5px] cursor-pointer transition-[border-color] duration-150 hover:border-muted shrink-0 ${navOpen ? 'open' : ''
                    }`}
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            <div className="flex items-center gap-3">
                {/* Theme switch */}
                <div className="flex items-center gap-[7px]">
                    <span
                        onClick={() => setTheme('light')}
                        className={`font-mono text-[0.625rem] tracking-[0.06em] cursor-pointer select-none transition-colors duration-200 ${!isDark ? 'text-text' : 'text-muted'
                            }`}
                    >
                        Light
                    </span>
                    <button
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        role="switch"
                        aria-checked={isDark}
                        aria-label="Toggle dark mode"
                        className={`relative w-[34px] h-[18px] rounded-[9px] border-none cursor-pointer transition-[background] duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted p-0 shrink-0 ${isDark ? 'bg-muted' : 'bg-border'
                            }`}
                    >
                        <span className="switch-thumb" />
                    </button>
                    <span
                        onClick={() => setTheme('dark')}
                        className={`font-mono text-[0.625rem] tracking-[0.06em] cursor-pointer select-none transition-colors duration-200 ${isDark ? 'text-text' : 'text-muted'
                            }`}
                    >
                        Dark
                    </span>
                </div>

                {/* Language dropdown */}
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as LangCode)}
                    aria-label="Language"
                    className="lang-select font-mono text-[0.625rem] tracking-[0.06em] text-muted border border-border rounded px-[9px] pr-[22px] py-1 cursor-pointer transition-[color,border-color] duration-150 hover:text-text hover:border-muted"
                >
                    {availableLanguages.map(({ code, label }) => (
                        <option key={code} value={code}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
