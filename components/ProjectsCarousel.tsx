'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';
import styles from './ProjectsCarousel.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Project {
    title: Translations;
    meta: Translations;
    description: Translations;
    href: string;
    thumbSvg?: React.ReactNode;
}

interface Props {
    projects: Project[];
}

// ─── Default SVG thumbnails ───────────────────────────────────────────────────
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

    const [pv, setPv] = useState(2);
    const maxIdx = Math.max(0, projects.length - pv);

    const measure = useCallback(() => {
        if (!viewportRef.current) return;
        const currentPv = window.innerWidth <= 600 ? 1 : 2;
        setPv(currentPv);
        const vw = viewportRef.current.offsetWidth;
        setCardWidth((vw - GAP * (currentPv - 1)) / currentPv);
        setIdx((prev: number) => Math.min(prev, Math.max(0, projects.length - currentPv)));
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
        <div className={styles.wrap}>
            <div ref={viewportRef} className={styles.viewport}>
                <div ref={trackRef} className="carousel-track">
                    {projects.map((project, i) => (
                        <a
                            key={i}
                            href={project.href}
                            style={{ width: cardWidth > 0 ? cardWidth : undefined }}
                            className={styles.card}
                        >
                            <div className={styles.cardThumb}>
                                {project.thumbSvg ?? DefaultThumbs[i % DefaultThumbs.length]}
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.cardTitle}>{t(project.title)}</div>
                                <div className={styles.cardMeta}>{t(project.meta)}</div>
                                <div className={styles.cardDesc}>{t(project.description)}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className={styles.nav}>
                <button onClick={() => goTo(idx - 1)} disabled={idx === 0} aria-label="Previous" className={styles.btn}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M6 2L3 5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className={styles.dots}>
                    {dots.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                        />
                    ))}
                </div>
                <button onClick={() => goTo(idx + 1)} disabled={idx >= maxIdx} aria-label="Next" className={styles.btn}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
