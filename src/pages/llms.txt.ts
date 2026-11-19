// AI 검색(ChatGPT, Perplexity 등)이 읽기 쉬운 사이트 요약
import type { APIRoute } from 'astro';
import { axes, axisOrder, experience, profile } from '../data/site';
import { getProjects } from '../lib/projects';
import { abs } from '../lib/seo';

export const GET: APIRoute = async ({ site }) => {
  const projects = await getProjects();
  const work = projects.filter((p) => !p.data.archive);
  const other = projects.filter((p) => p.data.archive);

  const line = (p: (typeof projects)[number]) => {
    const d = p.data;
    const fields = [d.primary, ...d.also].map((k) => axes[k].label).join(', ');
    const extra = [d.period, fields, d.roles.join(', '), d.award].filter(Boolean).join('; ');
    return `- [${d.title}](${abs(`/projects/${p.id}/`, site)}): ${d.summary} (${extra})`;
  };

  const text = `# ${profile.name} (${profile.handle})

> ${profile.intro}

- Education: ${profile.school}
- Email: ${profile.email}
${profile.links.map((l) => `- ${l.label}: ${l.href}`).join('\n')}

## Fields

${axisOrder.map((k) => `- ${axes[k].label}: ${axes[k].lead}`).join('\n')}

## Selected work

${work.map(line).join('\n')}

## Experience

${experience.map((e) => `- ${e.period}: ${e.title}, ${e.role}`).join('\n')}

## Optional

${other.map(line).join('\n')}
- [Full text of every project](${abs('/llms-full.txt', site)})
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
