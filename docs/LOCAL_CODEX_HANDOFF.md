# Laptop continuation from Codex Cloud

Updated November 11, 2026. John authorized a commit and push to
`codex/portfolio-cloud-handoff` and explicitly requested **no Vercel update**.
Use Git's remote HEAD as the source of truth for the pushed commit. The prior
branch HEAD was `4b7d08d7cb02f0665ccdf65e0ca6c1df001e2ac4`.

## Resume safely

Repository: https://github.com/Jeyep18/portfolio-website

Read `AGENTS.md`, `docs/PROJECT_STATE.md`, `docs/CODEX_CLOUD.md`, root `README.md`,
the active app's `README.md`, and this document. The ready-to-paste request is
[LOCAL_CODEX_PROMPT.md](LOCAL_CODEX_PROMPT.md). User attachments and final design
responses are indexed in [MOBILE_REFERENCES.md](MOBILE_REFERENCES.md).

Inspect local status, branch, remotes and commits before fetching. Preserve
uncommitted laptop work and private local memories. Fetch the remote working
branch; fast-forward only when the local branch is clean and compatible. If the
checkout is dirty or divergent, use a separate worktree/checkout and explain the
difference. Do not reset, overwrite, force-push or merge into `main`.

Git carries source, approved assets and portable project context. It does not
carry the Cloud conversation, private global memories, screenshots in `/tmp/`,
account authentication, a running preview server or a saved Cloud environment.

## Active source and content boundary

The active app is `docs/redesign/prototypes/space-gallery/`: React, TypeScript,
Vite and GSAP. The root HTML/CSS/JavaScript site is a separate older version.
GitHub Pages publishes `main` from the repository root; preserve that deployment.
`main` was verified at `d5d50d8e624792caf97c615bde6ca5c618a0576d` before handoff.

Keep the five projects (CherIt, Bagyong Bahay, TransitPH, DeMolay and the veterinary
academic project), four experiences (InnoLab, SparkLab, BYTE 2025 and PyCon APAC),
curated assets and truthful team/AI/prototype attribution. Preserve reduced
motion, the shared pause control, keyboard/focus/dialog behavior, renderer
cleanup and useful script-free content. No backend secrets are required.

The supplied temporary profile image is deliberately labelled as temporary.
It is not established as John's actual portrait. Do not invent replacements for
pending InnoLab certificate, BYTE/PyCon photos, DeMolay URL or other missing facts.
Only that explicitly selected image was curated into the app; raw attachments
and private memories must stay out of Git and provider uploads.

## Conversation and final implementation decisions

1. Cloud setup was established with Node 24.14.0/npm 11.9.0 and a reusable Linux
   installer. Cloud browser testing replaced earlier laptop-browser blockers.
   John approved his own Vercel CLI device sign-in from Android and the separate
   project's required first Production deployment, followed by Preview testing.
   He confirmed all three public pages load with the laptop off.
2. John asked whether phone prompts could drive edits/Git/hosting and later sync
   to local Codex. The workflow uses Git for portable changes; publication is a
   separate action. A Preview URL is hosted and can be opened from other devices
   with access; it is not intrinsically phone-only. Cloud loopback preview URLs
   are not permanent public sites. Deploying/promoting Production changes its
   public alias. This handoff authorizes Git push only.
3. Particle headings looked blurry on Android. Previously the final glyphs came
   from a low-resolution canvas text stencil. The canvas now handles decorative
   particles; native semantic HTML glyphs fade in as formation settles, keeping
   final text crisp at device resolution. Pointer response remains gentle and
   additive, with static/reduced-motion fallbacks. Particle canvas DPR is capped
   at two for performance; it no longer determines final glyph sharpness.
4. About was redesigned around the temporary portrait, clearer education rows,
   résumé action and a static icon-led “Where I am right now” panel. Optional
   “How I work” and “Beyond development” use native disclosures. Current status
   is informational rather than styled as a link.
