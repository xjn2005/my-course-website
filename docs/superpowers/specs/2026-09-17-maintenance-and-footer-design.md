# Maintenance guide and footer design

## Scope

Replace the obsolete maintenance guide with a concise Chinese guide that matches the current Astro course-archive site. Add a shared footer reading `Copyright © 2026 徐嘉宁`.

## Maintenance guide

- Document the actual project structure: Astro configuration, the shared layout, shared stylesheet, content collections, course Markdown files, assignment Markdown files, and static assets.
- Explain the current editing paths for adding or updating courses, assignments, schedules, materials, general information, and the home-page archive.
- Retain only the current Node.js development, build, preview, and GitHub Pages deployment instructions.
- Remove Jekyll migration notes and all references to nonexistent data files, lectures, announcements, events, navigation YAML, and late-policy features.

## Footer

- Add the footer once in `Default.astro`, after the page-content slot, so all existing and future pages receive it.
- Use one semantic `footer` element and a small existing-style CSS rule; no component or dependency is needed.
- Keep the footer within the white paper panel and visually secondary to the content.

## Validation

Run `npm run build` and confirm all generated routes, including General Information, build successfully.
