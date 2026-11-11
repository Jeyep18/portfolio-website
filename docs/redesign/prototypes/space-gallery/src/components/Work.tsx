import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Reveal, useMotion } from '../motion';
import { Modal } from './Modal';
import { ParticleHeading } from './ParticleHeading';

const featured = [
  {
    id: 'cherit', name: 'CherIt', kind: 'Web application · Hackathon prototype', stack: 'React · TypeScript',
    description: 'A lesson-pack library for Bicol public-school teachers.',
    role: 'I contributed website direction, feature design, QA, and the presentation as part of a three-person team.',
    image: 'assets/cherit-home.jpg', alt: 'CherIt’s lesson-pack catalogue with school-level filters and fictional lesson packs.',
    compare: 'assets/cherit-search.jpg', compareAlt: 'CherIt’s search dialog with Class and subject filters.',
    labels: ['Catalogue', 'Search filters'], href: 'cherit.html', action: 'Case study',
    notes: 'Teachers can start with a school level. The search dialog groups filters for class, subject, and classroom needs when they want to narrow the results.',
    credit: 'I contributed website direction and feature design alongside JP, plus QA and presentation. JP led technical work and CJ led design and creative work. Architecture and features were shared team work. The browser-local prototype uses fictional catalogue data and simulated personas.'
  },
  {
    id: 'bagyong', name: 'Bagyong Bahay', kind: 'Game · Private Windows test candidate', stack: 'Godot',
    description: 'A Filipino storm-preparation game about decisions under limited time and money.',
    role: 'I led the team and contributed to the game’s architecture, map modeling, and visual work.',
    image: 'assets/bagyong-house.webp', alt: 'The intact household in Bagyong Bahay with warm lighting.',
    compare: 'assets/bagyong-storm.webp', compareAlt: 'The household environment after storm damage in Bagyong Bahay.',
    labels: ['Normal', 'Storm-damaged'], href: 'archive.html#bagyong-bahay', action: 'Project notes',
    notes: 'The normal and damaged scenes show how the same space changes through lighting, props, and structural damage. They are two authored states of the game environment.',
    credit: 'I led the project and worked on architecture, map modeling, graphics, and visual direction. Teammates handled parts of the code and implementation. Development used substantial AI assistance. The Windows build is a private test candidate.'
  }
];

export function Work() {
  const { motion, ready } = useMotion();
  const [active, setActive] = useState(0);
  const [quick, setQuick] = useState(false);
  const [image, setImage] = useState(0);
  const gallery = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const selected = featured[active];
  useEffect(() => {
    const hash = () => { if (location.hash === '#bagyong') setActive(1); };
    hash();
    addEventListener('hashchange', hash);
    return () => removeEventListener('hashchange', hash);
  }, []);
  useEffect(() => {
    if (!motion || !gallery.current) return;
    const panel = gallery.current.querySelector('[data-active=true]');
    const animation = gsap.fromTo(panel, { opacity: .4, x: 18 }, { opacity: 1, x: 0, duration: .35, clearProps: 'all' });
    return () => { animation.kill(); gsap.set(panel, { clearProps: 'opacity,transform' }); };
  }, [active, motion]);
  return <section className="work chapter shell" id="work" aria-labelledby="work-title">
    <div className="section-heading"><div><p className="eyebrow">A few things I’ve helped build</p><ParticleHeading id="work-title">Selected work<span>.</span></ParticleHeading></div>
      <a className="button button-quiet" href="archive.html">View all projects ↗</a></div>
    <Reveal><div className="project-picker" role="group" aria-label="Choose a featured project" hidden={!ready}>
      {featured.map((project, index) => <button key={project.id} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>{project.name}</button>)}
    </div></Reveal>
    <Reveal delay={.45}><div ref={gallery} className="featured" data-ready={ready || undefined}
      onPointerDown={e => { if (e.pointerType === 'touch' && !(e.target as Element).closest('a,button')) swipe.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={e => { if (swipe.current !== null) {
        const distance = e.clientX - swipe.current.x;
        const vertical = e.clientY - swipe.current.y;
        if (Math.abs(distance) > 70 && Math.abs(distance) > Math.abs(vertical) * 1.5) setActive(distance < 0 ? 1 : 0);
        swipe.current = null;
      } }} onPointerCancel={() => { swipe.current = null; }}>
      {featured.map((project, index) => <article className="project-panel" id={project.id} key={project.id}
        data-active={index === active} hidden={ready && index !== active}>
        <figure className={'project-media ' + project.id + '-media'}>
          <img className="project-image" src={project.image} width={index ? 800 : 1440} height={index ? 450 : 1000} alt={project.alt} loading="lazy" />
          {index === 0 && <img className="phone-image" src="assets/cherit-mobile.jpg" width="390" height="900" alt="CherIt’s responsive mobile catalogue." />}
        </figure>
        <div className="project-copy"><p className="eyebrow">{project.kind}</p><h3>{project.name}</h3>
          <p className="project-description">{project.description}</p><p className="project-role">{project.role}</p>
          <p className="project-stack">{project.stack}</p><div className="project-actions">
            <button hidden={!ready} type="button" className="button button-light" aria-haspopup="dialog" onClick={() => { setImage(0); setQuick(true); }}>Quick look ↗</button>
            <a className="text-link" href={project.href}>{project.action} ↗</a>
          </div>
        </div>
      </article>)}
    </div></Reveal>
    <Modal title={selected.name} open={quick} onClose={() => setQuick(false)}>
      <div className="quick-grid"><div><div className="image-picker" role="group" aria-label="Compare project images">
        {selected.labels.map((label, index) => <button key={label} aria-pressed={index === image} onClick={() => setImage(index)}>{label}</button>)}
      </div><img className="quick-image" src={image ? selected.compare : selected.image} alt={image ? selected.compareAlt : selected.alt} /></div>
        <div className="quick-story"><h3>{selected.labels[image]}</h3><p>{selected.notes}</p><h3>My role</h3><p>{selected.credit}</p><a className="text-link" href={selected.href}>Read the project story ↗</a></div>
      </div>
    </Modal>
  </section>;
}
