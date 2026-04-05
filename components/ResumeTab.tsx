'use client';

import Accordion from '@/components/Accordion';
import Tag from '@/components/Tag';
import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';
import styles from './ResumeTab.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ExperienceEntry {
    title: Translations;
    date: Translations;
    company: Translations;
    location: Translations;
    bullets: Translations[];
}

export interface SkillGroup {
    name: Translations;
    tags: string[];
}

export interface EducationEntry {
    degree: Translations;
    institution: Translations;
    date: Translations;
}

interface Props {
    experience: ExperienceEntry[];
    skills: SkillGroup[];
    education: EducationEntry[];
}

function ExperienceSection({ entries }: { entries: ExperienceEntry[] }) {
    const { t } = useLang();
    return (
        <div>
            {entries.map((e, i) => (
                <div key={i} className={styles.entry}>
                    <div className={styles.entryHeader}>
                        <span className={styles.entryTitle}>{t(e.title)}</span>
                        <span className={styles.entryDate}>{t(e.date)}</span>
                    </div>
                    <div className={styles.entrySub}>{t(e.company)}&nbsp;·&nbsp;{t(e.location)}</div>
                    <ul className={styles.entryList}>
                        {e.bullets.map((b, j) => <li key={j}>{t(b)}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function SkillsSection({ groups }: { groups: SkillGroup[] }) {
    const { t } = useLang();
    return (
        <div>
            {groups.map((g, i) => (
                <div key={i} className={styles.skillGroup}>
                    <div className={styles.skillGroupName}>{t(g.name)}</div>
                    <div className={styles.tags}>
                        {g.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                </div>
            ))}
        </div>
    );
}

function EducationSection({ entries }: { entries: EducationEntry[] }) {
    const { t } = useLang();
    return (
        <div>
            {entries.map((e, i) => (
                <div key={i} className={styles.eduEntry}>
                    <div className={styles.eduTitle}>{t(e.degree)}</div>
                    <div className={styles.eduSub}>{t(e.institution)}</div>
                    <div className={styles.eduDate}>{t(e.date)}</div>
                </div>
            ))}
        </div>
    );
}

export default function ResumeTab({ experience, skills, education }: Props) {
    return (
        <div className={styles.wrap}>
            <Accordion label={{ en: 'Experience', pt: 'Experiência' }} defaultOpen>
                <ExperienceSection entries={experience} />
            </Accordion>
            <Accordion label={{ en: 'Skills', pt: 'Habilidades' }} defaultOpen>
                <SkillsSection groups={skills} />
            </Accordion>
            <Accordion label={{ en: 'Education', pt: 'Educação' }} defaultOpen>
                <EducationSection entries={education} />
            </Accordion>
        </div>
    );
}
