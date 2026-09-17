const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function sitePath(segment = '') {
  const normalized = segment.replace(/^\/+|\/+$/g, '');
  return `${base}${normalized ? `/${normalized}` : ''}/`;
}

export function coursePath(slug: string, section = '') {
  return sitePath(`courses/${slug}${section ? `/${section}` : ''}`);
}
