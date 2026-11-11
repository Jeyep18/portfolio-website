import { useState, type CSSProperties } from 'react';
import { tools } from '../data';
import { Reveal } from '../motion';
import { ParticleHeading } from './ParticleHeading';

const skillGroups = [
  ['Web interfaces', 'HTML, CSS, JavaScript, React & TypeScript'],
  ['Programming & apps', 'Python, C++, Dart & Flutter'],
  ['Data & systems', 'PHP, SQL, MySQL & Oracle Database'],
  ['Visual design', 'Interface prototyping, graphics & video editing']
];
const workflow = [
  ['Understand', 'Clarify the problem and who the work is for.'],
  ['Plan', 'Sketch the interface and break the work into steps.'],
  ['Build', 'Make small, reviewable changes with version control.'],
  ['Refine', 'Test the result, review feedback, and improve it.']
];

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
    <Reveal><div className="workflow"><h3>How I approach a project</h3>
      <ol>{workflow.map(([title, copy]) => <li key={title}><strong>{title}</strong><p>{copy}</p></li>)}</ol>
    </div></Reveal>
  </section>;
}

export function About() {
  return <section className="about chapter shell" id="about" aria-labelledby="about-title">
    <div className="about-heading"><p className="eyebrow">A little more personal</p><ParticleHeading id="about-title">More than the code<span>.</span></ParticleHeading></div>
    <div className="about-layout">
      <Reveal delay={.35}><aside className="profile-column" aria-label="Profile and education">
        <div className="profile-photo" aria-label="Profile photo pending"><span aria-hidden="true">JF</span><small>Profile photo pending</small></div>
        <h3>John Francis Espiritu</h3><p className="profile-role">Computer Science student<br />Frontend development</p>
        <p className="profile-location">Pili, Camarines Sur, Philippines</p>
        <dl className="profile-facts"><div><dt>Studying</dt><dd>BS Computer Science, third year</dd></div>
          <div><dt>University</dt><dd>Ateneo de Naga University<small>August 2024 – present</small></dd></div>
          <div><dt>First-year GPA</dt><dd>3.62</dd></div></dl>
        <a className="button button-quiet resume-link" href="assets/john-francis-espiritu-resume.pdf" download>Download résumé ↗</a>
      </aside></Reveal>
      <Reveal delay={.5}><div className="about-reading">
        <div className="about-story"><h3>Development with a creative side.</h3>
          <p>I like turning ideas into interfaces people can understand and use. I’m focused on frontend development, while exploring how apps, games, and design can solve different kinds of problems.</p></div>
        <div className="about-story"><h3>How I work</h3><p>I value clear communication, careful planning, and feedback. I break work into small steps, test what I build, and review the result before moving on. Working with a team has taught me to explain decisions and stay open to better approaches.</p></div>
        <div className="about-story"><h3>Beyond development</h3><p>I enjoy graphic design, art, and creating game environments. Space, science, and the atmosphere of <em>Interstellar</em> inspire my visual work.</p>
          <div className="traits"><span>Curious</span><span>Attentive to detail</span><span>Open to feedback</span></div></div>
        <div className="about-current"><h3>Currently</h3><dl>
          <div><dt>Building</dt><dd>My frontend portfolio</dd></div>
          <div><dt>Learning</dt><dd>Broader full-stack skills</dd></div>
          <div><dt>Looking for</dt><dd>A frontend internship</dd></div>
        </dl></div>
      </div></Reveal>
    </div>
  </section>;
}
