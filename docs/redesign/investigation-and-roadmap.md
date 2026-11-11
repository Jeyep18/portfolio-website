# Portfolio redesign investigation and roadmap

Prepared November 10, 2026, Asia/Manila, for John Francis Espiritu.

Status: proposal for review. This document authorizes no implementation or publication. At initial completion, only this planning deliverable had been added to the portfolio checkout; subsequent reference and memory documentation is described below.

November 10 follow-up: John supplied a modern design/motion master prompt and React Bits/MotionSites preferences. The [revised stack proposal](tech-stack-proposal.md) now leads the technology discussion, proposing Astro with selected React islands. The static-source recommendation and related file outline below record the initial proposal, not an approved decision. The project goals, evidence inventory and design alternatives remain useful; framework migration, installation and preview implementation still require approval. Both original inputs and confirmed preferences are indexed in [project memory](../../PROJECT_MEMORY.md).

## 1. Recommendation

Build a work-led, mostly monochrome portfolio with one illuminated-horizon composition and readable, substantial project stories. Keep ordinary navigation and make deeper inspection optional. Start with the existing static HTML/CSS/JavaScript approach. A framework, backend, CMS, analytics service, or WebGL renderer is not needed for the proposed scope.

The central design decision is to give the atmosphere one memorable place, then give the work most of the page. A visitor should quickly understand who John is, what he has worked on, his actual contribution, and how to contact him. A curious visitor can then inspect a real design decision.

John confirmed the proposed role wording, “Computer Science student exploring web, app, and game development,” and that he is open to freelance work and internships. He also supplied the contribution statements incorporated below. These are owner statements, not independent authorship verification.

Recommended first release: the homepage, two complete case studies, shorter entries for other substantiated projects, an approved resume, and direct contact links. Bagyong Bahay is the provisional flagship. DeMolay is the provisional second case study if suitable public material is approved; CherIt is the alternative. Do not delay the whole portfolio to produce five long case studies.

## 2. What was inspected

- Local checkout at `d5d50d8` on `main`, initially clean and tracking `origin/main`.
- `index.html`, `styles.css`, `script.js`, both files under `project_pages`, and the asset inventory.
- Supplied shared engineering instructions, attached redesign brief, and the referenced Check readiness chat read earlier in this conversation. No on-disk AGENTS.md was found in the checkout or checked ancestors.
- The hosted homepage at desktop 1440×900, mobile 390×844, and intermediate widths 900×900 and 800×900. Browser viewport overrides were reset afterward.
- Mobile menu opening, Escape dismissal attempt, selecting Projects, project-card geometry, and the currently linked project destination.
- Connected GitHub README evidence for CherIt, DeMolay, TransitPH and the veterinary system; TransitPH frontend package metadata; DeMolay operational documentation.
- Local Bagyong Bahay README and the November 7 notices and November 9 Windows rebuild reports. That separate checkout has existing working changes; nothing there was modified.
- Current reference-page content from Brittany Chiang, Rauno Freiberg, Dennis Snellenberg, NASA Eyes, JPL Visions of the Future, and NN/G's UX portfolio research.

An independent helper audited the portfolio source only. Browser inspection and proposal decisions belong to the lead agent.

This was a bounded investigation. No application dependencies were installed, project apps were started, game build was replayed, production account was changed, or full accessibility/performance audit was run. Project documentation records past checks; it is not a new test of those apps. LinkedIn, email delivery, all external links, real devices, screen readers, and all browser engines remain untested.

## 3. Current-site findings

The current stack is static HTML, custom CSS, ten lines of vanilla JavaScript, Bootstrap 5.3.3 CSS, and Google Fonts. There is no package manifest, build command, automated test suite, README, or tracked deployment workflow. Available media comprises two portrait files, a favicon, and social/tool/location icons. There are no project captures or resume in this checkout.

