# Revised technology proposal

November 10, 2026, Asia/Manila. Discussion proposal, not an approved migration.

## Recommendation and reason for revisiting it

The first investigation recommended retaining hand-authored HTML/CSS/JavaScript because the proposed homepage and project disclosures did not require a framework. That remains technically sufficient.

John has now supplied a broader design/motion master prompt, expressed a preference for React Bits, and added two MotionSites references. If the chosen experience uses React components and several maintained case studies, I recommend **Astro static output, TypeScript, selected React islands, Tailwind CSS and a small amount of deliberate motion**. The reason to migrate is component reuse, structured project content and selective React integration, not the assumption that a modern look requires a modern framework.

No stack is approved or installed. If the design ultimately uses only CSS effects and native disclosures, keeping the original static approach is still the smaller choice.

**Later clarification, November 10:** John wants MotionSites-like motion and interactivity as a meaningful part of the portfolio, while retaining the earlier visual/content principles. The proposal must not reduce that to incidental hovers or fades. The supplied [Fernhollow reference](fernhollow-motion-reference.md) describes camera-path movement, pointer displacement, bloom/fog and a coordinated hover transition in a 3D scene. Those are reference capabilities, not chosen implementation details. Astro remains viable, including for substantial React/WebGL sections, but the framework choice is provisional until a motion storyboard defines shared state and choreography. If the homepage becomes one continuous React experience, an all-React architecture may offer simpler ownership and smaller practical benefit from Astro. No implementation is authorized by this clarification.

## Proposed layers

| Layer | Proposed tool | Responsibility and boundary |
| --- | --- | --- |
| Site framework | Astro with static output | Build the homepage and individual case-study pages as HTML; reuse layouts, project spreads, captions and metadata. No running application server required for this output. |
| Language | TypeScript | Check project metadata and interactive component interfaces. It does not establish content accuracy or runtime correctness by itself. |
| Interactive UI | React through the official Astro React integration | Use small components for an approved artifact inspector or effect. Keep identity, project text, navigation and contact in readable page HTML. |
| Styling | Tailwind CSS through its Vite plugin, plus shared CSS tokens and scoped effect CSS | One typography, color and spacing system across the site and adapted component source. Bootstrap removal would be part of the approved migration. Tailwind is a deliberate styling change, not currently present. |
| Creative components | Selected React Bits source | Adapt only the components the chosen design needs. Review each one's imports, SSR/browser assumptions, cleanup, interaction semantics, license and bundle cost. React Bits offers TypeScript/CSS and TypeScript/Tailwind variants; installing a component is not the same as installing all its demos. |
| Motion | CSS first; Motion for approved React interaction states if needed | CSS handles focus/hover and simple transitions. Motion can handle more complex state, layout or enter/exit behavior in a React component. Each animated value has one owner. No parallel GSAP implementation of the same effect. |
| Content | Local Markdown plus Astro content collections where useful | Maintain project story text with structured role, status, credits, media and links. No external CMS or account required. Use ordinary Markdown first; MDX only if embedded components in prose become a real need. |
| Media | Local approved responsive images, SVG and optional click-to-play video | Reserve dimensions, choose suitable formats, avoid automatic video downloads, and maintain permissions/credits. Begin with CSS/SVG for the horizon. |
| Hosting | Existing GitHub Pages approach | Build static files with explicit repository-base handling. A future authorized release would configure `/portfolio-website/` and test generated links/assets. Vercel is an alternative, not required. |
| Development and checks | One Node/npm toolchain and lockfile after version review | Build/type checks, targeted interaction/link checks, responsive browser verification and measurement. Do not install a large testing stack for trivial behavior. |

Astro's documentation describes static content with separately hydrated interactive islands and an official React integration. That supports this architecture; it does not guarantee a particular component or performance result. Tailwind 4 has documented Vite-plugin integration. The actual compatible Astro/React/TypeScript/plugin versions must be selected together at implementation time and recorded in the lockfile.

## What React Bits contributes

React Bits is a component-source library, not a page router, content system, host or guarantee of clean design. Its own installation guide says to copy/add the chosen source and install the dependencies listed for that component.

Potential roles are one restrained text treatment, a controlled atmospheric element, or an interactive artifact presentation. These are categories to evaluate, not selected components. A static horizon can also be custom CSS/SVG. No component is chosen solely because its demo is impressive.

Before adoption, test server/static rendering, stable initial HTML, reduced motion, keyboard/touch, disposal of observers/animation loops, low-power/mobile cost and the actual dependencies. Essential text must not begin invisible waiting for hydration or animation. A component that requires another animation/rendering engine changes the dependency plan and must justify that cost. Do not assume all React Bits components use Motion or all require WebGL.

## MotionSites references and design interpretation

