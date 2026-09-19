const assignmentPattern = /^([^/]+)\/hw([1-9]\d*)(-solution)?$/;

/**
 * @typedef {{ courseSlug: string, fileSlug: string, number: number, isSolution: boolean }} Assignment
 */

/** @returns {Assignment | undefined} */
export function parseAssignmentSlug(slug) {
  const match = assignmentPattern.exec(slug);
  if (!match) return undefined;

  return {
    courseSlug: match[1],
    fileSlug: `hw${match[2]}${match[3] ?? ''}`,
    number: Number(match[2]),
    isSolution: Boolean(match[3]),
  };
}

/** @param {Array<{ slug: string }>} entries */
export function getAdjacentAssignments(entries, currentSlug) {
  const current = parseAssignmentSlug(currentSlug);
  if (!current) return { previous: undefined, next: undefined };

  const assignments = entries
    .flatMap(({ slug }) => {
      const assignment = parseAssignmentSlug(slug);
      return assignment?.courseSlug === current.courseSlug ? [assignment] : [];
    })
    .sort((a, b) => a.number - b.number || Number(a.isSolution) - Number(b.isSolution));
  const index = assignments.findIndex((assignment) => assignment.fileSlug === current.fileSlug);

  return {
    previous: index > 0 ? assignments[index - 1] : undefined,
    next: index >= 0 && index < assignments.length - 1 ? assignments[index + 1] : undefined,
  };
}
