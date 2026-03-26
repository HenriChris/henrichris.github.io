'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';

interface Props {
    label: Translations;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const ChevronIcon = () => (
    <svg className="w-3 h-3 shrink-0 transition-[transform,color] duration-[280ms]" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Accordion({ label, defaultOpen = true, children }: Props) {
    const [open, setOpen] = useState(defaultOpen);
    const { t } = useLang();

    return (
        <div className="border-b border-border">
            <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex justify-between items-center w-full py-[15px] text-left cursor-pointer select-none bg-transparent border-none group"
            >
                <span
                    className={`font-mono text-[0.625rem] font-medium tracking-[0.14em] uppercase transition-colors duration-150 ${open ? 'text-text' : 'text-muted group-hover:text-text'
                        }`}
                >
                    {t(label)}
                </span>
                <span className={`transition-[transform] duration-[280ms] ${open ? 'rotate-180 text-text' : 'text-muted group-hover:text-text'}`}>
                    <ChevronIcon />
                </span>
            </button>
            <div className={`accordion-body ${open ? 'open' : ''}`}>
                <div className="accordion-inner">
                    <div className="pb-7">{children}</div>
                </div>
            </div>
        </div>
    );
}
