export const profile = {
  name: '손하늘',
  handle: 'Maetelson',
  tagline: '연결하고, 이해하는 올라운더',
  intro:
    '제품이 아니라 경험을 만듭니다. 문제를 논리로 정의하고, 화면을 직접 그리고, 필요하면 코드까지 짜서 MVP를 끝까지 만들어 봅니다.',
  school: '이화여자대학교 컴퓨터공학전공 · 기업가정신(복) · 벤처투자학(마이크로디그리)',
  email: 'handsson@ewhain.net',
  links: [
    { label: 'GitHub', href: 'https://github.com/maetelson' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%86%90%ED%95%98%EB%8A%98-%E2%80%8E-47060032a' },
    { label: 'Disquiet', href: 'https://disquiet.io/@maetel/' },
  ],
};

export type DisciplineKey = 'planning' | 'design' | 'development';

export const disciplines: Record<
  DisciplineKey,
  { no: string; ko: string; en: string; title: [string, string]; lead: string; desc: string; scope: string[] }
> = {
  planning: {
    no: '01',
    ko: '기획',
    en: 'Planning',
    title: ['Define the', 'Right Problem'],
    lead: '문제를 정의하고 전략을 설계합니다',
    desc: '설문·IDI로 근거를 모으고, 타깃을 다시 정의해 실행 가능한 전략과 BM, 로드맵까지 연결합니다. 기업 연계 프로젝트에서 대상을 두 번 받았습니다.',
    scope: ['서비스 기획', 'PM / PO', '사용자 리서치', 'BM · GTM', '공연·행사 기획'],
  },
  design: {
    no: '02',
    ko: '디자인',
    en: 'Design',
    title: ['Shape the', 'Experience'],
    lead: '흐름을 화면과 브랜드로 옮깁니다',
    desc: 'IA와 유저 플로우부터 UI, BI/BX, 인쇄물까지 그립니다. UMC 이화 지부 디자인 파트장으로 디자이너 팀을 이끌었습니다.',
    scope: ['UX / UI', 'IA · 유저 플로우', 'BI · BX', '인쇄물', 'Figma'],
  },
  development: {
    no: '03',
    ko: '개발',
    en: 'Development',
    title: ['Ship the', 'Product'],
    lead: '기획한 것을 직접 배포까지 만듭니다',
    desc: 'React·Next.js 프론트엔드부터 Cloudflare Workers 백엔드, Python 데이터 파이프라인까지. 프로토타입이 아니라 돌아가는 제품을 만듭니다.',
    scope: ['Frontend', 'Backend', 'Data Pipeline', 'DevOps · CI', 'AI-assisted Dev'],
  },
};

export const disciplineOrder: DisciplineKey[] = ['planning', 'design', 'development'];

export const experience: { period: string; title: string; role: string }[] = [
  { period: '2026.03 —', title: '창업팀 KNEWIT', role: '대표' },
  { period: '2026.03 —', title: '이화여대 경영전략학회 DECK', role: '학술부장' },
  { period: '2025.09 — 2026.02', title: 'UMC 이화여대 지부', role: '디자인 파트장' },
  { period: '2025.09 — 2025.12', title: '한국대학생IT경영학회 KUSITMS 32기', role: '기획' },
  { period: '2025.03 — 2025.08', title: 'UMC 이화여대 지부 · BeautiFlow', role: '디자이너' },
  { period: '2025.02 —', title: '공연 기획 봉사단 메리클로스 20기', role: '서비스·공연 기획 / 홍보마케팅 PM' },
  { period: '2025.02 —', title: '이화여대 중앙실전창업학회 UNIS', role: 'FE·BE·디자인 / 대외협력 / 웹개발TF 기획·FE' },
  { period: '2024.09 — 2025.01', title: '신촌 연합 IT 창업 동아리 CEOS 20기', role: '기획' },
  { period: '2024.08 — 2024.12', title: '이화여대 알고리즘 동아리 Altubitu', role: '멤버' },
  { period: '2024.07 — 2024.08', title: '현대차 정몽구 재단 FutuRES College 3기', role: '수료' },
  { period: '2023.09 — 2024.08', title: '서울대-이대 연합 예술 교육 봉사 동아리 씨앗', role: '작가팀' },
];

export const toolkit: { group: string; items: string[] }[] = [
  { group: '기획', items: ['Notion', 'FigJam', 'Google Forms', 'Maze', 'Excel', 'PowerPoint', 'SQL'] },
  { group: '디자인', items: ['Figma', 'FigJam', 'Design System', 'BI · BX', 'Print'] },
  {
    group: '프론트엔드',
    items: ['TypeScript', 'React', 'Next.js', 'React Native · Expo', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Zustand'],
  },
  {
    group: '백엔드 · 인프라',
    items: ['Cloudflare Workers', 'Hono', 'D1 · R2', 'Zod', 'Spring Boot', 'MySQL', 'GitHub Actions'],
  },
  { group: '데이터 · AI', items: ['Python', 'pandas · parquet', 'LLM Labeling', 'Claude Code', 'OpenAPI'] },
];
