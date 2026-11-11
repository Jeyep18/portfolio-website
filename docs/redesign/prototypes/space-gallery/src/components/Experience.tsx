import { useEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { events, type Photo } from '../data';
import { Reveal, useMotion } from '../motion';
import { Modal } from './Modal';
import { ParticleHeading } from './ParticleHeading';

function PhotoRail({ photos, eventName }: { photos: Photo[]; eventName: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [viewing, setViewing] = useState<Photo | null>(null);
  const scrollingToSelection = useRef(false);
  const { motion } = useMotion();
  useEffect(() => {
    if (!motion || !rail.current) return;
    const element = rail.current;
    const animation = gsap.fromTo(element, { opacity: .4, y: 12 }, { opacity: 1, y: 0, duration: .4, clearProps: 'all' });
    return () => { animation.kill(); gsap.set(element, { clearProps: 'opacity,transform' }); };
  }, [motion]);
  const move = (index: number) => {
    const target = rail.current?.children[index] as HTMLElement | undefined;
    if (!target || !rail.current) return;
    setActive(index);
    const left = Math.min(target.offsetLeft, rail.current.scrollWidth - rail.current.clientWidth);
    scrollingToSelection.current = Math.abs(rail.current.scrollLeft - left) > 1;
    rail.current.scrollTo({ left, behavior: motion ? 'smooth' : 'instant' });
  };
  const syncSelection = () => {
    const element = rail.current;
    if (!element) return;
    const maxScroll = element.scrollWidth - element.clientWidth;
    const distances = [...element.children].map(child => Math.abs(Math.min((child as HTMLElement).offsetLeft, maxScroll) - element.scrollLeft));
    const closest = Math.min(...distances);
    setActive(previous => distances[previous] <= closest + 1 ? previous : distances.indexOf(closest));
  };
  if (!photos.length) return <div className="event-empty"><span aria-hidden="true">✧</span><p>Event photos pending</p><small>{eventName}</small></div>;
  return <div className="photo-gallery">
    <div ref={rail} className="photo-rail" aria-label={eventName + ' photo gallery'}
      onKeyDown={event => {
        const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
        if (!direction) return;
        event.preventDefault();
        const next = Math.max(0, Math.min(photos.length - 1, active + direction));
        (rail.current?.children[next] as HTMLElement)?.focus({ preventScroll: true });
        move(next);
      }}
      onPointerDown={() => { scrollingToSelection.current = false; }}
      onWheel={() => { scrollingToSelection.current = false; }}
      onScroll={() => { if (!scrollingToSelection.current) syncSelection(); }}
      onScrollEnd={() => { scrollingToSelection.current = false; syncSelection(); }}>
      {photos.map((photo, index) => <button className="photo-slide" key={photo.src} data-current={index === active}
        style={{ '--ratio': photo.width / photo.height } as CSSProperties}
        aria-label={'Open photo: ' + photo.alt} onClick={() => { setActive(index); setViewing(photo); }}>
        <img src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />
        <span className="photo-expand" aria-hidden="true">↗</span>
      </button>)}
    </div>
    <div className="photo-controls"><p aria-live="polite">{String(active + 1).padStart(2, '0')} <span>/ {String(photos.length).padStart(2, '0')}</span></p>
      <span className="photo-hint">Select a photo to explore</span>
      <div><button type="button" aria-label="Previous event photo" disabled={active === 0} onClick={() => move(active - 1)}>←</button>
        <button type="button" aria-label="Next event photo" disabled={active === photos.length - 1} onClick={() => move(active + 1)}>→</button></div>
    </div>
    <Modal title={eventName} open={Boolean(viewing)} onClose={() => setViewing(null)}>
      {viewing && <figure className="full-photo"><img src={viewing.src} width={viewing.width} height={viewing.height} alt={viewing.alt} /><figcaption>{viewing.alt}</figcaption></figure>}
    </Modal>
  </div>;
}

export function Experience() {
  const [active, setActive] = useState(0);
  const { ready } = useMotion();
  const event = events[active];
  return <section className="experience chapter shell" id="experience" aria-labelledby="experience-title" data-ready={ready || undefined}>
    <div><p className="eyebrow">Learning with people</p><ParticleHeading id="experience-title">Out of the classroom<span>.</span></ParticleHeading></div>
    <Reveal delay={.45}><div className="experience-layout">
      <ol className="timeline" aria-label="Experience timeline">
        {events.map((item, index) => <li key={item.id}>
          <details open={index === active}>
            <summary aria-controls={item.id} onClick={e => {
              if (ready) { e.preventDefault(); setActive(index); }
            }} onKeyDown={e => {
              const direction = { ArrowUp: -1, ArrowDown: 1 }[e.key];
              if (!direction) return;
              e.preventDefault();
              const next = (index + direction + events.length) % events.length;
              setActive(next);
              const summaries = e.currentTarget.closest('ol')?.querySelectorAll('summary');
              (summaries?.[next] as HTMLElement)?.focus();
            }}>
              <span className="timeline-year">{item.year}</span>
              <span>{item.name}</span><span className="timeline-indicator" aria-hidden="true">{index === active ? '−' : '+'}</span>
            </summary>
            <div className="event-detail" id={item.id}><p className="event-date">{item.date}</p>
              <p className="event-venue">{item.venue}</p><p>{item.description}</p>
              <div className="event-links">
                {item.project && <a className="text-link" href={item.project}>See what we made ↗</a>}
                {item.certificate ? <a className="text-link" href={item.certificate}>View certificate ↗</a> : <span className="pending">Certificate pending</span>}
              </div>
              <div className="event-fallback-media">{item.photos.map(photo => <img key={photo.src} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" />)}</div>
            </div>
          </details>
        </li>)}
      </ol>
      <div className="event-gallery"><PhotoRail key={event.id} photos={event.photos} eventName={event.name} /></div>
    </div></Reveal>
  </section>;
}
