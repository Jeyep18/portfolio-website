# Portfolio project state

Updated November 11, 2026, Asia/Manila. This is the portable handoff for the current project. Recheck Git, deployment, and platform state before acting. Historical notes are retained in [`../PROJECT_MEMORY.md`](../PROJECT_MEMORY.md) and `redesign/`.

## Latest Cloud pass

Remote `codex/portfolio-cloud-handoff` was verified at `e495ed3` before this pass;
`main` remained `d5d50d8`. The branch was checked out cleanly in a running Cloud
executor. Node **24.14.0**, npm **11.9.0**, clean installation, all four required
React checks and the 40 separate legacy checks passed. Cloud Chromium exercised
the current UI, including desktop/narrow layouts and emulated Pixel 7 touch.
See [`CLOUD_VERIFICATION.md`](CLOUD_VERIFICATION.md) for actual evidence and limits.

The reusable installer is `scripts/cloud-setup.sh`. Cloud status has no saved
source configuration/version ID, and no publish tool is available in this task.
Publishing a reusable environment and physical Android/laptop-off acceptance
remain pending phone actions; see [`CODEX_CLOUD.md`](CODEX_CLOUD.md).

John authorized a separate Vercel CLI device sign-in from Android. It identifies
his account as **jfmihoyofriends-9058**, on **Hobby**. New project
**portfolio-space-gallery** belongs to that account. The connector still returns
403 for `jan-s-projects7`; that workspace was not authorized or modified.

| Hosted result | Verified value |
| --- | --- |
| Public phone URL | https://portfolio-space-gallery.vercel.app/ |
| Separate Preview | https://portfolio-space-gallery-6yswp7340-jfmihoyofriends-9058.vercel.app/ |
| Deployed branch/commit | `codex/portfolio-cloud-handoff` / `d4ddf1dbc2a39ced1e6d61cd871cec761974f255` |
| Vercel project | `portfolio-space-gallery` / `prj_8h6eJsFTfJGvGF6A1hgHmK2H6mma` |
| Preview deployment | `dpl_os6qXeeSPakdv3uGSRGZFnMZAkEV`, READY, Preview |
| Initial deployment | `dpl_CYikna3NEUJZSTeWS28ggti3ei5C`, READY, Production in the new project only |
| Build settings | Root `docs/redesign/prototypes/space-gallery`; `npm ci`; `npm run build`; `dist`; Node `24.x` |
| Live verification | All three pages hydrated; all 32 output files byte-identical to the checked Cloud build; desktop/narrow interactions passed on both URLs; no exercised app errors or failed requests |
| Access | Public alias works anonymously; Preview requires the authorized account's Vercel login |
| Source delivery | CLI upload from the clean committed branch; deployment metadata confirms exact Git SHA; 69 tracked application files only |
| Automatic Git previews | Pending: GitHub linking returns HTTP 400 because the new Vercel account has no GitHub Login Connection |

