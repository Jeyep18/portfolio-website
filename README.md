# John Francis Espiritu's portfolio

The active portfolio is the React application in [`docs/redesign/prototypes/space-gallery/`](docs/redesign/prototypes/space-gallery/). The HTML/CSS/JavaScript site at the repository root is an earlier implementation. GitHub Pages still publishes the root from `main`; building the React app does not update that site.

Read [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) for current decisions, verification limits, and pending work. [`AGENTS.md`](AGENTS.md) contains portable contributor instructions. [`docs/CODEX_CLOUD.md`](docs/CODEX_CLOUD.md) explains the planned cloud environment and separate hosted preview.

## Build the active application

Run these commands from the repository root with Node.js and npm installed:

```sh
cd docs/redesign/prototypes/space-gallery
npm ci
npm run build
```

The lockfile records React 19.3.1, React DOM 19.3.1, GSAP 3.15.1, TypeScript 7.0.2, and Vite 8.3.7. The local reference runtime is Node.js 24.14.0 with npm 11.9.0. Linux/cloud compatibility still needs verification.

The build checks TypeScript, builds the application, prerenders `index.html`, `archive.html`, and `cherit.html`, and copies curated assets into `dist/assets/`. There is no backend or required environment secret.

To inspect the built output, run this optional Python helper from the repository root:

```sh
python docs/redesign/prototypes/space-gallery/preview.py
```

Open `http://127.0.0.1:8769/`. Rebuild after source changes. `?motion=off` disables motion, `?motion=on` enables it, and `?fallback=1` selects the hero fallback. The Python helper supports `?scripts=off` to inspect prerendered content without client JavaScript. Loopback previews require the laptop to stay on and are not public phone-accessible URLs.

## Where to edit

| Purpose | Active application path |
| --- | --- |
| Page composition and navigation | `src/App.tsx` |
| Shared layout and styles | `src/styles.css` |
| Projects, events, links, photos, and alt text | `src/data.ts` |
| About content | `src/components/ToolsAbout.tsx` |
| Motion preferences and navigation transitions | `src/motion.tsx` |
| Prerendering and asset copy | `scripts/prerender.mjs` |
| Approved public media | `assets/` |

Paths in this table are relative to `docs/redesign/prototypes/space-gallery/`. Earlier standalone scripts in that folder are retained history; the React entry points determine which source is active.

Keep the five projects, four events, team credits, AI assistance, and prototype status accurate. The supplied resume and three certificate links are already populated. Do not invent missing content or impact claims.

## Verification and publication

`npm run build` is the active app's required build check. Browser review must cover responsive layouts, links, keyboard operation, dialogs, pause/reduced motion, and readable script-free output. Build success alone does not establish visual or physical-device acceptance.

The separate legacy checks are:

```sh
node --check script.js
node tests/site.test.mjs
```

The legacy suite passed 40 checks on November 11, 2026. It does not test the React application.

A dedicated branch, `codex/portfolio-cloud-handoff`, and a separate Vercel preview are the approved publication targets for the handoff. Check their actual status in [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md). Keep the existing GitHub Pages deployment unchanged. No cloud setup, remote push, hosted preview, or laptop-off phone acceptance is established by this README.

Keep `.codex-attachments/`, dependencies, build output, credentials, provider metadata, caches, and logs out of published source. Preserve historical studies under `docs/redesign/` and the original source backup under `docs/redesign/source-before-redesign/`.
