import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const axisKeys = ['strategy', 'investment', 'data', 'design', 'development'] as const;
const axis = z.enum(axisKeys);

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
    /** 이 프로젝트가 대표로 속하는 축 하나 */
    primary: axis,
    /** 함께 쓰인 다른 역량 축. 해당 축 페이지의 '관련 프로젝트'에 나온다 */
    also: z.array(axis).default([]),
    roles: z.array(z.string()),
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
    /** 축 페이지 대신 About의 '그 밖의 활동'에만 나온다 */
    archive: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
