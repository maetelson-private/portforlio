import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const discipline = z.enum(['planning', 'design', 'development']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** 카드에 쓰는 한 줄 소개 */
    summary: z.string(),
    // YAML이 `2025`나 `2026.06`을 숫자로 읽기 때문에 문자열로 강제 변환
    period: z.coerce.string(),
    /** 정렬용 (최신순) */
    sort: z.number(),
    org: z.string().optional(),
    primary: discipline,
    roles: z.array(z.string()),
    /** 기획/디자인/개발 비중(합 100). 여러 역할을 맡은 프로젝트에만 */
    roleSplit: z
      .object({ planning: z.number(), design: z.number(), development: z.number() })
      .optional(),
    featured: z.boolean().default(false),
    award: z.string().optional(),
    /** Featured 카드에 크게 보여줄 핵심 수치 */
    highlight: z.object({ value: z.string(), label: z.string() }).optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        live: z.string().url().optional(),
        repo: z.string().url().optional(),
        repoPrivate: z.boolean().optional(),
        figma: z.string().url().optional(),
        notion: z.string().url().optional(),
        extra: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
      })
      .default({}),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
