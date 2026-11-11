// Focused lifecycle/interaction regression checks. No browser or dependency required.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const source=readFileSync(new URL('../script.js',import.meta.url),'utf8');
function boot({search='',systemReduced=false,webgl=true}={}){
  class Element {
    constructor(){this.style={setProperty:(k,v)=>this.styles[k]=v};this.styles={};this.dataset={};this.hidden=false;this.disabled=false;this.textContent='';this.attributes={};this.events={};this.classes=new Set();this.classList={add:(v)=>this.classes.add(v),remove:(v)=>this.classes.delete(v),contains:(v)=>this.classes.has(v)};this.width=300;this.height=150;this.bounds={left:0,top:0,width:1440,height:800};}
    addEventListener(type,fn){(this.events[type]??=[]).push(fn);}
    fire(type,event={}){for(const fn of this.events[type]??[])fn(event);}
    setAttribute(k,v){this.attributes[k]=v;}
    getBoundingClientRect(){return this.bounds;}
  }
  const selectors=['#horizon','.scene','.hero','#motion-toggle','#motion-label','#scene-status','#frame-count','#frame-interval','.comparison','#compare-controls','#before-artifact','#after-artifact','#comparison-announcement'];
  const els=Object.fromEntries(selectors.map(s=>[s,new Element()]));
  const buttons=[new Element(),new Element()];buttons[0].dataset.view='before';buttons[1].dataset.view='after';
  els['#compare-controls'].querySelectorAll=()=>buttons;
  const uniforms={},draws=[];
  const gl={VERTEX_SHADER:1,FRAGMENT_SHADER:2,COMPILE_STATUS:3,LINK_STATUS:4,ARRAY_BUFFER:5,STATIC_DRAW:6,FLOAT:7,TRIANGLES:8,
    createShader:()=>({}),shaderSource(){},compileShader(){},getShaderParameter:()=>true,deleteShader(){},createProgram:()=>({}),attachShader(){},linkProgram(){},getProgramParameter:()=>true,useProgram(){},createBuffer:()=>({}),bindBuffer(){},bufferData(){},getAttribLocation:()=>0,enableVertexAttribArray(){},vertexAttribPointer(){},getUniformLocation:(_,name)=>name,viewport(){},uniform2f:(k,x,y)=>uniforms[k]=[x,y],uniform1f:(k,v)=>uniforms[k]=v,drawArrays:()=>draws.push(structuredClone(uniforms))};
  els['#horizon'].getContext=()=>webgl?gl:null;
  const doc={hidden:false,documentElement:new Element(),events:{},querySelector:s=>els[s],querySelectorAll:()=>[],addEventListener(type,fn){(this.events[type]??=[]).push(fn);}};
  const pref={matches:systemReduced,addEventListener:(_,fn)=>pref.change=fn};
  let observer;const events={},jobs=new Map();let id=0;
  const context={document:doc,location:{search},URLSearchParams,Float32Array,Math,devicePixelRatio:1,matchMedia:q=>q.includes('reduced')?pref:{matches:true},requestAnimationFrame:fn=>{jobs.set(++id,fn);return id;},cancelAnimationFrame:key=>jobs.delete(key),addEventListener:(type,fn)=>{(events[type]??=[]).push(fn);},IntersectionObserver:class{constructor(fn){this.fn=fn;}observe(el){if(el===els['.hero'])observer=this.fn;}unobserve(){}}};
  vm.runInNewContext(source,context);
  return {els,buttons,doc,pref,jobs,draws,fire:(type,event={})=>{for(const fn of events[type]??[])fn(event);},tick:now=>{const pending=[...jobs.values()];jobs.clear();pending.forEach(fn=>fn(now));},visible:value=>observer([{isIntersecting:value}]),visibility:value=>{doc.hidden=!value;for(const fn of doc.events.visibilitychange??[])fn();}};
}
let checks=0;const check=(fn)=>{fn();checks++;};
const s=boot();
check(()=>assert.equal(s.jobs.size,1,'one render loop on startup'));
s.tick(100);s.tick(117);
check(()=>assert.equal(s.draws.length,2));
s.els['.hero'].fire('pointermove',{pointerType:'mouse',clientX:1400,clientY:100});s.tick(134);
check(()=>assert.ok(s.draws.at(-1).pointer[0]>0,'pointer affects shader input'));
s.els['#motion-toggle'].fire('click');const frozen=structuredClone(s.draws.at(-1));
check(()=>assert.equal(s.jobs.size,0,'pause cancels loop'));
s.els['.scene'].bounds.width=800;s.fire('resize');
check(()=>assert.equal(s.draws.length,4,'resize redraws frozen scene once'));
check(()=>assert.equal(s.draws.at(-1).time,frozen.time,'resize does not advance time'));
check(()=>assert.deepEqual(s.draws.at(-1).pointer,frozen.pointer,'resize preserves pointer state'));
check(()=>assert.equal(s.jobs.size,0,'resize does not restart paused loop'));
s.els['#motion-toggle'].fire('click');s.tick(90000);
check(()=>assert.equal(s.draws.at(-1).time,frozen.time,'resume excludes paused time'));
s.visible(false);
check(()=>assert.equal(s.jobs.size,0,'offscreen rendering stops'));
s.visible(true);s.visible(true);
check(()=>assert.equal(s.jobs.size,1,'visibility changes cannot duplicate loop'));
s.visibility(false);
check(()=>assert.equal(s.jobs.size,0,'hidden document suspends'));
s.visibility(true);s.tick(91000);
check(()=>assert.equal(s.jobs.size,1,'visible document resumes'));
s.pref.matches=true;s.pref.change();
check(()=>assert.equal(s.jobs.size,0,'system reduced motion cancels loop'));
check(()=>assert.equal(s.els['.hero'].styles['--departure'],'0','reduced motion restores fully visible hero')); 
check(()=>assert.equal(s.els['.scene'].classes.has('is-live'),false));
s.buttons[1].fire('click',{detail:1});
check(()=>assert.equal(s.els['#after-artifact'].hidden,false,'comparison works with motion reduced'));
check(()=>assert.equal(s.els['#after-artifact'].classes.has('is-entering'),false));
const f=boot({search:'?fallback=1'});
check(()=>assert.equal(f.jobs.size,0,'forced fallback requires no animation loop'));
const r=boot({systemReduced:true});
check(()=>assert.equal(r.jobs.size,0,'default respects reduced motion'));
const opt=boot({systemReduced:true,search:'?motion=on'});
check(()=>assert.equal(opt.jobs.size,1,'explicit review opt-in permits motion'));
opt.tick(50);opt.els['#horizon'].fire('webglcontextlost',{preventDefault(){}});
check(()=>assert.equal(opt.jobs.size,0,'context loss cancels rendering'));
check(()=>assert.equal(opt.els['.scene'].classes.has('is-live'),false,'context loss reveals fallback'));
opt.els['#horizon'].fire('webglcontextrestored');
check(()=>assert.equal(opt.jobs.size,1,'context restore restarts one loop'));
opt.els['#motion-toggle'].fire('click');
const pausedTime=opt.draws.at(-1).time;
opt.els['#horizon'].fire('webglcontextlost',{preventDefault(){}});
opt.els['#horizon'].fire('webglcontextrestored');
check(()=>assert.equal(opt.jobs.size,0,'paused restore does not start a loop'));
check(()=>assert.equal(opt.els['.scene'].classes.has('is-live'),true,'paused restore redraws the frozen scene'));
check(()=>assert.equal(opt.draws.at(-1).time,pausedTime,'paused restore preserves scene time'));
const prefPause=boot();prefPause.tick(100);prefPause.els['#motion-toggle'].fire('click');
prefPause.pref.matches=true;prefPause.pref.change();prefPause.pref.matches=false;prefPause.pref.change();
check(()=>assert.equal(prefPause.jobs.size,0,'paused preference recovery stays paused'));
check(()=>assert.equal(prefPause.els['.scene'].classes.has('is-live'),true,'paused preference recovery restores frozen artwork'));
const k=boot();k.buttons[1].fire('click',{detail:0});
check(()=>assert.equal(k.els['#after-artifact'].classes.has('is-entering'),false,'keyboard comparison is immediate'));
check(()=>assert.equal(k.buttons[1].attributes['aria-pressed'],'true'));
const absent=boot({webgl:false});
check(()=>assert.equal(absent.jobs.size,0,'missing WebGL keeps static fallback'));
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
check(()=>assert.match(html,/<figure class="artifact" id="before-artifact">/));
check(()=>assert.match(html,/<figure class="artifact" id="after-artifact">/));
check(()=>assert.match(html,/<svg class="static-horizon"/));
const manifest=JSON.parse(readFileSync(new URL('../docs/redesign/prototypes/horizon-v2/assets/manifest.json',import.meta.url),'utf8'));
for(const file of manifest.files){check(()=>assert.equal(createHash('sha256').update(readFileSync(new URL('../images/projects/'+file.file,import.meta.url))).digest('hex'),file.sha256,'capture integrity: '+file.file));}
check(()=>assert.equal(k.doc.querySelector('#comparison-announcement').textContent,'Storm-damaged house environment shown.'));
console.log(`${checks} regression checks passed. Mocked lifecycle checks do not establish browser/GPU rendering.`);
