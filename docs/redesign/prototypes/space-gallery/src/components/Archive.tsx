import { useState } from 'react';
import { projects } from '../data';
import { Modal } from './Modal';
import { Reveal, useMotion } from '../motion';
import { ParticleHeading } from './ParticleHeading';

export function Archive() {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const { ready } = useMotion();
  return <main className="archive shell" id="main">
    <div><p className="eyebrow">The collection</p><ParticleHeading as="h1">Project archive<span>.</span></ParticleHeading>
      <Reveal><p className="page-intro">Selected work, academic projects, and experiments in progress.</p></Reveal></div>
    <div className="archive-list">
      {projects.map(project => <details className="archive-item" id={project.id} key={project.id}>
        <summary className="archive-summary" aria-haspopup={ready ? 'dialog' : undefined}
          onClick={event => { if (ready) { event.preventDefault(); setSelected(project); } }}>
          <span><strong>{project.name}</strong><span className="archive-description">{project.description}</span></span>
          <span className="archive-meta"><span>{project.status}</span><span>{project.stack}</span></span>
          <span className="archive-arrow" aria-hidden="true">↗</span>
        </summary>
        <div className="archive-details"><p>{project.details}</p>
          {project.href && <a className="text-link" href={project.href}>{project.action} ↗</a>}
        </div>
      </details>)}
    </div>
    <a className="text-link back-link" href="./#work">↖ Back to selected work</a>
    <Modal title={selected?.name || 'Project details'} open={Boolean(selected)} onClose={() => setSelected(null)}>
      <p className="eyebrow">{selected?.status} · {selected?.stack}</p>
      <p className="modal-copy">{selected?.details}</p>
      {selected?.href && <a className="text-link" href={selected.href}>{selected.action} ↗</a>}
    </Modal>
  </main>;
}
