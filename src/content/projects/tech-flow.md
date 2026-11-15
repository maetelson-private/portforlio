---
title: tech-flow
summary: 기획과 개발 사이의 구조를 맞추는 유저 플로우·아키텍처 노드 편집기
period: 2026.03
sort: 202603.2
org: 개인 프로젝트
primary: development
also: [design]
roles: [디자인, FE]
stack: [TypeScript, Node Editor, Figma]
links:
  repo: https://github.com/maetelson/tech-flow
  figma: https://www.figma.com/design/ROtBCTIVtkTIRmyjIr9sO9/tech-flow
---

## 문제

복잡한 기능 흐름을 문서와 말로만 정리하면 입력·검증·API 호출·AI 처리·DB 저장 같은 연결 관계가 흐려집니다. 기획자와 개발자가 같은 그림을 보기 어렵습니다.

## 접근

- 노드와 엣지로 흐름을 그리고, 각 노드·연결선에 **설명, Markdown 노트, JSON 메타데이터**를 함께 기록합니다.
- `frontend` · `backend` · `ai` · `database` · `external api` 카테고리로 흐름을 구분합니다.
- 여러 플로우를 나눠 관리하고, 브라우저에 저장하고, 이미지로 내보낼 수 있습니다.
- 로컬에서 만든 플로우를 배포 시 초기 화면으로 넣어, 배포본에서도 바로 예시를 볼 수 있게 했습니다.
- Figma로 직접 디자인한 뒤 구현했습니다.
