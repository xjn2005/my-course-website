import assert from 'node:assert/strict';
import test from 'node:test';
import { getAdjacentAssignments, parseAssignmentSlug } from '../src/lib/assignment.mjs';

test('parses numbered assignment and solution files', () => {
  assert.deepEqual(parseAssignmentSlug('os-2026-fall/hw2'), {
    courseSlug: 'os-2026-fall',
    fileSlug: 'hw2',
    number: 2,
    isSolution: false,
  });
  assert.equal(parseAssignmentSlug('os-2026-fall/hw2-solution')?.isSolution, true);
});

test('rejects non-homework filenames', () => {
  assert.equal(parseAssignmentSlug('os-2026-fall/notes'), undefined);
});

test('finds adjacent assignments and solutions within one course', () => {
  const entries = [
    { slug: 'analysis/hw2-solution' },
    { slug: 'other/hw1' },
    { slug: 'analysis/hw1-solution' },
    { slug: 'analysis/hw1' },
    { slug: 'analysis/hw2' },
  ];

  assert.deepEqual(getAdjacentAssignments(entries, 'analysis/hw1'), {
    previous: undefined,
    next: { courseSlug: 'analysis', fileSlug: 'hw1-solution', number: 1, isSolution: true },
  });
  assert.deepEqual(getAdjacentAssignments(entries, 'analysis/hw1-solution'), {
    previous: { courseSlug: 'analysis', fileSlug: 'hw1', number: 1, isSolution: false },
    next: { courseSlug: 'analysis', fileSlug: 'hw2', number: 2, isSolution: false },
  });
});
