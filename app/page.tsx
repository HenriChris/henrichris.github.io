'use client';

import { useState } from 'react';
import SidebarNav from '@/components/SidebarNav';
import Topbar from '@/components/Topbar';
import Hero from '@/components/Hero';
import ResumeTab from '@/components/ResumeTab';
import type { ExperienceEntry, SkillGroup, EducationEntry } from '@/components/ResumeTab';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import type { Project } from '@/components/ProjectsCarousel';

// ─── Resume Data ──────────────────────────────────────────────────────────────
// Edit these constants to update portfolio content.

const experience: ExperienceEntry[] = [
  {
    title: 'Software Engineer',
    date: '2022 – Present',
    company: 'Company Name',
    location: { en: 'Remote', pt: 'Remoto' },
    bullets: [
      { en: 'Built and maintained scalable backend services handling 10k+ req/s', pt: 'Construí e mantive serviços backend escaláveis com 10k+ req/s' },
      { en: 'Led migration from monolith to microservices, reducing deploy time by 40%', pt: 'Liderei a migração de monolito para microsserviços, reduzindo o tempo de deploy em 40%' },
      { en: 'Collaborated with product and design teams in an agile environment', pt: 'Colaborei com equipes de produto e design em um ambiente ágil' },
    ],
  },
  {
    title: 'Junior Developer',
    date: '2020 – 2022',
    company: 'Another Company',
    location: { en: 'Lisbon, PT', pt: 'Lisboa, PT' },
    bullets: [
      { en: 'Developed internal tooling that saved the team ~5 hours per week', pt: 'Desenvolvi ferramentas internas que economizaram ~5 horas semanais para a equipe' },
      { en: 'Improved test coverage from 30% to 80% across core modules', pt: 'Aumentei a cobertura de testes de 30% para 80% nos módulos principais' },
    ],
  },
];

const skills: SkillGroup[] = [
  { name: { en: 'Languages', pt: 'Linguagens' }, tags: ['Python', 'TypeScript', 'Go', 'SQL'] },
  { name: { en: 'Frameworks', pt: 'Frameworks' }, tags: ['React', 'Node.js', 'FastAPI'] },
  { name: { en: 'Tools', pt: 'Ferramentas' }, tags: ['Docker', 'Git', 'AWS', 'Linux'] },
];

const education: EducationEntry[] = [
  { degree: { en: 'B.Sc. Computer Science', pt: 'B.Sc. Ciência da Computação' }, institution: 'University Name', date: '2018 – 2022' },
  { degree: { en: 'Relevant Certification', pt: 'Certificação Relevante' }, institution: 'Issuing Organization', date: '2023' },
];

const projects: Project[] = [
  {
    title: 'Project Name',
    meta: '2024 · github.com/you/project',
    href: '#',
    description: {
      en: 'Brief description of what it does and the technologies used. Notable achievement, metric, or reception.',
      pt: 'Breve descrição do que faz e as tecnologias utilizadas. Conquista notável, métrica ou recepção.',
    },
  },
  {
    title: 'Another Project',
    meta: '2023 · Side project',
    href: '#',
    description: {
      en: 'What problem it solves and how. Built with modern tooling and shipped to production with great results.',
      pt: 'Que problema resolve e como. Construído com ferramentas modernas e implantado em produção com ótimos resultados.',
    },
  },
  {
    title: 'Open Source Tool',
    meta: '2022 · github.com/you/tool',
    href: '#',
    description: {
      en: 'Add a description for this project. Replace the placeholder thumbnail with a real screenshot.',
      pt: 'Adicione uma descrição para este projeto. Substitua a miniatura pelo print real.',
    },
  },
  {
    title: 'Experiment / Lab',
    meta: '2021 · Personal',
    href: '#',
    description: {
      en: 'Exploratory project or experiment. Describe the idea, the tech stack, and anything interesting that came out of it.',
      pt: 'Projeto exploratório. Descreva a ideia, o stack e o que de interessante surgiu.',
    },
  },
];

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

      <div
        className={`page-shift ${navOpen ? 'nav-open' : ''}`}
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '40px 32px 80px',
        }}
      >
        <Topbar onToggleNav={() => setNavOpen((o: boolean) => !o)} navOpen={navOpen} />
        <Hero
          name={{ en: 'Your Name', pt: 'Seu Nome' }}
          email="you@example.com"
          phone="+00 000 000 000"
          github={{ label: 'github.com/yourhandle', href: 'https://github.com/yourhandle' }}
          linkedin={{ label: 'linkedin.com/in/yourhandle', href: 'https://linkedin.com/in/yourhandle' }}
          location={{ en: 'Location, Country', pt: 'Cidade, País' }}
          summary={{
            en: "Short professional summary goes here. Mention your main skills, years of experience, and what kind of work you're interested in. Keep it to two or three sentences.",
            pt: 'Resumo profissional curto aqui. Mencione suas principais habilidades, anos de experiência e o tipo de trabalho que lhe interessa.',
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
