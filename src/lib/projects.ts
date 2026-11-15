import { getCollection, type CollectionEntry } from 'astro:content';
import type { AxisKey } from '../data/site';

export type Project = CollectionEntry<'projects'>;

/** 공개된 프로젝트 전체 (최신순) */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.sort - a.data.sort);
}

/** 축 페이지 본문: 이 축이 대표인 프로젝트 */
export function primaryOf(projects: Project[], axis: AxisKey) {
  return projects.filter((p) => !p.data.archive && p.data.primary === axis);
}

/** 축 페이지 하단: 이 역량이 함께 쓰인 다른 축의 프로젝트 */
export function relatedTo(projects: Project[], axis: AxisKey) {
  return projects.filter((p) => !p.data.archive && p.data.primary !== axis && p.data.also.includes(axis));
}
