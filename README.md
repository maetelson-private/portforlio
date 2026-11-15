# portforlio

손하늘(Maetelson) 포트폴리오 — 기획 · 디자인 · 개발.

- 배포 주소: https://maetelson-private.github.io/portforlio/
- 스택: Astro 7 · 순수 CSS(토큰 기반) · GitHub Actions → GitHub Pages
- 기획 문서: [PLAN.md](PLAN.md)

## 실행

```bash
npm install
npm run dev      # http://localhost:4321/portforlio/
npm run build    # dist/
```

Node 22.23 이상이 필요합니다.

## 구조

```
src/
  content/projects/*.md   프로젝트 1개 = 파일 1개 (frontmatter 스키마는 src/content.config.ts)
  data/site.ts            프로필, 섹션 소개, 활동 타임라인, 툴킷
  components/             Hero, Disciplines(확장 카드), Featured, DisciplineSection, Experience, Contact
  pages/index.astro       메인 원페이지
  pages/projects/[slug]   케이스 스터디 상세
  styles/global.css       색·타이포 토큰 (Black & Green)
```

### 프로젝트 추가

`src/content/projects/새-프로젝트.md` 파일을 만들고 frontmatter를 채웁니다.

- `primary`: `planning` / `design` / `development` 중 어느 섹션에 넣을지
- `featured: true`: 상단 Featured에 넣으려면 `src/pages/index.astro`의 `featuredOrder`에도 id를 추가합니다.
- `draft: true`: 사이트에서 숨깁니다.
- `links.repoPrivate: true`: 비공개 레포 배지를 표시합니다. 코드 링크는 노출하지 않습니다.

## 배포

`main`에 push하면 `.github/workflows/deploy.yml`이 빌드해서 Pages에 올립니다.
처음 한 번은 레포 **Settings → Pages → Source**를 **GitHub Actions**로 설정해야 합니다.
