/** base 경로(/portforlio)를 붙인 내부 링크를 만든다. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path.startsWith('#')) return `${base}/${path}`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
