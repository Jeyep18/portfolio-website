import { useState, type CSSProperties } from 'react';
import { tools } from '../data';
import { Reveal, useMotion } from '../motion';
import { ParticleHeading } from './ParticleHeading';
import { AnimatedDetails } from './AnimatedDetails';

const skillGroups = [
  ['Web interfaces', 'HTML, CSS, JavaScript, React & TypeScript'],
  ['Programming & apps', 'Python, C++, Dart & Flutter'],
  ['Data & systems', 'PHP, SQL, MySQL & Oracle Database'],
  ['Visual design', 'Interface prototyping, graphics & video editing']
];
const workflow = [
  { title: 'Understand', subtitle: 'Start with the problem.', icon: 'discover',
    copy: 'Clarify what needs to work, who it is for, and what the project needs to achieve.',
    detail: 'A clear problem and a shared direction.' },
  { title: 'Plan', subtitle: 'Give the idea a shape.', icon: 'plan',
    copy: 'Sketch the interface, explore the layout, and break the work into manageable steps.',
    detail: 'An interface direction and a plan to build it.' },
  { title: 'Build', subtitle: 'Make it work, step by step.', icon: 'build',
    copy: 'Build in small changes and use Git to keep them reviewable. AI assistants help me explore approaches and debug while I test the result.',
    detail: 'A working version to try and review.' },
  { title: 'Refine', subtitle: 'Try it. Listen. Improve.', icon: 'refine',
    copy: 'Test the experience, review feedback, and improve the details. Revisit earlier decisions when something can work better.',
    detail: 'A clearer, more usable result.' }
];

function SectionIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    discover: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 6 6M7 10h6m-3-3v6',
    plan: 'M4 4h6v6H4zM14 14h6v6h-6zM10 7h7v7M7 10v7h7',
    build: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',
    refine: 'm7 12 3 3 7-7M20 7V3l-3 2a9 9 0 1 0 4 9',
    learning: 'm2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7M22 8v9',
    opportunity: 'M5 7h14v14H5zM9 7V3h6v4M5 12h14M10 12v3h4v-3'
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.build} /></svg>;
}

function Process() {
  const [active, setActive] = useState(0);
  const { ready } = useMotion();
  return <div className="process" data-ready={ready || undefined}>
    <div className="process-heading"><h3>How I approach a project</h3></div>
    <ol className="process-steps" aria-label="Project process steps">
      {workflow.map((step, index) => <li key={step.title}><button type="button" disabled={!ready}
        aria-pressed={index === active} aria-controls={'process-step-' + index}
        onClick={() => setActive(index)}><span className="step-number">0{index + 1}</span><span>{step.title}</span></button></li>)}
    </ol>
    <div className="process-cards" aria-live="polite">
      {workflow.map((step, index) => <article className="process-card" id={'process-step-' + index}
        key={step.title} hidden={ready && index !== active}>
        <span className="process-icon"><SectionIcon name={step.icon} /></span>
        <p className="process-copy"><strong>{step.title}.</strong> {step.copy}</p>
      </article>)}
    </div>

  </div>;
}

export function Tools() {
  const [selected, setSelected] = useState('');
  return <section className="toolkit chapter shell" id="tools" aria-labelledby="tools-title">
    <div><p className="eyebrow">Capabilities & process</p><ParticleHeading id="tools-title">From an idea<br />to something useful<span>.</span></ParticleHeading>
      <Reveal delay={.45}><p className="section-deck">I use design tools to explore an interface, code to make it work, and Git to keep changes reviewable. AI assistants help me explore approaches and debug as I test and refine the result.</p></Reveal></div>
    <Reveal><div className="tool-list" role="group" aria-label="Tools I work with">
      {tools.map(([name, icon, description], index) => <button key={icon} type="button"
        className="tool-button" aria-pressed={selected === icon} title={description}
        style={{ '--phase': (-index * .61) + 's' } as CSSProperties}
        onClick={() => setSelected(selected === icon ? '' : icon)}>
        <span className="tool-icon"><img src={'assets/logos/' + icon + '.svg'} width="32" height="32" alt="" /></span>
        <span>{name}</span>
      </button>)}
    </div></Reveal>
    <Reveal><div className="skills-grid">{skillGroups.map(([title, copy]) =>
      <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div></Reveal>
    <Reveal><Process /></Reveal>
  </section>;
}

export function About() {
  return <section className="about chapter shell" id="about" aria-labelledby="about-title">
    <div className="about-heading"><p className="eyebrow">A little more personal</p><ParticleHeading id="about-title">More than the code<span>.</span></ParticleHeading></div>
    <div className="about-layout">
      <Reveal delay={.35}><aside className="profile-column" aria-label="Profile and education">
        <figure className="profile-photo"><img src="assets/profile-placeholder.jpg" width="720" height="1280" loading="lazy" alt="Temporary profile image supplied for layout preview" /><figcaption>Temporary photo</figcaption></figure>
        <div className="profile-identity">
        <h3>John Francis Espiritu</h3><p className="profile-role">Computer Science student<br />Frontend development</p>
        <p className="profile-location">Pili, Camarines Sur, Philippines</p></div>
        <dl className="profile-facts"><div><dt>Studying</dt><dd>BS Computer Science, third year</dd></div>
          <div><dt>University</dt><dd>Ateneo de Naga University<small>August 2024 – present</small></dd></div>
          <div><dt>First-year GPA</dt><dd>3.62</dd></div></dl>
        <a className="button button-quiet resume-link" href="assets/john-francis-espiritu-resume.pdf" download>Download résumé ↗</a>
      </aside></Reveal>
      <Reveal delay={.5}><div className="about-reading">
        <div className="about-story"><h3>Development with a creative side.</h3>
          <p>I like turning ideas into interfaces people can understand and use. I’m focused on frontend development, while exploring how apps, games, and design can solve different kinds of problems.</p></div>
        <div className="about-disclosures">
          <AnimatedDetails className="about-disclosure" summary={<>How I work<span aria-hidden="true">+</span></>}>
            <p>I value clear communication, careful planning, and feedback. I break work into small steps, test what I build, and review the result before moving on. Working with a team has taught me to explain decisions and stay open to better approaches.</p>
          </AnimatedDetails>
          <AnimatedDetails className="about-disclosure" summary={<>Beyond development<span aria-hidden="true">+</span></>}>
            <p>I enjoy graphic design, art, and creating game environments. Space, science, and the atmosphere of <em>Interstellar</em> inspire my visual work.</p>
            <div className="traits"><span>Curious</span><span>Attentive to detail</span><span>Open to feedback</span></div>
          </AnimatedDetails>
        </div>
        <section className="about-current" aria-labelledby="current-title">
          <div className="current-heading"><span className="status-dot" aria-hidden="true" /><h3 id="current-title">Where I am right now</h3></div>
          <dl>{[
            ['build', 'Building', 'My frontend portfolio'],
            ['learning', 'Learning', 'Broader full-stack skills'],
            ['opportunity', 'Looking for', 'A frontend internship']
          ].map(([icon, label, value]) => <div key={label}><dt><span className="current-icon"><SectionIcon name={icon} /></span>{label}</dt><dd>{value}</dd></div>)}</dl>
        </section>
      </div></Reveal>
    </div>
  </section>;
}
