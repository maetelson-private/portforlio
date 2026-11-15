# Maetelson 포트폴리오 웹사이트 — 기획안

> 2026-11-16 작성 · 상태: 계획 단계 (구현 전)
> 참고 소스: 노션 포트폴리오 페이지 + 프로젝트 DB(15건), GitHub 개인 repo 5개, 소속 org 3개

---

## 0. GitHub MCP 연결 점검 보고

| 항목 | 결과 |
|---|---|
| 인증 계정 | `maetelson` 연결 정상 (hireable, Ewha Womans University) |
| 개인 repo | **5개 접근 가능 (private 2개 포함)** |
| 소속 org | 커밋·PR 기록에서 3개 확인: `26-ewha-capstone-logue`, `knewit-app`, `persona-pipeline` |
| org repo 내용 열람 | ❌ **막힘** — 아래 참고 |

**org 접근이 막힌 이유**
- `26-ewha-capstone-logue`: 이 org는 **유효기간이 366일을 넘는 fine-grained PAT**를 막습니다. MCP에 등록된 토큰 기간을 1년 이하로 줄이거나 새로 발급해야 합니다.
- `knewit-app`: org의 **conditional access policy**에 걸렸습니다. org 설정에서 토큰을 승인하거나 SSO/정책 요건을 충족해야 합니다.
- 그래서 org repo는 **커밋 메시지·PR 제목(공개 검색 결과)** 으로만 파악했습니다. README·스크린샷을 쓰려면 토큰을 고친 뒤 다시 확인해야 합니다.
- 로컬에는 `gh` CLI가 없습니다.

### 확인한 repo 목록

**개인 (maetelson/)**
| repo | 공개 | 요약 | 스택 | 배포 |
|---|---|---|---|---|
| `cueslate` | 🔒 private | PDF를 슬라이드처럼 공유하는 SaaS. 링크 먼저 생성, 파일 교체해도 URL 유지, 다운로드 차단 뷰어, 요금제·보관정책 | Next.js 16, React 19, Tailwind 4, PDF.js, Cloudflare Workers/Hono/D1/R2, Zod, 모노레포(Turbo) | cueslate.org |
| `polaris` | public | 🏆 Polaris Office 산학 프로젝트 **대상**. DECK A팀 프로토타입 (AI 리서치 보드, 리뷰룸, 파이널룸 등 6개 화면) | React 18, Vite, Polaris UI 디자인 시스템, 자체 검증 스크립트 | GitHub Pages |
| `persona-pipeline` | public | LOGUE 페르소나 파이프라인. 커뮤니티 데이터 수집→정제→라벨링→클러스터링→검증 게이트→엑셀 출력. "과장하지 않는 리서치" | Python 3.11, parquet, LLM 라벨러(선택), 테스트 매트릭스 | 로컬 |
| `tech-flow` | public | 기획↔개발용 유저 플로우/아키텍처 노드 편집기 (노드별 노트·JSON) | TypeScript, Figma 원본 디자인 있음 | Vercel |
| `wiki` | 🔒 private | KNEWIT 지식베이스. 노션 리서치를 LLM용 마크다운으로 동기화 | Node (의존성 0) | — |

**org 소속**
| org / repo | 내 기여 (확인된 범위) |
|---|---|
| `26-ewha-capstone-logue/logue` (+ `-fe`, `-be`, `-ai`, `-docs`, `-logs`, `-test`) | 이화 캡스톤. **logue에서 PR 115건 작성**, 커밋 56건 이상. FE 구조 리팩터링, 인증 흐름, 분석 AI API 계약, Swagger, 데이터 소스 API, README 리뉴얼. `logue-test`에서 AI 분석 데모 MVP를 만들고 GitHub Pages로 배포. org와 대부분의 repo를 직접 생성 |
| `knewit-app/proto`, `capstone-docs`, `.github` | 창업팀 KNEWIT(대표). 프로토타입 v3.6→v3.11.2를 스프린트별로 GitHub Pages에 배포 (QA 유스케이스 UC-46~63, 카카오톡 초대, 애플 로그인 등). 회의록, experiment→wiki 점검 스크립트 |
| `persona-pipeline/.github` | persona-pipeline org 프로필 |
| `ekyuho/Ewha-2026-Spring` | 수업 repo, Team 19 프로젝트 브리프 (포트폴리오에는 제외 권장) |

