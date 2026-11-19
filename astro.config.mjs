// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 예전 분야별 주소(/strategy/ 등)는 홈 필터로 넘기는 리다이렉트라 사이트맵에서 뺀다
const redirects = /\/(strategy|investment|data|design|development)\/?$/;

// GitHub Pages: https://maetelson-private.github.io/portforlio/
export default defineConfig({
  site: 'https://maetelson-private.github.io',
  base: '/portforlio',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !redirects.test(page) })],
});
