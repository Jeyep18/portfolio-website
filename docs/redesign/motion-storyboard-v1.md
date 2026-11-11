# Motion storyboard v1: illuminated horizon

November 10, 2026, Asia/Manila. John selected an illuminated horizon and a quietly alive resting state, with stronger pointer and scroll responses. These concept choices are confirmed. The choreography, values, rendering method and prototype scope below are proposals, not implementation approval.

## Experience

A dark planetary edge occupies the lower/right region of the introduction. A thin luminous rim and broad, dim atmospheric falloff suggest scale. The composition slowly changes while resting, responds visibly to a visitor's pointer, then gives way to the work during ordinary scrolling. Keep most of the image dark so the rim has a clear shape rather than becoming a generic glow behind text.

Identity and ordinary navigation remain stable and readable. Use off-white and charcoal with a restrained cool accent if chosen later. No invented coordinates, fake scientific data, stars required for decoration, or literal cockpit interface. The motion demonstrates care in execution without implying aerospace experience.

## Annotated frames

These describe layout and transitions, not finished visual mockups. Distances/timing below are initial tuning ranges to evaluate, not measured results.

### Frame A: first usable view

```text
John Francis Espiritu                 Work  About  Resume*  Contact

John Francis
Espiritu                        open dark space
Computer Science student
exploring web, app, and
game development.

[View work]  Contact                 dim atmospheric light
                             ________ illuminated rim ______
                       _____/                               \
                      /            dark planetary body       \
Selected work / first-project edge visible when space permits
```

*Resume is included only when an approved file exists. Role text is confirmed; the exact line breaks and introduction copy are proposals.*

The name, role, navigation and View work are available in the initial HTML. A static horizon is visible before any expensive effect initializes. There is no loading cover and no dependency on an engine callback to reveal the interface. The graphic upgrades in place without changing layout. Keep text in a separate readable region from its brightest portion.

### Frame B: quietly alive

```text
Text and controls stay in place.

             slow light migration along the rim
                     <--------------- >
              _________................_________
             /                                  \
```

The atmospheric highlight migrates slowly along a limited arc, with low-amplitude depth movement. Start by testing a broad 20–30-second cycle rather than a noticeable short pulse. Avoid zooming the whole page, moving text, or repeatedly staging the introduction. Provide a plainly labeled Pause motion control near the scene; pausing freezes the decorative scene while normal navigation continues.

### Frame C: responding to exploration

```text
Pointer moves in the hero's visual region
             light follows with soft bounded lag
             rim position/depth shifts a little
Text, links and page geometry remain fixed
```

Pointer input changes the light position and apparent viewpoint enough to be discoverable. Start with roughly 8–16 CSS pixels of equivalent visual displacement at desktop size, tuned against perceived depth. Ease toward input over roughly 180–300ms; avoid elastic bounce. On pointer exit, return smoothly to the ambient baseline. Clamp input so corner movements cannot whip the scene around. Native pointer/cursor and click targets remain unchanged.

The motion channels have distinct owners: ambient time drives slow light travel; pointer position supplies a bounded offset; scroll supplies the exit composition. Combine these inputs rather than letting several libraries compete to overwrite the same property. Pause/reduced motion override the decorative channels.

### Frame D: transition into the work

```text
Initial scroll                 Further scroll
identity moves naturally up    selected work heading
rim recedes toward edge        Bagyong Bahay / status
work begins entering           [real game capture           ]
                               problem / role / story link
```

Use the hero's natural exit through the viewport as the animation range. The apparent viewpoint pulls back slightly, the atmospheric light diminishes, and the first project occupies the visual emphasis. Do not pin a long sequence or consume scroll input. Reverse scrolling reverses this transition; moving quickly must remain usable. View work jumps directly to the real section with ordinary anchor behavior, respecting reduced motion.

Start by testing approximately 40–80px of additional scene displacement across the hero exit and a small scale/depth change. A real prototype must establish whether this feels spatial or merely looks like a shrinking image. The first project should not wait for an animation completion event to appear. Avoid physically morphing an unrelated planetary surface into the game screenshot.

### Frame E: selected project and inspection

