# Working main-site redesign

John approved proceeding with the fresh composition and prioritized a running, updated portfolio after rejecting the previous previews' visual/motion quality. Work now updates the main `index.html`, `styles.css` and `script.js` rather than another isolated preview. Existing previews and pre-redesign main files are preserved. No dependency, framework migration, external service, commit, push or deployment was introduced.

## Implemented

- Complete spherical projection with a tilted axis and a time-dependent three-dimensional rotation matrix. Original surface detail is sampled on the rotating 3D direction, while world-space lighting stays fixed. One rotation takes about 45 seconds. This is an art-directed procedural planet, not a validated Earth simulation or licensed planetary photograph.
- Two restrained layers of stars, with localized pointer repulsion/brightening and depth offset. Pointer coordinates match the canvas bounds. A stationary pointer is not required for rotation.
- Serif-led typography with ordinary sans-serif text, replacing the rejected condensed type. A pale selected-work panel changes contrast and puts real imagery forward.
- Native scroll navigation; hero depth/fade transition and once-only image/section entrances. Essential content starts visible. Pause, system reduced motion, offscreen/background suspension and static artwork paths are retained.
- Real Bagyong Bahay image feature, Normal/Wrecked environment inspection, confirmed contribution copy, CherIt/TransitPH summaries, About, and actual existing email/social links. No invented resume, screenshots, case-study revisions or adoption metrics.
- Relative homepage asset paths and legacy CondoEase stylesheet path corrected for repository-subpath compatibility. Existing legacy page content is not represented as a completed case study.

## Verification observed

- `node --check script.js` passed.
- `node tests/site.test.mjs`: **40 checks passed**. Includes loop ownership, pointer mapping input, pause/frozen resize, visibility, preference changes, context loss/restoration, recovery while paused, comparison selection/announcements, asset SHA-256 integrity, initial fallback markup and resetting hero departure when reduced motion activates. These use mocked DOM/WebGL.
- Independent root-source review found reduced-motion/fallback could leave a scrolled hero faded after returning to the top. Fixed by resetting departure, with a regression check and a CSS static override. Completed reviewer was stopped. No other actionable source findings reported.
- In-app Chromium browser rendered the real shader with no returned console warning/error entries on the final motion-enabled page. A/B stationary-pointer captures show changing surface features without mouse input; source implements actual rotation of the sampled sphere direction.
- Desktop 1440×900, mobile 390×844, narrow 360×800 and intermediate 800×900 were sampled. No horizontal document overflow in sampled views. Mobile planet placement sits below the main introduction rather than obscuring its text.
- Main Work/inspection navigation and normal/storm-damaged switching exercised in browser; storm image loaded and selected state changed. Offscreen scene reported suspended.
- Script-blocked route displayed both real environment states and hid enhancement-only controls. Reduced-motion route reported fallback, zero frames and full-opacity introduction.
- A static link/asset audit checked 21 homepage references: local targets exist, section anchors resolve, no root-relative homepage paths. This is repository-subpath source verification, not a hosted deployment test.
- Representative mobile-viewport callback sample: 6.9ms median / 7.1ms p95 over roughly 145 frames on this machine, unthrottled. This is callback cadence, not GPU timing or a physical-phone performance claim. Pixel ratio is capped at 1.25; no fixed animation fps cap.
- CSS was reformatted for maintenance. Final Git diff/whitespace checks completed; all work remains uncommitted.

Remaining: John's assessment of the visual direction and feel, real touch/low-power performance, cross-browser/WebGL recovery, screen-reader and actual 200% zoom acceptance. External links/email delivery were not newly exercised; no email was sent. Public media/indexing/release review remains separate. GitHub Pages is unchanged.

Captures are in `main-site-captures/`: desktop, mobile, selected work, and two stationary-pointer rotation samples. A still image cannot establish motion quality; use the running page.
