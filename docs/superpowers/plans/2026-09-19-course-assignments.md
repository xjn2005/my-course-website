# Course Assignments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate Markdown-authored assignment and solution webpages, embedded at the existing Assignments position of every course page.

**Architecture:** Course content becomes MDX so its `## Assignments` section can render an `Assignments` Astro component. Assignment files live under a directory named for their course slug; a small shared parser derives the assignment number and solution state from the filename, which both the list component and static detail route use.

**Tech Stack:** Astro 4, `@astrojs/mdx` 3, Astro content collections, TypeScript, Node built-in test runner.

---

## File structure

- Modify: `package.json`, `package-lock.json`, `astro.config.mjs` — enable the compatible official MDX integration and test command.
- Modify: `src/content/config.ts` — register the Markdown assignments collection.
- Create: `src/lib/assignment.mjs` — parse a nested assignment slug.
- Modify: `src/lib/course-path.ts` — build assignment URLs with the existing base-path helper.
- Create: `test/assignment.test.mjs` — guard the filename convention with Node assertions.
- Create: `src/components/Assignments.astro` — render the current course’s assignment list or its empty state.
- Create: `src/pages/courses/[course]/assignments/[assignment].astro` — statically render each assignment and solution file.
- Modify: `src/pages/courses/[slug].astro` — provide the MDX `Assignments` component while rendering a course.
- Rename and modify: `src/content/courses/*.md` to `.mdx` — retain content and replace each hand-written assignment section with `<Assignments />`.
- Create: `src/content/assignments/real-analysis-2026-fall/hw1.md` — preserve the existing real-analysis homework text as the first generated assignment page.

### Task 1: Add the MDX and assignments foundations

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Modify: `src/content/config.ts`

- [ ] **Step 1: Install the Astro-4-compatible MDX integration**

Run: `npm install @astrojs/mdx@^3`

Expected: `package.json` and lockfile contain `@astrojs/mdx`; its peer dependency accepts Astro 4.16.

- [ ] **Step 2: Enable MDX and the empty assignments collection**

```ts
// astro.config.mjs
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  // existing site, base, trailingSlash, and markdown options remain unchanged
});

// src/content/config.ts
const assignments = defineCollection({
  type: 'content',
  schema: z.object({}),
});

export const collections = { courses, guidelines, assignments };
```

- [ ] **Step 3: Confirm MDX can be discovered before adding page logic**

Run: `npm run build`

Expected: build succeeds with the existing course collection after its files are migrated in Task 4.

### Task 2: Create and test the shared filename convention

**Files:**
- Create: `src/lib/assignment.mjs`
- Modify: `src/lib/course-path.ts`
- Create: `test/assignment.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing Node test**

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { parseAssignmentSlug } from '../src/lib/assignment.mjs';

test('parses numbered assignment and solution files', () => {
  assert.deepEqual(parseAssignmentSlug('os-2026-fall/hw2'), {
    courseSlug: 'os-2026-fall', fileSlug: 'hw2', number: 2, isSolution: false,
  });
  assert.equal(parseAssignmentSlug('os-2026-fall/hw2-solution')?.isSolution, true);
});

test('rejects non-homework filenames', () => {
  assert.equal(parseAssignmentSlug('os-2026-fall/notes'), undefined);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/assignment.test.mjs`

Expected: FAIL because `src/lib/assignment.mjs` does not exist.

- [ ] **Step 3: Implement the minimal parser and URL helper**

```ts
const assignmentPattern = /^([^/]+)\/hw([1-9]\d*)(-solution)?$/;

export function parseAssignmentSlug(slug: string) {
  const match = assignmentPattern.exec(slug);
  if (!match) return undefined;
  return { courseSlug: match[1], fileSlug: `hw${match[2]}${match[3] ?? ''}`, number: Number(match[2]), isSolution: Boolean(match[3]) };
}

```

Add the one-line formatter to the existing path module:

```ts
export function assignmentPath(courseSlug: string, fileSlug: string) {
  return coursePath(courseSlug, `assignments/${fileSlug}`);
}
```

- [ ] **Step 4: Add the native test command and verify it passes**

```json
"test": "node --test"
```

Run: `npm test`

Expected: both parser tests PASS.

### Task 3: Render and route assignments

**Files:**
- Create: `src/components/Assignments.astro`
- Create: `src/pages/courses/[course]/assignments/[assignment].astro`
- Modify: `src/pages/courses/[slug].astro`

- [ ] **Step 1: Render only valid files for the current dynamic course**

`Assignments.astro` reads `Astro.params.slug`, filters `getCollection('assignments')` with `parseAssignmentSlug`, uses `assignmentPath()` from `course-path.ts`, sorts by numeric homework number, and groups each number into a question and optional solution. It renders `- 暂未发布作业。` with no valid entries; otherwise each row is `[作业 N](...) | [答案](...)`, replacing a missing solution link with `答案待发布`.

- [ ] **Step 2: Make the MDX marker available to each course document**

```astro
---
import Assignments from '../../components/Assignments.astro';
// existing imports and course lookup remain unchanged
---

<article class="article-content"><Content components={{ Assignments }} /></article>
```

- [ ] **Step 3: Add the static assignment detail route**

`[assignment].astro` maps every valid assignments collection entry in `getStaticPaths()` to `course` and `assignment` parameters. It renders the entry with `Default`, shows a backlink to its course, uses `作业 N` or `作业 N 答案` as a fallback heading/title, and renders `<Content />` inside `article.article-content`.

- [ ] **Step 4: Check routes with fixture content**

Create `src/content/assignments/real-analysis-2026-fall/hw1.md` with the existing real-analysis homework instructions. Run: `npm run build`.

Expected: build emits `/courses/real-analysis-2026-fall/assignments/hw1/`, and the real-analysis course page renders a live 作业 1 link plus `答案待发布`.

### Task 4: Migrate existing courses without changing their prose

**Files:**
- Rename and modify: every `src/content/courses/*.md`

- [ ] **Step 1: Rename course files from `.md` to `.mdx`**

Run `git mv` for every course file, preserving existing frontmatter and all non-Assignments text, including the user’s uncommitted real-analysis and regression changes.

- [ ] **Step 2: Replace each existing Assignments body with the marker**

```mdx
## Assignments

<Assignments />
```

For real analysis, move the existing 作业 1 wording into `hw1.md`; other courses start in the automatic empty state.

- [ ] **Step 3: Verify the complete static site**

Run: `npm test && npm run build`

Expected: native parser tests pass; every course and guideline builds; the real-analysis assignment route appears; no course contains a duplicate manual assignment list.

- [ ] **Step 4: Commit the feature separately**

Run: `git add package.json package-lock.json astro.config.mjs src/content/config.ts src/lib/assignment.mjs src/lib/course-path.ts test/assignment.test.mjs src/components/Assignments.astro src/pages/courses/[slug].astro src/pages/courses/[course]/assignments/[assignment].astro src/content/courses src/content/assignments && git commit -m "Add Markdown course assignments"`

Expected: one feature commit, excluding the user’s unrelated layout, homepage, and course edits not required by the migration.

## Plan self-review

- Spec coverage: Tasks 1–4 cover MDX course markers, nested Markdown assignment files, generated paired links, empty/missing-answer states, static detail pages, and the requested retained section order.
- Placeholder scan: no open decisions or deferred implementation steps remain.
- Type consistency: `parseAssignmentSlug()` supplies `courseSlug`, `fileSlug`, `number`, and `isSolution` to both list and detail route; `assignmentPath()` in `course-path.ts` is the sole route formatter.
