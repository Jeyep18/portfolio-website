# Codex Cloud and hosted preview handoff

Prepared November 11, 2026. Read [`PROJECT_STATE.md`](PROJECT_STATE.md) for current scope and evidence. Cloud setup, deployment, and phone acceptance are pending until their results are observed.

## What must be available remotely

Codex Cloud tasks use isolated environments. A GitHub push does not automatically transfer this local chat, private global memory, or uncommitted laptop files. Implementation commit `b281ba5` is already pushed to `codex/portfolio-cloud-handoff` in [`Jeyep18/portfolio-website`](https://github.com/Jeyep18/portfolio-website) and passed [Linux CI](https://github.com/Jeyep18/portfolio-website/actions/runs/42982527748). Required source/docs/assets were verified in the remote tree. Confirm the latest branch and files before creating the environment. Keep `main` and its existing GitHub Pages site unchanged.

Include the active application's source, lockfile, configuration, prerender script, approved assets, license notices, `AGENTS.md`, and portable docs. Exclude raw `.codex-attachments/`, dependencies, build output, secrets, `.vercel/`, caches, logs, private game builds, and full private memories/chat history. No backend or environment secret is required.

## Create and save an environment

The official workflow uses the web or desktop app. Open `Work in`, choose `Cloud`, then `Select environment` and `Create environment`. Select the repository and ensure the approved target branch is selected before setup. Choose `Get started`, review the environment, use `Save/Publish`, and wait for `Environment published` before `Start new task`. Labels can vary with the account UI. See the official [cloud environments guide](https://learn.chatgpt.com/docs/environments/cloud-environments).

Do not assume a saved environment already exists. Confirm it in the account UI. Select an available Node.js runtime compatible with the lockfile; the local reference is Node.js 24.14.0 and npm 11.9.0. Record the actual cloud versions and build result after setup.

Use the environment's reusable `Install script` field for dependency setup. The script below assumes the initial working directory is the repository root; confirm that in the environment UI:

```sh
cd docs/redesign/prototypes/space-gallery
npm ci
npm test
npm run build
npm run check:build
```

Use the reusable `Start skill` field for these project instructions:

```text
Read AGENTS.md and docs/PROJECT_STATE.md first. Work on the active React app in
docs/redesign/prototypes/space-gallery, not the legacy root homepage. Respect
the requested task's approval boundary and preserve unrelated changes. Run
npm test, npm run build, and npm run check:build from the active app directory for relevant React changes.
Report actual checks and remaining limits. Keep the existing GitHub Pages
deployment unchanged. Do not commit, push, deploy, change account access,
or install new dependencies without explicit authorization for that action.
```

These reusable fields configure future tasks. They do not transfer a local chat or authorize additional work. See the official [environment modes guide](https://learn.chatgpt.com/docs/environments/modes) for the distinction between local and cloud work, and [remote connections](https://learn.chatgpt.com/docs/remote-connections) for the separate remote-connection workflow.

## Start a fresh cloud task

After the environment is published, start a new task with a concrete request. This portable first-task prompt establishes what the cloud checkout actually contains:

```text
Use Jeyep18/portfolio-website on codex/portfolio-cloud-handoff. Read AGENTS.md,
docs/PROJECT_STATE.md, and docs/CODEX_CLOUD.md. Inspect the checkout and report
the current branch/commit and any differences from the documented state.

The active app is docs/redesign/prototypes/space-gallery. Build it with npm ci
and npm run build from that directory. Check all three prerendered pages and
required local assets. Report the actual Node/npm versions and build result.
Root node tests/site.test.mjs covers only the legacy site, not React.

Do not treat any UI change still marked in progress as verified. Explain a
small plan before changing source and wait for approval. Keep five projects,
four events, truthful team/AI attribution, reduced motion, pause, keyboard
access, focus restoration, and script-free content. Keep main and GitHub Pages
unchanged. Do not commit, push, deploy, change provider access, or publish raw
uploads/private data. This task is inspection and verification only.
```

For later work, replace the final inspection-only request with the specific approved task. Keep the repository, branch, active-directory, and publication boundaries explicit.

## Create the separate hosted preview

A hosted preview supplies a persistent website URL for phone review while the laptop is off. It is separate from Codex Cloud and from the existing GitHub Pages site.

The approved target is a new Vercel preview using John's own Vercel account. The currently connected `jan-s-projects7` scope is inaccessible. Use Vercel's normal account/team selection or reconnect flow to select John's account; do not change permissions or deploy under another team's account to bypass the issue.

Review these settings before the approved deployment:

| Setting | Value |
| --- | --- |
| Repository | `Jeyep18/portfolio-website` |
| Source branch | `codex/portfolio-cloud-handoff` |
| Root directory | `docs/redesign/prototypes/space-gallery` |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment secrets | None required |

Keep the existing GitHub Pages configuration unchanged. Record the actual Vercel project/account, deployed commit, persistent preview URL, build result, and access settings in `PROJECT_STATE.md` after observing them. A successful build or a connector response alone is not a verified public preview.

## Android and laptop-off acceptance

Android native Codex availability has not been confirmed for this account. Inspect the actual account UI and use web access when available. Do not promise an Android-specific native feature. Website access through a phone browser and access to Codex task controls are separate checks.

On John's physical Android phone:

1. Open the hosted URL in the phone browser. Confirm it works without a laptop proxy or loopback address.
2. Open home, `archive.html`, and `cherit.html`. Check images, resume, certificate links, navigation, and readable text.
3. Exercise touch scrolling, anchors, event photos, project dialogs, dismissal, and motion pause. Check narrow layout and reduced motion if available in device settings.
4. Turn the laptop off and reload the hosted pages. Record the observed result.
5. Separately open the supported Codex web/account UI, confirm the saved cloud environment, and start or inspect a cloud task if the account provides it. Confirm the task does not depend on a laptop-hosted process.

Record website and cloud-task outcomes separately. Until this review happens, physical Android behavior and laptop-off operation remain unverified.

## Phone-only setup checklist

1. Open [ChatGPT on the web](https://chatgpt.com/) in Android Chrome and sign in to the same account/workspace. Use web Cloud controls when available. Request Chrome's Desktop site view if the small-screen layout hides configuration controls. If Cloud controls remain absent, account/workspace availability needs resolution. The laptop connection does not establish that a Cloud environment exists.
2. Choose Work in > Cloud > Select environment > Create environment, or Settings > Codex Cloud > Environments > Create environment. Choose Jeyep18/portfolio-website and codex/portfolio-cloud-handoff before installation. If the picker offers only a repository, tell the setup task to check out that branch first. Request Node 24.14.0 and use the install/check commands above.
3. Review the environment report, keep access private to you, save, and Publish. Wait for Environment published. Start a new task with the first-task prompt above. Confirm its branch, commit, Node version, checks, and lack of laptop-only dependencies.
4. For hosting, open [Vercel New Project](https://vercel.com/new) on the phone and use your own account. Import the existing repository and configure the root/install/build/output settings above. After the project is linked, Deployments > Create Deployment accepts the full branch name or [branch URL](https://github.com/Jeyep18/portfolio-website/tree/codex/portfolio-cloud-handoff). Check that reference because main does not contain this nested React app. See [Vercel Git deployment guidance](https://vercel.com/docs/git#creating-a-deployment-from-a-git-reference).
5. If you prefer Codex to deploy after your own Vercel connection becomes available in Cloud, explicitly authorize a Preview deployment of codex/portfolio-cloud-handoff from docs/redesign/prototypes/space-gallery using npm ci, npm run build, output dist, with no main/GitHub Pages changes or paid options. Request the deployed commit, build result, URL, and live route/asset checks. Do not paste a Vercel token into chat.
6. Open the resulting Vercel URL in Android Chrome, test home/archive.html/cherit.html and motion controls, then reload with the laptop off. Separately reopen the Cloud task and confirm it runs in Cloud.

## Current access limitations

John can currently reach the laptop only through Codex from Android. Local browser use is disabled in Work settings, so new browser verification cannot run in this session. The Vercel connector requires the intended own-account selection/authorization before it can create a preview. GitHub publication does not resolve these account settings. Complete the cloud and hosted-preview steps from an account UI available on the phone or web, then record the observed results.
