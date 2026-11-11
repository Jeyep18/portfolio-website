import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import AnimatedContent from './effects/AnimatedContent';
import { scrollDestination, scrollDuration, sectionFromHash } from './navigation';

const MotionContext = createContext({
  motion: false, ready: false, inspecting: false,
  setInspecting: (_value: boolean) => {}, toggle: () => {}
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motion, setMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const query = new URLSearchParams(location.search).get('motion');
    let overridden = query === 'on' || query === 'off';
    const apply = () => { if (!overridden) setMotion(!preference.matches); };
    setMotion(overridden ? query === 'on' : !preference.matches);
    setReady(true);
    const override = () => { overridden = true; };
    document.addEventListener('motionoverride', override);
    preference.addEventListener('change', apply);
    return () => {
      preference.removeEventListener('change', apply);
      document.removeEventListener('motionoverride', override);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
    document.dispatchEvent(new Event('motionchange'));
  }, [motion]);
  useEffect(() => { document.dispatchEvent(new Event('inspectionchange')); }, [inspecting]);
  return <MotionContext.Provider value={{ motion, ready, inspecting, setInspecting, toggle: () => {
    document.dispatchEvent(new Event('motionoverride'));
    setMotion(value => !value);
  } }}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);

export function Reveal({ children, className = '', delay = .35 }: { children: ReactNode; className?: string; delay?: number }) {
  const { motion } = useMotion();
  return <AnimatedContent className={className} motionEnabled={motion} distance={motion ? 16 : 0}
    duration={motion ? .5 : 0} delay={motion ? delay : 0} initialOpacity={motion ? .2 : 1} threshold={.08} once>
    {children}
  </AnimatedContent>;
}

export function usePageTransitions() {
  const { motion, ready } = useMotion();
  const positioned = useRef(false);
  useEffect(() => {
    if (!ready) return;
    const page = document.querySelector('.page-content');
    let scroll: gsap.core.Tween | undefined;
    let disposed = false;
    const oldRestoration = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    const stop = () => {
      scroll?.kill();
      document.documentElement.dataset.navigation = 'idle';
    };
    const visitSection = (hash: string, animate: boolean, focus = false) => {
      const target = sectionFromHash(hash || '#main', document);
      if (!target) return;
      stop();
      const top = scrollDestination(target.getBoundingClientRect().top + window.scrollY,
        document.documentElement.scrollHeight, window.innerHeight);
      const finish = () => {
        document.documentElement.dataset.navigation = 'idle';
        if (!focus) return;
        const previous = target.getAttribute('tabindex');
        target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
        target.addEventListener('blur', () => {
          if (previous === null) target.removeAttribute('tabindex'); else target.setAttribute('tabindex', previous);
        }, { once: true });
      };
      if (!animate || Math.abs(top - window.scrollY) < 2) { window.scrollTo({ top, behavior: 'instant' }); finish(); return; }
      const position = { y: window.scrollY };
      document.documentElement.dataset.navigation = 'scrolling';
      scroll = gsap.to(position, { y: top, duration: scrollDuration(top - position.y), ease: 'power2.inOut',
        onUpdate: () => window.scrollTo({ top: position.y, behavior: 'instant' }), onComplete: finish });
    };
    const enter = () => {
      gsap.set(page, { clearProps: 'opacity,transform' });
      if (motion) gsap.fromTo(page, { opacity: .4, y: 8 }, { opacity: 1, y: 0, duration: .24, clearProps: 'all' });
    };
    document.fonts.ready.then(() => {
      if (disposed || positioned.current) return;
      positioned.current = true;
      if (location.hash) visitSection(location.hash, false);
      enter();
    });
    const navigate = (event: MouseEvent) => {
      const target = event.target as Element;
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey || !link || link.hasAttribute('download') || link.target === '_blank') return;
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      const samePage = url.pathname.replace(/index\.html$/, '') === location.pathname.replace(/index\.html$/, '') && url.search === location.search;
      if (samePage) {
        if (!url.hash || !sectionFromHash(url.hash, document)) return;
        event.preventDefault();
        gsap.killTweensOf(page);
        gsap.set(page, { clearProps: 'opacity,transform' });
        if (url.href !== location.href) history.pushState(null, '', url.href);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        visitSection(url.hash, motion, true);
        return;
      }
      if (!motion) return;
      event.preventDefault();
      gsap.to(page, { opacity: 0, y: -8, duration: .16, overwrite: true,
        onComplete: () => { location.href = url.href; } });
    };
    const back = () => visitSection(location.hash, motion);
    const interrupt = (event: KeyboardEvent) => {
      if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Escape',' '].includes(event.key)) stop();
    };
    document.addEventListener('click', navigate);
    addEventListener('popstate', back);
    addEventListener('wheel', stop, { passive: true });
    addEventListener('touchstart', stop, { passive: true });
    addEventListener('keydown', interrupt);
    addEventListener('pageshow', enter);
    return () => {
      document.removeEventListener('click', navigate);
      disposed = true; stop(); history.scrollRestoration = oldRestoration;
      removeEventListener('popstate', back);
      removeEventListener('wheel', stop);
      removeEventListener('touchstart', stop);
      removeEventListener('keydown', interrupt);
      removeEventListener('pageshow', enter);
      gsap.killTweensOf(page);
      gsap.set(page, { clearProps: 'opacity,transform' });
    };
  }, [motion, ready]);
}
