import type { ExperienceEntry, SkillGroup, EducationEntry } from '@/components/ResumeTab';
import type { Project } from '@/components/ProjectsCarousel';

export const experience: ExperienceEntry[] = [
    {
        title: { en: 'Software Engineer', pt: 'Desenvolvedor de Software' },
        date: { en: '2023 – 2026', pt: '2023 – 2026' },
        company: { en: 'Metta Innovations', pt: 'Metta Innovations' },
        location: { en: 'Rio de Janeiro, BR', pt: 'Rio de Janeiro, BR' },
        bullets: [
            { en: 'Lorem Ipsum', pt: 'Lorem Ipsum' },
            { en: 'Lorem Ipsum', pt: 'Lorem Ipsum' },
            // { en: 'Led migration from monolith to microservices, reducing deploy time by 40%', pt: 'Liderei a migração de monolito para microsserviços, reduzindo o tempo de deploy em 40%' },
            // { en: 'Collaborated with product and design teams in an agile environment', pt: 'Colaborei com equipes de produto e design em um ambiente ágil' },
        ],
    },
    {
        title: { en: 'Software Engineer', pt: 'Desenvolvedor de Software' },
        date: { en: '2023 – 2026', pt: '2023 – 2026' },
        company: { en: 'Metta Innovations', pt: 'Metta Innovations' },
        location: { en: 'Rio de Janeiro, BR', pt: 'Rio de Janeiro, BR' },
        bullets: [
            { en: 'Lorem Ipsum', pt: 'Lorem Ipsum' },
            // { en: 'Led migration from monolith to microservices, reducing deploy time by 40%', pt: 'Liderei a migração de monolito para microsserviços, reduzindo o tempo de deploy em 40%' },
            // { en: 'Collaborated with product and design teams in an agile environment', pt: 'Colaborei com equipes de produto e design em um ambiente ágil' },
        ],
    },
    // {
    //     title: { en: 'Junior Developer', pt: 'Desenvolvedor Júnior' },
    //     date: { en: '2020 – 2022', pt: '2020 – 2022' },
    //     company: { en: 'Another Company', pt: 'Outra Empresa' },
    //     location: { en: 'Lisbon, PT', pt: 'Lisboa, PT' },
    //     bullets: [
    //         { en: 'Developed internal tooling that saved the team ~5 hours per week', pt: 'Desenvolvi ferramentas internas que economizaram ~5 horas semanais para a equipe' },
    //         { en: 'Improved test coverage from 30% to 80% across core modules', pt: 'Aumentei a cobertura de testes de 30% para 80% nos módulos principais' },
    //     ],
    // },
];

export const skills: SkillGroup[] = [
    { name: { en: 'Languages', pt: 'Linguagens' }, tags: ['Python', 'TypeScript', 'Go', 'SQL'] },
    { name: { en: 'Frameworks', pt: 'Frameworks' }, tags: ['React', 'Node.js', 'FastAPI'] },
    { name: { en: 'Tools', pt: 'Ferramentas' }, tags: ['Docker', 'Git', 'AWS', 'Linux'] },
];

export const education: EducationEntry[] = [
    {
        degree: { en: 'B.Sc. Computer Science', pt: 'B.Sc. Ciência da Computação' },
        institution: { en: 'Federal University of Rio de Janeiro', pt: 'Universidade Federal do Rio de Janeiro' },
        date: { en: '2021 – 2026', pt: '2021 – 2026' },
    },
    {
        degree: { en: 'B.Sc. Computer Science', pt: 'B.Sc. Ciência da Computação' },
        institution: { en: 'Federal University of Rio de Janeiro', pt: 'Universidade Federal do Rio de Janeiro' },
        date: { en: '2021 – 2026', pt: '2021 – 2026' },
    },
    // {
    //     degree: { en: 'Relevant Certification', pt: 'Certificação Relevante' },
    //     institution: { en: 'Issuing Organization', pt: 'Organização Emissora' },
    //     date: { en: '2023', pt: '2023' },
    // },
];

export const projects: Project[] = [
    {
        title: { en: 'CNN MNIST', pt: 'CNN MNIST' },
        meta: { en: 'github.com/HenriChris/', pt: 'github.com/HenriChris/' },
        href: 'https://github.com/HenriChris/',
        description: {
            en: 'CNN for MNIST',
            pt: 'CNN para MNIST',
        },
    },
    {
        title: { en: 'CNN MNIST', pt: 'CNN MNIST' },
        meta: { en: 'github.com/HenriChris/', pt: 'github.com/HenriChris/' },
        href: 'https://github.com/HenriChris/',
        description: {
            en: 'CNN for MNIST',
            pt: 'CNN para MNIST',
        },
    },
    {
        title: { en: 'CNN MNIST', pt: 'CNN MNIST' },
        meta: { en: 'github.com/HenriChris/', pt: 'github.com/HenriChris/' },
        href: 'https://github.com/HenriChris/',
        description: {
            en: 'CNN for MNIST',
            pt: 'CNN para MNIST',
        },
    },
    // {
    //     title: { en: 'Another Project', pt: 'Outro Projeto' },
    //     meta: { en: '2023 · Side project', pt: '2023 · Projeto paralelo' },
    //     href: '#',
    //     description: {
    //         en: 'What problem it solves and how. Built with modern tooling and shipped to production with great results.',
    //         pt: 'Que problema resolve e como. Construído com ferramentas modernas e implantado em produção com ótimos resultados.',
    //     },
    // },
    // {
    //     title: { en: 'Open Source Tool', pt: 'Ferramenta Open Source' },
    //     meta: { en: '2022 · github.com/you/tool', pt: '2022 · github.com/you/tool' },
    //     href: '#',
    //     description: {
    //         en: 'Add a description for this project. Replace the placeholder thumbnail with a real screenshot.',
    //         pt: 'Adicione uma descrição para este projeto. Substitua a miniatura pelo print real.',
    //     },
    // },
    // {
    //     title: { en: 'Experiment / Lab', pt: 'Experimento / Lab' },
    //     meta: { en: '2021 · Personal', pt: '2021 · Pessoal' },
    //     href: '#',
    //     description: {
    //         en: 'Exploratory project or experiment. Describe the idea, the tech stack, and anything interesting that came out of it.',
    //         pt: 'Projeto exploratório. Descreva a ideia, o stack e o que de interessante surgiu.',
    //     },
    // },
];
