'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLang } from '@/context/LangContext';
import type { LangCode } from '@/context/LangContext';
import styles from './Topbar.module.css';

interface Props {
    onToggleNav: () => void;
    navOpen: boolean;
}

export default function Topbar({ onToggleNav, navOpen }: Props) {
    const { theme, setTheme } = useTheme();
    const { lang, setLang, availableLanguages } = useLang();
    const isDark = theme === 'dark';

    return (
        <div className={styles.topbar}>
            <button
                onClick={onToggleNav}
                aria-label="Toggle navigation"
                aria-expanded={navOpen}
                className={`hamburger ${navOpen ? 'open' : ''} ${styles.hamburger}`}
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            <div className={styles.controls}>
                <div className={styles.themeSwitch}>
                    <span
                        onClick={() => setTheme('light')}
                        className={`${styles.switchLabel} ${!isDark ? styles.switchLabelActive : ''}`}
                    >
                        Light
                    </span>
                    <button
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                        role="switch"
                        aria-checked={isDark}
                        aria-label="Toggle dark mode"
                        className={`${styles.switchTrack} ${isDark ? styles.switchTrackDark : ''}`}
                    >
                        <span className="switch-thumb" />
                    </button>
                    <span
                        onClick={() => setTheme('dark')}
                        className={`${styles.switchLabel} ${isDark ? styles.switchLabelActive : ''}`}
                    >
                        Dark
                    </span>
                </div>

                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as LangCode)}
                    aria-label="Language"
                    className={`lang-select ${styles.langSelect}`}
                >
                    {availableLanguages.map(({ code, label }) => (
                        <option key={code} value={code}>{label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
