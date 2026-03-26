'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Project {
    title: string;
    meta: string;
    description: Translations;
    href: string;
    /** Optional SVG string rendered as the card thumbnail background */
    thumbSvg?: React.ReactNode;
}

interface Props {
    projects: Project[];
}

// ─── Default SVG Thumbs ───────────────────────────────────────────────────────
const DefaultThumbs: React.ReactNode[] = [
    <svg key="t1" viewBox="0 0 480 158" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#e8e5e0" /><stop offset="100%" stopColor="#d0ccc5" /></linearGradient></defs>
        <rect width="480" height="158" fill="url(#cg1)" /><circle cx="380" cy="30" r="90" fill="#c8c4bc" opacity="0.45" /><circle cx="60" cy="140" r="65" fill="#b8b4ac" opacity="0.35" /><rect x="160" y="40" width="100" height="80" rx="6" fill="#d8d4cc" opacity="0.4" transform="rotate(-8 210 80)" />
    </svg>,
    <svg key="t2" viewBox="0 0 480 158" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="cg2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#dde4e0" /><stop offset="100%" stopColor="#c4ccc8" /></linearGradient></defs>
        <rect width="480" height="158" fill="url(#cg2)" /><rect x="300" y="-30" width="140" height="140" rx="10" fill="#bcc8c4" opacity="0.4" transform="rotate(18 370 40)" /><rect x="10" y="80" width="100" height="100" rx="8" fill="#aebab6" opacity="0.3" transform="rotate(-12 60 130)" /><circle cx="240" cy="80" r="30" fill="#c4d0cc" opacity="0.35" />
    </svg>,
    <svg key="t3" viewBox="0 0 480 158" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="cg3" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#e2dce4" /><stop offset="100%" stopColor="#ccc4d0" /></linearGradient></defs>
        <rect width="480" height="158" fill="url(#cg3)" /><polygon points="240,8 440,148 40,148" fill="#bcb4c4" opacity="0.28" /><circle cx="240" cy="90" r="44" fill="#ccc4d4" opacity="0.4" /><circle cx="60" cy="30" r="35" fill="#b8b0c4" opacity="0.3" />
    </svg>,
    <svg key="t4" viewBox="0 0 480 158" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs><linearGradient id="cg4" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stopColor="#e4e0d8" /><stop offset="100%" stopColor="#ccc8c0" /></linearGradient></defs>
        <rect width="480" height="158" fill="url(#cg4)" /><rect x="80" y="20" width="80" height="80" rx="4" fill="#c4c0b8" opacity="0.45" transform="rotate(12 120 60)" /><rect x="300" y="50" width="120" height="80" rx="4" fill="#c8c4bc" opacity="0.4" transform="rotate(-6 360 90)" /><circle cx="240" cy="40" r="28" fill="#d0ccc4" opacity="0.5" />
    </svg>,
];

// ─── Carousel ─────────────────────────────────────────────────────────────────
export default function ProjectsCarousel({ projects }: Props) {
    const { t } = useLang();
    const [idx, setIdx] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(0);
    const GAP = 20;

    const perView = () => (typeof window !== 'undefined' && window.innerWidth <= 600 ? 1 : 2);
    const maxIdx = Math.max(0, projects.length - perView());

    const measure = useCallback(() => {
        if (!viewportRef.current) return;
        const pv = perView();
        const vw = viewportRef.current.offsetWidth;
        setCardWidth((vw - GAP * (pv - 1)) / pv);
        setIdx((prev) => Math.min(prev, Math.max(0, projects.length - pv)));
    }, [projects.length]);

    useEffect(() => {
        measure();
        let timer: ReturnType<typeof setTimeout>;
        const onResize = () => { clearTimeout(timer); timer = setTimeout(measure, 80); };
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('resize', onResize); clearTimeout(timer); };
    }, [measure]);

    useEffect(() => {
        if (!trackRef.current || cardWidth === 0) return;
        trackRef.current.style.transform = `translateX(-${idx * (cardWidth + GAP)}px)`;
    }, [idx, cardWidth]);

    const goTo = (i: number) => setIdx(Math.max(0, Math.min(i, maxIdx)));

    const dots = Array.from({ length: maxIdx + 1 });

    return (
        <div className="animate-fade-up-fast">
            <div ref={viewportRef} className="overflow-hidden rounded-sm">
                <div ref={trackRef} className="carousel-track">
                    {projects.map((project, i) => (
                        <a
                            key={i}
                            href={project.href}
                            style={{ width: cardWidth > 0 ? cardWidth : undefined }}
                            className="shrink-0 bg-surface border border-border rounded-[7px] overflow-hidden no-underline text-inherit block transition-[border-color,transform,box-shadow] duration-200 hover:border-muted hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                        >
                            <div className="h-[158px] overflow-hidden relative">
                                {project.thumbSvg ?? DefaultThumbs[i % DefaultThumbs.length]}
                            </div>
                            <div className="px-[18px] py-4 pb-5">
                                <div className="font-semibold text-[0.875rem] text-text mb-[3px]">{project.title}</div>
                                <div className="font-mono text-[0.625rem] font-light text-muted tracking-[0.04em] mb-[9px]">
                                    {project.meta}
                                </div>
                                <div className="text-[0.8125rem] text-muted font-light leading-[1.65]">
                                    {t(project.description)}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Nav */}
            <div className="flex items-center gap-3 mt-[18px]">
                <button
                    onClick={() => goTo(idx - 1)}
                    disabled={idx === 0}
                    aria-label="Previous"
                    className="w-[30px] h-[30px] bg-transparent border border-border rounded shrink-0 flex items-center justify-center text-muted transition-[color,border-color] duration-150 enabled:hover:text-text enabled:hover:border-muted disabled:opacity-[0.28] disabled:cursor-default cursor-pointer"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="flex items-center gap-1.5">
                    {dots.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-[5px] h-[5px] rounded-full transition-[background,transform] duration-200 cursor-pointer border-none p-0 ${i === idx ? 'bg-muted scale-[1.3]' : 'bg-border'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => goTo(idx + 1)}
                    disabled={idx >= maxIdx}
                    aria-label="Next"
                    className="w-[30px] h-[30px] bg-transparent border border-border rounded shrink-0 flex items-center justify-center text-muted transition-[color,border-color] duration-150 enabled:hover:text-text enabled:hover:border-muted disabled:opacity-[0.28] disabled:cursor-default cursor-pointer"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
