---
title: CueSlate
summary: PDF를 다운로드 파일이 아니라, 링크 하나로 슬라이드처럼 공유하는 웹 서비스
period: 2026.06
sort: 202606
org: 개인 프로젝트
primary: development
roles: [기획, FE, BE]
featured: true
highlight: { value: 'Live', label: 'cueslate.org에서 운영 중인 풀스택 서비스' }
stack: [Next.js 16, React 19, Tailwind CSS 4, PDF.js, Cloudflare Workers, Hono, D1, R2, Zod, Turborepo]
links:
  live: https://cueslate.org
  repoPrivate: true
---

## 문제

PDF를 메일이나 메신저로 보내면 수정할 때마다 다시 보내야 하고, 받은 사람은 파일을 내려받아야 하며, 원본이 그대로 퍼집니다.

## 접근

- **링크 우선 생성**: 공유 링크를 먼저 만들고 PDF는 나중에 올리거나 교체합니다. 파일을 바꿔도 공개 URL은 그대로입니다.
- **보안 중심 전달**: 원본은 비공개 R2 버킷에 두고, 짧은 수명의 뷰 토큰을 검증한 뒤에만 스트리밍합니다. 다운로드·프린트는 기본으로 막습니다.
- **대용량 업로드**: presigned URL로 브라우저가 R2에 직접 올립니다. 64MB 이상은 multipart로 나눕니다.
- **빠른 뷰어**: PDF.js 슬라이드 뷰어, Range 스트리밍, WebP 미리보기를 써서 첫 페이지부터 보여줍니다.
- **수명 주기**: 무료 링크는 7일 보관 후 매시간 cron이 정리하고, 유료 플랜은 영구 보관·비밀번호·커스텀 slug를 지원합니다.
- **SEO/GEO**: 다국어 공개 페이지, sitemap, structured data, `llms.txt`를 갖췄고 진단 스크립트를 만들었습니다.

## 아키텍처

- `apps/fe` — Next.js App Router. 공개 사이트, 관리자 화면, 뷰어, API 프록시
- `apps/be` — Cloudflare Workers + Hono. 관리자 / 공개 / 내부 API를 분리하고 OpenAPI 문서를 제공
- `packages/shared` — Zod 스키마로 FE·BE API 계약 공유
- `packages/ui` — 공용 컴포넌트

> 소스 코드는 비공개 레포입니다. 요청하시면 코드 리뷰용으로 공유할 수 있습니다.
