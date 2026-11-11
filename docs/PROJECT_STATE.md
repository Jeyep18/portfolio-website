# Portfolio project state

Updated November 11, 2026, Asia/Manila. This is the portable handoff for the current project. Recheck Git, deployment, and platform state before acting. Historical notes are retained in [`../PROJECT_MEMORY.md`](../PROJECT_MEMORY.md) and `redesign/`.

## Current direction

John Francis Espiritu is a Computer Science student seeking frontend internships, with full-stack work as a later direction. The portfolio uses a clean, mostly monochrome space atmosphere with purposeful motion. Preserve truthful project ownership and team/AI contribution language.

The active application is `docs/redesign/prototypes/space-gallery/`. It is a React migration with three prerendered pages. The repository root remains an older static homepage. Earlier horizon/frontend studies and `redesign/source-before-redesign/` are historical material, not the active implementation.

## Approved work and status

| Item | State at this handoff |
| --- | --- |
| React application, resume, certificates, event gallery, project dialogs | Implemented locally; earlier verification is recorded in the active app README |
| Controlled GSAP anchor scrolling | Implemented; local build and navigation edge-case tests pass; browser trajectory check pending |
| Compact two-column About | Implemented; build passes; visual/mobile review pending |
| Sparse space background replacing DarkVeil | Implemented; renderer lifecycle reviewed; live motion review pending |
| Canvas particle headings | Implemented with semantic/static fallback; glyph alignment and pointer review pending |
| Portable project instructions and cloud handoff | Prepared in this documentation update |
| `codex/portfolio-cloud-handoff` branch and selected public source/assets | Branch created locally; commit and push pending |
| Separate Vercel preview from the active app directory | Approved target; setup/deployment and live checks pending |
| Saved Codex Cloud environment | None confirmed at this handoff |
| Android phone review while laptop is off | Required and not performed |

An approved step is not a verified outcome. Update the table after observing the result. Do not infer cloud or public-hosting readiness from local build success.

## Repository and hosting

- Public repository: [`Jeyep18/portfolio-website`](https://github.com/Jeyep18/portfolio-website).
- Inspected baseline: `main` at `d5d50d8`. The handoff branch contains uncommitted work. Recheck before edits or publication.
- Approved handoff branch: `codex/portfolio-cloud-handoff`. Keep the existing `main` GitHub Pages deployment unchanged.
- GitHub Pages currently publishes the older root site from `main` and `/`. It does not publish the nested React build automatically.
- The Vercel preview must use John's own Vercel account. The connector currently points at inaccessible `jan-s-projects7`; use the platform's account/team selection or connection flow. Do not change access or choose another team's project as a workaround.
- A separate preview requires no custom domain, paid service, backend, or database. A loopback server is not the hosted preview.

## Build and source map

Work from `docs/redesign/prototypes/space-gallery/` for all npm commands:

```sh
npm ci
npm run build
```

Exact lockfile versions are React 19.3.1, React DOM 19.3.1, GSAP 3.15.1, TypeScript 7.0.2, and Vite 8.3.7. The local reference is Node.js 24.14.0 and npm 11.9.0. These are observed local versions, not proof of a Linux/cloud run.

`src/App.tsx` composes pages. `src/data.ts` owns portfolio data. Components live under `src/components/`; shared motion is in `src/motion.tsx`, visual effects in `src/effects/`, and styles in `src/styles.css`. `scripts/prerender.mjs` fills the three HTML shells and copies the complete curated `assets/` directory into `dist/assets/`. Keep license notices.

The output directory is `dist`. For the separate Vercel project, select root directory `docs/redesign/prototypes/space-gallery`, install command `npm ci`, build command `npm run build`, and output directory `dist`. Preserve `.html` routes and relative assets. Do not add an SPA catch-all without evidence that these prerendered pages need one.

From the repository root, optional `python docs/redesign/prototypes/space-gallery/preview.py` serves the built output at `http://127.0.0.1:8769/`. The helper supports `?scripts=off`; default rendering follows the system motion preference, with `?motion=off` and `?motion=on` overrides. Python is not a production requirement. No environment secrets are needed.

## Content and publication boundary

Keep the five projects: CherIt, Bagyong Bahay, TransitPH, DeMolay chapter website, and veterinary clinic system. Keep the four events: InnoLab Hackathon, SparkLab Hackathon, BYTE 2025, and PyCon APAC. PyCon dates are March 1-2, 2025.

The supplied resume PDF and SparkLab, BYTE, and PyCon certificate links are populated. Five supplied event photos are curated in `assets/events/`. Approved public assets include that resume, those event photos, and the selected game captures. This approval does not include raw reference uploads or private game builds.

Preserve these evidence limits:

- CherIt is a team hackathon prototype with browser-local and simulated behavior. John's work includes direction, feature design, QA, and presentation. Do not imply sole ownership, real payments, verification, adoption, or measured educational impact.
- Bagyong Bahay is a private test candidate. John led the project and contributed architecture, 3D maps, and visual direction. Teammates contributed implementation; development used substantial AI assistance. Game captures are not a public release.
- TransitPH remains in progress. The veterinary system is an academic prototype. DeMolay remains in development without a confirmed public project URL.

Still needed: About portrait, InnoLab certificate URL, BYTE and PyCon photos with descriptions, and DeMolay public URL. Keep clear placeholders or omit unavailable destinations.

Commit/upload the source, lockfile, build configuration, scripts, portable docs, license notices, and approved curated assets needed to rebuild. Exclude `.codex-attachments/`, `node_modules/`, `dist/`, `.env` and secret files, `.vercel/`, caches, logs, private records, private game packages, and full private global memories/chat history. Preserve historical docs and local memories; exclusion from publication does not authorize deletion.

## Verification record and remaining checks

The root legacy suite `node tests/site.test.mjs` passed 40 checks on November 11, 2026. It reads the root `script.js` and does not cover the active React application.

The [active app README](redesign/prototypes/space-gallery/README.md) records earlier TypeScript/build/prerender and browser checks. Those checks predate the four in-progress UI changes. Recheck affected behavior after those changes before marking them verified.

Required React acceptance includes a fresh build; all three pages and assets; desktop and narrow layouts; anchor destinations and interrupted scrolling; keyboard/dialog focus and dismissal; shared pause/reduced motion; readable script-free output; cleanup of decorative renderers; and no application console errors in the exercised flows. Linux/cloud build, public routes/assets, physical Android touch, and laptop-off persistence remain unverified.

See [`CODEX_CLOUD.md`](CODEX_CLOUD.md) for platform setup, a reusable first-task prompt, and the phone acceptance checklist. A new cloud task starts from the published repository state, not this local conversation or uncommitted files.

## Current verification update

The current UI revision passes TypeScript, build/prerender, four navigation edge-case tests, generated page/local asset/anchor checks, and the separate 40 legacy checks. A source-only temporary copy installed and built independently of the working node_modules. Package versions are pinned and Linux optional packages remain in the lockfile. GitHub Actions will check Linux after push.

Browser verification is blocked because local browser use is disabled in Work settings. John is connected from Android and cannot operate the laptop UI during this pass. Do not represent earlier screenshots as validation of the new About layout, space field, particle headings, or controlled navigation. Vercel deployment remains blocked on selecting and authorizing John's own account; do not use the inaccessible preconfigured workspace.
