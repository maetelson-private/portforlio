---
title: LOGUE
summary: 이화여대 2026 캡스톤 — 데이터 소스를 연결하고 대화형으로 분석하는 AI 분석 서비스
period: 2026.03 — 2026.06
sort: 202603.5
org: 이화여대 캡스톤디자인 · 26-ewha-capstone-logue
primary: development
also: [data, strategy]
roles: [기획, FE, API 설계]
stack: [TypeScript, React, Swagger · OpenAPI, GitHub Actions, Codex · Claude 리뷰 스킬]
---

## 맡은 일

캡스톤 팀의 GitHub organization과 FE·BE·AI·문서 레포를 직접 만들고, 프로젝트 기간 동안 메인 레포에 **PR 115건**을 올렸습니다.

## 접근

- **FE 아키텍처 리팩터링**: feature 계층 이동, 공통 컴포넌트 export 경계, dataSource API 경계, 분석 채팅 훅·렌더링 경계를 나눠 정리했습니다.
- **API 계약 하드닝**: 분석 AI API 계약과 Swagger 연동을 보강하고, 데이터 소스 삭제 API 계약을 맞췄습니다.
- **인증 흐름 정리**: 인증 프로바이더 흐름을 분리하고 auth lifecycle 정책을 한곳에 모았습니다. 로그인 세션 복원 401 오류도 고쳤습니다.
- **리팩토링 백로그 운영**: 스캔으로 백로그를 만들고 PR 단위로 정리했습니다. 코드 리뷰·리팩터링용 AI 스킬 2종을 팀에 추가했습니다.
- **AI 분석 데모 MVP**: 별도 레포에서 데모를 먼저 만들어 GitHub Pages로 배포해 방향을 검증했습니다.

## 함께 만든 것

LOGUE의 타깃 사용자를 정의하려고, 공개 커뮤니티 데이터에서 페르소나 근거를 뽑는 리서치 파이프라인을 따로 만들었습니다. 자세한 내용은 **Persona Pipeline** 프로젝트에 정리했습니다.