Vercel requires the first deployment of a new project to be Production. John
explicitly approved that first deployment, followed by the separate Preview.
Both use the same source commit on Hobby/basic build infrastructure. No custom
domain, paid option, main merge, or GitHub Pages change was made. Subsequent
handoff documentation commits do not change the deployed application. [Linux CI
also passed for the deployed commit](https://github.com/Jeyep18/portfolio-website/actions/runs/42986188793).

Use the public phone URL for the simplest review. Deployment protection was
preserved; the Preview was browser-tested with a project-scoped development OIDC
header. The temporary automation bypass created by a CLI HTTP probe was revoked.
Future Cloud tasks can update the Preview manually after account/device sign-in.
GitHub push alone will not redeploy this project until its Git connection is set
up. See `CODEX_CLOUD.md` for that optional phone step.

## Current direction

John Francis Espiritu is a Computer Science student seeking frontend internships, with full-stack work as a later direction. The portfolio uses a clean, mostly monochrome space atmosphere with purposeful motion. Preserve truthful project ownership and team/AI contribution language.

The active application is `docs/redesign/prototypes/space-gallery/`. It is a React migration with three prerendered pages. The repository root remains an older static homepage. Earlier horizon/frontend studies and `redesign/source-before-redesign/` are historical material, not the active implementation.

## Approved work and status

| Item | State at this handoff |
| --- | --- |
| React application, resume, certificates, event gallery, project dialogs | Built and exercised in Cloud; public and protected hosted routes/assets verified |
| Controlled GSAP anchor scrolling | Cloud Chromium trajectory, rapid/interrupted navigation, history and motion toggling passed |
| Compact two-column About | Cloud desktop/tablet and narrow layout review passed; physical phone pending |
| Sparse space background replacing DarkVeil | Cloud pause/resume pixel and 105-star continuity checks passed |
| Canvas particle headings | Cloud formation, pointer response/settling, static and semantic fallbacks checked |
| Portable project instructions and cloud handoff | Reusable exact-Node installer tested; phone startup/publication instructions updated |
| `codex/portfolio-cloud-handoff` branch and selected public source/assets | Cloud setup and verification updates pushed; deployed source commit `d4ddf1d`; main unchanged |
| Separate Vercel preview from the active app directory | READY under the authorized own Hobby account; URLs, commit and live evidence above |
| Saved Codex Cloud environment | Current task runs in Cloud; saved/published reusable environment still not confirmed |
| Android phone review while laptop is off | Required and not performed |

An approved step is not a verified outcome. Update the table after observing the result. Do not infer cloud or public-hosting readiness from local build success.

## Repository and hosting

- Public repository: [`Jeyep18/portfolio-website`](https://github.com/Jeyep18/portfolio-website).
- Inspected baseline: `main` at `d5d50d8`. The implementation is committed and pushed on the handoff branch, followed by documentation updates. Recheck Git status and the latest remote commit before changes.
- Approved handoff branch: `codex/portfolio-cloud-handoff`. Keep the existing `main` GitHub Pages deployment unchanged.
- GitHub Pages currently publishes the older root site from `main` and `/`. It does not publish the nested React build automatically.
- The Vercel preview uses John's separately authorized `jfmihoyofriends-9058` Hobby account through Cloud CLI. The connector still points at inaccessible `jan-s-projects7`; leave that workspace and its permissions untouched.
- A separate preview requires no custom domain, paid service, backend, or database. A loopback server is not the hosted preview.

## Build and source map

Work from `docs/redesign/prototypes/space-gallery/` for all npm commands:

```sh
npm ci
npm run build
```

Exact lockfile versions are React 19.3.1, React DOM 19.3.1, GSAP 3.15.1, TypeScript 7.0.2, and Vite 8.3.7. Actual Cloud checks passed on Node.js 24.14.0 and npm 11.9.0. Linux CI also passed with the committed Node pin and lockfile. Publishing a reusable Codex Cloud environment remains a separate pending step.

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

The [active app README](redesign/prototypes/space-gallery/README.md) distinguishes earlier browser checks from the latest automated checks. Earlier browser results predate the four revised UI behaviors. They do not establish the current visual or interaction quality.

Required React acceptance includes a fresh build; all three pages and assets; desktop and narrow layouts; anchor destinations and interrupted scrolling; keyboard/dialog focus and dismissal; shared pause/reduced motion; readable script-free output; cleanup of decorative renderers; and no application console errors in the exercised flows. Linux CI build is verified. Current browser behavior, Codex Cloud setup, hosted routes/assets, physical Android touch, and laptop-off persistence remain unverified.

See [`CODEX_CLOUD.md`](CODEX_CLOUD.md) for platform setup, a reusable first-task prompt, and the phone acceptance checklist. A new cloud task starts from the published repository state, not this local conversation or uncommitted files.

## Current verification update

The current UI revision passes TypeScript, build/prerender, four navigation edge-case tests, generated page/local asset/anchor checks, and the separate 40 legacy checks. A source-only temporary copy installed and built independently of the working node_modules. Package versions are pinned and Linux optional packages remain in the lockfile. GitHub Actions passed clean Linux installation and all these checks for implementation commit `b281ba5`.

At the previous laptop handoff, browser verification was blocked by Work settings
and Vercel by account selection. The current Cloud pass resolved browser access
and own-account CLI authorization without laptop interaction. Current screenshots
and results are linked in `CLOUD_VERIFICATION.md`. Physical-phone acceptance and
reusable environment publication are still distinct pending steps.

## Remote verification

Implementation commit: [`b281ba5cf33028535b24da44673d64e1c8dd62e9`](https://github.com/Jeyep18/portfolio-website/commit/b281ba5cf33028535b24da44673d64e1c8dd62e9). The remote tree matched all 172 committed files, including required source, documentation, lockfile, licenses, and curated media. Raw attachments, node_modules, dist, and .vercel were excluded. [Linux CI passed](https://github.com/Jeyep18/portfolio-website/actions/runs/42982527748). Main remains `d5d50d8`, and GitHub Pages still publishes main at `/`. Later documentation-only commits may follow this implementation commit.

The new Vercel project exists under the authorized own account; deployment/live
verification is recorded in the latest status above. A saved published Cloud
environment and physical Android/laptop-off checks remain pending. GitHub
publication alone does not establish either result.