---

## 1. 노션 포트폴리오 진단

**좋은 점**
- 정체성 문장이 분명합니다: *"연결하고, 이해하는 올라운더"*, 논리적인 사람 / 프로 멀티플레이어 / 열정 만수르.
- 프로젝트 DB에 이미 `기획 / 디자인 / FE / BE / 개발` 태그가 달려 있어서 → **기획·디자인·개발 3분할 구조와 그대로 맞습니다.**
- 경력(동아리·학회 11건)과 역할 범위(PM/PO, UX/UI, BX, FE/BE)가 넓습니다.

**옮기면서 고칠 점**
1. 노션 Tools 칸이 "개발: 깃허브 확인해주세요ㅎㅎ"로 끝납니다. → 웹사이트에서는 개발 스택을 **실제 repo 근거로 구체적으로** 적습니다. 지금 노션에서 가장 약한 부분입니다.
2. **개발 성과(CueSlate, LOGUE, persona-pipeline 등)가 노션 프로젝트 DB에 거의 없습니다.** 노션은 기획 위주이고 GitHub는 개발 위주라 두 쪽이 갈라져 있습니다. 웹사이트에서 처음으로 하나로 합쳐집니다.
3. 프로젝트 15건이 전부 같은 크기로 나열되어 있습니다. → 대표 3~4건은 깊게, 나머지는 아카이브로 보여줍니다.
4. 노션에는 **전화번호**가 공개되어 있습니다. 공개 웹사이트에서는 이메일과 링크만 남기는 걸 권장합니다.

---

## 2. 사이트 구조 (원페이지 + 프로젝트 상세 페이지)

```
/                      원페이지 메인
 ├ #hero               MISSION 칩 + 대형 헤드라인 + 소개 + CTA
 ├ #disciplines        01 기획 / 02 디자인 / 03 개발 카드 (레퍼런스의 확장 카드)
 ├ #featured           대표 프로젝트 3~4개 (여러 역할에 걸친 프로젝트)
 ├ #planning           기획 섹션
 ├ #design             디자인 섹션
 ├ #development        개발 섹션
 ├ #experience         활동 타임라인 (2023 → 2026)
 ├ #toolkit            Tools / Role / Stack
 └ #contact            이메일 · GitHub · LinkedIn · Disquiet
/projects/[slug]       케이스 스터디 상세
/archive               전체 프로젝트 필터 (기획·디자인·개발·연도)
```

### 레퍼런스 → 내 사이트 매핑
| 레퍼런스 요소 | 적용 |
|---|---|
| `MISSION` 칩 + 2줄 헤드라인 (2번째 줄만 컬러) | `PROFILE` 칩 + "연결하고, 이해하는 / **올라운더, 손하늘.**" (2번째 줄 그린) |
| 우측 짧은 소개 + 검정 pill 버튼 | 한 줄 소개 + `View Works` / `Contact` 버튼 |
| 배경 미세 그리드 | 다크 배경 위 6% 화이트 그리드 |
| 숫자 카드 4장, 1장만 확장 + 상단 비주얼 | **01 기획 / 02 디자인 / 03 개발** 3장. hover·클릭하면 확장되어 대표 작업 비주얼과 설명 노출, 클릭 시 해당 섹션으로 스크롤. 기본 확장 카드는 03 개발 |
| 아이콘 + 2줄 제목 | 섹션별 아이콘 (나침반 / 펜툴 / 코드) |
| 그린 웨이브 이미지 | 그린 라인 웨이브 (SVG 또는 저용량 WebGL/Canvas, `prefers-reduced-motion` 대응) |

---

## 3. 비주얼 시스템 (Black & Green)

| 토큰 | 값 (초안) | 용도 |
|---|---|---|
| `--bg` | `#0A0B0A` | 페이지 배경 |
| `--surface` | `#121514` | 카드 |
| `--surface-2` | `#1A1E1C` | 확장 카드·hover |
| `--line` | `rgba(255,255,255,.06)` | 그리드, 보더 |
| `--text` | `#EDEFEE` | 본문 |
| `--muted` | `#8A918E` | 보조 텍스트, 대형 숫자 `01.` |
| `--green` | `#1FD68A` | 강조, 링크, 헤드라인 2번째 줄 |
| `--green-deep` | `#0E8F60` | 그라데이션 끝, 버튼 hover |

