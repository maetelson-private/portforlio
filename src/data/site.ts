export const profile = {
  name: 'Haneul Son',
  handle: 'Maetelson',
  headline: 'Connecting the dots, from strategy to code',
  intro:
    'I work across business strategy, investment due diligence, data analysis, design, and development. When I plan something, I design it and build it myself to see if it holds up.',
  school: 'Ewha Womans University · Computer Science and Engineering · Entrepreneurship (double major) · Venture Investment (micro-degree)',
  email: 'handsson@ewhain.net',
  links: [
    { label: 'GitHub', href: 'https://github.com/maetelson' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%86%90%ED%95%98%EB%8A%98-%E2%80%8E-47060032a' },
    { label: 'Disquiet', href: 'https://disquiet.io/@maetel/' },
  ],
};

export type AxisKey = 'strategy' | 'investment' | 'data' | 'design' | 'development';

export interface Axis {
  label: string;
  /** Shown above the list when this filter is selected */
  lead: string;
}

/** Ordered from deciding what to build to building it */
export const axisOrder: AxisKey[] = ['strategy', 'investment', 'data', 'design', 'development'];

export const axes: Record<AxisKey, Axis> = {
  strategy: {
    label: 'Strategy',
    lead: 'I research markets and customers, then turn the findings into business strategy and execution plans. Two of these projects won the grand prize in corporate partnership programs.',
  },
  investment: {
    label: 'Investment & DD',
    lead: 'I run due diligence on companies and translate the risks I find into valuation and deal terms.',
  },
  data: {
    label: 'Data',
    lead: 'I collect, clean, and analyze data to build evidence for decisions.',
  },
  design: {
    label: 'Design',
    lead: 'I design information architecture, interfaces, and brands. I led the design team at UMC Ewha.',
  },
  development: {
    label: 'Development',
    lead: 'I build and ship web and mobile products myself.',
  },
};

export const experience: { period: string; title: string; role: string }[] = [
  { period: '2026.03 ~', title: 'KNEWIT (startup)', role: 'Founder & CEO' },
  { period: '2026.03 ~', title: 'DECK, Ewha business strategy society', role: 'Head of Research' },
  { period: '2025.09 ~ 2026.02', title: 'UMC, Ewha chapter', role: 'Design Lead' },
  { period: '2025.09 ~ 2025.12', title: 'KUSITMS, 32nd cohort', role: 'Product Planner' },
  { period: '2025.03 ~ 2025.08', title: 'UMC, Ewha chapter · BeautiFlow', role: 'Designer' },
  { period: '2025.02 ~', title: 'Merry Cloth performance volunteer group, 20th cohort', role: 'Service and performance planner, marketing PM' },
  { period: '2025.02 ~', title: 'UNIS, Ewha startup society', role: 'Frontend, backend and design; partnerships; web TF planner and frontend' },
  { period: '2024.09 ~ 2025.01', title: 'CEOS, Sinchon IT startup club, 20th cohort', role: 'Product Planner' },
  { period: '2024.08 ~ 2024.12', title: 'Altubitu, Ewha algorithms club', role: 'Member' },
  { period: '2024.07 ~ 2024.08', title: 'FutuRES College, Hyundai Motor Chung Mong-Koo Foundation, 3rd cohort', role: 'Completed' },
  { period: '2023.09 ~ 2024.08', title: 'Ssiat, SNU and Ewha arts education volunteer club', role: 'Artist team' },
];