| Before | Proposed after | Why |
| --- | --- | --- |
| Both project links use `/project_pages/CondoEase-Project.html`, escaping `/portfolio-website/`. The actual linked destination showed a GitHub Pages 404. `index.html:118,128`. | Use relative URLs and verify every homepage/detail-page asset and link under the repository prefix. | The main evidence of work must be reachable on the actual host. |
| The sole case-study page contains only “STILL IN DEVELOPMENT, SORRY”; its CSS URL is also root-relative. `project_pages/CondoEase-Project.html:7,14`. | Publish complete stories only. Preserve or deliberately resolve the old detail URL in the approved implementation. | Empty destinations undermine credibility and leave existing links unresolved. |
| Repeated Project 1/Project 2 placeholders and blank gray project media. `index.html:128–156`. | Two strong featured stories with real images; shorter evidence-backed entries below. | More placeholder slots do not communicate more experience. |
| Biography, a long introductory timeline, and tool icons precede the work. | Put selected work immediately after the introduction. Move relevant learning history into About. | Freelance and internship visitors need evidence before a lengthy autobiography. |
| Containers use 330px side margins, then abrupt breakpoint overrides; global horizontal overflow is hidden. `styles.css:10,100,177,203,278,317,385`. | Use a bounded fluid container, content-driven breakpoints, and layouts that fit without clipping. | At 800px, linked project cards remained 288px each in a roughly 490px row and extended outside that row. This sample establishes a container-fit defect, not blanket failure at every width. |
| Body copy is commonly 12–13px; paragraphs are justified and some headings/timeline segments have fixed heights. | Use left-aligned 16–18px body text, constrained line length, natural heading height, and content-driven spacing. | Improves reading and resilience when text wraps, fonts change, or the page is zoomed. |
| Mobile navigation opens and a selected link closes it, but Escape did not dismiss it. The button exposes only the ☰ symbol and has no expanded state. `index.html:25`, `script.js:1`. | Prefer short visible navigation that wraps on mobile. If a menu is needed, label it and implement expanded state, Escape, and suitable focus behavior. | Navigation should be understandable and keyboard operable. Essential navigation must also survive JavaScript failure. |
| No main landmark or skip link; no authored focus treatment. | Add semantic landmarks, a skip link, visible focus, useful link names, and ordered headings. | These are structural requirements. Absence of custom focus CSS alone does not prove native focus is invisible. |
| Hard-coded age and unfinished copy; inconsistent Jan/John identity; no resume; old footer year. | Confirm current education, role and availability. Use John Francis Espiritu consistently and supply the approved resume. | Avoid stale biography and invented qualifications. |
| Custom CSS precedes Bootstrap; the Google Fonts request includes unused Roboto and many style/weight choices. | Explicit CSS ownership; narrow font loading. Prefer removing Bootstrap in the approved rewrite if no needed behavior depends on it. | Reduces cascade surprises and unnecessary external assets. Actual transfer savings have not been measured. |
| No description or social-preview metadata; detail and homepage titles are identical. | Page-specific titles/descriptions and an approved share image. | Shared links should identify the relevant project clearly. |

No remediation has been performed.

## 4. Project evidence inventory

Evidence strength here means suitability for portfolio planning, not an independent certification of the project.

