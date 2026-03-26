'use client';

import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';

interface HeroProps {
    name: Translations;
    email: string;
    phone: string;
    github: { label: string; href: string };
    linkedin: { label: string; href: string };
    location: Translations;
    summary: Translations;
}

export default function Hero({ name, email, phone, github, linkedin, location, summary }: HeroProps) {
    const { t } = useLang();

    return (
        <div className="animate-fade-up pb-8 mb-12 border-b border-border">
            <h1 className="font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.05] tracking-[-0.02em] text-text mb-[14px]">
                {t(name)}
            </h1>
            <div className="flex flex-wrap gap-5 font-mono text-[0.75rem] font-light text-muted tracking-[0.02em] sm:gap-3">
                <span>
                    <a href={`mailto:${email}`} className="text-inherit no-underline hover:text-text transition-colors">
                        {email}
                    </a>
                </span>
                <span>{phone}</span>
                <a href={github.href} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:text-text transition-colors">
                    {github.label}
                </a>
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline hover:text-text transition-colors">
                    {linkedin.label}
                </a>
                <span>{t(location)}</span>
            </div>
            <p className="mt-5 max-w-[580px] font-light text-muted text-[0.875rem] leading-[1.7]">
                {t(summary)}
            </p>
        </div>
    );
}