5. Process evolved from plain copy to interactive cards, then a compact selector.
   John rejected the horizontal mobile scroller. Final mobile layout is a
   numbered two-by-two grid (Understand, Plan, Build, Refine), with an icon and
   one short explanation. Desktop keeps four steps in a row. All steps remain
   readable without scripts; no swipe hint or forced explanation height remains.
6. Navbar evolved through a small hamburger, transparent header, a separate
   circle card and proposed gradient/variant approaches. John superseded those
   with a single rounded glass capsule containing logo and menu icon, plus a
   matching glass dropdown. The icon has no redundant inner card. Final dropdown
   spans the capsule's full width. The same Header component serves all pages,
   including 404. Glass darkens after scrolling, has an opaque fallback, and
   menu opening/closing animates with interruption, Escape/outside/selection
   dismissal and focus handling. Keep rounded corners.
7. Mobile sections now use natural height instead of one viewport per chapter,
   with tighter padding and header-aware scroll targets. Hero and desktop rhythm
   remain. Buttons stack where appropriate; touch targets are 44px or larger,
   text remains readable, genuine contact links are clickable. Only the curated
   photo rail intentionally retains horizontal swiping with a visible hint.
8. About and Experience now share dependency-free interruptible height/fade
   disclosures. Event photo containers also animate between selections. Rapid
   taps and pause/reduced motion settle without clipping. Native details still
   work without JavaScript. Controlled anchor scrolling/history/interruption
   remain; competing native smooth scroll was removed.
9. A custom “Lost in space” 404 has rounded recovery actions and the shared
   header. Missing nested URLs receive HTTP 404 with working root-relative
   assets; `/404.html` itself is a normal file response. There is no SPA catch-all.
10. Added a local SVG favicon and generated per-page title/description, canonical,
    Open Graph/Twitter, homepage WebSite/Person JSON-LD, robots and sitemap.
    `scripts/metadata.mjs` currently uses `https://portfolio-space-gallery.vercel.app/`
    as the production canonical base. Preview builds discourage indexing; 404
    is always noindex and excluded from sitemap. Search engines choose when and
    how to display results; Google indexing was not verified. Public production
    has not received these new changes yet.

## Hosting snapshot — do not redeploy during this handoff

| Item | Verified state |
| --- | --- |
| Public production | https://portfolio-space-gallery.vercel.app/ |
| Public source commit | `d4ddf1dbc2a39ced1e6d61cd871cec761974f255` |
| Latest reviewed Preview | https://portfolio-space-gallery-rhqmpwslx-jfmihoyofriends-9058.vercel.app/ |
| Latest Preview ID | `dpl_2MWTqFy5q8AXVBNNUNLrPV2z22yu`, READY, Preview |
| Preview source | Current UI working-tree upload based on `4b7d08d`, before this Git handoff commit; not a deployment of the new commit |
| Current owning scope | `jfmihoyofriends-9058`, Hobby |
| Project | `portfolio-space-gallery`, `prj_8h6eJsFTfJGvGF6A1hgHmK2H6mma` |
| Source team ID | `team_wjw6zbvvPvKK2N29cCJH4Rke` |
| Build configuration | Root `docs/redesign/prototypes/space-gallery`; install `npm ci`; build `npm run build`; output `dist`; provider Node `24.x` |
| Git integration | Read-only project API reconfirmed `link: null`; earlier Git connect failed because a GitHub Login Connection was missing |
| GitHub workflow | Verification only, no deploy step |
| Access | Public alias anonymous; Preview requires authorized Vercel sign-in; deployment protection preserved |

No deployment, promotion, transfer, domain, plan, permission or Git integration
change is part of this Git push. CLI deployments used selected source uploads;
push alone currently does not deploy. Recheck the live settings before relying
on that behavior later. Do not mistake an older Preview for current source.

The current Cloud CLI session uses the authorized `jfmihoyofriends-9058` account.
A separate older connector identifies `jeyep18`/Jan and returns 403 for
`jan-s-projects7` (`team_kzvdeNZa8QzEZHqPhAmuAQo9`). That workspace was not
modified or granted new permissions. Credentials are not committed or portable.
Use a normal account/device authorization flow if needed; never ask for passwords
or pasted tokens. Avoid CLI probes that create protection bypasses as a side
effect. The earlier temporary bypass was revoked; protected browser checks used
an origin-scoped project development OIDC header without publishing credentials.

