# 恢复课程 Materials 与 Assignments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Give every Astro course a 700px home page plus independent Schedule, Materials, Assignments, and assignment-detail pages.

**Architecture:** Extend the existing \`courses\` collection with a description and materials. Add an \`assignments\` content collection keyed by course slug. Each nested course route queries the matching course at build time; a tiny URL helper creates base-path-safe links for every caller.

**Tech Stack:** Astro Content Collections, TypeScript, CSS, Font Awesome 5 already loaded by \`Default.astro\`.

---

### Task 1: Extend course and assignment content

**Files:**
- Modify: \`src/content/config.ts\`, \`src/content/courses/real-analysis-2026-fall.md\`
- Create: \`src/content/assignments/real-analysis-2026-fall/01-measure-basics.md\`

- [ ] **Step 1: Add materials and assignment schemas to \`config.ts\`.**

\`\`\`ts
const material = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
});

const assignments = defineCollection({
  type: 'content',
  schema: z.object({
    course: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    pdf: z.string().optional(),
    attachment: z.string().optional(),
    solutions: z.string().optional(),
  }),
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), semester: z.string(), instructor: z.string(),
    description: z.string().optional(), materials: z.array(material).default([]),
    schedule: z.array(z.discriminatedUnion('kind', [lesson, breakRow])).default([]),
  }),
});
export const collections = { courses, assignments };
\`\`\`

- [ ] **Step 2: Add course overview and materials to the existing frontmatter.**

\`\`\`md
description: 实变函数课程主页。
materials:
  - title: 课程讲义
    url: '#'
    description: 本课程的讲义与课堂补充材料。
  - title: 参考教材
    url: '#'
    description: 实变函数与测度论的推荐读物。
\`\`\`

- [ ] **Step 3: Add the first assignment.**

\`\`\`md
---
course: real-analysis-2026-fall
title: 作业 1：可测集与测度
date: 2026-09-17
---
请完成课程主页发布的练习题，并在截止日前提交。
\`\`\`

- [ ] **Step 4: Verify that frontmatter is valid.**

Run: \`npm run build\`

Expected: Astro recognizes both collections and emits no schema error.

### Task 2: Add base-safe navigation and nested course pages

**Files:**
- Create: \`src/lib/course-path.ts\`, \`src/components/CourseNav.astro\`, \`src/pages/courses/[slug]/schedule.astro\`, \`src/pages/courses/[slug]/materials.astro\`, \`src/pages/courses/[slug]/assignments.astro\`, \`src/pages/courses/[course]/assignments/[assignment].astro\`
- Modify: \`src/pages/index.astro\`, \`src/pages/courses/[slug].astro\`

- [ ] **Step 1: Add one base-safe path helper and use it in every course link.**

\`\`\`ts
const base = import.meta.env.BASE_URL.replace(/\\/$/, '');

export function coursePath(slug: string, section = '') {
  return \`\${base}/courses/\${slug}\${section ? \`/\${section}\` : ''}/\`;
}
\`\`\`

The course index must import \`coursePath\` and render \`href={coursePath(course.slug)}\`, replacing manual \`BASE_URL\` concatenation.

- [ ] **Step 2: Make \`[slug].astro\` the course home page, not the embedded Schedule.**

\`\`\`astro
<Default title={\`\${course.data.title} · \${course.data.semester}\`}>
  <p class="course-back"><a href={import.meta.env.BASE_URL}>← 所有课程</a></p>
  <h1>{course.data.title}</h1>
  <p class="course-meta">{course.data.semester} · {course.data.instructor}</p>
  <CourseNav slug={course.slug} />
  <article class="course-overview"><Content /></article>
</Default>
\`\`\`

- [ ] **Step 3: Create the Schedule and Materials routes.**

Each page must export the same \`getStaticPaths\` mapping over \`getCollection('courses')\`, receive a \`CollectionEntry<'courses'>\` prop, show \`CourseNav\`, and then render respectively:

\`\`\`astro
<h2>Schedule</h2>
<Schedule entries={course.data.schedule} />
\`\`\`

\`\`\`astro
<h2>Materials</h2>
<ul class="materials-list">
  {course.data.materials.map((material) => <li>
    <a href={material.url}>{material.title}</a>
    {material.description && <span>{material.description}</span>}
  </li>)}
</ul>
\`\`\`

- [ ] **Step 4: Create the course assignment list and detail route.**

The list filters \`await getCollection('assignments')\` by \`entry.data.course === course.slug\`, sorts ascending by date, and links to \`coursePath(course.slug, \`assignments/\${entry.slug.split('/').at(-1)}\`)\`. It displays only defined PDF, attachment, and solutions icons:

\`\`\`astro
{assignment.data.pdf && <a href={assignment.data.pdf} title="题目"><i class="fas fa-file-pdf" /></a>}
{assignment.data.attachment && <a href={assignment.data.attachment} title="附件"><i class="fas fa-file-archive" /></a>}
{assignment.data.solutions && <a href={assignment.data.solutions} title="答案"><i class="fas fa-check-circle" /></a>}
\`\`\`

The detail route creates paths from matching assignment entries, validates \`assignment.data.course === course.slug\`, calls \`render(assignment)\`, and renders \`<Content />\`.

- [ ] **Step 5: Build and check the public URLs.**

Run: \`npm run build; rg -q 'href=\"/jekyll-course-website-template/courses/real-analysis-2026-fall/materials/\"' dist/courses/real-analysis-2026-fall/index.html\`

Expected: build succeeds and every course page is under the configured GitHub Pages base path.

### Task 3: Apply the 700px document layout

**Files:**
- Modify: \`src/styles/main.css\`

- [ ] **Step 1: Constrain page content and style the course navigation.**

\`\`\`css
.site-shell { max-width: 700px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
.course-nav { display: flex; gap: 1rem; margin: 1.5rem 0 2rem; padding: 0; list-style: none; border-bottom: 1px solid #d1d5db; }
.course-nav a { display: block; padding: 0 0 .5rem; color: #1f2933; font-family: system-ui, sans-serif; font-weight: 600; }
.materials-list { padding-left: 1.25rem; }.materials-list li { margin-bottom: 1rem; }
.materials-list span { display: block; color: #5b6570; }
.assignment-list { padding: 0; list-style: none; }.assignment-list li { display: flex; gap: .75rem; align-items: baseline; padding: .65rem 0; border-bottom: 1px solid #e5e7eb; }
.assignment-icons { margin-left: auto; display: flex; gap: .5rem; }.assignment-icons a { color: #d00000; }
\`\`\`

- [ ] **Step 2: Preserve Schedule horizontal scrolling on small screens.**

Run: \`npm run build\`

Expected: the production build still succeeds with the 700px desktop shell and \`min-width: 640px\` schedule table.

### Task 4: Verify and commit

**Files:**
- Modify: all files listed in Tasks 1–3

- [ ] **Step 1: Run final checks.**

Run: \`npm run build; git diff --check\`

Expected: build succeeds and no whitespace errors are reported.

- [ ] **Step 2: Commit only the course-pages implementation.**

\`\`\`bash
git add src/content src/lib/course-path.ts src/components/CourseNav.astro src/pages src/styles/main.css
git commit -m "Add course materials and assignments"
\`\`\`

## Plan self-review

- Coverage: the plan adds course home, Schedule, Materials, Assignments and detail pages; 700px layout; screenshot-aligned resource icons; and GitHub Pages-safe paths.
- Scope: it restores only requested course content; Lectures remains removed.
- Consistency: courses use \`slug\`; assignments use the same \`course\` slug; all nested links call \`coursePath\`.

