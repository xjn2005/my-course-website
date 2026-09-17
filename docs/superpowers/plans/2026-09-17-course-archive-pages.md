# Course archive, policy, and blog implementation plan

Execute on the current `main` branch. Preserve the unrelated `.gitignore`, `MAINTENANCE.md`, and `public/` changes.

## 1. Load Chinese fonts

Files: `package.json`, `package-lock.json`, `src/layouts/Default.astro`, `src/styles/main.css`.

1. Install `@fontsource/noto-sans-sc` and `@fontsource/noto-serif-sc`.
2. Import Noto Sans SC 400/600 and Noto Serif SC 600 in the default layout.
3. Use Noto Sans SC for body and navigation; use Noto Serif SC for headings, course names, and strong text.
4. Keep the restrained red accent and do not add separator lines.

## 2. Keep root URLs base-safe

Files: `src/lib/course-path.ts`, `src/pages/index.astro`, `src/pages/policy.astro`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`.

1. Add `sitePath(segment)` beside the existing course-path helper; it must prefix the Astro base URL once and return a trailing slash.
2. Keep the existing course URL helper unchanged.
3. Use `sitePath` for Policy, Blog, and Blog post links.

## 3. Group the course archive

Files: `src/pages/index.astro`, `src/styles/main.css`.

1. Group the existing course collection by `data.semester`, retaining its existing order.
2. Render `2026 Fall` as a group heading with the current compact, left-aligned course rows beneath it.
3. Keep course names as red underlined links and show each instructor as muted supporting text.
4. Add simple underlined `Policy` and `Blog` links after the groups; do not introduce cards or horizontal rules.

## 4. Add Policy and Blog pages

Files: `src/pages/policy.astro`, `src/content/config.ts`, `src/content/blog/learning-reflection.md`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/styles/main.css`.

1. Create `Policy` with an `Academic Integrity` section in Chinese: independent work, attribution for references/collaboration/tools, and no plagiarism or misrepresentation.
2. Define a typed `blog` content collection with title and date frontmatter.
3. Add the first post, `关于学习的感想`, with editable Chinese reflection content.
4. Create a date-ordered Blog index and a rendered Markdown detail route using `getStaticPaths`.
5. Use the existing article visual language: comfortable Chinese reading measure, link-only underlines, and no new navigation chrome.

## 5. Verify and commit

1. Run `npm run build`; verify root, Policy, Blog, blog post, and existing course routes under the configured base path.
2. Run `git diff --check`.
3. Stage only implementation files and commit with `Add policy and blog course archive pages`.
