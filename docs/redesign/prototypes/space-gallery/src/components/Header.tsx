import { useEffect, useRef, useState } from 'react';
import { useMotion } from '../motion';

export function Header({ home, notFound, active }: { home: boolean; notFound: boolean; active: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const { motion } = useMotion();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; setScrolled(window.scrollY > 24); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', scroll); };
  }, []);
  const prefix = notFound ? '/' : home ? '' : './';
  const items = home ? ['work', 'tools', 'experience', 'about', 'contact'] : ['work', 'experience', 'contact'];
  useEffect(() => {
    const element = menu.current;
    if (!element) return;
    const summary = element.querySelector('summary')!;
    const panel = element.querySelector('nav')!;
    let animation: Animation | undefined;
    let generation = 0;
    let closing = false;
    const cancel = () => { generation++; animation?.cancel(); animation = undefined; };
    const close = (restore = false, immediate = false) => {
      if (!element.open || closing) return;
      if (restore) summary.focus({ preventScroll: true });
      const from = getComputedStyle(panel);
      const start = { opacity: from.opacity, transform: from.transform };
      cancel();
      if (!motion || immediate) { element.open = false; return; }
      closing = true;
      panel.inert = true;
      element.dataset.closing = 'true';
      const current = generation;
      animation = panel.animate([start, { opacity: 0, transform: 'translateY(-10px)' }],
        { duration: 160, easing: 'ease-in', fill: 'forwards' });
      void animation.finished.then(() => {
        if (generation !== current) return;
        element.open = false;
        closing = false;
        panel.inert = false;
        delete element.dataset.closing;
        cancel();
      }).catch(() => {});
    };
    const toggle = (event: MouseEvent) => {
      event.preventDefault();
      if (element.open && !closing) { close(); return; }
      cancel(); closing = false; panel.inert = false; delete element.dataset.closing;
      element.open = true;
      if (motion) animation = panel.animate([
        { opacity: 0, transform: 'translateY(-10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 220, easing: 'cubic-bezier(.2,.7,.2,1)' });
    };
    const select = (event: MouseEvent) => { if ((event.target as Element).closest('a')) close(true); };
    const blur = (event: FocusEvent) => {
      if (event.relatedTarget && !element.contains(event.relatedTarget as Node)) close();
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') close(true); };
    const outside = (event: PointerEvent) => { if (!element.contains(event.target as Node)) close(); };
    const breakpoint = matchMedia('(min-width: 681px)');
    const resize = () => {
      const header = element.closest('header');
      const focused = header?.contains(document.activeElement) ||
        (element.open && document.activeElement === document.body);
      cancel(); closing = false; panel.inert = false; delete element.dataset.closing;
      close(false, true);
      if (focused) header?.querySelector<HTMLAnchorElement>('.wordmark')?.focus({ preventScroll: true });
    };
    summary.addEventListener('click', toggle);
    panel.addEventListener('click', select);
    element.addEventListener('focusout', blur);
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    breakpoint.addEventListener('change', resize);
    return () => {
      cancel();
      if (closing) element.open = false;
      panel.inert = false; delete element.dataset.closing;
      summary.removeEventListener('click', toggle);
      panel.removeEventListener('click', select);
      element.removeEventListener('focusout', blur);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
      breakpoint.removeEventListener('change', resize);
    };
  }, [motion]);
  const links = items.map(id => <a key={id} href={prefix + '#' + id}
    aria-current={active === id ? 'location' : undefined}>{id[0].toUpperCase() + id.slice(1)}</a>);
  return <header className="site-header shell" data-scrolled={scrolled}>
    <a className="wordmark" href={home ? '#main' : prefix} aria-label="John Francis Espiritu, home">jfe<span>.</span></a>
    <nav className="desktop-navigation" aria-label="Main navigation">{links}</nav>
    <a className="button button-quiet header-resume" href={(notFound ? '/' : '') + 'assets/john-francis-espiritu-resume.pdf'} download>Résumé ↗</a>
    <details ref={menu} className="mobile-navigation">
      <summary aria-controls="mobile-links"><span className="menu-label">Menu</span><span className="menu-symbol" aria-hidden="true"><i /><i /></span></summary>
      <nav id="mobile-links" aria-label="Main navigation">
        <p className="mobile-nav-caption">Explore the portfolio</p>
        {links}
        <a className="mobile-archive-link" href={notFound ? '/archive.html' : 'archive.html'}>Project archive <span aria-hidden="true">↗</span></a>
        <a href={(notFound ? '/' : '') + 'assets/john-francis-espiritu-resume.pdf'} download>Download résumé <span aria-hidden="true">↓</span></a>
      </nav>
    </details>
  </header>;
}
