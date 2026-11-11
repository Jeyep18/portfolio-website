# Illuminated horizon prototype

Isolated local motion study approved by John after storyboard v1. No production site migration, dependency installation, commit, push or deployment is included.

## Open and review

From this directory, run `python preview.py`, then open:

- `http://127.0.0.1:8765/` — follow the system's motion preference.
- `http://127.0.0.1:8765/?motion=on` — explicitly enable motion for this review, even if the system requests reduced motion.
- `http://127.0.0.1:8765/?motion=off` — static reduced-motion study.
- `http://127.0.0.1:8765/?fallback=1` — omit the WebGL renderer.
- `http://127.0.0.1:8765/?scripts=off` — local server blocks scripts using CSP; both comparison artifacts remain readable.

The server binds only to `127.0.0.1` and serves this prototype directory. Stop it with Ctrl+C. It is a development preview, not public hosting. Files can also be opened directly, but the CSP test route requires this server.

Move the pointer across the hero, pause/resume its scene, scroll slowly or quickly into the work, and select Before/After in the inspection example. The default scene follows system reduced motion. The explicit motion-enabled review URL is the only opt-in override.

## Implementation

- Original compact WebGL 1 fragment shader: planetary silhouette, rim atmosphere, 28-second light cycle, bounded pointer offset and scroll exit.
- Original inline SVG fallback, immediately readable HTML, native anchors and comparison buttons.
- No libraries, remote assets, fonts, audio or external network calls. Standard system typography is provisional.
- Rendering stops while the hero is offscreen or the document is hidden. Pause freezes the scene's inputs/time; a resize redraws one frozen frame.
- An inspection state change from the keyboard is immediate. Pointer activation can animate the mockup. Reduced motion disables both scene and comparison animation.
- Clear project-media and comparison placeholders. Neither illustration is a game screenshot or a claimed historical revision. Contact details and resume remain unfilled pending review.

## Verification recorded November 10, 2026

| Check | Observed result |
| --- | --- |
| JavaScript syntax | `node --check study.js` passed. |
| Focused regression checks | `node verify.mjs`: 29 passed. Covers loop ownership, pointer input, pause/resume, frozen-frame resize, offscreen/document visibility, preference changes, fallback/context-loss paths, comparison selection and initial fallback markup. Uses a mocked DOM/WebGL; not proof of actual GPU behavior. |
| Browser | Codex in-app Chromium browser on this Windows machine. Exact browser version and GPU model were not captured. |
| Responsive views | Inspected 1440×900 desktop, 390×844 mobile viewport, 800×900 intermediate, 1280×720 laptop and 720×450 compact reflow. No horizontal document overflow in those samples. Compact view retained space between hero actions and lower controls. |
| Motion/rendering | Actual WebGL scene rendered. Pointer movement was exercised by positioning/clicking in the scene; text remained stationary. Default browser preference selected the static reduced-motion presentation; explicit review opt-in enabled rendering. |
| Pause/resize | Actual Pause/Resume selected state changed correctly. Paused frame counter stayed fixed between observations, with exactly one extra redraw after viewport resize; frozen horizon remained visible. Independent source review found this resize bug, which was corrected and covered by regression checks. |
| Offscreen | Process anchor moved to inspection; renderer reported suspended, with frame counter unchanged in subsequent observations. Hidden-document transitions are covered by the mocked regression suite, not a separate real-tab acceptance test. |
| Comparison/keyboard | Before/After selection and captions changed through native click and Return activation; focus could Tab onward. Selected state is exposed and a live status announces the change. No screen-reader audit performed. |
| Script-blocked reading | CSP test route showed both artifacts, identity, work, native navigation and contact placeholder without enhanced controls. Browser script settings were not changed. |
| Static fallback | Forced-fallback route visibly rendered the inline SVG horizon. Actual hardware/context-loss and recovery are only simulated in regression checks. |
| Console | No warning/error entries returned on the final motion-enabled page. The script-blocked route intentionally blocks study.js. An earlier favicon 404 was resolved by adding a local icon. |
| Loading | index.html, study.css, study.js and horizon.svg each returned HTTP 200. Their combined uncompressed body size is 29,346 bytes, about 28.7 KiB. This excludes HTTP overhead and review screenshots; local loopback loading is not a network-performance benchmark. |
| Animation sampling | Representative unthrottled running samples reported 6.9ms median and 7.0–7.1ms p95 callback intervals over approximately 145 frames. This is animation callback cadence, not GPU time or proof of physical-phone performance. Rendering follows the browser refresh cadence with no explicit 60fps cap. |
| Zoom | Browser zoom shortcuts had no observable effect on CSS viewport or pixel ratio, so actual 200% zoom is unverified. A 720×450 reflow sample was checked separately and is not claimed as an equivalent zoom test. |
| Source protection | Original homepage, stylesheet, JavaScript and project-page files remain unchanged. New files are confined to prototype/planning material and project memory. |

Remaining acceptance: John's visual/interaction judgment, physical touch/mobile performance, actual 200% browser zoom, cross-browser/WebGL capability and screen-reader checks. Final media, typography, content and production framework remain undecided. No production-readiness claim.

## Captures

- [Desktop](captures/desktop.png), 1440×900.
- [Mobile viewport](captures/mobile.png), 390×844.

These capture this iteration; a still image cannot convey ambient/pointer/scroll motion. The live local preview is the main review artifact.
