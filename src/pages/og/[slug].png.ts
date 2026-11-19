// 링크 공유용 이미지(1200x630)를 페이지마다 빌드 때 만든다
import type { APIRoute, GetStaticPaths } from "astro";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { axes, profile } from "../../data/site";
import { getProjects } from "../../lib/projects";

const font = (w: string) =>
  readFileSync(
    resolve(`node_modules/pretendard/dist/public/static/Pretendard-${w}.otf`),
  );
const fonts = [
  {
    name: "Pretendard",
    data: font("Regular"),
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Pretendard",
    data: font("Medium"),
    weight: 500 as const,
    style: "normal" as const,
  },
];
const wordmark = `data:image/svg+xml;base64,${readFileSync(resolve("public/workmark.svg")).toString("base64")}`;

// 사이트 배경과 같은 점 격자 (satori의 radial-gradient는 점이 거의 안 보여서 SVG로 그린다)
const dots = (() => {
  let c = "";
  for (let y = 16; y < 630; y += 32)
    for (let x = 16; x < 1200; x += 32)
      c += `<circle cx="${x}" cy="${y}" r="1.4"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><g fill="#ffffff" fill-opacity="0.12">${c}</g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
})();

interface Card {
  title: string;
  sub: string;
  meta: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();
  return [
    {
      params: { slug: "home" },
      props: {
        title: "Connecting the dots",
        sub: "From strategy to code",
        meta: "Strategy · Investment & DD · Data · Design · Development",
      },
    },
    {
      params: { slug: "about" },
      props: {
        title: profile.name,
        sub: "Computer Science, Ewha Womans University",
        meta: "About",
      },
    },
    ...projects.map((p) => ({
      params: { slug: p.id },
      props: {
        title: p.data.title,
        sub: p.data.summary,
        meta: [
          p.data.period,
          ...[p.data.primary, ...p.data.also].map((k) => axes[k].label),
        ].join(" · "),
      },
    })),
  ];
};

const h = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
  extra: Record<string, unknown> = {},
) => ({
  type,
  props: { style, children, ...extra },
});

export const GET: APIRoute = async ({ props }) => {
  const { title, sub, meta } = props as Card;
  const size = title.length <= 20 ? 92 : title.length <= 32 ? 80 : 64;

  // satori는 padding을 높이 100% 바깥에 더해서, 안쪽 여백은 절대 위치 상자로 만든다
  const tree = h(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      position: "relative",
      backgroundColor: "#0a0b0a",
      color: "#edf0ee",
      fontFamily: "Pretendard",
    },
    [
      h("img", { position: "absolute", top: 0, left: 0 }, undefined, {
        src: dots,
        width: 1200,
        height: 630,
      }),
      h(
        "div",
        {
          position: "absolute",
          top: 64,
          left: 72,
          right: 72,
          bottom: 56,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
        [
          h("img", { width: 257, height: 36 }, undefined, {
            src: wordmark,
            width: 257,
            height: 36,
          }),
          h("div", { display: "flex", flexDirection: "column" }, [
            h(
              "div",
              {
                fontSize: size,
                fontWeight: 500,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
              },
              title,
            ),
            h(
              "div",
              {
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.35,
                color: "#9aa39e",
                maxWidth: 940,
              },
              sub,
            ),
          ]),
          h(
            "div",
            {
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#7d8781",
            },
            [
              h("div", { display: "flex" }, meta),
              h("div", { display: "flex" }, "Haneul Son"),
            ],
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg).render().asPng();
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
