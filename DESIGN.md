# DESIGN.md

손하늘(Maetelson) 포트폴리오의 디자인 기준. 코드에 반영된 내용을 기록한다.

## World

- 거의 검정 바탕 + 초록 한 가지. 초록은 **활성 상태**(선택된 필터, 호버한 행 제목, 현재 메뉴 밑줄, 링크 호버)와 3D 리본에만 쓴다.
- 서체는 Pretendard 하나. 코드(`apps/fe` 등)만 고정폭.
- 카드, 그림자, 아이콘 타일, 격자 배경, 그라데이션 글자, 제목 위 라벨, 큰 숫자 강조는 쓰지 않는다.
- 구획은 1px 선으로 나눈다.
- UI 라벨은 영어(Work, About, Contact, Strategy…, Overview/Situation/Result), 본문은 한국어.

## Tokens (`src/styles/global.css`)

| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--bg` | `#0a0b0a` | 페이지 바탕 |
| `--surface` / `--surface-2` | `#131615` / `#1a1e1c` | Toolkit 상자 등 드문 면 |
| `--line` / `--line-strong` | 흰색 7% / 14% | 행 구분선 / 표 머리 선 |
| `--text` / `--text-2` / `--muted` | `#edf0ee` / `#b4bbb7` / `#7d8581` | 제목 / 본문 / 보조 |
| `--green` | `#2ee59d` | 활성 상태, 3D 리본 |
| `--radius-lg` | 22px | 상자 모서리 (알약형 버튼은 999px) |

타입 스케일: 홈 제목 clamp(40–84px)/600/-0.035em, 행 제목 18–22px/600, 본문 15–16px/1.7, 보조 12–14px. 자간은 -0.035em을 넘지 않는다.

## Structure

- `/` 홈: 제목 + 소개 한 줄 → 3D 리본 → **Work 목록 하나**(필터 6개: All + 5개 분야, 개수 표시) → Contact.
- 분야는 별도 페이지가 아니라 필터. `?field=strategy` 등 주소로 공유된다. 예전 `/strategy/` 주소는 해당 필터로 리다이렉트.
- `/projects/[slug]/`: client·date·role·category 표 → Overview / Situation / Result → 본문(Problem, Approach, Outcome) + Stack.
- `/about/`: 소개, Experience, Toolkit, Other activities.

## Motion

- 한 가지 장면만 연출한다: **3D 리본**. 필터를 고르거나 행에 마우스를 올리면 그 분야의 형태(진폭·굽이·꼬임·폭·속도)로 약 0.6초에 걸쳐 바뀐다. 커서 방향으로 기운다.
- 나머지는 상태 피드백만: 행 호버 시 다른 행 흐림(opacity .32), 제목 6px 이동, 화살표 대각선 이동, 메뉴·링크 밑줄이 그어짐.
- 이징 `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion`이면 리본은 정지 화면, 전환은 즉시.
- 리본은 화면 밖이거나 탭이 숨으면 멈추고, three.js는 히어로가 보일 때만 불러온다. WebGL이 없으면 SVG 리본.
