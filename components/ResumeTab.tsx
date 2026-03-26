'use client';

import Accordion from '@/components/Accordion';
import Tag from '@/components/Tag';
import { useLang } from '@/context/LangContext';
import type { Translations } from '@/context/LangContext';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ExperienceEntry {
    title: string;
    date: string;
    company: string;
    location: Translations;
    bullets: Translations[];
}

export interface SkillGroup {
    name: Translations;
    tags: string[];
}

export interface EducationEntry {
    degree: Translations;
    institution: string;
    date: string;
}

interface Props {
    experience: ExperienceEntry[];
    skills: SkillGroup[];
    education: EducationEntry[];
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ExperienceSection({ entries }: { entries: ExperienceEntry[] }) {
    const { t } = useLang();
    return (
        <div>
            {entries.map((entry, i) => (
                <div key={i} className="mb-7 last:mb-0">
                    <div className="flex justify-between items-baseline gap-3 flex-wrap mb-0.5">
                        <span className="font-semibold text-[0.875rem] text-text">{entry.title}</span>
                        <span className="font-mono text-[0.6875rem] font-light text-muted whitespace-nowrap shrink-0">
                            {entry.date}
                        </span>
                    </div>
                    <div className="text-[0.8125rem] text-muted font-normal mb-2">
                        {entry.company}&nbsp;·&nbsp;{t(entry.location)}
                    </div>
                    <ul className="list-none p-0">
                        {entry.bullets.map((bullet, j) => (
                            <li key={j} className="relative pl-[14px] text-[0.84375rem] font-light text-text leading-[1.65] mb-1 before:content-['–'] before:absolute before:left-0 before:text-muted">
                                {t(bullet)}
                            </li>
                        ))}
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
            {groups.map((group, i) => (
                <div key={i} className="mb-4 last:mb-0">
                    <div className="text-[0.75rem] font-medium text-text mb-1.5">{t(group.name)}</div>
                    <div className="flex flex-wrap gap-[5px]">
                        {group.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
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
            {entries.map((entry, i) => (
                <div key={i} className="mb-[18px] last:mb-0">
                    <div className="font-medium text-[0.8125rem] text-text">{t(entry.degree)}</div>
                    <div className="text-[0.75rem] text-muted font-light mt-0.5">{entry.institution}</div>
                    <div className="font-mono text-[0.6875rem] font-light text-muted mt-0.5">{entry.date}</div>
                </div>
            ))}
        </div>
    );
}

// ─── ResumeTab ────────────────────────────────────────────────────────────────
export default function ResumeTab({ experience, skills, education }: Props) {
    return (
        <div className="animate-fade-up-fast border-t border-border">
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
