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
    float hash3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
    float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);}
    float fbm(vec3 p){float a=.5,v=0.;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec3(4.1,2.7,1.2);a*=.5;}return v;}
    mat3 rotateY(float a){return mat3(cos(a),0.,sin(a),0.,1.,0.,-sin(a),0.,cos(a));}
    float stars(vec2 p,float grid,float density){
      vec2 cell=floor(p*grid);float value=0.;
      for(int x=-1;x<=1;x++){for(int y=-1;y<=1;y++){
        vec2 id=cell+vec2(float(x),float(y));float seed=hash(id+grid);
        vec2 pos=(id+vec2(hash(id+13.7),hash(id+28.3)))/grid;
        vec2 cursor=pointer*vec2(resolution.x/resolution.y,1.)*.5;
        vec2 delta=pos-cursor;float near=1.-smoothstep(0.,.28,length(delta));
        pos+=normalize(delta+vec2(.0001))*near*.027;
        float size=mix(.0006,.0013,hash(id+79.));
        float point=exp(-pow(length(p-pos)/size,2.));
        value+=point*step(1.-density,seed)*(.35+hash(id+2.)*.5+near*.7);
      }}return value;
    }
    void main(){
      vec2 p=(gl_FragCoord.xy-.5*resolution)/resolution.y;
      float mobile=1.-step(.85,resolution.x/resolution.y);
      vec3 bg=vec3(.027,.033,.039);
      vec3 color=bg+vec3(.018,.023,.03)*exp(-length(p-vec2(.3,.12))*2.);
      color+=vec3(.78,.84,.9)*(stars(p,21.,.13)+stars(p+pointer*.008,34.,.065)*.55);
      vec2 center=vec2(mix(.40,0.,mobile),mix(.075,-.28,mobile));
      center.y+=progress*.12;
      float radius=mix(.315,.18,mobile)*(1.-progress*.13);
      vec2 q=(p-center)/radius;
      float dist=length(q);float rim=exp(-abs(dist-1.)*120.);
      float aura=exp(-abs(dist-1.)*17.);
      vec3 sun=normalize(vec3(-.75,.40,.65));
      if(dist<1.){
        vec3 n=vec3(q,sqrt(max(0.,1.-dot(q,q))));
        // Rotate the actual 3D sampling direction, retaining a fixed world-space sun.
        float tilt=-.36;vec3 axis=vec3(n.x*cos(tilt)-n.y*sin(tilt),n.x*sin(tilt)+n.y*cos(tilt),n.z);
        vec3 surface=rotateY(time*.14)*axis;
        float continents=fbm(surface*3.7);
        float detail=fbm(surface*19.);
        float clouds=smoothstep(.54,.77,fbm(rotateY(time*.025)*surface*7.+2.));
        float diffuse=max(dot(n,sun),0.);
        float terrain=smoothstep(.38,.58,continents);
        vec3 ocean=vec3(.045,.075,.10);
        vec3 land=mix(vec3(.14,.17,.18),vec3(.47,.49,.46),detail);
        vec3 albedo=mix(ocean,land,terrain);
        albedo=mix(albedo,vec3(.69,.72,.72),clouds*.7);
        color=albedo*(.035+diffuse*.95);
        float edge=pow(1.-n.z,3.5);
        color+=vec3(.12,.23,.34)*edge*pow(max(dot(n,sun),0.),2.);
        color+=vec3(.3,.37,.44)*rim*diffuse*.4;
      }else{color+=vec3(.16,.23,.32)*aura*.23+vec3(.38,.48,.58)*rim*.3;}
      color=mix(color,bg,progress*.55);
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
    const ratio = Math.min(devicePixelRatio || 1, 1.25);
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; gl.viewport(0,0,width,height); return true; }
    return false;
  }
  function updateScroll() {
    const rect = hero.getBoundingClientRect();
    scroll = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
    hero.style.setProperty('--departure',String(scroll));
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
    document.documentElement.dataset.paused=String(paused);
    toggle.hidden=false; toggle.disabled=reduced || !available;
    toggle.setAttribute('aria-pressed',String(paused));
    label.textContent=reduced ? 'Motion off · preference' : !available ? 'Static horizon' : paused ? 'Resume motion' : 'Pause motion';
    if (reduced || !available) {
      scroll=0;hero.style.setProperty('--departure','0');
      stop(); scene.classList.remove('is-live');
      setStatus('fallback',reduced ? 'Static fallback — reduced motion' : 'Static fallback — renderer unavailable or forced');
    } else if (paused) {
      hero.style.setProperty('--departure','0');
      stop();
      if(visible && !document.hidden && !scene.classList.contains('is-live')){resize();drawScene();publish();}
      setStatus('paused','Paused — scene frozen');
    }
    else if (!visible || document.hidden) { stop();setStatus('suspended',document.hidden ? 'Suspended — page hidden' : 'Suspended — hero offscreen'); }
    else { resize();updateScroll();setStatus('running','WebGL active');if(!raf)raf=requestAnimationFrame(render); }
  }
  toggle.addEventListener('click',() => {paused=!paused;sync();});
  hero.addEventListener('pointermove',event => {
    if (!canRun() || event.pointerType==='touch' || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const rect=scene.getBoundingClientRect();target=[(event.clientX-rect.left)/rect.width*2-1,1-(event.clientY-rect.top)/rect.height*2];
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
  canvas.addEventListener('webglcontextrestored',()=>{
    setup();
    sync();
  });
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
    if(announce)document.querySelector('#comparison-announcement').textContent=view==='before'?'Normal house environment shown.':'Storm-damaged house environment shown.';
  }
  buttons.forEach(button=>button.addEventListener('click',event=>select(button.dataset.view,event.detail>0,true)));
  comparison.classList.add('is-enhanced');controls.hidden=false;select('before',false,false);

  // Content starts visible. Only imagery is given an optional once-only entrance.
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){
      if(!reduced && !paused)entry.target.classList.add('arriving');
      revealObserver.unobserve(entry.target);
    }});
  },{threshold:.15});
  document.querySelectorAll('.feature-image,.inspection-intro,.project-row').forEach(el=>revealObserver.observe(el));
})();
