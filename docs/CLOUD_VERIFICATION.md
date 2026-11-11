# Cloud verification — November 11, 2026

The public branch `codex/portfolio-cloud-handoff` was fetched and checked out at
`e495ed39e45beb3ec8c300e96f9c0196352c1d07`. Remote `main` was
`d5d50d8e624792caf97c615bde6ca5c618a0576d`. The checkout started clean.
The application source was not changed during these checks.

## Runtime and automated checks

Actual Cloud runtime: Linux 6.18.57 x86_64, Node.js **24.14.0**, npm **11.9.0**,
Python 3.12.14, Playwright 1.62.0, Chromium 156.0.8078.79.
The environment initially supplied Node 24.22.1; the requested 24.14.0 release
was downloaded from nodejs.org and checked against its published SHA-256 list.

| Command | Working directory | Result |
| --- | --- | --- |
| `npm ci` | Active application | Pass; 29 packages installed from lockfile |
| `npm test` | Active application | Pass; four navigation edge-case tests |
| `npm run build` | Active application | Pass; TypeScript, Vite, three-page prerender and asset copy |
| `npm run check:build` | Active application | Pass; three pages, unique IDs, local links/assets, semantic text and résumé |
| `node tests/site.test.mjs` | Repository root | Pass; 40 legacy checks, which do not validate React |
| `bash scripts/cloud-setup.sh` | Repository root | Pass; independently installed the pinned runtime and repeated all the above |

No application dependency or lockfile change was needed. The reusable installer
stores its runtime in ignored `.cache/portfolio-cloud/`. Vercel configuration
records the requested install, build and output settings without an SPA rewrite.

## Built application in Cloud Chromium

The built `dist` directory was served by the repository's `preview.py` on Cloud
loopback, not by the laptop. A temporary Python Playwright harness exercised the
following flows against that build:

- Anchor navigation crossed intermediate positions; a sampled About navigation
  moved from the top to approximately 3698px through multiple distinct positions.
- Rapid successive links ended at the last requested section. Wheel and Escape
  interrupted the scroll tween. Back/forward restored the corresponding section.
- A same-page link cancelled a pending cross-page departure. Motion toggling
  during a tween stopped it without jumping to the hash destination. Toggling
  at a settled section retained the scroll position.
- Particle headings formed readable text. Pointer movement changed the canvas;
  leaving it let the heading settle and stop scheduling frames. Semantic HTML
  text remained present, and static motion displayed that text directly.
- The background's pixels remained identical while paused. Resuming retained
  all 105 stars, including their sizes and nearby positions; pointer parallax
  caused a small position change. Dialog inspection also paused the background.
- About used two columns at 1440px and 820px, one at 390px and 320px. All three
  pages had no horizontal document overflow at 1440×900, 820×720, 390×844 and
  320×700. [Desktop capture](redesign/prototypes/space-gallery/captures/cloud-about-desktop.png)
  and [narrow capture](redesign/prototypes/space-gallery/captures/cloud-about-narrow.png)
  show this revision. These are Cloud screenshots, not Android captures.
- Both featured project dialogs opened, switched comparison images, dismissed
  with Escape/Close, and restored focus. All five archive project dialogs
  opened with the keyboard. Tab did not focus background page controls while
  a native modal was open; browser chrome can receive focus during the cycle.
- All four experience entries selected correctly. All five curated photos
  opened at their natural resolution, closed, and restored trigger focus.
  Gallery previous/next and keyboard selection worked. Missing media retained
  its honest placeholders.
- The résumé downloaded as a PDF. SHA-256:
  `86558fd991d2d815878f47ce146a7d0888163af550331df7c5715cc343cbd761`.
- `index.html`, `archive.html` and `cherit.html` rendered. With JavaScript
  disabled, each retained readable content and headings; native archive and
  timeline disclosures worked.
- A reduced-motion browser context used static headings and the Enable motion
  button. Changing the system preference enabled motion when no override was set.
- Emulated Pixel 7 touch navigation and project-dialog opening/closing passed.
  This does not establish physical Android touch behavior.
- No application console errors or failing local asset requests were observed
  in the exercised checks. External certificate destinations were preserved;
  their third-party availability was not audited.

No application defect requiring a source correction was found in these flows.
Some arrow symbols lack a glyph in the Cloud Linux font fallback; actual Android
font rendering remains part of phone acceptance.

## Platform status

The current Cloud executor is connected and running, with enforced unrestricted
network access. Its status has `source_config_id: null` and
`source_config_version_id: null`: this is a running task, not evidence of a saved,
published reusable environment. No environment save/publish tool is offered in
this task. Follow [the phone setup instructions](CODEX_CLOUD.md) to publish one.

The Vercel connector still points at inaccessible `jan-s-projects7` (HTTP 403).
That workspace was not authorized or changed. The user completed Vercel's device
authorization from Android for the separate Cloud CLI. The CLI identified the
authorized own account as `jfmihoyofriends-9058`, on the free Hobby plan.
A separate `portfolio-space-gallery` project was created there. Vercel's first
deployment required a Production label; John explicitly approved that initial
deployment in the new project, followed by the separate Preview. Both are READY
at commit `d4ddf1dbc2a39ced1e6d61cd871cec761974f255`.

- Public phone URL: https://portfolio-space-gallery.vercel.app/ (anonymous HTTP 200).
- Protected Preview: https://portfolio-space-gallery-6yswp7340-jfmihoyofriends-9058.vercel.app/.
- Preview ID: `dpl_os6qXeeSPakdv3uGSRGZFnMZAkEV`.
- Initial deployment ID: `dpl_CYikna3NEUJZSTeWS28ggti3ei5C`.
- Vercel API metadata confirms the exact Git branch and commit above. This is a
  CLI source upload, not an established Git integration. The dry-run manifest
  verified 69 tracked application source/asset files, 1,175,454 bytes; dependencies,
  build output, captures, caches, unrelated studies and private files were excluded.
- Both Vercel builds ran `npm ci` and `npm run build` successfully with Node
  `24.x` configured. The provider controls its patch version; it was not separately
  measured. The exact Cloud runtime above was measured. Vercel's npm emitted a
  nonfatal provider `cache-dir` configuration warning.
- Hosted Chromium checks on both URLs loaded and hydrated all three pages,
  exercised anchors, particle formation, motion pause/resume, project dialogs,
  experience photo dialogs and keyboard focus at desktop/narrow sizes.
- All **32** hosted output files (three HTML pages plus all bundled/curated
  assets) were fetched and matched the checked local build's SHA-256 hashes.
  No application console errors or failed requests occurred in the hosted checks.
- All three public pages remained readable with JavaScript disabled.
- Preview browser requests used a short-lived, project-scoped development OIDC
  header, sent only to the Preview origin. No token was printed or committed.
  An earlier `vercel curl` probe generated an automation bypass; that single test
  bypass was revoked. The project's Vercel authentication setting was preserved.
- [Linux CI passed on the deployed commit](https://github.com/Jeyep18/portfolio-website/actions/runs/42986188793).

GitHub linking returned HTTP 400: this Vercel account needs a GitHub Login
Connection. Automatic previews on push remain unconfigured. Manual Cloud CLI
deployment works after phone/device sign-in. See `CODEX_CLOUD.md` for the optional
Git connection step and `PROJECT_STATE.md` for the user-facing status.

Physical Android, actual laptop-off reload, Firefox/Safari, and a fresh task from
a published reusable Cloud environment remain separate acceptance checks.