- 폰트: **Pretendard**(한글 본문) + **Geist / Inter Tight**(영문 헤드라인, 대형 숫자) + **Geist Mono**(칩, 메타 라벨)
- 대형 숫자 `01.`은 레퍼런스처럼 낮은 대비의 회색으로 처리합니다.
- 섹션 구분은 색이 아니라 **번호·아이콘**으로 합니다. 그린은 강조에만 씁니다.

---

## 4. 프로젝트 배치안

원칙: **프로젝트마다 대표 섹션은 1개.** 다른 역할은 칩(`+디자인`, `+FE`)과 "역할 분포 바"로 보여줍니다. 여러 역할을 모두 맡은 프로젝트는 Featured로 올려서 "올라운더"라는 메시지를 증명합니다.

### ★ Featured (기획·디자인·개발을 모두 맡은 프로젝트)
| 프로젝트 | 왜 대표작인가 | 근거 자료 |
|---|---|---|
| **KNEWIT** 뉴잇 (2026, 대표) | 창업팀 대표. 기획→디자인→프로토타입 v3.x 반복 배포→지식베이스(wiki) 운영까지 전 과정을 맡음 | 노션, `knewit-app/proto` Pages, `wiki`(private) |
| **LOGUE** (2026, 캡스톤) | PR 115건. FE 리팩터링·인증·AI API 계약 + persona-pipeline 리서치 엔지니어링 | `logue` org, `persona-pipeline` |
| **Polaris Office × DECK** (2026) | 🏆 산학 **대상**. 전략 기획 + Polaris UI 기반 웹 프로토타입 | 노션, `polaris` + Pages 링크 |
| **CueSlate** (2026) | 혼자 만든 풀스택 SaaS, 실제 도메인 운영 중 | cueslate.org, `cueslate`(private) |

### 01 기획
- **Polaris Office** — Z세대 Lock-in 전략 (대상)
- **롯데마트** — 3040 식생활 파일럿 매장·마케팅 전략
- **직행 기업 프로젝트** — 회원가입 유도·온보딩 개인화
- **here&now** — 2030 커플 데이트 장소 추천·기록
- **MUSAI** — 악기 대여·시연 중개 (2024–25)
- **고사리** — 노인 특화 공간 중개 (2024)
- **틔움** — 청년 작가 × 문화 소외 공간 공공 갤러리 (2023–24)
- (검토중) **NIEdu** 니듀 — 넣을지 결정 필요

### 02 디자인
- **뷰티플로우** (UMC) — 소규모 뷰티샵 예약·고객 관리, Figma
- **메디모** — 가축 진료 통합 관리 플랫폼, Figma
- **UNI:CONNECT** — 대학생 커뮤니티 기반 브랜드 샘플링 (기획+디자인+FE)
- **메리클로스** — 홍보마케팅 BX·인쇄물
- **UMC 디자인 파트장** 활동 (운영 경험은 Experience로)

### 03 개발
- **CueSlate** — Next.js + Cloudflare Workers/D1/R2 풀스택
- **LOGUE** — FE 아키텍처 리팩터링, API 계약 하드닝
- **persona-pipeline** — Python 리서치 데이터 파이프라인 (근거 기반·과장 금지 설계)
- **tech-flow** — 기획↔개발 플로우 편집기 (직접 디자인 + 개발)
- **KNEWIT wiki** — 노션→마크다운 동기화 지식베이스
- **UNIS 공식 웹사이트** (검토중), **럭키드로우 이벤트**
- 섹션 하단에 **실제 repo에서 뽑은 스택 매트릭스**: TypeScript · React/Next.js · Vite · Tailwind · Cloudflare Workers/D1/R2 · Hono · Zod · Python · GitHub Actions/Pages

