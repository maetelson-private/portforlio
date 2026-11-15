/**
 * Tools shown on the About page, grouped by kind of work.
 * `icon` is a Simple Icons slug (monochrome logo). Tools without one get a drawn monogram.
 * Only tools that appear in the projects or the original portfolio are listed.
 */
export interface Tool {
  name: string;
  icon?: string;
}

export const toolGroups: { group: string; tools: Tool[] }[] = [
  {
    group: 'Research & Strategy',
    tools: [
      { name: 'Notion', icon: 'notion' },
      { name: 'Google Forms', icon: 'googleforms' },
      { name: 'Google Sheets', icon: 'googlesheets' },
      { name: 'Maze', icon: 'maze' },
      { name: 'PowerPoint' },
      { name: 'Excel' },
    ],
  },
  {
    group: 'Data',
    tools: [
      { name: 'Python', icon: 'python' },
      { name: 'pandas', icon: 'pandas' },
      { name: 'Apache Parquet', icon: 'apacheparquet' },
      { name: 'SQL' },
    ],
  },
  {
    group: 'Design',
    tools: [
      { name: 'Figma', icon: 'figma' },
      { name: 'FigJam', icon: 'figma' },
    ],
  },
  {
    group: 'Frontend',
    tools: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React Native · Expo', icon: 'expo' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'TanStack Query', icon: 'reactquery' },
      { name: 'Zustand' },
    ],
  },
  {
    group: 'Backend & Infra',
    tools: [
      { name: 'Cloudflare Workers', icon: 'cloudflareworkers' },
      { name: 'Cloudflare D1 · R2', icon: 'cloudflare' },
      { name: 'Hono', icon: 'hono' },
      { name: 'Zod', icon: 'zod' },
      { name: 'OpenAPI', icon: 'openapiinitiative' },
      { name: 'Spring Boot', icon: 'springboot' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'Turborepo', icon: 'turborepo' },
    ],
  },
  {
    group: 'Quality & Collaboration',
    tools: [
      { name: 'GitHub', icon: 'github' },
      { name: 'Biome', icon: 'biome' },
      { name: 'Jest', icon: 'jest' },
      { name: 'Sentry', icon: 'sentry' },
      { name: 'PostHog', icon: 'posthog' },
      { name: 'Claude Code', icon: 'claude' },
      { name: 'Slack' },
    ],
  },
];
