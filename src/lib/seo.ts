import { axes, profile } from '../data/site';
import type { Project } from './projects';

/** base 경로까지 붙인 절대 주소 */
export function abs(path: string, site: URL | undefined): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`, site).href;
}

export function personId(site: URL | undefined) {
  return `${abs('/', site)}#person`;
}

/** 검색엔진과 AI가 읽는 사람 정보 (JSON-LD) */
export function personSchema(site: URL | undefined) {
  return {
    '@type': 'Person',
    '@id': personId(site),
    name: profile.name,
    alternateName: [profile.handle, '손하늘'],
    url: abs('/', site),
    email: `mailto:${profile.email}`,
    description: profile.intro,
    jobTitle: 'Computer Science student',
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Ewha Womans University' },
    knowsAbout: ['Business strategy', 'Investment due diligence', 'Data analysis', 'Product design', 'Web development'],
    sameAs: profile.links.map((l) => l.href),
  };
}

export function homeSchema(site: URL | undefined) {
  return [
    {
      '@type': 'WebSite',
      '@id': `${abs('/', site)}#website`,
      name: `${profile.name} (${profile.handle})`,
      url: abs('/', site),
      inLanguage: 'en',
      author: { '@id': personId(site) },
    },
    personSchema(site),
  ];
}

export function aboutSchema(site: URL | undefined) {
  return [
    {
      '@type': 'ProfilePage',
      url: abs('/about/', site),
      name: `About ${profile.name}`,
      mainEntity: { '@id': personId(site) },
    },
    personSchema(site),
  ];
}

export function projectSchema(project: Project, site: URL | undefined) {
  const p = project.data;
  const page = abs(`/projects/${project.id}/`, site);
  return [
    {
      '@type': 'CreativeWork',
      '@id': `${page}#work`,
      name: p.title,
      headline: p.title,
      description: p.summary,
      url: page,
      image: abs(`/og/${project.id}.png`, site),
      temporalCoverage: p.period,
      creator: { '@id': personId(site) },
      ...(p.org && { sourceOrganization: { '@type': 'Organization', name: p.org } }),
      ...(p.award && { award: p.award }),
      genre: [p.primary, ...p.also].map((k) => axes[k].label),
      keywords: p.stack.join(', '),
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Work', item: abs('/', site) },
        { '@type': 'ListItem', position: 2, name: p.title, item: page },
      ],
    },
    personSchema(site),
  ];
}
