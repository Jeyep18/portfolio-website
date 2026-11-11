import { useEffect, useState } from 'react';
import { SpaceField } from './effects/SpaceField';
import { MotionProvider, useMotion, usePageTransitions } from './motion';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Tools, About } from './components/ToolsAbout';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Archive } from './components/Archive';
import { CaseStudy } from './components/CaseStudy';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';

function Page({ page }: { page: string }) {
  const home = page === 'index.html';
  const notFound = !['index.html', 'archive.html', 'cherit.html'].includes(page);
  const { motion, ready, toggle } = useMotion();
  const [active, setActive] = useState('');
  const [pastHero, setPastHero] = useState(!home);
  usePageTransitions();
  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    }, { rootMargin: '-20% 0px -45% 0px' });
    document.querySelectorAll('.chapter[id]').forEach(section => observer.observe(section));
    const hero = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), { threshold: .1 });
    const element = document.querySelector('.hero');
    if (element) hero.observe(element);
    return () => { observer.disconnect(); hero.disconnect(); };
  }, [home]);
  return <>
    <div className="ambient-background" aria-hidden="true" data-active={pastHero}>
      {ready && <SpaceField active={pastHero} />}
    </div>
    <a className="skip" href="#main">Skip to content</a>
    <Header home={home} notFound={notFound} active={active} />
    <div className="page-content">
      {home ? <main id="main"><Hero /><Work /><Tools /><Experience /><About /><Contact /></main>
        : page === 'archive.html' ? <Archive /> : notFound ? <NotFound /> : <CaseStudy />}
    </div>
    <button className="motion-toggle" type="button" hidden={!ready} onClick={toggle}>{motion ? 'Pause motion' : 'Enable motion'}</button>
  </>;
}

export function App({ page }: { page: string }) {
  return <MotionProvider><Page page={page} /></MotionProvider>;
}
