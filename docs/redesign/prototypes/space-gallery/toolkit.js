'use strict';

(() => {
  const toolkit = document.querySelector('#tools');
  const buttons = [...toolkit.querySelectorAll('.tool-button')];
  buttons.forEach((button, index) => {
    button.disabled = false;
    button.style.setProperty('--phase', (-index * .61) + 's');
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      const selected = button.getAttribute('aria-pressed') === 'false';
      buttons.forEach(option => {
        option.setAttribute('aria-pressed', String(option === button && selected));
      });
    });
  });

  const art = document.querySelector('.contact-art');
  const visual = art.querySelector('.contact-visual');
  const canvas = art.querySelector('canvas');
  const context = canvas.getContext('2d');
  const previews = [...art.querySelectorAll('button[data-channel]')];
  const links = document.querySelectorAll('.contact-links [data-channel]');
  const shapes = new Map();
  const colors = { email: '#e4d8ff', github: '#eceaff', linkedin: '#a9d9ff' };
  let visible = !('IntersectionObserver' in window);
  let hovered = null;
  let focused = null;
  let selected = null;
  let active = null;
  let frame = 0;
  let last = 0;
  let time = 0;
  let width = 0;
  let height = 0;

  const dots = Array.from({ length: 500 }, () => {
    const homeX = Math.random();
    const homeY = Math.random();
    return { homeX, homeY, x: homeX, y: homeY, phase: Math.random() * Math.PI * 2, glow: 0 };
  }).sort((a, b) => a.homeX - b.homeX);

  function sampleIcon(image) {
    const stencil = document.createElement('canvas');
    const size = 73;
    stencil.width = stencil.height = size;
    const mask = stencil.getContext('2d');
    mask.drawImage(image, 1, 1, size - 2, size - 2);
    const { data } = mask.getImageData(0, 0, size, size);
    const points = [];
    for (let x = 2; x < size - 1; x += 3) {
      for (let y = 2; y < size - 1; y += 3) {
        if (data[(y * size + x) * 4 + 3] <= 145) continue;
        points.push({ x: x / size - .5, y: y / size - .5 });
      }
    }
    if (points.length <= dots.length) return points;
    return dots.map((_, index) => points[Math.floor(index * points.length / dots.length)]);
  }

  function paint(ease) {
    const points = shapes.get(active) || [];
    const extent = Math.min(width * .76, height * .79);
    context.clearRect(0, 0, width, height);
    context.fillStyle = colors[active] || '#dcdcff';
    for (let index = 0; index < dots.length; index++) {
      const dot = dots[index];
      const pointIndex = Math.floor(index * points.length / dots.length);
      const nextPoint = Math.floor((index + 1) * points.length / dots.length);
      const target = nextPoint > pointIndex ? points[pointIndex] : null;
      const x = target ? .5 + target.x * extent / width : dot.homeX + Math.sin(time * .41 + dot.phase) * .017;
      const y = target ? .5 + target.y * extent / height : dot.homeY + Math.cos(time * .36 + dot.phase) * .019;
      dot.x += (x - dot.x) * ease;
      dot.y += (y - dot.y) * ease;
      dot.glow += ((target ? 1 : 0) - dot.glow) * ease;
      const radius = .43 + dot.glow * .86;
      context.globalAlpha = .19 + dot.glow * .81;
      context.beginPath();
      context.arc(dot.x * width, dot.y * height, radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  }

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, .05) : .016;
    last = now;
    time += dt;
    paint(1 - Math.exp(-dt * 8));
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    active = hovered || focused || selected;
    art.dataset.shape = shapes.has(active) ? active : 'scattered';
    for (const button of previews) {
      button.toggleAttribute('data-previewing', button.dataset.channel === active);
      button.setAttribute('aria-pressed', String(button.dataset.channel === selected));
    }
    if (visible && document.documentElement.dataset.motion === 'on' && !document.hidden && width && height) {
      if (!frame) frame = requestAnimationFrame(tick);
      return;
    }
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (visible && width && height) paint(1);
  }

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (width && height) {
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
      paint(0);
    }
    sync();
  }

  if (context) {
    for (const link of links) {
      link.addEventListener('pointerenter', event => {
        if (event.pointerType === 'touch') return;
        hovered = link.dataset.channel;
        sync();
      });
      link.addEventListener('pointerleave', () => { hovered = null; sync(); });
      link.addEventListener('focus', () => {
        focused = link.dataset.channel;
        hovered = null;
        sync();
      });
      link.addEventListener('blur', () => { focused = null; sync(); });
    }
    visual.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovered = selected || 'email';
      sync();
    });
    visual.addEventListener('pointerleave', () => { hovered = null; sync(); });

    for (const button of previews) {
      const channel = button.dataset.channel;
      button.disabled = true;
      button.querySelector('img').decode().then(() => {
        shapes.set(channel, sampleIcon(button.querySelector('img')));
        button.disabled = false;
        sync();
      }).catch(() => { button.hidden = true; });
      button.addEventListener('click', () => {
        selected = selected === channel ? null : channel;
        hovered = null;
        sync();
      });
    }

    document.addEventListener('visibilitychange', sync);
    document.addEventListener('motionchange', sync);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(visual);
    else addEventListener('resize', resize);
    art.hidden = false;
    resize();
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === toolkit) {
          toolkit.toggleAttribute('data-visible', entry.isIntersecting);
        } else {
          visible = entry.isIntersecting;
          sync();
        }
      }
    });
    observer.observe(toolkit);
    if (context) observer.observe(art);
  } else {
    toolkit.dataset.visible = '';
  }
})();
