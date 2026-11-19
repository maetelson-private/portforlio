// 프로젝트 본문 전체를 한 파일로 (AI가 세부 내용을 인용할 때 쓴다)
import type { APIRoute } from 'astro';
import { axes, profile } from '../data/site';
import { getProjects } from '../lib/projects';
import { abs } from '../lib/seo';

export const GET: APIRoute = async ({ site }) => {
  const projects = await getProjects();
  const parts = projects.map((p) => {
    const d = p.data;
    const facts = [
      `- URL: ${abs(`/projects/${p.id}/`, site)}`,
      `- Period: ${d.period}`,
      d.org && `- Client: ${d.org}`,
      `- Role: ${d.roles.join(', ')}`,
      `- Fields: ${[d.primary, ...d.also].map((k) => axes[k].label).join(', ')}`,
      d.award && `- Recognition: ${d.award}`,
      d.stack.length && `- Tools and methods: ${d.stack.join(', ')}`,
    ].filter(Boolean);
    return `# ${d.title}\n\n> ${d.summary}\n\n${facts.join('\n')}\n\n${(p.body ?? '').trim()}`;
  });
  const text = `# ${profile.name} (${profile.handle}): all projects\n\n> ${profile.intro}\n\n${parts.join('\n\n---\n\n')}\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