| Project / audience / problem | Evidence and implemented scope | Role, media and remaining questions | Recommended treatment |
| --- | --- | --- | --- |
| **Bagyong Bahay**. A Filipino household preparing for an approaching storm; a game for players exploring decisions under time and money constraints. | Local documentation describes exploration, dialogue, shops, inventory, a storm clock, preparation-based ending, local scores and bilingual content. November 9 report records a private Windows test candidate and automated/native samples, with full human playthrough, listening and second-PC acceptance still open. Remote `main` README is empty, unlike local `dev` documentation. | John confirms he was project lead, collaborated on the idea and mechanics, contributed most of the game architecture, and did map 3D modeling and graphics/visual work. Teammates handled some code and implementation. The brief establishes substantial AI assistance. Exact asset/feature examples and contributor credits still need mapping. Local comparison captures exist but are not yet approved portfolio media. Public asset/audio permission work remains open. | Flagship with reviewed screenshots and specific decisions. Describe as a private test candidate. Do not attach the private ZIP or imply public distribution clearance. |
| **DeMolay website**. Chapter members and visitors seeking chapter information and financial transparency. | Connected source access now succeeds. README and operations describe a site/CMS with content, media, finance, approvals and protected staging. Documentation retains public-release gates. This investigation did not inspect live deployment behavior. | Agent-assisted development is stated in the brief. Confirm John's decisions, chapter permission, exact scope, and which screens can be shown. Use only approved public/synthetic material, excluding private records and administrative data. | Strong web-focused second story if cleared. Describe implemented work and protected/pending status separately. Do not offer a public live-site button until an appropriate destination is verified. |
| **CherIt**. Bicol public-school teachers finding and adapting lesson packs. | Current README describes browser-local search/filtering, previews, downloads, uploads/persistence, ratings, adaptations and verification workflow. Personas are simulated; Pro, payment and seeded activity are not evidence of real accounts, revenue or adoption. No new runtime test performed. | John confirms architecture and idea features were shared team work. His main contributions were website direction and feature design, also contributed to by JP, and he presented the website. Preserve README credits: JP technical lead, CJ design/creative lead, Francis product/QA/presentation. Do not turn feature-design contribution into sole visual-design or technical ownership. Fictional sample materials are the proposed capture source; real teacher files remain excluded. | First-release supporting project, or second full story if DeMolay media is unavailable. Emphasize a real product decision and its local prototype limits. |
| **TransitPH**. John's proposed help for navigating local public transportation. | Public repository is accessible on default `dev`; root README supplies no useful behavior evidence. Frontend manifest confirms Next.js/React/Leaflet dependencies. That does not establish route finding, accuracy, coverage or working backend behavior. The brief calls it an unfinished working prototype. | Exact role beyond originating the idea, team/AI division, current runnable flow, supported geography and available demo/captures need a focused follow-up. | Short experiment until one complete flow is verified and illustrated. No route-accuracy, launch, adoption or travel-benefit claims. |
| **Veterinary clinic system**. Academic work addressing pet vaccination records for a clinic context. | README describes PHP/Oracle prototype support for client/pet records, vaccination/visit details and payment logging. It includes two screenshot references. This is documented scope; no Oracle/PHP runtime test performed. Payment logging is not online payment processing. | Brief says the business does not actively use it. Confirm personal/team/AI contribution and whether screenshots contain fictional records. Check image contents before using them. | Smaller academic case or entry. State the vaccination-record focus and lack of business adoption. |

For every featured story, gather a compact evidence sheet: problem and intended audience; date/status; John's decisions and responsibilities; collaborator credits; AI/tool assistance; demonstrated behavior; one constraint; one documented revision; verification and limits; approved media and permissions. Do not infer contribution from commit counts alone.

Draft contribution copy for later factual/media review:

- Bagyong Bahay: “I led the project and worked with the team on the game idea and mechanics. I contributed most of the game architecture, modeled maps in 3D, and worked on graphics and visuals. Teammates implemented parts of the game, with substantial AI assistance across development.” Link this broad statement to specific examples before publishing; it does not claim original authorship of every imported asset.
- CherIt: “Our team developed the architecture and features together. My main work was directing the website and designing its features, alongside contributions from JP. I also presented the prototype.” Add the existing team credits and a precise AI-assistance statement when completing this story.

## 5. Information architecture and content

Homepage order:

