(() => {
  'use strict';
  const canvas = document.querySelector('#horizon');
  const scene = document.querySelector('.scene');
  const hero = document.querySelector('.hero');
  const toggle = document.querySelector('#motion-toggle');
  const label = document.querySelector('#motion-label');
  const status = document.querySelector('#scene-status');
  const frameCount = document.querySelector('#frame-count');
  const intervalOutput = document.querySelector('#frame-interval');
  const params = new URLSearchParams(location.search);
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  // Explicit review URL only; default always follows the operating-system preference.
  const wantsReduced = () => params.get('motion') === 'off' || (preference.matches && params.get('motion') !== 'on');
  let reduced = wantsReduced();
  let paused = false;
  let visible = true;
  let available = false;
  let frames = 0;
  let raf = 0;
  let lastTime = 0;
  let elapsed = 0;
  let lastReport = 0;
  let intervals = [];
  let pointer = [0, 0];
  let target = [0, 0];
  let scroll = 0;
  let gl, program, buffer, uniforms;
  const setStatus = (state, text) => { canvas.dataset.state = state; status.textContent = text; };
  const publish = () => { canvas.dataset.frames = String(frames); frameCount.textContent = String(frames); };
  const canRun = () => available && !reduced && !paused && visible && !document.hidden;
  const stop = () => { cancelAnimationFrame(raf); raf = 0; lastTime = 0; publish(); };

  const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
  const fragment = `precision highp float;
    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform float time;
    uniform float progress;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    void main(){
      vec2 uv=gl_FragCoord.xy/resolution;
      vec2 p=(gl_FragCoord.xy-.5*resolution)/resolution.y;
      float mobile=1.-step(.85,resolution.x/resolution.y);
      vec2 center=vec2(mix(.34,.15,mobile),mix(-1.26,-.99,mobile));
      center+=pointer*vec2(.024,.014);
      center.y-=progress*.12;
      float radius=mix(1.12,.91,mobile)*(1.-progress*.025);
      vec2 q=p-center;
      float dist=length(q)-radius;
      vec2 normal=normalize(q);
      float cycle=time*6.2831853/28.;
      vec2 light=normalize(vec2(.19+sin(cycle)*.12+pointer.x*.27,1.));
      float exposure=pow(max(dot(normal,light),0.),9.);
      float outside=step(0.,dist);
      float rim=exp(-abs(dist)*340.);
      float atmosphere=exp(-max(dist,0.)*29.)*outside;
      float halo=exp(-max(dist,0.)*9.)*outside;
      vec3 color=vec3(.043,.055,.075);
      color+=vec3(.13,.2,.28)*halo*exposure*.3;
      color+=vec3(.25,.38,.51)*atmosphere*exposure*.55;
      color+=vec3(.71,.82,.9)*rim*(.13+exposure*.8);
      float body=1.-smoothstep(-.004,.001,dist);
      vec3 surface=vec3(.026,.035,.05)+vec3(.035,.045,.057)*exp(min(dist,0.)*14.)*exposure;
      color=mix(color,surface,body);
      color+=vec3(hash(gl_FragCoord.xy)-.5)/340.;
      float fade=smoothstep(0.,.13,uv.y);
      color=mix(vec3(.043,.055,.075),color,fade*(1.-progress*.45));
      gl_FragColor=vec4(color,1.);
    }`;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); throw new Error('Shader unavailable'); }
    return shader;
  }
  function setup() {
    if (params.get('fallback') === '1') return;
    try {
      gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
      if (!gl) return;
      const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
      program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
      gl.deleteShader(vs); gl.deleteShader(fs);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Scene unavailable');
      gl.useProgram(program);
      buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
      const attr = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(attr); gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['resolution','pointer','time','progress'].map(name => [name, gl.getUniformLocation(program,name)]));
      available = true;
    } catch { available = false; }
  }
  function resize() {
    if (!available) return;
    const bounds = scene.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; gl.viewport(0,0,width,height); return true; }
    return false;
  }
  function updateScroll() {
    const rect = hero.getBoundingClientRect();
    scroll = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
  }
  function render(now) {
    raf = 0;
    if (!canRun()) { sync(); return; }
    const dt = lastTime ? Math.min((now-lastTime)/1000,.05) : 0;
    if (lastTime && now-lastTime < 250) intervals.push(now-lastTime);
    lastTime = now; elapsed += dt;
    const ease = 1-Math.exp(-dt*7);
    pointer = pointer.map((v,i) => v + (target[i]-v)*ease);
    drawScene();
    if (now-lastReport > 1000) {
      publish();
      if (intervals.length) { const values=intervals.sort((a,b)=>a-b); const median=values[Math.floor(values.length/2)]; const p95=values[Math.min(values.length-1,Math.floor(values.length*.95))]; intervalOutput.textContent=`${median.toFixed(1)} ms median / ${p95.toFixed(1)} ms p95 (${values.length} frames)`; }
      intervals=[];lastReport=now;
    }
    raf=requestAnimationFrame(render);
  }
  function drawScene() {
    gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);
    gl.uniform2f(uniforms.pointer,pointer[0],pointer[1]);
    gl.uniform1f(uniforms.time,elapsed); gl.uniform1f(uniforms.progress,scroll);
    gl.drawArrays(gl.TRIANGLES,0,6);
    scene.classList.add('is-live'); frames++;
  }
  function sync() {
    document.documentElement.dataset.reduced=String(reduced);
    toggle.hidden=false; toggle.disabled=reduced || !available;
    toggle.setAttribute('aria-pressed',String(paused));
    label.textContent=reduced ? 'Motion off · preference' : !available ? 'Static horizon' : paused ? 'Resume motion' : 'Pause motion';
    if (reduced || !available) {
      stop(); scene.classList.remove('is-live');
      setStatus('fallback',reduced ? 'Static fallback — reduced motion' : 'Static fallback — renderer unavailable or forced');
    } else if (paused) { stop(); setStatus('paused','Paused — scene frozen'); }
    else if (!visible || document.hidden) { stop();setStatus('suspended',document.hidden ? 'Suspended — page hidden' : 'Suspended — hero offscreen'); }
    else { resize();updateScroll();setStatus('running','WebGL active');if(!raf)raf=requestAnimationFrame(render); }
  }
  toggle.addEventListener('click',() => {paused=!paused;sync();});
  hero.addEventListener('pointermove',event => {
    if (!canRun() || event.pointerType==='touch' || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const rect=hero.getBoundingClientRect();target=[(event.clientX-rect.left)/rect.width*2-1,1-(event.clientY-rect.top)/rect.height*2];
  });
  hero.addEventListener('pointerleave',()=>{target=[0,0];});
  addEventListener('scroll',()=>{if(canRun())updateScroll();},{passive:true});
  addEventListener('resize',()=>{
    const changed=resize();
    // Resizing clears the canvas. Restore its frozen state without advancing motion.
    if(changed && paused && !reduced && available){drawScene();publish();}
    if(canRun())updateScroll();
  },{passive:true});
  document.addEventListener('visibilitychange',sync);
  preference.addEventListener('change',()=>{reduced=wantsReduced();sync();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();available=false;sync();});
  canvas.addEventListener('webglcontextrestored',()=>{setup();sync();});
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0});observer.observe(hero);
  setup(); sync();

  // Both artifacts are readable HTML before enhancement or when scripts fail.
  const comparison=document.querySelector('.comparison');
  const controls=document.querySelector('#compare-controls');
  const buttons=Array.from(controls.querySelectorAll('button'));
  const before=document.querySelector('#before-artifact'), after=document.querySelector('#after-artifact');
  function select(view,animate,announce) {
    before.hidden=view!=='before'; after.hidden=view!=='after';
    [before,after].forEach(artifact=>artifact.classList.remove('is-entering'));
    const active=view==='before'?before:after;
    if(animate && !reduced) active.classList.add('is-entering');
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)));
    if(announce)document.querySelector('#comparison-announcement').textContent=`${view==='before'?'Before: equal emphasis.':'After: a clear next step.'} Illustrative layout shown.`;
  }
  buttons.forEach(button=>button.addEventListener('click',event=>select(button.dataset.view,event.detail>0,true)));
  comparison.classList.add('is-enhanced');controls.hidden=false;select('before',false,false);
})();
