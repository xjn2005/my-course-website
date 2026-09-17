# 杭州师范大学 Astro 课程网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Replace the template with an Astro-only multi-course site whose course pages provide a CMU 15-445-style Schedule.

**Architecture:** A single Astro \`courses\` content collection stores course metadata and schedule rows in frontmatter. The home page lists courses; a static course route feeds the selected schedule to one table component. The shared layout and stylesheet contain only document-shell and schedule styling.

**Tech Stack:** Astro 4, Astro Content Collections, TypeScript, CSS, existing Font Awesome CDN.

---

## File structure

- \`src/content/config.ts\` — validates course, lesson, and break content.
- \`src/content/courses/real-analysis-2026-fall.md\` — first editable course.
- \`src/pages/index.astro\` and \`src/pages/courses/[slug].astro\` — course index and course route.
- \`src/components/Schedule.astro\` — Schedule table.
- \`src/layouts/Default.astro\`, \`src/styles/main.css\` — common shell and all styles.

### Task 1: Define the course content model

**Files:**
- Modify: \`src/content/config.ts\`
- Create: \`src/content/courses/real-analysis-2026-fall.md\`
- Delete: \`src/content/lectures/01_introduction.md\`, \`src/content/assignments/01_sample_assignment.md\`, \`src/content/events/sample_due.md\`, \`src/content/events/sample_exam_due.md\`, \`src/content/events/sample_raw_event.md\`, \`src/content/announcements/01_sample_announcement.md\`

- [ ] **Step 1: Replace the legacy collection schemas.**

\`\`\`ts
import { defineCollection, z } from 'astro:content';

const detail = z.object({ label: z.string(), value: z.string(), href: z.string().optional() });
const lesson = z.object({
  kind: z.literal('lesson'), date: z.coerce.date(), number: z.number().int().positive().optional(),
  topic: z.string(), details: z.array(detail).default([]),
  slides: z.string().optional(), notes: z.string().optional(), video: z.string().optional(),
});
const breakRow = z.object({ kind: z.literal('break'), date: z.coerce.date(), title: z.string() });

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), semester: z.string(), instructor: z.string(),
    schedule: z.array(z.discriminatedUnion('kind', [lesson, breakRow])).default([]),
  }),
});
export const collections = { courses };
\`\`\`

- [ ] **Step 2: Add this initial course content.**

\`\`\`md
---
title: 实变函数
semester: 2026 Fall
instructor: 任课教师
schedule:
  - kind: lesson
    date: 2026-09-07
    number: 1
    topic: 课程导论与集合论回顾
    details:
      - label: 阅读
        value: 课程讲义第 1 节
  - kind: lesson
    date: 2026-09-10
    number: 2
    topic: 可测集与测度
    details:
      - label: 阅读
        value: 课程讲义第 2 节
  - kind: break
    date: 2026-10-01
    title: 国庆节假期 — 停课
---
本页面会持续更新课程资料与教学安排。
\`\`\`

- [ ] **Step 3: Validate the new frontmatter.**

Run: \`npm run build\`

Expected: the build has no collection-schema error.

- [ ] **Step 4: Commit this task.**

\`\`\`bash
git add src/content/config.ts src/content/courses src/content/lectures src/content/assignments src/content/events src/content/announcements
git commit -m "Define Astro course content"
\`\`\`

### Task 2: Render course pages and Schedule

**Files:**
- Modify: \`src/pages/index.astro\`
- Create: \`src/pages/courses/[slug].astro\`, \`src/components/Schedule.astro\`

- [ ] **Step 1: Render the course index.**

\`\`\`astro
---
import { getCollection } from 'astro:content';
import Default from '../layouts/Default.astro';
const courses = await getCollection('courses');
---
<Default title="课程主页">
  <h1>课程主页</h1>
  <ul class="course-list">
    {courses.map((course) => <li>
      <a href={\`\${import.meta.env.BASE_URL}courses/\${course.slug}/\`}>{course.data.title}</a>
      <span>{course.data.semester}</span><span>{course.data.instructor}</span>
    </li>)}
  </ul>
</Default>
\`\`\`

- [ ] **Step 2: Add the static route.**

\`\`\`astro
---
import { getCollection, render, type CollectionEntry } from 'astro:content';
import Default from '../../layouts/Default.astro';
import Schedule from '../../components/Schedule.astro';
export async function getStaticPaths() {
  return (await getCollection('courses')).map((course) => ({ params: { slug: course.slug }, props: { course } }));
}
const { course } = Astro.props as { course: CollectionEntry<'courses'> };
const { Content } = await render(course);
---
<Default title={\`\${course.data.title} · \${course.data.semester}\`}>
  <p class="course-back"><a href={import.meta.env.BASE_URL}>← 所有课程</a></p>
  <h1>{course.data.title}</h1>
  <p class="course-meta">{course.data.semester} · {course.data.instructor}</p>
  <article class="course-overview"><Content /></article>
  <h2>Schedule</h2><Schedule entries={course.data.schedule} />
</Default>
\`\`\`

- [ ] **Step 3: Render lessons, holidays, and only provided resources in \`Schedule.astro\`.**

\`\`\`astro
---
import type { CollectionEntry } from 'astro:content';
type Entry = CollectionEntry<'courses'>['data']['schedule'][number];
const { entries } = Astro.props as { entries: Entry[] };
const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' }).format(date);
const resources = [['slides', 'Slides', 'fas fa-file-pdf'], ['notes', 'Notes', 'fas fa-file-alt'], ['video', 'Video', 'fas fa-video']] as const;
---
<div class="schedule-wrap"><table class="schedule">
  <thead><tr><th>Date</th><th>Topic</th><th>Slides</th><th>Notes</th><th>Video</th></tr></thead>
  <tbody>{entries.map((entry) => entry.kind === 'break' ? (
    <tr class="schedule-break"><td colspan="5">{formatDate(entry.date)}　<em>{entry.title}</em></td></tr>
  ) : (<tr><td>{formatDate(entry.date)}</td><td>
    <strong>{entry.number && \`#\${String(entry.number).padStart(2, '0')}: \`}{entry.topic}</strong>
    {entry.details.map((item) => <div class="schedule-detail"><span>{item.label}:</span> {item.href ? <a href={item.href}>{item.value}</a> : item.value}</div>)}
  </td>{resources.map(([key, label, icon]) => <td class="schedule-resource">
    {entry[key] && <a href={entry[key]} title={label} aria-label={label}><i class={icon} aria-hidden="true" /></a>}
  </td>)}</tr>))}</tbody>
</table></div>
\`\`\`

- [ ] **Step 4: Build-check the generated paths.**

Run: \`npm run build\`

Expected: output contains \`/index.html\` and \`/courses/real-analysis-2026-fall/index.html\`; the two sample rows have blank resource cells, not empty icon links.

- [ ] **Step 5: Commit this task.**

\`\`\`bash
git add src/pages/index.astro src/pages/courses/[slug].astro src/components/Schedule.astro
git commit -m "Add multi-course schedule pages"
\`\`\`

### Task 3: Simplify the shared UI

**Files:**
- Modify: \`src/layouts/Default.astro\`, \`src/styles/main.css\`
- Delete: \`src/layouts/Home.astro\`, \`src/layouts/Page.astro\`, \`src/components/Header.astro\`, \`src/components/Nav.astro\`, \`src/components/Footer.astro\`, \`src/data/site.ts\`, \`src/data/nav.yml\`

- [ ] **Step 1: Replace \`Default.astro\` with one Chinese document shell.**

\`\`\`astro
---
import '../styles/main.css';
export interface Props { title?: string; }
const { title } = Astro.props;
const pageTitle = title ? \`\${title} | 杭州师范大学课程\` : '杭州师范大学课程';
---
<!doctype html><html lang="zh-CN"><head>
  <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{pageTitle}</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous" />
</head><body><main class="site-shell"><slot /></main></body></html>
\`\`\`

- [ ] **Step 2: Replace the copied Jekyll CSS with these essential rules.**

\`\`\`css
:root { color: #1f2933; background: #fff; font-family: Georgia, 'Noto Serif SC', serif; }
body { margin: 0; font-size: 18px; line-height: 1.6; }
.site-shell { max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
h1, h2, strong, th { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
h1 { margin: 0 0 .25rem; font-size: 2rem; } h2 { margin: 2.5rem 0 1rem; font-size: 1.5rem; }
a { color: #b91c1c; }.course-list { padding: 0; list-style: none; }
.course-list li { display: grid; grid-template-columns: minmax(12rem, 1fr) auto auto; gap: 1rem; padding: .55rem 0; border-bottom: 1px solid #e5e7eb; }
.course-list a { font-weight: 700; }.course-meta, .course-back { color: #5b6570; }
.schedule-wrap { overflow-x: auto; }.schedule { width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; }
.schedule th { padding: .45rem .7rem; border-bottom: 3px solid #29323a; text-align: left; }.schedule td { padding: .8rem .7rem; vertical-align: top; }
.schedule tbody tr:nth-child(odd) { background: #eef0f2; }.schedule-detail { margin-top: .25rem; }.schedule-detail span { font-weight: 600; }
.schedule-resource { width: 1%; text-align: center; }.schedule-resource a { color: #d00000; font-size: 1.35rem; }.schedule-break td { background: #dcebd5; font-weight: 600; }
@media (max-width: 640px) { body { font-size: 16px; }.site-shell { padding: 2rem 1rem; }.course-list li { grid-template-columns: 1fr; gap: .1rem; }.schedule { min-width: 640px; } }
\`\`\`

- [ ] **Step 3: Build-check removed imports.**

Run: \`npm run build\`

Expected: there are no unresolved imports for \`Header\`, \`Nav\`, \`Footer\`, \`site\`, or \`loadYaml\`.

- [ ] **Step 4: Commit this task.**

\`\`\`bash
git add src/layouts/Default.astro src/styles/main.css src/layouts/Home.astro src/layouts/Page.astro src/components/Header.astro src/components/Nav.astro src/components/Footer.astro src/data/site.ts src/data/nav.yml
git commit -m "Simplify course site layout"
\`\`\`

### Task 4: Remove duplicate templates and verify the Astro-only result

**Files:**
- Delete Astro legacy pages: \`src/pages/lectures.astro\`, \`src/pages/schedule.astro\`, \`src/pages/assignments.astro\`, \`src/pages/assignments/[slug].astro\`, \`src/pages/materials.astro\`, \`src/pages/policy.astro\`
- Delete Astro legacy components: \`src/components/Announcements.astro\`, \`src/components/EmbedPdf.astro\`, \`src/components/Image.astro\`, \`src/components/LatePolicy.astro\`, \`src/components/LectureItem.astro\`, \`src/components/LectureLinks.astro\`, and all five \`ScheduleRow*.astro\` files
- Delete: \`src/lib/utils.ts\`, \`src/data/people.yml\`, \`src/data/previous_offering.yml\`, \`src/data/late_policy.yml\`
- Delete Jekyll source: \`_announcements/\`, \`_assignments/\`, \`_css/\`, \`_data/\`, \`_events/\`, \`_images/\`, \`_includes/\`, \`_layouts/\`, \`_lectures/\`, \`_sass/\`, \`static_files/\`, \`_config.yml\`, \`Gemfile\`, \`Gemfile.lock\`, \`assignments.md\`, \`index.md\`, \`lectures.md\`, \`materials.md\`, \`project.md\`, \`schedule.md\`

- [ ] **Step 1: Search every remaining import before deletion.**

Run: \`rg "(lectures|assignments|announcements|ScheduleRow|LectureItem|LectureLinks|loadYaml|site\\.ts)" src\`

Expected: only paths named for deletion match.

- [ ] **Step 2: Delete only the named legacy paths with \`git rm\`; preserve \`package.json\`, \`astro.config.mjs\`, \`src/\`, \`public/\`, the design/spec documents, and existing user-owned files.**

Run: one explicit \`git rm\` command for each path group above, with no glob that reaches outside the repository.

Expected: \`git status --short\` shows deletions only for listed legacy files.

- [ ] **Step 3: Run the final validation.**

Run: \`npm run build; git diff --check; git status --short\`

Expected: the build succeeds, diff whitespace check is silent, and no Jekyll source or legacy Astro module remains.

- [ ] **Step 4: Commit this task.**

\`\`\`bash
git add -A
git commit -m "Remove legacy Jekyll course template"
\`\`\`

## Plan self-review

- Spec coverage: Tasks 1–2 provide course data, a multi-course index, five Schedule columns, optional resources, and holiday rows. Task 3 supplies the narrow document styling. Task 4 removes the redundant Jekyll and old Astro template code.
- Placeholder scan: no unresolved work markers or unspecified implementation step remains.
- Type consistency: \`kind\`, \`details\`, \`slides\`, \`notes\`, and \`video\` are defined in Task 1 and consumed with identical names in Task 2.
