# DESIGN.md

손하늘(Maetelson) 포트폴리오의 디자인 기준. 코드에 반영된 내용을 기록한다.

## World

- 거의 검정 바탕 + 초록 한 가지. 마침표 같은 문장부호에 색을 넣지 않는다. 초록은 **활성 상태**(선택된 필터, 호버한 행 제목, 현재 메뉴 밑줄, 링크 호버)와 3D 리본에만 쓴다.
- 서체는 Pretendard 하나. 코드(`apps/fe` 등)만 고정폭.
- 카드, 그림자, 아이콘 타일, 격자 배경, 그라데이션 글자, 제목 위 라벨, 큰 숫자 강조는 쓰지 않는다.
- 구획은 1px 선으로 나눈다.
- 사이트 전체 영어. 문구는 짧고 평이하게, 대시(—, –)와 과장 표현 없이.

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

- `/` 홈: **타이포그래피 히어로**(레퍼런스: lucaslima.design). 콘텐츠 폭을 꽉 채우는 대문자 한 줄 CONNECTING THE DOTS(JS로 폭에 맞춤), 아래 왼쪽 이메일 복사 버튼·오른쪽 FROM STRATEGY TO CODE, 회색 소개 문단에서 다섯 분야 이름만 밝게, 오른쪽 FIELDS 2열 목록(필터로 이동). 배경은 회색 점 격자. 3D 없음 → **Work 목록 하나**(고정 바: 미니 리본 + 현재 분야 + 필터) → Contact.
- 분야는 별도 페이지가 아니라 필터. `?field=strategy` 등 주소로 공유된다. 예전 `/strategy/` 주소는 해당 필터로 리다이렉트.
- `/projects/[slug]/`: Work / 분야 경로 → 프로젝트 이름(초록 라벨) → 요약 한 문장(큰 제목) → Live·GitHub·Notion 링크 → 왼쪽 고정 정보(Client, Period, Role, Fields, Recognition, Stack) + 오른쪽 본문. 본문 섹션은 01·02·03 번호, Approach는 번호 단계, Outcome은 한 줄씩 행. 끝에 다음 프로젝트(요약 포함)와 All work (N). 레퍼런스: Linear 고객 사례, Bain 사례, Pentagram 프로젝트 페이지.
- `/about/`: 소개, Experience, Toolkit, Other activities.

## Motion

- 한 가지 장면만 연출한다: **3D 리본**. 필터를 고르거나 행에 마우스를 올리면 그 분야의 형태(진폭·굽이·꼬임·폭·속도)로 약 0.6초에 걸쳐 바뀐다. 커서 방향으로 기운다.
- 나머지는 상태 피드백만: 행 호버 시 다른 행 흐림(opacity .32), 제목 6px 이동, 화살표 대각선 이동, 메뉴·링크 밑줄이 그어짐.
- 이징 `cubic-bezier(0.16, 1, 0.3, 1)`. `prefers-reduced-motion`이면 리본은 정지 화면, 전환은 즉시.
- 리본은 화면 밖이거나 탭이 숨으면 멈추고, three.js는 히어로가 보일 때만 불러온다. WebGL이 없으면 SVG 리본.
