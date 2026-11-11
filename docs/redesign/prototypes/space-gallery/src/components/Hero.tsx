import { useEffect, useRef } from 'react';
import { createEclipse } from '../effects/eclipse';
import { ParticleHeading } from './ParticleHeading';
import { Reveal } from '../motion';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (ref.current) return createEclipse(ref.current); }, []);
  return <section ref={ref} className="hero chapter" aria-labelledby="name">
    <div className="eclipse-scene" id="eclipse-scene" aria-hidden="true">
      <div className="eclipse-still" />
      <canvas id="eclipse" data-state="static" data-frames="0" />
      <canvas id="hero-stars" />
    </div>
    <div className="hero-content shell"><div className="hero-copy">
      <p className="eyebrow">Frontend & web development</p>
      <ParticleHeading as="h1" id="name">John Francis<br />Espiritu<span>.</span></ParticleHeading>
      <Reveal delay={.5}><p className="hero-intro">I’m a Computer Science student focused on frontend development. I design interfaces and work with teams to turn ideas into software people can use.</p>
      <div className="hero-actions">
        <a className="button button-light" href="#work">Explore my work ↓</a>
        <span className="availability"><i />Open to internships</span>
      </div></Reveal>
    </div></div>
    <a className="hero-scroll" href="#work" aria-label="Scroll to selected work">↓</a>
  </section>;
}