### Private repo 표기 원칙
- `cueslate`, `wiki`는 **코드 링크 없이** "🔒 Private repository · 요청 시 코드 리뷰 가능" 배지를 답니다.
- 대신 README에 이미 있는 **아키텍처 다이어그램·데이터 모델·보안 정책 표**를 케이스 스터디로 재구성합니다. 개발 역량을 보여주는 데 가장 좋은 재료입니다.
- 환경변수, 내부 엔드포인트, 시크릿 이름 등 운영 정보는 **절대 옮기지 않습니다.**

---

## 5. 케이스 스터디 템플릿 (`/projects/[slug]`)

1. 헤더: 제목 · 기간 · 소속 · **내 역할** · 역할 분포 바(기획 %/디자인 %/개발 %)
2. Problem — 누구의 무슨 문제인가 (노션 기획서에서)
3. Approach — 리서치·전략 / 핵심 결정 2~3개
4. Design — 주요 화면, 플로우 (Figma 캡처)
5. Build — 아키텍처 다이어그램, 스택, 기술적으로 어려웠던 점 (README·PR에서)
6. Outcome — 수상, 지표, 배포 링크
7. Links — Live / Repo / 노션 / Figma

---

## 6. 기술 스택 & 배포

| 결정 | 권장안 | 이유 |
|---|---|---|
| 프레임워크 | **Astro 5 + Tailwind CSS 4** (인터랙션 부분만 React 아일랜드) | 정적 출력이라 GitHub Pages에 최적, MDX 콘텐츠 컬렉션, 기본 JS 0 → 빠름 |
| 콘텐츠 | `src/content/projects/*.mdx` + Zod 스키마 | 프로젝트 추가 = 파일 1개 추가 |
| 모션 | CSS + 소량 JS (카드 확장, 스크롤 reveal), 웨이브는 SVG/Canvas | 가볍게 유지 |
| 배포 | GitHub Actions (`withastro/action`) → Pages | push하면 자동 배포 |
| repo 이름 | **`maetelson.github.io`로 생성 권장** | `https://maetelson.github.io/` 루트 URL. 현재 폴더명 `portforlio`(오타) 그대로 쓰면 `/portforlio/` 하위 경로가 됨 |
| 도메인 | (선택) 커스텀 도메인 + `CNAME` | |

**콘텐츠 스키마 초안**
```ts
{
  title, slug, period: { start, end? }, org,
  primary: 'planning' | 'design' | 'development',
  roles: ('기획'|'디자인'|'FE'|'BE'|'PM')[],
  roleSplit?: { planning: number, design: number, dev: number },
  featured: boolean, award?: string,
  summary, cover, stack?: string[],
  links: { live?, repo?, repoPrivate?: boolean, notion?, figma? }
}
```

---

## 7. 진행 단계

| 단계 | 할 일 | 산출물 |
|---|---|---|
| P0 자료 수집 | org 토큰 문제 해결 → logue·knewit README와 스크린샷 수집 / 노션 각 프로젝트 본문에서 Problem·Outcome 추출 / Figma 화면 export | `content/` 원고, `public/images/` |
| P1 디자인 시스템 | 토큰, 타이포, 카드·칩·버튼 컴포넌트, 그리드 배경 | 스타일 가이드 페이지 |
| P2 메인 페이지 | Hero → Disciplines 확장 카드 → Featured → 3개 섹션 → Experience → Contact | 원페이지 |
| P3 케이스 스터디 | Featured 4개 상세 페이지 먼저, 나머지는 카드 + 노션 링크 | `/projects/*` |
| P4 배포 | Actions 워크플로, OG 이미지, sitemap, favicon | 라이브 URL |
| P5 다듬기 | 모바일(375px), 다크 대비 확인, Lighthouse 95+, reduced-motion | |

---

## 8. 결정이 필요한 것

1. **repo 이름**: `maetelson.github.io`(권장) / 이 폴더 그대로
2. **언어**: 한국어 본문 + 영문 헤드라인(권장) / 영문 병기
3. **검토중 2건**(NIEdu, UNIS 웹사이트) 넣을지
4. **org 토큰 수정**: 진행할지 (org repo README·이미지를 쓰려면 필요)
5. 대표 헤드라인 문구 확정 — 후보: "연결하고, 이해하는 / 올라운더." · "From strategy to / shipped product."
