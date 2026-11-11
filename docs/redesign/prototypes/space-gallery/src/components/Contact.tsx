import { useEffect, useRef, useState } from 'react';
import { contacts } from '../data';
import { Reveal, useMotion } from '../motion';
import { createContactField } from '../effects/contact-field';
import { ParticleHeading } from './ParticleHeading';

export function Contact() {
  const { motion, inspecting, ready } = useMotion();
  const visual = useRef<HTMLDivElement>(null);
  const field = useRef<ReturnType<typeof createContactField> | null>(null);
  const [hovered, setHovered] = useState('');
  const [focused, setFocused] = useState('');
  const [idle, setIdle] = useState('email');
  const [visible, setVisible] = useState(false);
  const channel = hovered || focused || idle;
  useEffect(() => {
    if (!visual.current) return;
    field.current = createContactField(visual.current);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(visual.current);
    return () => { field.current?.destroy(); field.current = null; observer.disconnect(); };
  }, []);
  useEffect(() => {
    field.current?.update(motion, channel, inspecting);
  }, [motion, channel, inspecting]);
  useEffect(() => {
    if (!motion || !visible || inspecting) return;
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    let disposed = false;
    const cycle = () => {
      if (disposed || document.hidden) return;
      setIdle(contacts[index].id);
      timer = setTimeout(() => {
        setIdle('');
        timer = setTimeout(() => { index = (index + 1) % contacts.length; cycle(); }, 800);
      }, 5200);
    };
    const sync = () => {
      clearTimeout(timer);
      if (!document.hidden) cycle();
    };
    cycle();
    document.addEventListener('visibilitychange', sync);
    return () => { disposed = true; clearTimeout(timer); document.removeEventListener('visibilitychange', sync); };
  }, [motion, visible, inspecting]);
  return <footer className="contact chapter shell" id="contact">
    <div className="contact-panel">
      <div className="contact-copy"><p className="eyebrow">A conversation starts here</p><ParticleHeading>Let’s talk<span>.</span></ParticleHeading>
        <Reveal delay={.5}><p className="contact-deck">Open to frontend internships and collaborations.</p>
        <div className="contact-links">{contacts.map(contact =>
          <a key={contact.id} href={contact.href} data-channel={contact.id}
            onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(contact.id); }}
            onPointerLeave={() => setHovered('')} onFocus={() => { setHovered(''); setFocused(contact.id); }} onBlur={() => setFocused('')}>
            <img src={'assets/logos/' + contact.icon + '.svg'} width="20" height="20" alt="" />
            <span><strong>{contact.name}</strong><span>{contact.label}</span></span><span aria-hidden="true">↗</span>
          </a>
        )}</div></Reveal>
      </div>
      <div className="contact-art" hidden={!ready}><div ref={visual} className="contact-visual" aria-hidden="true"><canvas /></div>
        <p className="contact-art-label" aria-hidden="true">{contacts.find(contact => contact.id === channel)?.name || 'Let’s connect'}</p>
      </div>
    </div>
  </footer>;
}
