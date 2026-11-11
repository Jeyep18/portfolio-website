'use strict';

(() => {
  const root = document.documentElement;
  const canvas = document.querySelector('#eclipse');
  const starCanvas = document.querySelector('#hero-stars');
  const starContext = starCanvas.getContext('2d');
  const scene = document.querySelector('#eclipse-scene');
  const hero = document.querySelector('.hero');
  const picker = hero.querySelector('.scene-picker');
  const dialog = document.querySelector('#quick-look');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const mobileLayout = matchMedia('(max-width: 680px)');
  const forceStatic = new URLSearchParams(location.search).get('fallback') === '1';
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));

  const vertex = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragment = `
    precision highp float;
    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform float time;
    uniform float pointerPresence;
    uniform float mobile;
    uniform float blackHole;
    uniform sampler2D terrain;

    vec3 blackHoleScene(vec2 p, float aspect, vec3 dark) {
      vec2 centre = vec2(aspect*mix(.22,.09,mobile),mix(-.01,-.08,mobile));
      vec2 q = (p-centre)/mix(.16,.20,mobile);
      q = mat2(.987,-.161,.161,.987)*q;
      float distanceToCentre = length(q);
      vec3 amber = vec3(1.0,.46,.17);
      vec3 pale = vec3(1.0,.85,.64);
      vec3 colour = dark + vec3(.083,.039,.043)*exp(-distanceToCentre*1.2);
      float theta = atan(q.y,q.x + .00001);
      float rimRadius = 1.0 + .09*max(sin(theta),0.0);
      float rimDistance = abs(distanceToCentre-rimRadius);
      float rimIntensity = .20+.52*max(0.0,sin(theta))+.20*max(0.0,-sin(theta));
      float rimBands = .69 + .31*texture2D(terrain,vec2(theta*.31-time*.044,.39)).r;
      float inside = 1.0-smoothstep(.973,1.00,distanceToCentre);
      colour = mix(colour,vec3(.009,.008,.016),inside);
      colour += amber*exp(-rimDistance*10.0)*rimIntensity*.39;
      colour += pale*exp(-rimDistance*55.0)*rimIntensity*rimBands;

      // Stretch the disk into an ellipse. Its near side crosses in front of the shadow.
      vec2 disc = vec2(q.x,(q.y+.055)*4.4);
      float diskRadius = length(disc);
      float material = smoothstep(1.0,1.26,diskRadius)*(1.0-smoothstep(2.1,2.65,diskRadius));
      float inFront = 1.0-smoothstep(-.035,.05,q.y);
      float diskVisible = max(1.0-inside,inFront);
      float azimuth = atan(disc.y,disc.x + .00001)*.15915;
      float shear = time*(.035 + .024/max(.8,diskRadius));
      float filaments = texture2D(terrain,vec2(azimuth-shear,diskRadius*1.36)).r;
      float fineBands = texture2D(terrain,vec2(azimuth*.51-shear,diskRadius*2.93)).r;
      float grain = pow(clamp(filaments*.65 + fineBands*.35,0.0,1.0),1.35);
      float streak = .62 + .38*sin(diskRadius*48.0 + filaments*4.0);
      float highlight = exp(-abs(diskRadius-1.31)*5.2);
      float asymmetry = .74 + .26*clamp((q.x + pointer.x*.55*pointerPresence)*.54,-1.0,1.0);
      float radiance = material*diskVisible*(.40+grain*1.15)*(.62+streak*.38)*asymmetry;
      colour += mix(amber,pale,.27+highlight*.49)*radiance*(.62+highlight*.69);
      colour += amber*exp(-abs(q.y+.07)*4.8)*exp(-abs(q.x)*.77)*.11*diskVisible;
      return colour;
    }

    void main() {
      vec2 p = (gl_FragCoord.xy-.5*resolution)/resolution.y;
      float aspect = resolution.x/resolution.y;
      vec3 dark = vec3(.035,.039,.067);
      if (blackHole > .5) {
        gl_FragColor = vec4(blackHoleScene(p,aspect,dark),1.0);
        return;
      }
      vec2 centre = mix(vec2(aspect*.27,-.20), vec2(aspect*.23,-.46), mobile);
      float radius = mix(.54,.69,mobile);
      vec2 q = (p-centre)/radius;
      float distanceToCentre = length(q);
      float angle = 2.10 + sin(time*.24)*.11;
      vec2 restingLight = vec2(cos(angle), sin(angle));
      vec2 lightDir = normalize(restingLight + pointer*vec2(.86,.72)*pointerPresence);
      vec3 sunlight = normalize(vec3(lightDir,-.30));
      float facing = max(dot(normalize(q+vec2(.00001)), lightDir),0.0);
      float arc = pow(facing,5.0);
      vec3 cool = vec3(.55,.60,1.0);
      vec3 warm = vec3(1.0,.87,.77);
      vec3 colour = dark;
      colour += vec3(.039,.038,.076)*exp(-length(p-centre-vec2(-.12,.23))*2.9);

      if (distanceToCentre <= 1.0) {
        vec3 normal = vec3(q, sqrt(max(0.0,1.0-dot(q,q))));
        float diffuse = max(0.0,dot(normal,sunlight));
        vec2 uv = vec2(atan(normal.z, normal.x)*.15915494+.5+time*.012,
                      asin(clamp(normal.y,-1.0,1.0))*.31830989+.5);
        float mineral = texture2D(terrain,uv).r;
        vec3 rock = mix(vec3(.11,.12,.18),vec3(.74,.67,.78),mineral);
        colour = vec3(.025,.027,.045) + rock * (.035 + .91*pow(diffuse,1.64));
        colour += cool * pow(1.0-normal.z,5.0) * (.015 + arc*.22);
      }

      float edge = abs(distanceToCentre-1.0);
      colour += cool * exp(-edge*8.5) * (.009+.105*arc);
      colour += mix(cool,warm,pow(facing,10.0)*.53) * exp(-edge*36.0) * (.008+.30*arc);
      colour += mix(cool,warm,.58) * exp(-edge*120.0) * (.008+.43*arc);
      gl_FragColor = vec4(colour,1.0);
    }
  `;

  let renderer;
  let failed = forceStatic;
  let visible = true;
  let frame = 0;
  let lastFrame = 0;
  let lastReport = 0;
  let frames = 0;
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  let pointerPresence = 0;
  let targetX = 0;
  let targetY = 0;
  let targetPresence = 0;
  let surface;
  let blackHole = false;
  let sceneWidth = 0;
  let sceneHeight = 0;
  const stars = Array.from({ length: 246 }, () => ({
    u: Math.random(),
    v: Math.random(),
    phase: Math.random() * Math.PI * 2,
    radius: .45 + Math.random() ** 3 * 1.12,
    speed: .45 + Math.random() * .5,
    brightness: .17 + Math.random() * .38,
    dx: 0,
    dy: 0
  }));

  function makeSurface() {
    // Bake deterministic texture maps once. Lighting and projection stay live.
    let seed = 864209;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const bands = [
      [11, 6, .48], [23, 13, .28], [53, 29, .15], [107, 57, .09]
    ].map(([width, height, weight]) => ({
      width, height, weight, grid: Float32Array.from({ length: width * height }, random)
    }));
    const blend = (a, b, t) => a + (b - a) * t;
    const smooth = t => t * t * (3 - 2 * t);
    const surface = new Uint8Array(512 * 256);
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 512; x++) {
        let value = 0;
        for (const { width, height, weight, grid } of bands) {
          const u = x * width / 512;
          const v = y * height / 256;
          const i = Math.floor(u);
          const j = Math.floor(v);
          const next = (i + 1) % width;
          const nextRow = ((j + 1) % height) * width;
          const t = smooth(u - i);
          const low = blend(grid[j * width + i], grid[j * width + next], t);
          const high = blend(grid[nextRow + i], grid[nextRow + next], t);
          value += blend(low, high, smooth(v - j)) * weight;
        }
        surface[y * 512 + x] = Math.round(clamp((value - .1) / .8) * 255);
      }
    }
    return surface;
  }

  function uploadTexture(gl, unit, width, height, pixels) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, pixels);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(message || 'Shader compilation failed');
  }

  function createRenderer() {
    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: true
    });
    if (!gl) return null;
    const program = gl.createProgram();
    const vs = compile(gl, gl.VERTEX_SHADER, vertex);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(message || 'Shader link failed');
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    surface ??= makeSurface();
    uploadTexture(gl, 0, 512, 256, surface);
    gl.uniform1i(gl.getUniformLocation(program, 'terrain'), 0);
    const uniforms = Object.fromEntries(
      ['resolution', 'pointer', 'time', 'pointerPresence', 'mobile', 'blackHole'].map(name => [name, gl.getUniformLocation(program, name)])
    );
    return { gl, uniforms };
  }

  function fitCanvas() {
    sceneWidth = Math.max(1, scene.clientWidth);
    sceneHeight = Math.max(1, scene.clientHeight);
    if (starContext) {
      const starRatio = Math.min(devicePixelRatio || 1, 1.5);
      starCanvas.width = Math.round(sceneWidth * starRatio);
      starCanvas.height = Math.round(sceneHeight * starRatio);
      starContext.setTransform(starCanvas.width / sceneWidth, 0, 0, starCanvas.height / sceneHeight, 0, 0);
      starContext.fillStyle = '#dce2ff';
    }
    if (!renderer) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.2, Math.sqrt(540000 / (sceneWidth * sceneHeight)));
    const width = Math.max(1, Math.round(sceneWidth * ratio));
    const height = Math.max(1, Math.round(sceneHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    renderer.gl.viewport(0, 0, width, height);
  }

  function drawStars(dt) {
    if (!starContext) return;
    const mobile = mobileLayout.matches;
    // Screen-space equivalents of the scene geometry in the shader.
    const centreX = sceneWidth * (blackHole ? (mobile ? .59 : .72) : (mobile ? .73 : .77));
    const centreY = sceneHeight * (blackHole ? (mobile ? .58 : .51) : (mobile ? .96 : .70));
    const shadow = sceneHeight * (blackHole ? (mobile ? .20 : .16) : (mobile ? .69 : .54));
    const cursorX = (pointerX * .5 + .5) * sceneWidth;
    const cursorY = (.5 - pointerY * .5) * sceneHeight;
    const reach = Math.min(150, sceneHeight * .29);
    const ease = 1 - Math.exp(-dt * 5);
    const count = mobile ? 98 : Math.min(stars.length, Math.round(sceneWidth * sceneHeight / 3350) + 65);
    starContext.clearRect(0, 0, sceneWidth, sceneHeight);
    for (let index = 0; index < count; index++) {
      const star = stars[index];
      const phase = elapsed * star.speed + star.phase;
      const x = star.u * sceneWidth + Math.sin(phase) * 3.5;
      const y = star.v * sceneHeight + Math.cos(phase * .82 + star.phase) * 3;
      const dx = x - cursorX;
      const dy = y - cursorY;
      const distance = Math.hypot(dx, dy);
      const push = 27 * Math.max(0, 1 - distance / reach) ** 2 * pointerPresence;
      star.dx += ((dx - dy * .35) * push / Math.max(distance, 6) - star.dx) * ease;
      star.dy += ((dy + dx * .35) * push / Math.max(distance, 6) - star.dy) * ease;
      const drawX = x + star.dx;
      const drawY = y + star.dy;
      const clearance = Math.hypot(drawX - centreX, drawY - centreY) - shadow;
      if (clearance < 0) continue;
      starContext.globalAlpha = star.brightness * (.77 + Math.sin(phase) * .23) * clamp(clearance / 17);
      starContext.beginPath();
      starContext.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
      starContext.fill();
    }
    starContext.globalAlpha = 1;
  }

  function draw() {
    const { gl, uniforms } = renderer;
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, pointerX, pointerY);
    gl.uniform1f(uniforms.time, elapsed);
    gl.uniform1f(uniforms.pointerPresence, pointerPresence);
    gl.uniform1f(uniforms.mobile, mobileLayout.matches ? 1 : 0);
    gl.uniform1f(uniforms.blackHole, Number(blackHole));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!scene.hasAttribute('data-live')) scene.dataset.live = '';
    frames++;
  }

  function canAnimate() {
    return root.dataset.motion === 'on' && visible && !document.hidden && !dialog.open;
  }

  function tick(now) {
    frame = 0;
    if (!canAnimate()) return;
    const dt = lastFrame ? Math.min((now-lastFrame)/1000, .07) : 0;
    lastFrame = now;
    elapsed += dt;
    const ease = 1-Math.exp(-dt*7);
    pointerX += (targetX-pointerX)*ease;
    pointerY += (targetY-pointerY)*ease;
    pointerPresence += (targetPresence-pointerPresence)*ease;
    if (renderer) draw();
    drawStars(dt);
    if (now-lastReport >= 500) {
      canvas.dataset.frames = String(frames);
      canvas.dataset.pointer = pointerPresence.toFixed(2);
      lastReport = now;
    }
    frame = requestAnimationFrame(tick);
  }

  function synchronize() {
    if (canAnimate() && !failed && !renderer) {
      try {
        renderer = createRenderer();
        failed = !renderer;
        fitCanvas();
      } catch {
        failed = true;
      }
    }
    if ((renderer || starContext) && canAnimate()) {
      canvas.dataset.state = renderer ? 'running' : 'fallback';
      if (!frame) frame = requestAnimationFrame(tick);
      return;
    }
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    canvas.dataset.frames = String(frames);
    if (failed) canvas.dataset.state = 'fallback';
    else if (!renderer) canvas.dataset.state = 'static';
    else canvas.dataset.state = root.dataset.motion === 'on' ? 'suspended' : 'paused';
  }

  hero.addEventListener('pointermove', event => {
    if (!canAnimate() || event.pointerType === 'touch' || !finePointer.matches) return;
    const rect = scene.getBoundingClientRect();
    targetX = clamp((event.clientX-rect.left)/rect.width*2-1, -1, 1);
    targetY = clamp(1-(event.clientY-rect.top)/rect.height*2, -1, 1);
    targetPresence = event.clientY >= rect.top ? 1 : 0;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { targetX = targetY = targetPresence = 0; });
  picker.addEventListener('click', event => {
    const button = event.target.closest('button[data-scene]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    scene.dataset.scene = button.dataset.scene;
    blackHole = button.dataset.scene === 'black-hole';
    for (const option of picker.querySelectorAll('button')) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    if (renderer) draw();
    drawStars(0);
  });
  addEventListener('resize', () => {
    fitCanvas();
    if (renderer && !canAnimate()) draw();
    drawStars(0);
  });
  document.addEventListener('visibilitychange', synchronize);
  document.addEventListener('motionchange', synchronize);
  document.addEventListener('inspectionchange', synchronize);

  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    renderer = undefined;
    failed = true;
    delete scene.dataset.live;
    synchronize();
  });
  canvas.addEventListener('webglcontextrestored', () => {
    failed = forceStatic;
    synchronize();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= .015;
      synchronize();
    }, { threshold: .015 });
    observer.observe(hero);
  }
  picker.hidden = false;
  fitCanvas();
  drawStars(0);
  synchronize();
})();
