export function scrollDestination(top: number, height: number, viewport: number) {
  return Math.max(0, Math.min(top, Math.max(0, height - viewport)));
}

export function scrollDuration(distance: number) {
  return Math.min(.95, Math.max(.45, Math.abs(distance) / 4200));
}

export function sectionFromHash(hash: string, doc: Document) {
  try {
    const target = doc.getElementById(decodeURIComponent(hash.replace(/^#/, '')));
    return target?.closest<HTMLElement>('.chapter') || target;
  } catch { return null; }
}