1. **Introduction**: public name, “Computer Science student exploring web, app, and game development,” a short concrete statement, View work, and direct contact/resume access. John confirmed availability for freelance work and internships. Avoid self-awarded expertise and a hard-coded age.
2. **Selected work**: Bagyong Bahay plus one strong web project. Use large authentic media, a short problem summary, contribution/status, and Read case study. Keep titles and summaries readable without hover.
3. **How I work**: one concise account of idea development, direction, AI assistance, review and testing, each supported by an actual example. Avoid a skill-meter dashboard or generic process diagram.
4. **More projects**: CherIt, TransitPH, the veterinary prototype and any remaining substantiated work. Use compact rows or varied image/text compositions, not another wall of identical cards. Move CherIt here only if it is not a featured story.
5. **About and contact**: education, relevant interests, brief learning context, approved availability, email, GitHub and LinkedIn. NASA/Interstellar belongs as motivation, with no implied affiliation. Phone numbers and other existing contact details require a publication decision.

Navigation: Work, About, Resume, Contact. On a narrow screen, a short wrapping navigation is the first option. Resume appears only once a real approved file exists; omit it from a public release if unavailable.

Each case study: overview → problem and context → role/team/AI contribution → selected decisions and evidence → optional inspection → what works and what was checked → limitations and lessons → valid source/demo links. Use distinct titles and a simple route such as `project_pages/bagyong-bahay.html`. Essential content is present in HTML.

This adapts NN/G's advice on scannability, roles, constraints and process to an engineering portfolio. Their research concerns UX portfolios and does not establish hiring outcomes for this redesign.

## 6. Three visual treatments

These are layout studies, not finished mockups. They use the same content and palette constraints so the choice concerns composition and emphasis.

### A. Illuminated horizon, recommended

A compact introduction occupies the upper left. A single broad, low illuminated edge crosses the lower part of the hero, visually leading into a large Bagyong Bahay image. Subsequent project stories vary image/text proportions but keep a stable reading order. The motif stops after the introduction; project imagery retains its own colors.

```text
Desktop
John Francis Espiritu                 Work  About  Resume  Contact

Name and confirmed role       open dark space
Short introduction
[View work]   Contact
________________ thin illuminated horizon ___________________

Bagyong Bahay       [large actual game capture               ]
Problem / role     [                                       ]
Read case study    [                                       ]

[DeMolay capture             ]   Summary / role / status
How I work, with one concrete example
More projects                         About / Contact

Mobile
Name
Work  About  Resume  Contact
Role / short introduction
[View work]
_____ cropped static horizon _____
Bagyong Bahay / actual capture
Problem / role / case study
Second project / actual capture / summary
How I work / More projects / About / Contact
```

Signature interaction: a normal “Inspect this decision” disclosure in a case study reveals a genuine before/after artifact and a short explanation. Start with a documented Bagyong Bahay interaction or art-direction revision that John can explain. Source comparison captures were found locally, but exact selection and publication permission remain open. Use separate Before/After controls or stacked images, not a drag-only slider.

Tradeoff: strongest fit for cinematic restraint and accessible work browsing. Requires careful control of hero height and contrast. It can be static CSS/SVG; no animation or generated art is necessary.

### B. Orbital field study

A substantial featured-project image sits inside an offset orbital outline on the right; identity and plain project links occupy the left. The orbit visually connects the idea of inspection with a real artifact. It does not turn project navigation into orbiting targets.

```text
Desktop
Name                                Work  About  Resume  Contact
Identity / introduction       ( orbital outline                 )
Bagyong Bahay                 ( [selected actual project image] )
DeMolay                      ( caption / status                )
CherIt
Selected work stories below, followed by About / Contact

Mobile
Name / visible navigation
Identity / introduction
[project image with one cropped arc]
Caption / case study
All selected project summaries in ordinary reading order
About / Contact
```

Signature interaction: optional buttons select a documented project artifact and its explanation in the featured area. Each project's normal link remains available independently, and all summaries are readable without JavaScript. No hover-only discovery or automatic rotation.

Tradeoff: strongest “observatory” identity, but more state, responsive complexity and risk of decoration competing with screenshots. Choose it only if the artifact selection improves understanding. No scientific data, fabricated telemetry, coordinates or mission labels.

