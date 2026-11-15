---
title: Persona Pipeline
summary: 공개 커뮤니티 데이터에서 근거가 확인된 페르소나만 추려내는 리서치 파이프라인
period: 2026.04 ~ 2026.07
sort: 202604.5
org: LOGUE 캡스톤 · 개인 리서치 엔지니어링
primary: data
also: [development, strategy]
roles: [파이프라인 설계, 데이터 엔지니어링, 리서치]
featured: true
stack: [Python 3.11, parquet, Rule + LLM Labeling, Clustering, Quality Gates, unittest]
links:
  repo: https://github.com/maetelson/persona-pipeline
---

## Problem

LLM은 약한 근거로도 그럴듯한 페르소나를 만들어 냅니다. 커뮤니티 데이터는 노이즈가 많고, 중복되고, 출처마다 신뢰도도 다릅니다. 같은 불편을 말하더라도 Stack Overflow 디버깅 글과 Reddit 불만 글은 근거로서의 신뢰도가 같지 않습니다.

## Approach

- **단계별 파이프라인**: 수집 → 정규화 → 노이즈 필터 → 관련성 필터 → 에피소드 생성 → 규칙/LLM 라벨링 → 축 탐색 → 클러스터링·점수화 → 품질 게이트 → 워크북 출력. 단계마다 다시 돌릴 수 있고, 단계 사이 결과를 파일로 남겨 어디서 무엇이 바뀌었는지 추적합니다.
- **품질 게이트**: 커버리지, 소스 균형, 소스 집중도, 약한 소스 부채, 대표 사례 근거를 각각 검사합니다.
- **판정 단위 분리**: 페르소나의 "주장 가능"과 워크북 전체의 "덱에 쓸 수 있음"을 따로 판정해, 흥미로운 클러스터 하나가 완성된 페르소나 체계로 오인되지 않게 했습니다.

## Outcome

- 최종 사용 가능 페르소나 3개, 조건부 검토 가능 1개
- 근거가 부족한 클러스터는 승격하지 않고 진단용으로만 남김
- 워크북 전체는 소스 균형 문제가 남아 있어 "검토 가능, 발표 자료 미사용" 단계로 확정