## Is transfer to “jan-7-projects” feasible?

**Technically plausible, access unverified.** This is a simple static Vite project
with no backend/database/custom domain to migrate. Vercel's documented project
transfer requires source ownership and destination membership. Confirm actual
roles, exact destination slug/ID, free-plan compatibility and any account limits.
The requested `jan-7-projects` must not be assumed to mean `jan-s-projects7`.
The accessible Cloud CLI account did not establish access to the intended target.

Reference: [Vercel project transfers](https://vercel.com/docs/projects/transferring-projects).
A supported project transfer can preserve more deployment/configuration history
than a new import, but eligibility and account UI must be checked. Some provider
connections may need reconnecting. Do not upgrade a plan or change permissions
to make transfer possible. A fresh import is only an alternative proposal, and
may have different URLs/history; do not execute either option without approval.

Local Codex should perform a read-only assessment: inspect existing local Vercel
link/account without exposing credentials, verify source-owner and target-member
access, confirm intended target and project/name availability, and explain any
free-plan blockers. Then recommend transfer, new import, or remaining in the
current account, with exact consequences and required user actions. Do not
transfer, redeploy, reconnect Git or alter protection during the assessment.

If an eventual move is approved, review the canonical base in `scripts/metadata.mjs`,
all aliases/URLs, CLI project link, root/build settings, deployment protection and
Git integration, and verify the exact source commit after deployment. Preserve
`main`/GitHub Pages throughout. No transfer has been attempted by this handoff.

## Verification and limitations

Actual Cloud runtime: Node **24.14.0**, npm **11.9.0**, Python **3.12.14**,
Chromium **156.0.8078.79**, Python Playwright **1.62.0**, Vercel CLI **65.14.0**.
The default Cloud Node was different; `scripts/cloud-setup.sh` installed the
pinned runtime in ignored `.cache/portfolio-cloud/`. Vercel uses Node `24.x`;
its exact patch version was not measured. No package or lockfile change was made.

Completed with the pinned runtime: clean `npm ci` during setup; seven app tests
(four navigation, three metadata), `npm run build` (TypeScript, Vite, prerender),
`npm run check:build` (four pages/unique IDs/assets/anchors/semantic copy/résumé),
and root `node tests/site.test.mjs` (40 separate legacy checks). The tests/build/
validator/legacy checks passed again immediately before the Git handoff.

Latest local and protected hosted Chromium passes at **320, 390, 680 and 1440px**
covered full-width menu alignment, compact section spacing, all process selections
without horizontal overflow, animated About/event expansion/collapse, rapid
interruptions, keyboard, pause during expansion, all four events/five curated
photos, photo dialog/Escape/focus, event arrow keys, 404 and script-free content.
No exercised application errors occurred. Earlier Cloud passes also exercised
smooth intermediate anchor positions, rapid navigation/interruption/history,
particle formation/pointer settling, background pause/resume without scene
regeneration, project dialogs, résumé download and all normal pages.

The screenshot/test scripts under Cloud `/tmp/portfolio-browser/` are ephemeral;
this document records their results rather than claiming they are portable test
artifacts. Full latest physical Android acceptance is pending. Initial public
three-page access with laptop off was confirmed. Safari/Firefox, search indexing
and a new task created from a published reusable Cloud environment were not
verified. Current Cloud executor worked, but saved environment configuration and
published version IDs were absent. See `CODEX_CLOUD.md` for reusable installation
and phone setup; no laptop browser is required to reopen the hosted sites.

For laptop verification, use Node 24.14.0 or report why a compatible adjustment
is necessary. In the active app run `npm ci`, `npm test`, `npm run build`,
`npm run check:build`; at repo root run `node tests/site.test.mjs`. Build then use
`npm run preview` (loopback port 8769) or `preview.py` for script-free checks.
Verify local source in a browser; a hosted URL can show an older version.
