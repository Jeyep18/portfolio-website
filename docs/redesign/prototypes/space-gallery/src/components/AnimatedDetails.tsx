import { useEffect, useRef, useState, type ReactNode, type KeyboardEventHandler } from 'react';
import { useMotion } from '../motion';

/** Native disclosure fallback, enhanced with interruptible height and opacity motion. */
export function AnimatedDetails({ children, summary, className = '', open, onRequestOpen,
  controls, onSummaryKeyDown }: {
  children: ReactNode; summary: ReactNode; className?: string; open?: boolean;
  onRequestOpen?: (value: boolean) => void; controls?: string;
  onSummaryKeyDown?: KeyboardEventHandler<HTMLElement>;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const desired = open ?? localOpen;
  const initial = useRef(desired);
  const ref = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);
  const revision = useRef(0);
  const { motion, ready } = useMotion();
  useEffect(() => {
    const element = ref.current, content = body.current;
    if (!element || !content) return;
    if (element.open === desired && !animations.current.length) return;
    const start = element.getBoundingClientRect().height;
    const opacity = element.open ? getComputedStyle(content).opacity : '0';
    revision.current++;
    const current = revision.current;
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    element.style.overflow = '';
    if (!motion || !ready) { element.open = desired; return; }
    element.open = true;
    const style = getComputedStyle(element);
    const closedHeight = element.querySelector('summary')!.getBoundingClientRect().height +
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const end = desired ? element.getBoundingClientRect().height : closedHeight;
    element.style.overflow = 'hidden';
    const height = element.animate([{ height: start + 'px' }, { height: end + 'px' }],
      { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' });
    const fade = content.animate([{ opacity }, { opacity: desired ? 1 : 0 }],
      { duration: desired ? 240 : 180, easing: 'ease-out', fill: 'both' });
    animations.current = [height, fade];
    void height.finished.then(() => {
      if (revision.current !== current) return;
      element.open = desired;
      animations.current.forEach(animation => animation.cancel());
      animations.current = [];
      element.style.overflow = '';
    }).catch(() => {});
  }, [desired, motion, ready]);
  useEffect(() => () => {
    revision.current++;
    animations.current.forEach(animation => animation.cancel());
  }, []);
  return <details ref={ref} className={className} open={initial.current} data-expanded={desired} data-ready={ready || undefined}>
    <summary aria-controls={controls} onKeyDown={onSummaryKeyDown} onClick={event => {
      if (!ready) return;
      event.preventDefault();
      if (onRequestOpen) onRequestOpen(!desired); else setLocalOpen(value => !value);
    }}>{summary}</summary>
    <div className="disclosure-body" ref={body}>{children}</div>
  </details>;
}
