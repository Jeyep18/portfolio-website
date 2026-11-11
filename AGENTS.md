# Portfolio contributor instructions

Read `docs/PROJECT_STATE.md` before working. It is the authoritative project handoff. `PROJECT_MEMORY.md` retains historical decisions; older plans and verification reports are dated evidence, not current approval.

## Scope and authority

- Inspect the relevant source, callers, configuration, and Git status before changes. Protect unrelated working changes.
- Present intended edits and verification, then wait for plan approval before implementation. Continue an already approved scope through checks and corrections without asking again.
- Obtain explicit authorization for commits, push, merge, deployment, external writes, dependency installation, destructive actions, permission changes, paid operations, or sending project data to another provider. Follow the exact approved target and scope.
- Use the smallest coherent change. Do not add speculative features or dependencies. Do not reset, overwrite, force-push, or rewrite history.

## Active source

The active React application is `docs/redesign/prototypes/space-gallery/`. The root HTML/CSS/JavaScript site is a separate legacy implementation. GitHub Pages publishes that root from `main`; leave its configuration unchanged unless explicitly authorized.

From the repository root:

```sh
cd docs/redesign/prototypes/space-gallery
npm ci
npm run build
```

Use the lockfile. The local reference is Node.js 24.14.0 and npm 11.9.0. `npm run build` checks TypeScript, runs Vite, prerenders four pages (home, archive, CherIt, and 404), and copies `assets/` to `dist/`. No backend or environment secrets are required. Python is optional for `preview.py` at `127.0.0.1:8769`; its `?scripts=off` mode checks script-free output.

## Content, accessibility, and evidence

- Preserve five projects and four events, honest team/AI attribution, and prototype/private-test status. Never invent adoption, impact, qualifications, or public releases.
- Preserve semantic text, keyboard access, focus restoration, readable prerendered content, reduced motion, the shared pause control, and renderer cleanup. Decorative canvas effects must not replace accessible text.
- Use curated assets already approved for publication. Exclude raw `.codex-attachments/`, private game builds, private records, global memories/chat histories, `.env` files, `node_modules/`, `dist/`, `.vercel/`, caches, and logs from commits/uploads.
- Keep source-relative URLs compatible with the build. Preserve third-party license notices and asset provenance.

## Verification and handoff

Run targeted checks for the change, then review the final diff and Git status. `node tests/site.test.mjs` covers only the legacy root site; its 40 passing checks do not validate React.

For React changes, run `npm run build` and inspect affected desktop/mobile flows, keyboard/dialog behavior, motion preferences, console errors, and prerendered content. Report what actually ran and its limits. Do not claim Linux/cloud, hosted preview, Android touch, or laptop-off acceptance without direct evidence.

Update `docs/PROJECT_STATE.md` when an approved step is completed or a new blocking fact appears. No laptop-only skill, private global memory, or local absolute path is required to understand this project.