```text
Bagyong Bahay                         private test candidate
[large approved game screenshot                           ]
Short problem / John's role / team and AI context
Read case study                 Inspect this decision

On inspection:
[Before artifact]  [After artifact]       explanation
[Before] [After]                         reason / limitation
```

Let the composition of the project image carry most of this section. One image-bound reveal can introduce it while its heading and summary stay readable. Do not repeat the same reveal on every paragraph or conceal essential information behind hover.

Inspection switches between two genuine artifacts with consistent framing and a concise explanation. For pointer activation, test a 200–300ms transition; repeated keyboard selection should update immediately. Controls have explicit selected state and remain usable while a transition is in progress. A drag gesture is optional, never the only way to compare. Exact artifacts are unselected and need John's explanation and media clearance; prototype placeholders must be labeled as such.

### Frame F: continued reading and contact

The remaining work follows the same interaction vocabulary with quieter presentation. Do not introduce another immersive scene competing with the hero. Case-study links use normal page navigation in the first prototype scope; no route-transition system is assumed. About/contact finish with stable typography and direct links. Contact does not require a final spectacle or waiting sequence.

## Mobile, reduced motion and failure states

| Situation | Intended behavior |
| --- | --- |
| Narrow touch viewport | Stack identity above a cropped horizon; use intentional scale rather than shrinking the desktop screenshot. Let the introduction determine height and show a route into work. Preserve visible navigation. |
| Touch interaction | Slow ambient light plus ordinary scroll response provide the main experience. Do not require swiping the scene, touch-dragging a camera, device orientation permission or simulated hover. Compare artifacts with buttons. |
| Reduced motion | Static authored horizon, no ambient/pointer/parallax/reveal animation, immediate inspection changes. Preserve the same hierarchy and content. |
| Pause selected | Freeze decorative scene movement, including its pointer/scroll offsets; the page still scrolls naturally and controls still work. |
| Graphic still loading, unavailable or context lost | Static horizon stays visible; identity/work/contact remain usable. No blank canvas or indefinitely hidden text. |
| Hero offscreen or page hidden | Stop scene rendering and input work; resume only when visible and movement is enabled. |

## Prototype proposal for approval

Create one isolated local prototype under `docs/redesign/prototypes/horizon-v1/`. Include the introduction, the horizon's resting/pointer/scroll states, the first project transition, pause/reduced-motion behavior and a small labeled inspection study. Do not replace the current homepage.

Use original local HTML/CSS/JavaScript and an original compact WebGL shader for the horizon, with a CSS/SVG fallback. This tests the visual/depth interaction directly without committing to Astro or an all-React framework and requires no installed animation or rendering library. Keep the effect code disposable; production framework/component ownership is decided after review. Do not import the Fernhollow engine, assets or audio. Use a clearly labeled project-media placeholder until a suitable capture is approved. No image generation, uploads, external services or deployment.

The shader candidate is a proposal, not a conclusion that WebGL is essential or faster. If it adds little visual value over the fallback, decide from the comparison and measurements whether to keep it. If its quality cannot be achieved within the scope, report that before expanding to new libraries or assets.

## Review criteria

- The rim reads as an illuminated planetary edge, with depth and a visible response to exploration.
- Resting motion feels alive without demanding attention; pointer interaction is discoverable and bounded.
- Name/role/navigation remain clear throughout. Text never moves with the pointer.
- Transition into work feels connected, keeps native scrolling and supports rapid/reversed scrolling and direct anchors.
- Mobile has an intentional composition and interaction model. Reduced motion and renderer failure have complete static presentations.
- Check at 390px mobile and 1440px desktop, an intermediate width and 200% zoom. Check keyboard access, pause, comparison controls, JavaScript-disabled reading and graphics-failure fallback.
- Record device/browser/viewport, loading and representative frame-time observations; no universal smoothness claim from one machine. Test whether rendering stops offscreen/background and whether layout shifts occur.
- Review visual quality and usefulness with John before porting the effect or locking dependencies. A technically passing prototype may still be rejected on feel.

The selected concept is sufficient to draft this storyboard. The next approval concerns the specific isolated prototype above, not a website rewrite or publication.
