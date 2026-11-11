# Second portfolio visual preview

User-approved expansion of horizon-v1: original developed planetary artwork, real Bagyong Bahay captures, refined layout/typography, actual project content and real environment-state inspection. Local preview only. v1 and production source are preserved; no dependencies, providers, migration, commit or deployment added.

## Review

Run `python preview.py` in this directory. Open `http://127.0.0.1:8766/?motion=on` for explicit motion opt-in, or `/` to follow the system preference. Routes `?motion=off`, `?fallback=1` and `?scripts=off` review reduced motion, static artwork and CSP-blocked scripts. The server binds to loopback and serves only this directory. Stop it with Ctrl+C.

- Shader artwork: projected spherical surface, procedural terrain/cloud detail, directional lighting, atmospheric scattering approximation and rim light. Original local code, not a copied reference engine or a physically validated simulation.
- Pointer movement shifts viewpoint and lighting. Slow surface/light motion maintains a living scene. Native scrolling recedes/dims the scene into selected work.
- Typography uses installed Bahnschrift and system fallbacks. No font file or external font service is included. Layout should be checked on systems without Bahnschrift before production selection.
- Homepage includes Bagyong Bahay's real summary, attributed contributions, environment inspection, shorter CherIt/TransitPH entries, About and direct email/social links drawn from the existing portfolio. Email delivery and external destinations were not newly tested, and no message was sent.
- No placeholder graphics or fictional revisions. The project media depicts actual recording-camera environment captures, not current gameplay or a verified public release. No resume is invented.

## Capture provenance

User approved the existing environment captures for this local review. Public publication permission remains separate. Source files are the matched `01_living_dining_normal_godot.png` and `01_living_dining_wrecked_godot.png` under the game's `design_previews/house_teaser/` directory. Its README corroborates their Godot recording-camera origin and matched framing. These are historical authored Normal/Wrecked states, not before/after design revisions.

`assets/manifest.json` records exact source paths, output dimensions, byte sizes and SHA-256 hashes. Originals are untouched. Outputs use resize/WebP encoding only, without grading or changes to scene content. The large feature image is compositionally cropped by CSS; inspection images show the full frame. Four responsive derivatives total 392,418 bytes. Third-party/team credits and unresolved public-release rights are not superseded by permission for this local preview.

## Verification

- `node --check study.js` passed; `node verify.mjs` passed **39 checks**, including captured-asset integrity. Mocked lifecycle tests cover one loop, pointer response, pause/resize, visibility, reduced motion, context loss/restoration while running and paused, preference transitions while paused, comparison controls, announcements and static markup. They do not establish real hardware recovery or GPU performance.
- Actual in-app Chromium browser inspected at 1440×1000, 1440×900, 390×844 and 800×900. No document overflow in sampled mobile/intermediate views. Corrected excessive caption wrapping and caption/control overlap on mobile; increased body text sizing.
- Actual shader compiled and rendered without returned console warnings/errors on the motion-enabled route. Native Work/inspection anchors and both real image states were exercised. Selecting Storm-damaged showed the proper image/caption; keyboard activation also selected it in reduced-motion mode.
- Real WebP files loaded in the browser. Source and derivative files/hashes were also independently reviewed. All four image outputs have local provenance.
- Actual reduced-motion route reported fallback with zero frames; comparison remained usable. CSP script-blocked route showed both environment figures and hid enhancement-only controls. Its expected script block is intentional.
- Hero offscreen reported rendering suspended. Hidden-document and actual context-loss paths are covered by mocks, not separately claimed as real hardware acceptance.
- Representative desktop/mobile-viewport samples reported 6.9ms median, 7.1ms p95 callback intervals over about 145 frames on this machine. This is unthrottled callback cadence, not GPU execution time or physical-phone performance. Rendering follows refresh cadence; no explicit fps cap.
- Independent source review found paused recovery after fallback needed one frozen redraw. Fixed for context restoration and preference recovery and covered with regression checks. No other actionable source findings reported.
- Captures: [desktop](captures/desktop.png), [real project media](captures/project.png), [mobile](captures/mobile.png).

Remaining acceptance: John's visual/motion judgment, physical-device touch/performance, actual 200% browser zoom, screen readers, other browser engines and final production content/font/media clearance. Public release and production framework remain unapproved. This is a designed local preview, not a claim that the whole redesign is release-ready.