### C. Observation journal

A typographic introduction leads directly into a large annotated project spread. Marginal notes describe real constraints or revisions. Space comes from the composition and a quiet eclipse-edge mark, rather than a large cinematic hero.

```text
Desktop
Name                         Work  About  Resume  Contact
Concise introduction

Bagyong Bahay / status
[wide real screenshot                         ]  Decision note
Problem / contribution / case-study link         Actual constraint

DeMolay screenshot + story excerpt
One short project note, only if content exists
More projects / About / Contact

Mobile
Name / visible navigation
Introduction
Project title / image
Decision note below its image
Summary / case study
Next project
About / Contact
```

Signature interaction: expand an annotation into its supporting revision. Notes remain in the ordinary page flow on touch devices. No separate journal section until there are real entries worth publishing.

Tradeoff: easiest to maintain and strongest for thoughtful editorial reading. Less immediately cinematic; depends on good captions and screenshots. Avoid dense newspaper columns and decorative numbering.

### Shared starting tokens

Candidate colors: canvas `#101113`, raised surface `#191B1F`, primary text `#F0F0EC`, secondary text `#B3B7BF`, division `#393D45`, muted accent `#A9B9C8`. These are proposals. Verify final text, link and focus combinations before approval; do not use division color for body text.

Candidate type: IBM Plex Sans for display and body, with a system sans fallback; system monospace only for useful version/build metadata. Confirm the chosen font files and license before adding them. Start with a small range of weights, 56–80px desktop display, 36–44px mobile display, and 16–18px body at about 1.6 line-height. Keep text left aligned and body measure near 60–65 characters. Use fluid values and let real name/copy wrapping determine final sizes.

Layout: a roughly 1120–1200px maximum container, fluid side gutters, asymmetric project spreads, and generous but bounded section spacing. No minimum full-screen hero that pushes all work out of view on small laptops. Keep image captions next to their evidence.

Self-review against the brief: near-black, monochrome and restrained metadata are deliberate user preferences. To avoid a generic space template, omit star fields, numbered “missions,” fake telemetry, neon cards, cursor effects and repeated scroll reveals. Make real project material, especially the Filipino game environment, the most distinctive visual content.

## 7. Technical approach

Retain static HTML/CSS/JavaScript and repository-subpath hosting. The current requirements do not justify React, TanStack, a backend, or a paid host. Prefer semantic HTML, CSS Grid/Flexbox, native disclosures, and small progressive enhancements. No new runtime dependency is proposed.

The approved implementation would affect `index.html`, `styles.css`, `script.js`, case-study HTML/CSS under `project_pages`, approved files under `images/projects`, an approved resume location, favicon/share metadata as needed, and a concise maintenance README. Exact new files depend on the selected treatment and media. Resolve the old CondoEase URL explicitly during that plan rather than deleting it incidentally. Unrelated original material should not be removed without a named decision.

Bootstrap CSS removal is recommended as part of the rewrite, with checks for reset, typography and layout changes. It is a dependency removal proposal, not already performed. Fonts may be self-hosted if approved and their license is preserved. Do not create a build tool just to serve these pages. A small local link/subpath self-check can be written if useful; a test-framework installation is unnecessary.

Optional atmosphere must not carry identity, navigation or work summaries. Begin with a static composition. Any motion or 3D proposal requires a specific purpose, cost, fallback and separate inclusion in the approved scope. Do not automatically initialize or download remote media.

## 8. Whole-redesign roadmap

Sequence is milestone-based because completion depends on contribution answers, approved assets and feedback. Dates should be assigned after those inputs are available.

