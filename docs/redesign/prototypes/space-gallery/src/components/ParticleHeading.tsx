import { useEffect, useRef, type ReactNode } from 'react';
import { useMotion } from '../motion';

interface Props { as?: 'h1' | 'h2'; id?: string; children: ReactNode; className?: string }
interface Dot { x: number; y: number; tx: number; ty: number; sx: number; sy: number; vx: number; vy: number }

/** Semantic text remains the layout and fallback. The canvas is a disposable visual layer. */
export function ParticleHeading({ as: Tag = 'h2', id, children, className = '' }: Props) {
  const host = useRef<HTMLHeadingElement>(null);
  const played = useRef(false);
  const { motion, inspecting } = useMotion();
  useEffect(() => {
    const heading = host.current;
    const source = heading?.querySelector<HTMLElement>('.particle-source');
    const canvas = heading?.querySelector('canvas');
    const context = canvas?.getContext('2d');
    if (!heading || !source || !canvas || !context || !motion || inspecting) return;
    const stencil = document.createElement('canvas');
    const mask = stencil.getContext('2d', { willReadFrequently: true });
    if (!mask) return;
    const lifecycle = new AbortController();
    const { signal } = lifecycle;
    const padding = 30;
    let width = 0, height = 0, elapsed = played.current ? .85 : 0, last = 0, frame = 0;
    let visible = false, formed = played.current, disposed = false, built = false;
    let dots: Dot[] = [];
    const pointer = { x: -1000, y: -1000, present: false, strength: 0 };

    function paint(dt: number) {
      if (!context || !canvas || !heading) return;
      const progress = Math.min(1, elapsed / .85);
      const assemble = 1 - Math.pow(1 - progress, 3);
      pointer.strength += ((pointer.present ? 1 : 0) - pointer.strength) * (1 - Math.exp(-dt * 12));
      context.clearRect(0, 0, width, height);
      const solid = Math.max(0, (progress - .62) / .38);
      context.globalAlpha = solid;
      context.drawImage(stencil, 0, 0);
      if (solid && pointer.strength > .001) {
        context.globalAlpha = pointer.strength * .92;
        context.globalCompositeOperation = 'destination-out';
        const cutout = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 52);
        cutout.addColorStop(0, '#000'); cutout.addColorStop(.4, '#000'); cutout.addColorStop(1, '#0000');
        context.fillStyle = cutout;
        context.fillRect(pointer.x - 52, pointer.y - 52, 104, 104);
        context.globalCompositeOperation = 'source-over';
      }
      context.fillStyle = '#e7e5fa';
      const step = Math.min(dt * 60, 2);
      let disturbed = false;
      for (const dot of dots) {
        const dx = dot.tx - pointer.x, dy = dot.ty - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - distance / 64) * pointer.strength;
        const aimX = dot.sx + (dot.tx - dot.sx) * assemble + dx / Math.max(1, distance) * force * 19;
        const aimY = dot.sy + (dot.ty - dot.sy) * assemble + dy / Math.max(1, distance) * force * 19;
        dot.vx = (dot.vx + (aimX - dot.x) * .1 * step) * Math.pow(.68, step);
        dot.vy = (dot.vy + (aimY - dot.y) * .1 * step) * Math.pow(.68, step);
        dot.x += dot.vx * step; dot.y += dot.vy * step;
        const displacement = Math.hypot(dot.x - dot.tx, dot.y - dot.ty);
        disturbed ||= displacement > .12;
        context.globalAlpha = Math.min(1, (1 - solid) * .95 + force * .95 + Math.min(1, displacement / 18) * solid * .28);
        context.fillRect(dot.x - .72, dot.y - .72, 1.44, 1.44);
      }
      context.globalAlpha = 1;
      if (progress === 1 && !formed) { formed = true; played.current = true; heading.dataset.formed = 'true'; }
      return progress < 1 || disturbed || pointer.strength > .001;
    }
    function tick(now: number) {
      frame = 0;
      const dt = last ? Math.min((now - last) / 1000, .035) : 1 / 60;
      last = now; elapsed += dt;
      heading!.dataset.frames = String(Number(heading!.dataset.frames || 0) + 1);
      if (paint(dt) && visible && !document.hidden) frame = requestAnimationFrame(tick);
      else last = 0;
    }
    function wake() {
      if (built && visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    }
    function build() {
      if (!heading || !source || !canvas || !context || !mask || disposed) return;
      const box = heading.getBoundingClientRect();
      width = Math.ceil(box.width) + padding * 2;
      height = Math.ceil(box.height) + padding * 2;
      if (width < 61 || height < 61) return;
      stencil.width = width; stencil.height = height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.ceil(width * ratio); canvas.height = Math.ceil(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const walker = document.createTreeWalker(source, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const style = getComputedStyle(node.parentElement!);
        mask.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        mask.fillStyle = style.color;
        mask.textBaseline = 'alphabetic';
        const ascent = mask.measureText('Mg').fontBoundingBoxAscent || parseFloat(style.fontSize) * .93;
        for (let index = 0; index < (node.textContent?.length || 0); index++) {
          range.setStart(node, index); range.setEnd(node, index + 1);
          const rect = range.getBoundingClientRect();
          mask.fillText(node.textContent![index], rect.left - box.left + padding, rect.top - box.top + padding + ascent);
        }
      }
      const pixels = mask.getImageData(0, 0, width, height).data;
      const gap = Math.max(2.5, Math.sqrt(width * height / 14500));
      dots = [];
      for (let y = padding; y < height - padding; y += gap) {
        for (let x = padding; x < width - padding; x += gap) {
          if (pixels[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] < 100) continue;
          const sx = x + (Math.random() - .5) * 150, sy = y + (Math.random() - .5) * 90;
          dots.push({ x: formed ? x : sx, y: formed ? y : sy, tx: x, ty: y, sx, sy, vx: 0, vy: 0 });
        }
      }
      built = true;
      heading.dataset.particles = 'ready';
      if (formed) heading.dataset.formed = 'true';
      heading.dataset.count = String(dots.length);
      if (formed) elapsed = .85;
      paint(1 / 60); wake();
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else { cancelAnimationFrame(frame); frame = 0; last = 0; }
    }, { threshold: .12 });
    observer.observe(heading);
    const resize = new ResizeObserver(build);
    document.fonts.ready.then(() => { if (!disposed) { build(); resize.observe(heading); } });
    heading.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const box = heading.getBoundingClientRect();
      pointer.x = event.clientX - box.left + padding;
      pointer.y = event.clientY - box.top + padding;
      pointer.present = true; wake();
    }, { signal, passive: true });
    heading.addEventListener('pointerleave', () => { pointer.present = false; wake(); }, { signal });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
      else wake();
    }, { signal });
    return () => {
      disposed = true; lifecycle.abort(); observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame);
      delete heading.dataset.particles; delete heading.dataset.formed;
      context.clearRect(0, 0, width, height);
    };
  }, [motion, inspecting]);
  return <Tag ref={host} id={id} className={'particle-heading ' + className}>
    <span className="particle-source">{children}</span><canvas aria-hidden="true" />
  </Tag>;
}
