'use client';

import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';
import styles from './Hero.module.css';

interface HeroProps {
    name: Translations;
    email: string;
    github: { label: string; href: string };
    linkedin: { label: string; href: string };
    location: Translations;
    summary: Translations;
}

export default function Hero({ name, email, github, linkedin, location, summary }: HeroProps) {
    const { t } = useLang();

    return (
        <div className={styles.hero}>
            <h1 className={styles.name}>{t(name)}</h1>
            <div className={styles.meta}>
                <span><a href={`mailto:${email}`}>{email}</a></span>
                <a href={github.href} target="_blank" rel="noopener noreferrer">{github.label}</a>
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer">{linkedin.label}</a>
                <span>{t(location)}</span>
            </div>
            <p className={styles.summary}>{t(summary)}</p>
        </div>
    );
}
