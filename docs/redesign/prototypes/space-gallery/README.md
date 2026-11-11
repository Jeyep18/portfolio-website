# Space portfolio React preview

The approved React migration is isolated in this folder. The repository's main site and earlier prototypes remain separate. The handoff branch is deployed to [the separate Vercel site](https://portfolio-space-gallery.vercel.app/). See [current project state](../../../PROJECT_STATE.md) for the protected Preview, exact deployed commit and verification limits. The existing main/GitHub Pages deployment is unchanged.

## Run locally

From this folder, run `npm ci` when dependencies are missing, then `npm run build`. From the repository root, run `python docs/redesign/prototypes/space-gallery/preview.py` and open [the portfolio](http://127.0.0.1:8769/). The server binds to loopback and serves the prerendered `dist` build. Rebuild after source changes. Only one server can use port 8769.

The default URL follows the system motion preference. `?motion=on` enables motion, `?motion=off` selects the static presentation, and `?motion=on&fallback=1` uses the CSS eclipse. The Python server supports `?scripts=off` for checking readable content and native archive/timeline disclosures without JavaScript.

Runtime dependencies are React 19.3.1, React DOM 19.3.1, and GSAP 3.15.1. The build uses TypeScript 7.0.2 and Vite 8.3.7. Exact resolved versions are in `package-lock.json`.

## Source and behavior

- [src/App.tsx](src/App.tsx) composes the pages and navigation. [src/styles.css](src/styles.css) owns the current styling. The four HTML files are build shells. Earlier standalone scripts and styles are retained but are not loaded by these pages.
- [src/data.ts](src/data.ts) holds projects, contacts, tools, event details, certificates, photos, and alt text. Keep the approved five projects and four experiences until John chooses to expand them.
- [src/components/ToolsAbout.tsx](src/components/ToolsAbout.tsx) contains the skills, workflow, education, interests, current activities, and profile placeholder.
- [src/motion.tsx](src/motion.tsx) coordinates motion preference, scroll reveals, and internal page transitions. Anchor links use an explicit GSAP scroll controller with interruption, history, focus, and bounds handling. Desktop sections retain their viewport rhythm; mobile nonhero sections use natural height with tighter spacing.
- [src/components/ParticleHeading.tsx](src/components/ParticleHeading.tsx) assembles particles into the major headings, settles into crisp native HTML text, and responds locally to the pointer. Semantic HTML text remains available for assistive technology, selection, script-free output, and static motion settings. Formation runs once per mounted heading; settled render loops stop until interaction.
- [src/effects/SpaceField.tsx](src/effects/SpaceField.tsx) draws a sparse space background with small idle movement and depth. Stars and elapsed state survive pause and dialog inspection. The older DarkVeil source is preserved but no longer imported.
- [src/effects/eclipse.js](src/effects/eclipse.js) retains the original rotating planet with pointer-responsive rim light and independently drifting stars. The black hole renderer and toggle have been removed. No Three.js dependency was needed for the existing scene.
- [src/components/Experience.tsx](src/components/Experience.tsx) expands the selected event's description and links inside the left timeline. The right photo rail preserves each image's proportions, can show several portrait photos together, and opens a full-photo dialog. Arrow keys, gallery controls, and native scrolling update selection.
- [src/components/Archive.tsx](src/components/Archive.tsx) uses one rounded surface per card for hover, focus, and opening a project dialog. Without JavaScript the same cards expand as native details.
- [src/components/Contact.tsx](src/components/Contact.tsx) has one group of links with readable contact addresses. The particle field cycles through Email, GitHub, and LinkedIn at idle, dispersing between shapes. Hover or keyboard focus selects the matching shape. Touch users can follow each link directly.

Pause motion freezes the hero, logo drift, background, and contact particles and disables animated transitions. Hidden or offscreen renderers suspend their drawing loops. Modal inspection pauses the background effects and restores focus and page scrolling on dismissal.

The build prerenders the three portfolio pages and a custom `404.html` using [scripts/prerender.mjs](scripts/prerender.mjs), then React hydrates the existing content. Main copy, links, timeline disclosures, and archive details remain available without client JavaScript.

## Content and attribution

The supplied [resume PDF](assets/john-francis-espiritu-resume.pdf) is copied unchanged from `John_Francis_s_Resume.pdf`. Its source and served copy have matching SHA-256 hashes. Header and About links download this local file. Education, GPA, contact details, and certificate URLs use the supplied resume. SparkLab, BYTE, and PyCon certificate links are populated. PyCon is dated March 1-2, 2025.

The five supplied hackathon photos are under `assets/events/`. CherIt and Bagyong Bahay retain approved local-review captures from the [earlier study](../frontend-v1/README.md) and [game capture manifest](../horizon-v2/assets/manifest.json). Copy preserves team roles, AI assistance, and prototype status. Private game builds and unverified impact claims are not included.

The tools use local brand artwork from [Simple Icons](https://github.com/simple-icons/simple-icons) v16.0.0, with Canva from v11.0.0, and ChatGPT and CapCut from [Lobe Icons](https://github.com/lobehub/lobe-icons) v1.97.0.

Selected [React Bits](https://reactbits.dev/) source is included locally. AnimatedContent supplies body-content scroll reveals. The older DarkVeil component is retained as historical source and is not rendered by the current app. The [license notice](src/effects/REACT-BITS-LICENSE.md) is preserved. The hero, space field, particle headings, and contact particles are original effects.

## Pending content

- About profile photo.
- InnoLab Hackathon certificate URL.
- BYTE and PyCon event photos with descriptions.
- DeMolay public project URL when it is ready to be linked. Its archive dialog currently provides a description without a destination.

Add event media and links to `src/data.ts`. Replace the profile placeholder in `src/components/ToolsAbout.tsx`. Existing gallery previews provide the Bagyong destination while it remains a private test candidate.

## Earlier browser verification, November 11, 2026

- Strict TypeScript check, Vite build, and three-page prerender passed. Dependency audit reported zero known vulnerabilities at installation time.
- Static checks covered duplicate IDs, local assets, cross-page anchors, readable prerendered sections, and the exact resume PDF hash.
- In-app Chromium checks covered desktop 1440 x 900, tablet 820 x 720, and narrow screens at 390 x 844 and 320 x 700. No horizontal page overflow was observed.
- Checked timeline switching, all five supplied photos, gallery next/previous selection when portraits fit together, keyboard opening, full-photo dialogs, Escape, focus restoration, and photo placeholders.
- Checked project comparison, archive navigation, equal card heights, rounded focus, modal dismissal, return navigation, contact focus selection, idle particle cycling, and shared motion pause.
- Script-free checks confirmed visible About content and native archive expansion. Browser console checks found no application warnings or errors in the tested flows.

Earlier screenshots: [About](captures/react-about.jpg), [Experience](captures/react-experience.jpg), and [Contact](captures/react-contact.jpg). They show the version before the latest About/background/particle-heading/navigation revision and do not establish that revision's visual quality.

## Latest revision checks

Strict TypeScript, Vite build, three-page prerender, four navigation edge-case tests, generated local links/assets/ID checks, and the 40 separate legacy-site checks pass locally. A fresh source-only copy installed and built without relying on the existing node_modules. Dependency versions are pinned, and the lockfile includes Linux optional packages. The [Linux GitHub Actions check](https://github.com/Jeyep18/portfolio-website/actions/runs/42982527748) passed for implementation commit b281ba5.

Independent source review identified and checked corrections for motion-toggle anchor jumps, stale page departures after rapid navigation, and star regeneration on pause. These behaviors were subsequently exercised in Cloud Chromium on November 11, 2026. Node 24.14.0/npm 11.9.0 passed all four required application commands; the separate legacy suite also passed. Desktop/narrow About, particle formation/pointer settling, 105-star pause/resume continuity, navigation/history/interruption, project/photo dialogs, résumé download, all three routes, reduced motion and script-free content passed the exercised checks. Pixel 7 touch emulation passed, and John confirmed all three public pages load on Android with the laptop off. Full physical interaction review and Safari/Firefox remain untested. See [the full Cloud verification record](../../../CLOUD_VERIFICATION.md) and [current hosting/environment status](../../../PROJECT_STATE.md).

For reusable Linux setup, run `bash scripts/cloud-setup.sh` from the repository root. It installs checksum-verified Node 24.14.0 in ignored `.cache/portfolio-cloud/`, then runs installation and all required checks. The [Cloud guide](../../../CODEX_CLOUD.md) records startup and phone-only publication steps. `vercel.json` in this application records Vite, `npm ci`, `npm run build`, and `dist`; set the Vercel project's root directory to this application separately.


## Mobile revision and laptop handoff

The latest source uses a rounded glass mobile header with an aligned full-width
animated menu, a compact two-by-two process selector, tighter mobile spacing,
animated About/experience disclosures and a prerendered custom 404. Missing URLs
return HTTP 404 and use root-relative bundles so nested paths keep their styling.
Navigation, process content and error recovery remain usable without JavaScript.
See [the laptop handoff](../../../LOCAL_CODEX_HANDOFF.md) for the reviewed Preview,
public production distinction, verification and transfer assessment. The latest
Git handoff is **not** a new Vercel deployment.
