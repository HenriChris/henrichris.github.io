'use client';

import { useState } from 'react';
import SidebarNav from '@/components/SidebarNav';
import Topbar from '@/components/Topbar';
import Hero from '@/components/Hero';
import ResumeTab from '@/components/ResumeTab';
import type { ExperienceEntry, SkillGroup, EducationEntry } from '@/components/ResumeTab';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import type { Project } from '@/components/ProjectsCarousel'; import { experience, skills, education, projects } from '@/lib/data';
import styles from './page.module.css';

// ─── Page ─────────────────────────────────────────────────────────────────────
type Tab = 'resume' | 'projects';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('resume');
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div>
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
      />

      <div className={styles.container}>
        <Topbar onToggleNav={() => setNavOpen((o: boolean) => !o)} navOpen={navOpen} />
        <Hero
          name={{ en: 'Henrique Chrispim', pt: 'Henrique Chrispim' }}
          email="henrique.chrispim@protonmail.com"
          github={{ label: 'github.com/HenriChris', href: 'https://github.com/HenriChris' }}
          linkedin={{ label: 'linkedin.com/in/henrichris', href: 'https://linkedin.com/in/henrichris' }}
          location={{ en: 'Rio de Janeiro, Brazil', pt: 'Rio de Janeiro, Brasil' }}
          summary={{
            en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          }}
        />

        {activeTab === 'resume' && (
          <ResumeTab experience={experience} skills={skills} education={education} />
        )}
        {activeTab === 'projects' && (
          <ProjectsCarousel projects={projects} />
        )}
      </div>
    </div>
  );
}
