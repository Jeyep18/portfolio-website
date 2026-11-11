# John Francis Espiritu's portfolio

The active portfolio is the React application in [`docs/redesign/prototypes/space-gallery/`](docs/redesign/prototypes/space-gallery/). The HTML/CSS/JavaScript site at the repository root is an earlier implementation. GitHub Pages still publishes the root from `main`; building the React app does not update that site.

Read [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) for current decisions, verification limits, and pending work. [`AGENTS.md`](AGENTS.md) contains portable contributor instructions. [`docs/CODEX_CLOUD.md`](docs/CODEX_CLOUD.md) explains the planned cloud environment and separate hosted preview.

The separate React site is available at https://portfolio-space-gallery.vercel.app/. It was built and tested in Cloud, and John confirmed all three pages load on Android with the laptop off. The [handoff](docs/CODEX_CLOUD.md#reopen-from-android-with-the-laptop-off) includes viewing and reusable environment publication steps; full physical interaction review and environment publication remain pending.

## Build the active application

Run these commands from the repository root with Node.js and npm installed:

```sh
cd docs/redesign/prototypes/space-gallery
npm ci
npm run build
```

The lockfile records React 19.3.1, React DOM 19.3.1, GSAP 3.15.1, TypeScript 7.0.2, and Vite 8.3.7. Node.js 24.14.0 with npm 11.9.0 passed the Cloud install, tests, build and output checks. From a Linux checkout, `bash scripts/cloud-setup.sh` installs that checksum-verified runtime and runs all required checks. See [the Cloud verification record](docs/CLOUD_VERIFICATION.md) for browser evidence and remaining platform/device checks.

The build checks TypeScript, builds the application, prerenders `index.html`, `archive.html`, `cherit.html`, and the custom `404.html`, and copies curated assets into `dist/assets/`. There is no backend or required environment secret.

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

A dedicated branch, `codex/portfolio-cloud-handoff`, and the separate Vercel project are the publication targets for the handoff. Check deployed commits, completed checks and remaining environment/interaction steps in [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md). Keep the existing GitHub Pages deployment unchanged.

Keep `.codex-attachments/`, dependencies, build output, credentials, provider metadata, caches, and logs out of published source. Preserve historical studies under `docs/redesign/` and the original source backup under `docs/redesign/source-before-redesign/`.

For the Android Cloud → laptop continuation, use the [local Codex prompt](docs/LOCAL_CODEX_PROMPT.md), [handoff](docs/LOCAL_CODEX_HANDOFF.md), and [mobile reference index](docs/MOBILE_REFERENCES.md). The latest Git handoff does not deploy to Vercel.
