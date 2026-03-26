'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LangContext';

interface Props {
    activeTab: 'resume' | 'projects';
    setActiveTab: (tab: 'resume' | 'projects') => void;
    isOpen: boolean;
    onClose: () => void;
}

const ResumeIcon = () => (
    <svg className="opacity-50 shrink-0 transition-opacity duration-150 group-[.active]:opacity-100 group-hover:opacity-80" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="1" width="11" height="2" rx="1" fill="currentColor" />
        <rect x="1" y="5.5" width="8" height="1.5" rx="0.75" fill="currentColor" />
        <rect x="1" y="9" width="10" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
);

const ProjectsIcon = () => (
    <svg className="opacity-50 shrink-0 transition-opacity duration-150 group-[.active]:opacity-100 group-hover:opacity-80" width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect x="7" y="1" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect x="1" y="7" width="5" height="5" rx="1.5" fill="currentColor" />
        <rect x="7" y="7" width="5" height="5" rx="1.5" fill="currentColor" />
    </svg>
);

export default function SidebarNav({ activeTab, setActiveTab, isOpen, onClose }: Props) {
    const { t } = useLang();

    function handleTabClick(tab: 'resume' | 'projects') {
        setActiveTab(tab);
        onClose();
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-[150] bg-black/25 transition-opacity duration-300 pointer-events-none md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                    }`}
            />

            {/* Sidebar */}
            <nav
                className={`sidebar-nav ${isOpen ? 'open' : ''}`}
                aria-label="Site navigation"
            >
                <div className="font-mono text-[0.5625rem] font-medium tracking-[0.16em] uppercase text-muted px-5 pb-3 border-b border-border mb-2">
                    Navigate
                </div>
                <div className="flex flex-col p-2 gap-0.5">
                    {(
                        [
                            { id: 'resume', label: t({ en: 'Résumé', pt: 'Currículo' }), Icon: ResumeIcon },
                            { id: 'projects', label: t({ en: 'Projects', pt: 'Projetos' }), Icon: ProjectsIcon },
                        ] as const
                    ).map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            onClick={() => handleTabClick(id)}
                            data-tab={id}
                            className={`group flex items-center gap-2.5 font-mono text-[0.6875rem] tracking-[0.08em] rounded-[5px] px-3 py-2.5 text-left transition-colors duration-150 cursor-pointer border-none ${activeTab === id
                                    ? 'active text-text bg-tag-bg'
                                    : 'text-muted bg-transparent hover:text-text hover:bg-tag-bg'
                                }`}
                        >
                            <Icon />
                            {label}
                        </button>
                    ))}
                </div>
            </nav>
        </>
    );
}
