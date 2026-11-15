---
title: KNEWIT 뉴잇
summary: 리뷰를 못 믿는 2030을 위한, 카드 결제 내역 기반 F&B 방문 기록·추천 앱
period: 2026.03 — 진행 중
sort: 202603
org: 창업팀 KNEWIT · 대표
primary: development
roles: [대표, 기획, 디자인, FE]
featured: true
award: ICT/SW 여성창업공모전 우수상 · 모두의창업 2차 진출
highlight: { value: 'v3.11', label: '스프린트마다 배포한 인터랙티브 프로토타입' }
stack: [React Native, Expo Router, TypeScript, TanStack Query, Zustand, NativeWind, orval, Biome, GitHub Actions, Sentry, PostHog, Figma]
links:
  live: https://knewit-app.github.io/proto/
  notion: https://u--x.notion.site/4000fb8090ab80bdbd83ec753adc5e0e
---

## 문제

기존 장소 추천은 광고·협찬 콘텐츠에 기대고 있어 믿기 어렵습니다. 2030은 "진짜로 사람들이 다시 가는 곳"을 알고 싶어 합니다.

## 접근

- **3단계 제품 구조**: 자동 방문 기록 → 다층 데이터 기반 장소 속성 → 실제 행동 기반 추천·소셜 탐색
- **3-Layer 데이터 소스 모델**: 공식·공공 데이터 / 공개 텍스트 AI 추출 / 자체 결제 신호. Google 검색 PoC가 실패하자 원인을 "소스 선택 오류"로 보고 네이버 블로그 API로 바꿨습니다.
- **온보딩 재설계**: 카드 연동 단계에서 테스트 유저 전원이 막히는 것을 확인하고, "친구 지도 먼저 보여주기"로 흐름을 바꿨습니다.
- **Thin Client 아키텍처**: React Native(Expo) 기반. orval로 API 클라이언트를 생성하고, AI 코딩 에이전트용 4단계 규칙 체계(CLAUDE.md · Biome · Claude Code 훅 · GitHub Actions)를 만들었습니다.
- **프로토타입 반복 배포**: v3.6 → v3.11까지 스프린트 단위로 웹 프로토타입을 GitHub Pages에 올리며 QA 유스케이스(UC-46~63)를 검증했습니다.
- **팀 지식베이스**: 노션 리서치를 LLM이 읽기 좋은 마크다운으로 동기화하는 wiki 레포를 만들어, 백엔드 코드 레포에 submodule로 붙였습니다.

## 결과

- 🏆 ICT/SW 여성창업공모전 우수상(3위)
- 🏆 모두의창업 2차 1라운드 진출 (창업활동자금 200만 원)
- 🏅 이화여대 창업동아리 ORDA Come-Up 트랙 선정
- 저장 리스트 가져오기 PoC: 카카오 525건, 네이버 998건 수집
- Figma 와이어프레임 55개 프레임
