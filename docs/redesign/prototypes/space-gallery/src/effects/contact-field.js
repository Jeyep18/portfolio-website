export function createContactField(visual) {
  const canvas = visual.querySelector('canvas');
  const context = canvas.getContext('2d');
  if (!context) return { update() {}, destroy() {} };
  const lifecycle = new AbortController();
  const { signal } = lifecycle;
  const shapes = new Map();
  const colors = { email: '#e4d8ff', github: '#eceaff', linkedin: '#a9d9ff' };
  let channel = 'email';
  let moving = false;
  let inspecting = false;
  let visible = false;
  let frame = 0;
  let last = 0;
  let time = 0;
  let width = 0;
  let height = 0;
  let destroyed = false;
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
    const points = shapes.get(channel) || [];
    const extent = Math.min(width * .76, height * .79);
    context.clearRect(0, 0, width, height);
    context.fillStyle = colors[channel] || '#dcdcff';
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
    const dt = last ? Math.min((now-last)/1000, .05) : .016;
    last = now;
    time += dt;
    paint(1-Math.exp(-dt*8));
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    visual.dataset.shape = shapes.has(channel) ? channel : 'scattered';
    const running = moving && visible && !document.hidden && !inspecting;
    visual.dataset.state = running ? 'running' : 'paused';
    if (running && width && height) {
      if (!frame) frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (visible && width && height) paint(1);
    }
  }
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (width && height) {
      const ratio = Math.min(devicePixelRatio || 1,1.5);
      canvas.width = Math.round(width*ratio);
      canvas.height = Math.round(height*ratio);
      context.setTransform(canvas.width/width,0,0,canvas.height/height,0,0);
      paint(0);
    }
    sync();
  }
  for (const [id, icon] of [['email','envelope'],['github','github'],['linkedin','linkedin']]) {
    const image = new Image();
    image.src = 'assets/logos/'+icon+'.svg';
    image.decode().then(() => {
      if (destroyed) return;
      shapes.set(id,sampleIcon(image));
      sync();
    }).catch(() => { /* Direct contact links remain usable if artwork is unavailable. */ });
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(visual);
  const sizing = new ResizeObserver(resize);
  sizing.observe(visual);
  document.addEventListener('visibilitychange',sync,{signal});
  resize();
  return {
    update(nextMoving, nextChannel, nextInspecting) {
      moving = nextMoving;
      channel = nextChannel;
      inspecting = nextInspecting;
      sync();
    },
    destroy() {
      destroyed = true;
      lifecycle.abort();
      observer.disconnect();
      sizing.disconnect();
      cancelAnimationFrame(frame);
    }
  };
}