| Phase | Work and concrete deliverable | Completion / approval boundary |
| --- | --- | --- |
| **1. Investigation and proposal** | Current-site audit, initial project inventory, information architecture, three layout studies and this roadmap. | This phase is complete as a first-pass proposal. Role/availability and initial Bagyong Bahay/CherIt contribution answers are incorporated; media and specific evidence examples remain open. No source rewrite. |
| **2. Content and evidence lock** | Confirm current role/availability, individual/team/AI contributions and two feature projects. Prepare draft summaries, case-study outlines, media inventory and missing-asset list. | John approves factual wording and material intended for publication. Restricted media can be omitted without blocking other stories. |
| **3. Visual comparison** | After method approval, make local static HTML/CSS design studies under a separate proposal directory, using approved existing images. Compare desktop and mobile homepage sections for A/B/C; develop one chosen direction into homepage and one case-study mockup. No external upload or image generation. | John selects the treatment and approves desktop/mobile composition, type, atmosphere, project placement and inspection behavior. Preview code does not replace the site. |
| **4. Implementation plan** | Fix exact file scope, retained URLs, content, asset transformations, dependency removal, interaction states, fallback behavior and verification targets. | Explicit approval authorizes the named source changes. Visual selection alone does not authorize an unspecified migration or deployment. |
| **5. Build the core portfolio** | Implement accessible layout/navigation, introduction, featured work, smaller entries, About/contact, approved resume and two complete case studies. Add media sizing, metadata, correct relative links and maintenance notes. | Essential reading and navigation work without optional JS. No placeholders or unsupported claims in release content. |
| **6. Add the approved inspection** | Implement one evidence-backed disclosure/comparison, including keyboard/touch, stable layout, captions and fallback. Add restrained motion only if approved. | Both visual states are usable and the explanation matches real artifacts. A focused self-check covers any nontrivial state. |
| **7. Verify and review** | Responsive/browser checks, keyboard/zoom/focus/reduced-motion checks, link/subpath checks, media/privacy/credit review, measured loading, final diff and Git-state review. Correct in-scope findings. | Report observed results and limits. John reviews the local result, copy and captures. Passing automated checks do not establish physical-device acceptance. |
| **8. Release preparation and publication** | Prepare a concrete release diff, final content/media list, hosting instructions, rollback procedure and post-release checks. | Commits, push and deployment each require explicit authorization, which can be bundled in a named release plan. Publish only after that approval. Verify hosted routes/assets afterward. |
| **9. Maintenance handoff** | Document how to add a project, update status/resume, replace media and rerun the small checks. Keep the proposal docs as design history if desired. | No recurring service or automation. Update the portfolio as real work changes. |

Critical path: confirmed role and project ownership → cleared media and story outlines → visual choice → exact implementation approval → core site → inspection → verification → release approval. Optional 3D, more case studies and a journal are outside the initial scope.

## 9. Acceptance criteria for the proposed implementation

- John Francis Espiritu, current role, selected work and contact are plainly available; opportunity/education copy is confirmed.
- Two complete stories explain problem, personal contribution, team/AI roles, decisions, evidence and limits. Smaller entries have honest status and valid destinations.
- No placeholder cards, fabricated outcomes, implied NASA affiliation, false live demos or private download links.
- Layout checks at 360, 390, 768, 800, 1024 and 1440 CSS pixels plus 200% zoom and a wide-screen sample. No clipped content or accidental horizontal scroll. Test breakpoint boundaries when new failures suggest them.
- Semantic headings/landmarks, skip link, visible keyboard focus, usable touch controls, meaningful image descriptions, and contrast checks for the actual approved combinations. Document any screen-reader coverage actually performed.
- Complete navigation and story reading with JavaScript unavailable. Optional inspection content remains readable through native disclosure or an equivalent HTML fallback.
- If motion is included, reduced motion has an intentional usable result. No blocking intro, autoplay audio, forced scroll, mandatory hover or WebGL dependency.
- Homepage, case studies, CSS/images, resume and internal links work under `/portfolio-website/`, including direct page loads. Verify mailto and intended social/repository destinations without sending a message.
- Approved responsive images reserve dimensions. Defer below-fold media; video is optional and click-to-play. Proposed initial budget is at most 1 MB transferred for the first view under a documented cold-load desktop/mobile test, excluding explicitly requested media. Treat this as a design target pending actual asset selection, not a measured result.
- Record browser, viewport, network conditions, transfer size, layout stability and any effect cost. Do not substitute a score for tested behavior or claim field performance from a local sample.
- Run relevant existing checks if introduced by the approved plan, a focused interaction/link self-check where needed, and final diff/whitespace/Git-state review. No ceremonial framework installation.
- Final content/media approval precedes public release. Hosted verification is a separate check after an authorized deployment.

