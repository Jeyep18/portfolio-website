import { useEffect, useRef, useState } from 'react';
import { useMotion } from '../motion';

export function SpaceField({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { motion, inspecting } = useMotion();
  const [universe] = useState(() => ({
    stars: Array.from({ length: 105 }, () => ({
      x: Math.random(), y: Math.random(), depth: Math.random(), phase: Math.random() * Math.PI * 2
    })),
    time: 0,
    pointer: { x: 0, y: 0, tx: 0, ty: 0 }
  }));
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const lifecycle = new AbortController();
    const { stars, pointer } = universe;
    let width = 0, height = 0, last = 0, frame = 0;
    const running = () => motion && active && !inspecting && !document.hidden;
    function paint() {
      if (!context || !canvas) return;
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#dddff3';
      const time = universe.time;
      for (const star of stars) {
        context.globalAlpha = .13 + star.depth * .32 + Math.sin(time * .32 + star.phase) * .055;
        const x = star.x * width + Math.sin(time * .06 + star.phase) * 3 + pointer.x * star.depth * 7;
        const y = star.y * height + Math.cos(time * .05 + star.phase) * 3 + pointer.y * star.depth * 7;
        const size = .55 + star.depth * .75;
        context.fillRect(x, y, size, size);
      }
      context.globalAlpha = 1;
    }
    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, .05) : 1 / 60;
      last = now; universe.time += dt;
      pointer.x += (pointer.tx - pointer.x) * (1 - Math.exp(-dt * 3));
      pointer.y += (pointer.ty - pointer.y) * (1 - Math.exp(-dt * 3));
      paint(); frame = requestAnimationFrame(tick);
    }
    function sync() {
      canvas!.dataset.state = running() ? 'running' : 'paused';
      if (running()) { if (!frame) frame = requestAnimationFrame(tick); }
      else { cancelAnimationFrame(frame); frame = 0; last = 0; paint(); }
    }
    function resize() {
      width = canvas!.clientWidth; height = canvas!.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * ratio); canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0); paint();
    }
    const sizing = new ResizeObserver(resize); sizing.observe(canvas);
    window.addEventListener('pointermove', event => {
      if (!running() || event.pointerType === 'touch') return;
      pointer.tx = event.clientX / Math.max(1, width) * 2 - 1;
      pointer.ty = event.clientY / Math.max(1, height) * 2 - 1;
    }, { signal: lifecycle.signal, passive: true });
    document.addEventListener('visibilitychange', sync, { signal: lifecycle.signal });
    resize(); sync();
    return () => { lifecycle.abort(); sizing.disconnect(); cancelAnimationFrame(frame); };
  }, [motion, active, inspecting, universe]);
  return <canvas ref={ref} className="space-field" aria-hidden="true" />;
}
