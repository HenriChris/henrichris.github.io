'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';
import styles from './Accordion.module.css';

interface Props {
    label: Translations;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const ChevronIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Accordion({ label, defaultOpen = true, children }: Props) {
    const [open, setOpen] = useState(defaultOpen);
    const { t } = useLang();

    return (
        <div className={styles.item}>
            <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className={styles.header}
            >
                <span className={`${styles.label} ${open ? styles.labelOpen : ''}`}>
                    {t(label)}
                </span>
                <ChevronIcon className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
            </button>
            <div className={`accordion-body ${open ? 'open' : ''}`}>
                <div className="accordion-inner">
                    <div className={styles.content}>{children}</div>
                </div>
            </div>
        </div>
    );
}