## 10. Decisions needed next

The recommended next approval is limited to **content planning plus local visual studies**, using treatment A as the leading option while comparing B and C. The proposed method is plain local HTML/CSS previews with existing approved media; it introduces no provider, dependency installation or production rewrite. Image generation, Figma uploads and deployment are outside that approval.

Highest-value open inputs:

1. Which portfolio captures, resume and public contact details John approves. Candidate media can be located and listed first; no need to publish all projects or reuse existing phone numbers automatically.
2. One or two specific Bagyong Bahay decisions/assets and CherIt feature decisions John can explain with supporting artifacts. Broad contributions are now recorded; sole ownership must not be inferred.
3. DeMolay/veterinary contribution details and TransitPH's demonstrable scope if selected for substantive stories. Current role and freelance/internship availability are already confirmed and should not be asked again.

Unanswered inputs remain placeholders in proposals only. They are not permission to invent public claims.

## Sources and evidence pointers

- Current portfolio source: `index.html`, `styles.css`, `script.js`, `project_pages/CondoEase-Project.html`; hosted site [current portfolio](https://jeyep18.github.io/portfolio-website/).
- Local game evidence: `C:/Users/john2/Documents/Game Development/Bagyong Bahay/software-eng-fest/README.md`, `docs/audits/2026-11-09-windows-rebuild.md`, `docs/audits/2026-11-07-public-release-notices.md`. These include local working changes and should not be represented as the public `main` README.
- [CherIt README](https://github.com/Jeyep18/InnoLab-Hackathon-2026/blob/main/README.md).
- [DeMolay README](https://github.com/Jeyep18/demolay-web/blob/main/README.md) and [operational history](https://github.com/Jeyep18/demolay-web/blob/main/docs/production-readiness/operations.md). Connected access was available; this does not imply anonymous public availability or publication permission.
- [TransitPH repository](https://github.com/Jeyep18/transit-ph) and [frontend manifest](https://github.com/Jeyep18/transit-ph/blob/dev/frontend/package.json).
- [Veterinary system README](https://github.com/Jeyep18/VetClinicSystem/blob/main/README.md).
- [Brittany Chiang](https://brittanychiang.com/): clear identity, experience/project sections and resume access. Borrow that clarity rather than signature layout or wording.
- [Rauno Freiberg](https://rauno.me/): a useful distinction between project work and field notes. The current text read is not a full interaction audit.
- [Dennis Snellenberg](https://dennissnellenberg.com/): explicit Work/About/Contact navigation and personal presence. Do not reproduce the signature hero.
- [NASA Eyes](https://science.nasa.gov/eyes/): describes exploration of real data. The portfolio analogy is purposeful artifact inspection, not fabricated simulation data.
- [JPL Visions of the Future](https://www.jpl.nasa.gov/galleries/visions-of-the-future/): composition grounded in a particular subject and its scientific concept. The palette and poster style are not proposed for copying.
- [NN/G UX portfolio research](https://www.nngroup.com/articles/ux-design-portfolios/): roles, constraints, process, scannability and selected case studies. Applied here as design judgment with the UX research context preserved.

Reference content was read for this proposal. No full visual, accessibility, performance or cross-device audit of the reference sites was performed, and no hiring/conversion result is claimed.
