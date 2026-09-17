const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function coursePath(slug: string, section = '') {
  return `${base}/courses/${slug}${section ? `/${section}` : ''}/`;
}