- [fernhollow](https://www.motionsites.ai/?prompt=fernhollow) opened a design preview labeled **Flower Valley** during this inspection. It showed large narrow typography, a dark immersive field and luminous botanical elements. Record the supplied URL and observed title together because they differ.
- [Ink Reveal](https://www.motionsites.ai/?prompt=ink-reveal) showed large black typography on a light canvas with colorful reveal shapes, categorized Hover. The full prompt was gated, and it was not unlocked.

These were gallery preview observations, not a source-code audit or live input/performance test of the showcased websites. No conclusion about their frameworks, exact rendering method or mobile behavior is warranted. They are design references, not instructions to replicate their effects.

Proposed translation: strong type, a memorable atmospheric composition, and one purposeful reveal tied to a genuine project artifact. Keep the portfolio's monochrome base and ordinary reading/navigation. On touch/reduced-motion/no-JavaScript paths, show the content directly or provide explicit controls. A hover reveal can supplement a screenshot but cannot be its only access path. Keep the project's real imagery visually primary.

## Alternatives and tradeoffs

| Approach | Why it remains viable | Why it is not the current leading proposal |
| --- | --- | --- |
| Existing HTML/CSS/JavaScript | Least setup and dependency maintenance; enough for native disclosures and restrained styling. | Sharing layouts/content across growing case studies and incorporating actual React components is less convenient. Prefer it if React effects are not selected. |
| React + Vite + TypeScript | Good for a mostly interactive React showcase; direct React Bits integration and familiar component structure. | A plain client-rendered SPA would need extra planning for HTML content, case-study routes, direct-link behavior and repository-subpath hosting. Prerendering is possible but adds another decision. |
| Next.js + React + TypeScript | A valid React option; static export is documented, so it does not inherently require paid/server hosting. | No server features, auth or runtime data requirement currently calls for its broader application model. Consider it if requirements expand or John prioritizes an all-React framework. |
| Framer/Webflow | Visual authoring could be useful in another project. | No requested visual-CMS workflow or provider migration offsets the portability, platform and publishing changes here. |

The Astro approach adds a build step, package updates and two component syntaxes. Those are real maintenance costs. It also allows static page rendering with React only where chosen. Both benefits and costs should be reviewed before migration approval.

## Conditional tools

- **GSAP/ScrollTrigger:** propose only if a specifically approved coordinated timeline needs it. Prefer one animation engine per effect and a small total set of engines.
- **shadcn/ui or another accessible primitive:** add only for a concrete control such as a dialog whose behavior justifies it. The React Bits installation CLI does not itself require adopting the whole shadcn visual system.
- **Lenis:** no current need. Native scrolling matches the original brief.
- **Three.js, React Three Fiber, Spline:** no currently approved 3D requirement. Atmosphere can start in CSS/SVG. A WebGL candidate needs a separate purpose, measured budget and static fallback.
- **Magic UI, Aceternity UI, Motion Primitives and other libraries in the master prompt:** alternative references or isolated candidates. Do not assemble a site from unrelated library sections.
- **Backend, database, auth, CMS, payments, analytics:** no requirement in this portfolio scope.

## Approval and verification route

1. Agree on the visual treatment and scope of actual React/motion use. Content drafting and local previews remain the next proposed phase.
2. If this stack is chosen, present exact migration scope: package/config files, page/content migration, Bootstrap removal, asset/base URLs, legacy URL handling, local preview boundaries and dependency/version checks.
3. Obtain explicit approval before installations, migration or preview code. The current request authorizes reference/memory documentation only.
4. Build static content first, then add the approved interactive sections. Keep usable initial/fallback HTML.
5. Verify build/type checks, direct case-study URLs under the repository prefix, image/font loading, no-JavaScript reading, keyboard/touch, reduced motion, layout stability and measured animation/bundle cost. Report conditions and limitations.
6. Publish only under a separately authorized release plan. The deployment guide is reference material, not permission to activate auto-deployment.

## Current primary documentation reviewed

- [Astro islands](https://docs.astro.build/en/concepts/islands/) and [React integration](https://docs.astro.build/en/guides/integrations-guide/react/).
- [Astro styling and Tailwind](https://docs.astro.build/en/guides/styling/#tailwind) and [content collections](https://docs.astro.build/en/guides/content-collections/).
- [React Bits installation](https://reactbits.dev/get-started/installation) and [source repository](https://github.com/DavidHDev/react-bits).
- [Motion for React](https://motion.dev/docs/react).
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [Vite static deployment](https://vite.dev/guide/static-deploy.html#github-pages), and [Next.js static export](https://nextjs.org/docs/app/guides/static-exports).

Documentation compatibility is preliminary. No dependencies, selected effects or deployed build were tested in this phase.
