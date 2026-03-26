/**
 * LangContext — extensible i18n.
 *
 * To ADD a new language:
 *   1. Add an entry to LANGUAGES below (code → display label).
 *   2. Add the corresponding translation string wherever `Translations` is used
 *      (the TypeScript type will guide you — missing keys are compile errors).
 *
 * That's it. No other files need to change.
 */

'use client';

import { createContext, useContext, useState } from 'react';

// ─── Language registry ───────────────────────────────────────────────────────
// Add new languages here. The key becomes the LangCode used everywhere.
export const LANGUAGES = {
    en: 'EN',
    pt: 'PT',
} as const;

export type LangCode = keyof typeof LANGUAGES;

// A translation record must supply a string for every supported language.
export type Translations = Record<LangCode, string>;

// ─── Context ─────────────────────────────────────────────────────────────────
interface LangContextValue {
    lang: LangCode;
    setLang: (lang: LangCode) => void;
    /** Returns the translation for the active language, falling back to 'en'. */
    t: (translations: Translations) => string;
    /** Ordered list of available languages for building the dropdown. */
    availableLanguages: { code: LangCode; label: string }[];
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<LangCode>('en');

    const availableLanguages = (Object.keys(LANGUAGES) as LangCode[]).map(
        (code) => ({ code, label: LANGUAGES[code] })
    );

    function t(translations: Translations): string {
        return translations[lang] ?? translations['en'];
    }

    return (
        <LangContext.Provider value={{ lang, setLang, t, availableLanguages }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLang must be used inside LangProvider');
    return ctx;
}
