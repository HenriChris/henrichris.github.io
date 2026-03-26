'use client';

import { useLang } from '@/context/LangContext';
import type { LangCode } from '@/context/LangContext';
import styles from './SidebarNav.module.css';

interface Props {
    activeTab: 'resume' | 'projects';
    setActiveTab: (tab: 'resume' | 'projects') => void;
    isOpen: boolean;
    onClose: () => void;
}

const ResumeIcon = () => (
    <svg className={styles.icon} width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="1" width="11" height="2" rx="1" fill="currentColor" />
        <rect x="1" y="5.5" width="8" height="1.5" rx="0.75" fill="currentColor" />
        <rect x="1" y="9" width="10" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
);

const ProjectsIcon = () => (
    <svg className={styles.icon} width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect x="7" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect x="1" y="7" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect x="7" y="7" width="5" height="5" rx="1.5" fill="currentColor" />
    </svg>
);

const NAV_ITEMS = [
    { id: 'resume' as const, Icon: ResumeIcon, en: 'Résumé', pt: 'Currículo' },
    { id: 'projects' as const, Icon: ProjectsIcon, en: 'Projects', pt: 'Projetos' },
];

export default function SidebarNav({ activeTab, setActiveTab, isOpen, onClose }: Props) {
    const { t } = useLang();

    return (
        <>
            <div
                onClick={onClose}
                className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
            />
            <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`} aria-label="Site navigation">
                <div className={styles.sectionLabel}>Navigate</div>
                <div className={styles.items}>
                    {NAV_ITEMS.map(({ id, Icon, ...labels }) => (
                        <button
                            key={id}
                            onClick={() => { setActiveTab(id); onClose(); }}
                            className={`${styles.item} ${activeTab === id ? styles.itemActive : ''}`}
                        >
                            <Icon />
                            {t(labels as Record<LangCode, string>)}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
