# Frontend portfolio design study

This is the single local study approved after the design interview. The existing homepage and earlier studies remain intact. Visual acceptance is open.

Run `python docs/redesign/prototypes/frontend-v1/preview.py` from the portfolio checkout, then open [the local preview](http://127.0.0.1:8768/?motion=on). The server binds to loopback and serves this folder only. The default URL follows the system preference; `?motion=on` enables motion for review, `?motion=off` shows reduced motion, and `?scripts=off` verifies the HTML fallback. The case study at `cherit.html` needs no JavaScript.

## What to review

- **Opening:** prominent identity, an evergreen frontend introduction, availability and contact, and the selected-work index. The first desktop view begins to show real project evidence. On mobile the introduction flows directly into the web project.
- **Visual system:** locally hosted Inter, near-black and off-white with a quiet sage accent, an asymmetric editorial grid, and paired desktop/mobile captures. Space informs scale and the traveling line of light. There is no planetary scene or dependency on a graphics engine.
- **Motion:** the first introduction plays once per tab session. The preview settles as it enters view and has a bounded response to a fine pointer. Quick look moves the catalogue image from the preview into a larger inspection, then reverses the path on close. The native dialog handles focus containment; keyboard and reduced-motion opening/closing are immediate. Long mobile content scrolls inside the inspection with Close available.
- **Project order:** CherIt leads as a web-facing, browser-local prototype with documented product and feature-direction contributions. Bagyong Bahay follows as evidence of leadership, architecture, and visual work in another medium. No unprovided resume link appears.

## Evidence and assets

The CherIt screens are browser captures from the existing source at `cb98490`. The capture server used installed dependencies, a fresh loopback origin, the built-in fictional catalogue, and an empty folder-pack manifest. It did not load the project's teacher-file middleware, and excluded `demo-assets` and `/pack-files`. No CherIt source changes were made. The desktop and search captures were taken at a 1440px viewport and clipped to 1000px high; the mobile capture is 390 × 900. The modal search capture shows Class & subject expanded. All sample personas, ratings, usage, and pricing are illustrative. See the [project README](https://github.com/Jeyep18/InnoLab-Hackathon-2026/blob/main/README.md) for the project's documented capabilities, limits, and team credits. The case study distinguishes the team's design decision from John's personal contribution.

`bagyong-house.webp` is the existing `images/projects/house-normal-800.webp` derivative, previously used for local review. Its original source is recorded in the [earlier capture manifest](../horizon-v2/assets/manifest.json). Public-media clearance remains a separate release decision. Inter is copied from the existing installed Fontsource package, with its [license](assets/Inter-OFL.txt).

## Checks observed

- Brave on Windows: desktop 1440 × 900, mobile 390 × 844, and layout checks at 360px and 800px. No horizontal overflow in those samples. The first project image began within the desktop and 390px mobile opening views. Captures: [desktop](captures/desktop.jpg), [selected work](captures/work.jpg), [mobile](captures/mobile.jpg), [Quick look](captures/quick-look.jpg), and [mobile inspection](captures/mobile-quick-look.jpg).
- In the desktop sample, the catalogue image moved from approximately 600px to 725px wide. Verified opening and closing transfer state, search screenshot selection without changing the landing preview, exact browsing-position return, focus return, and Escape interruption during opening without leaving a ghost image or scroll lock.
- At 390px with motion off, keyboard opening was immediate; Tab moved through the inspection and scrolled its content while the underlying page stayed in place. Close remained visible. Escape returned focus and scroll position to the opener. The default URL respected the browser's reduced-motion setting.
- The script-blocked route displayed the name, work, real captures, and a working case-study link. No warnings or errors were returned in the script-enabled browser console sample. JavaScript syntax and internal targets passed the local check.
- The original homepage HTML/CSS/JS and legacy detail page retained their pre-study hashes. No installation, commit, push, or deployment.

Still for visual review: typography and hierarchy at rest, and whether the motion feels distinctive enough. Browser viewport checks do not establish physical-device performance, screen-reader behavior, or cross-browser acceptance.
