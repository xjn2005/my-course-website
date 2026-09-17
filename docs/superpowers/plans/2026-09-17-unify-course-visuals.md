# 统一课程视觉框架 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\`- [ ]\`) syntax for tracking.

**Goal:** Give every course page one stable header, active navigation, Chinese-English font hierarchy, and a warm white/red Schedule palette.

**Architecture:** Replace repeated back links, titles, metadata, and \`CourseNav\` with one \`CourseHeader\` component driven by the course entry and current section. CSS supplies the native-font stacks and all page-state colors; no external font or new dependency is added.

**Tech Stack:** Astro, TypeScript, existing Font Awesome, CSS system-font stacks.

---

### Task 1: Build one shared course header

**Files:**
- Create: \`src/components/CourseHeader.astro\`
- Delete: \`src/components/CourseNav.astro\`
- Modify: all five routes under \`src/pages/courses/\`

- [ ] **Step 1: Add the reusable header with an explicit current section.**

\`\`\`astro
---
import type { CollectionEntry } from 'astro:content';
import { coursePath } from '../lib/course-path';
type Section = 'home' | 'schedule' | 'materials' | 'assignments';
const { course, section } = Astro.props as {
  course: CollectionEntry<'courses'>; section: Section;
};
const links = [
  { section: 'home', label: '课程主页', href: coursePath(course.slug) },
  { section: 'schedule', label: 'Schedule', href: coursePath(course.slug, 'schedule') },
  { section: 'materials', label: 'Materials', href: coursePath(course.slug, 'materials') },
  { section: 'assignments', label: 'Assignments', href: coursePath(course.slug, 'assignments') },
];
---
<header class="course-header">
  <p class="course-back"><a href={import.meta.env.BASE_URL}>← 所有课程</a></p>
  <h1>{course.data.title}</h1>
  <p class="course-meta">{course.data.semester} · {course.data.instructor}</p>
  <nav aria-label="课程导航"><ul class="course-nav">
    {links.map((link) => <li><a href={link.href} aria-current={link.section === section ? 'page' : undefined}>{link.label}</a></li>)}
  </ul></nav>
</header>
\`\`\`

- [ ] **Step 2: Replace every page-specific title/navigation block.**

Each route passes the matching section: \`home\`, \`schedule\`, \`materials\`, or \`assignments\`; assignment detail also passes \`assignments\`. Keep the existing page body after the component.

- [ ] **Step 3: Build-check the generated active state.**

Run: \`npm run build; rg -q 'aria-current="page"' dist/courses/real-analysis-2026-fall/schedule/index.html\`

Expected: build succeeds; every nested page includes title, semester, instructor, and one active navigation item.

### Task 2: Apply type and color hierarchy

**Files:**
- Modify: \`src/styles/main.css\`

- [ ] **Step 1: Use native Chinese-aware font stacks and the active-navigation state.**

\`\`\`css
:root { color: #172033; background: #fff; font-family: 'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', STSong, SimSun, serif; }
h1, h2, strong, th, .course-nav, .assignment-list { font-family: 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif; }
.course-header { margin-bottom: 2.5rem; }
.course-nav a[aria-current='page'] { color: #a61b29; border-bottom: 3px solid #a61b29; }
\`\`\`

- [ ] **Step 2: Replace cool gray and green Schedule colors with warm whites and red.**

\`\`\`css
.schedule tbody tr:nth-child(odd) { background: #fcf8f8; }
.schedule td { border-bottom: 1px solid #f0e2e2; }
.schedule-resource a, .assignment-icons a { color: #a61b29; }
.schedule-break td { background: #f7e5e5; color: #7f1d2d; }
\`\`\`

- [ ] **Step 3: Verify the visual selectors.**

Run: \`npm run build; rg -q 'aria-current="page"' dist/courses/real-analysis-2026-fall/materials/index.html; git diff --check\`

Expected: build succeeds and generated pages preserve the active-navigation marker.

### Task 3: Commit the visual consistency pass

**Files:**
- Modify: files from Tasks 1–2

- [ ] **Step 1: Commit only the shared-header and style changes.**

\`\`\`bash
git add src/components/CourseHeader.astro src/components/CourseNav.astro src/pages/courses src/styles/main.css
git commit -m "Unify course page design"
\`\`\`

## Plan self-review

- Coverage: every course page receives one title/meta/navigation frame and a visible active state; fonts and Schedule colors use the same white/red visual system.
- Scope: page content, routing, Materials and Assignments behavior remain unchanged.
- Consistency: the \`section\` union drives both active navigation and the five page call sites.

