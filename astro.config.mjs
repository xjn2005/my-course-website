import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xjn2005.github.io/',
  base: '/',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
