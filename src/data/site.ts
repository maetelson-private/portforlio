export const profile = {
  name: '손하늘',
  handle: 'Maetelson',
  tagline: '연결하고, 이해하는 올라운더',
  intro:
    '시장을 읽고, 기업의 가치를 따지고, 데이터로 확인한 뒤, 화면을 그리고 코드로 만듭니다. 전략에서 출시까지 한 사람이 끊기지 않게 이어 갑니다.',
  school: '이화여자대학교 컴퓨터공학전공 · 기업가정신(복수전공) · 벤처투자학(마이크로디그리)',
  email: 'handsson@ewhain.net',
  links: [
    { label: 'GitHub', href: 'https://github.com/maetelson' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/%EC%86%90%ED%95%98%EB%8A%98-%E2%80%8E-47060032a' },
    { label: 'Disquiet', href: 'https://disquiet.io/@maetel/' },
  ],
};

export type AxisKey = 'strategy' | 'investment' | 'data' | 'design' | 'development';

export interface Axis {
  no: string;
  ko: string;
  en: string;
  title: [string, string];
  lead: string;
  desc: string;
  scope: string[];
  icon: 'compass' | 'scale' | 'chart' | 'pen' | 'code';
  /** 일하는 방식: 실제 프로젝트에서 거친 단계만 적는다 */
  flow: { en: string; ko: string; items: string[] }[];
}

/** 전략 → 만들기 순서. 무엇을 할지 판단하는 눈에서 직접 만드는 손으로 */
export const axisOrder: AxisKey[] = ['strategy', 'investment', 'data', 'design', 'development'];

export const axes: Record<AxisKey, Axis> = {
  strategy: {
    no: '01',
    ko: '경영전략',
    en: 'Strategy',
    title: ['Find the', 'Right Bet'],
    lead: '시장과 고객에서 이길 자리를 찾습니다',
    desc: '설문과 심층 인터뷰로 근거를 모으고, 타깃을 다시 정의해 전략·BM·실행 로드맵까지 잇습니다. 기업 산학협력 프로젝트에서 대상을 두 번 받았습니다.',
    scope: ['산업·시장 분석', '타깃 재정의', 'BM · GTM', '전략 제안', 'KPI 설계'],
    icon: 'compass',
    flow: [
      { en: 'Research', ko: '리서치', items: ['설문 · IDI 설계', '산업 · 시장 분석', '케이스 스터디'] },
      { en: 'Define', ko: '문제 정의', items: ['타깃 재정의', '클러스터 · 페르소나', '인사이트 도출'] },
      { en: 'Strategy', ko: '전략 설계', items: ['컨셉 · 전략 과제', 'BM · GTM', '시장 규모 산정'] },
      { en: 'Execute', ko: '실행 설계', items: ['단계별 로드맵', 'KPI 설계', '프로토타입'] },
      { en: 'Validate', ko: '검증', items: ['AS-IS / TO-BE 사용자 테스트', '기업 대상 발표'] },
    ],
  },
  investment: {
    no: '02',
    ko: '투자 · 실사',
    en: 'Investment & DD',
    title: ['Price the', 'Risk'],
    lead: '기업의 가치와 리스크를 숫자로 바꿉니다',
    desc: '실존 기업의 M&A 사전 실사에서 ESG 실사지표를 설계하고, 찾아낸 리스크를 계약 조건과 기업가치로 환산해 인수 구조를 권고했습니다.',
    scope: ['ESG Due Diligence', '밸류에이션', '딜 구조', '산업·기업 분석', 'IR'],
    icon: 'scale',
    flow: [
      { en: 'Analysis', ko: '산업 · 기업 분석', items: ['시장 구조 · M&A 동향', '사업 모델', '유닛 이코노믹스'] },
      { en: 'Framework', ko: '프레임워크 선정', items: ['지표 64종 검토', '기준별 가중 채점'] },
      { en: 'Diligence', ko: '실사 진단', items: ['실사지표 설계', '경영진 인터뷰 · 자료 검토', '리스크 맵'] },
      { en: 'Valuation', ko: '가치 산정', items: ['리스크 정량화', '비교거래 멀티플', 'Valuation Bridge'] },
      { en: 'Structure', ko: '딜 구조 권고', items: ['인수 구조 비교', 'R&W · CP · Earn-out', '밸류업 로드맵'] },
    ],
  },
  data: {
    no: '03',
    ko: '데이터 분석',
    en: 'Data',
    title: ['Trust the', 'Evidence'],
    lead: '노이즈 속에서 주장할 수 있는 것만 꺼냅니다',
    desc: '공개 커뮤니티 데이터를 수집·정제·클러스터링하는 파이프라인을 만들고, 설문·인터뷰 결과를 전략의 근거로 바꿉니다. 근거가 약하면 결론으로 올리지 않습니다.',
    scope: ['Python 파이프라인', 'LLM 라벨링', '클러스터링', '설문·IDI 분석', 'SQL'],
    icon: 'chart',
    flow: [
      { en: 'Collect', ko: '수집', items: ['커뮤니티 소스 수집', '기간 · 쿼리 설계'] },
      { en: 'Clean', ko: '정제', items: ['정규화', '노이즈 · 관련성 필터'] },
      { en: 'Label', ko: '라벨링', items: ['에피소드 구성', '규칙 + LLM 라벨링'] },
      { en: 'Model', ko: '군집화', items: ['축 탐색', '클러스터링 · 점수화'] },
      { en: 'Gate', ko: '검증', items: ['품질 게이트', '소스 균형 진단', '주장 범위 판정'] },
    ],
  },
  design: {
    no: '04',
    ko: '디자인',
    en: 'Design',
    title: ['Shape the', 'Experience'],
    lead: '흐름을 화면과 브랜드로 옮깁니다',
    desc: 'IA와 유저 플로우부터 UI, BI/BX, 인쇄물까지 그립니다. UMC 이화여대 지부 디자인 파트장으로 디자이너 팀을 이끌었습니다.',
    scope: ['UX / UI', 'IA · 유저 플로우', 'BI · BX', '인쇄물', 'Figma'],
    icon: 'pen',
    flow: [
      { en: 'Discover', ko: '문제 이해', items: ['인터뷰 · 자료 분석', '현재 흐름 파악'] },
      { en: 'Structure', ko: '구조 설계', items: ['IA', '유저 플로우', '와이어프레임'] },
      { en: 'Brand', ko: '브랜드', items: ['BI · 로고', '컬러 · 타이포'] },
      { en: 'Interface', ko: '화면', items: ['UI 디자인', '컴포넌트 정리'] },
      { en: 'Deliver', ko: '전달', items: ['인쇄물 · 콘텐츠', '개발 핸드오프'] },
    ],
  },
  development: {
    no: '05',
    ko: '개발',
    en: 'Development',
    title: ['Ship the', 'Product'],
    lead: '기획한 것을 직접 배포까지 만듭니다',
    desc: 'React·Next.js·React Native 프론트엔드부터 Cloudflare Workers 백엔드까지. 프로토타입이 아니라 실제로 돌아가는 제품을 만듭니다.',
    scope: ['Frontend', 'Backend', 'Mobile', 'DevOps · CI', 'AI-assisted Dev'],
    icon: 'code',
    flow: [
      { en: 'Plan', ko: '설계', items: ['아키텍처', 'API 계약 (Zod · OpenAPI)'] },
      { en: 'Build', ko: '구현', items: ['React · Next.js · React Native', 'Cloudflare Workers · Hono'] },
      { en: 'Guard', ko: '품질 장치', items: ['타입 체크 · 린트', 'AI 코딩 규칙', '리팩터링 백로그'] },
      { en: 'Ship', ko: '배포', items: ['GitHub Actions', 'Pages · Vercel · Cloudflare'] },
      { en: 'Iterate', ko: '반복', items: ['스프린트별 프로토타입', 'QA 유스케이스', '성능 개선'] },
    ],
  },
};

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
  { group: '전략 · 투자', items: ['산업 분석', '설문 · IDI', 'BM · GTM', 'ESG DD (KVIC · MSCI · SASB)', 'EV/GMV 밸류에이션', 'PowerPoint', 'Excel'] },
  { group: '데이터', items: ['Python', 'pandas · parquet', 'LLM Labeling', 'SQL', 'Google Forms'] },
  { group: '디자인', items: ['Figma', 'FigJam', 'Design System', 'BI · BX', 'Print'] },
  {
    group: '프론트엔드',
    items: ['TypeScript', 'React', 'Next.js', 'React Native · Expo', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Zustand'],
  },
  { group: '백엔드 · 인프라', items: ['Cloudflare Workers', 'Hono', 'D1 · R2', 'Zod', 'Spring Boot', 'MySQL', 'GitHub Actions'] },
];
