import { defineConfig } from 'astro/config';

// 与原 Jekyll 的 baseurl 保持一致，便于 GitHub Pages 部署
// https://astro.build/config
export default defineConfig({
  site: 'http://kazemnejad.github.io/',
  base: '/jekyll-course-website-template',
  trailingSlash: 'ignore',
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    css: {
      // 兼容 SCSS 变量风格的 CSS（实际为普通 CSS 写法，不需 sass）
    },
  },
});
