export const profile = {
  name: '손하늘',
  handle: 'Maetelson',
  headline: '연결하고, 이해하는 올라운더',
  intro: '경영전략, 투자 실사, 데이터 분석, 디자인, 개발을 오가며 일합니다. 기획한 것은 직접 화면으로 그리고 코드로 만들어 확인합니다.',
  school: '이화여자대학교 컴퓨터공학 전공 · 기업가정신 복수전공 · 벤처투자학 마이크로디그리',
  email: 'handsson@ewhain.net',
  links: [
    { label: 'GitHub', href: 'https://github.com/maetelson' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%86%90%ED%95%98%EB%8A%98-%E2%80%8E-47060032a' },
    { label: 'Disquiet', href: 'https://disquiet.io/@maetel/' },
  ],
};

export type AxisKey = 'strategy' | 'investment' | 'data' | 'design' | 'development';

export interface Axis {
  /** 화면 라벨 (영문) */
  label: string;
  /** 필터를 골랐을 때 목록 위에 보이는 설명 한 줄 */
  lead: string;
}

/** 전략에서 개발 순서 */
export const axisOrder: AxisKey[] = ['strategy', 'investment', 'data', 'design', 'development'];

export const axes: Record<AxisKey, Axis> = {
  strategy: {
    label: 'Strategy',
    lead: '시장과 고객을 조사해 사업 전략과 실행 계획을 세웁니다. 기업 산학협력 프로젝트에서 대상을 두 번 받았습니다.',
  },
  investment: {
    label: 'Investment & DD',
    lead: '기업을 실사하고, 찾아낸 리스크를 기업가치와 계약 조건에 반영합니다.',
  },
  data: {
    label: 'Data',
    lead: '데이터를 수집·정제·분석해 의사결정의 근거를 만듭니다.',
  },
  design: {
    label: 'Design',
    lead: 'IA와 화면, 브랜드를 설계합니다. UMC 이화여대 지부에서 디자인 파트장을 맡았습니다.',
  },
  development: {
    label: 'Development',
    lead: '웹과 모바일 서비스를 직접 개발하고 배포합니다.',
  },
};

export const experience: { period: string; title: string; role: string }[] = [
  { period: '2026.03 ~', title: '창업팀 KNEWIT', role: '대표' },
  { period: '2026.03 ~', title: '이화여대 경영전략학회 DECK', role: '학술부장' },
  { period: '2025.09 ~ 2026.02', title: 'UMC 이화여대 지부', role: '디자인 파트장' },
  { period: '2025.09 ~ 2025.12', title: '한국대학생IT경영학회 KUSITMS 32기', role: '기획' },
  { period: '2025.03 ~ 2025.08', title: 'UMC 이화여대 지부 · BeautiFlow', role: '디자이너' },
  { period: '2025.02 ~', title: '공연 기획 봉사단 메리클로스 20기', role: '서비스·공연 기획, 홍보마케팅 PM' },
  { period: '2025.02 ~', title: '이화여대 중앙실전창업학회 UNIS', role: 'FE·BE·디자인, 대외협력, 웹개발 TF 기획·FE' },
  { period: '2024.09 ~ 2025.01', title: '신촌 연합 IT 창업 동아리 CEOS 20기', role: '기획' },
  { period: '2024.08 ~ 2024.12', title: '이화여대 알고리즘 동아리 Altubitu', role: '멤버' },
  { period: '2024.07 ~ 2024.08', title: '현대차 정몽구 재단 FutuRES College 3기', role: '수료' },
  { period: '2023.09 ~ 2024.08', title: '서울대·이화여대 연합 예술 교육 봉사 동아리 씨앗', role: '작가팀' },
];

export const toolkit: { group: string; items: string[] }[] = [
  { group: 'Strategy & Investment', items: ['Market research', 'Survey · IDI', 'BM · GTM', 'ESG DD (KVIC · MSCI · SASB)', 'EV/GMV valuation', 'PowerPoint', 'Excel'] },
  { group: 'Data', items: ['Python', 'pandas · parquet', 'LLM labeling', 'SQL'] },
  { group: 'Design', items: ['Figma', 'FigJam', 'Design system', 'BI · BX', 'Print'] },
  { group: 'Frontend', items: ['TypeScript', 'React', 'Next.js', 'React Native · Expo', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Zustand'] },
  { group: 'Backend & Infra', items: ['Cloudflare Workers', 'Hono', 'D1 · R2', 'Zod', 'Spring Boot', 'MySQL', 'GitHub Actions'] },
];
