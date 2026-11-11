# Codex Cloud and hosted preview handoff

Updated November 11, 2026. Read [`PROJECT_STATE.md`](PROJECT_STATE.md) for current scope and hosting status, and [`CLOUD_VERIFICATION.md`](CLOUD_VERIFICATION.md) for the completed Cloud install/browser checks. A running Cloud task and a published reusable environment are different states. Physical phone acceptance is still pending.

## What must be available remotely

Codex Cloud tasks use isolated environments. A GitHub push does not automatically transfer this local chat, private global memory, or uncommitted laptop files. Implementation commit `b281ba5` is already pushed to `codex/portfolio-cloud-handoff` in [`Jeyep18/portfolio-website`](https://github.com/Jeyep18/portfolio-website) and passed [Linux CI](https://github.com/Jeyep18/portfolio-website/actions/runs/42982527748). Required source/docs/assets were verified in the remote tree. Confirm the latest branch and files before creating the environment. Keep `main` and its existing GitHub Pages site unchanged.

Include the active application's source, lockfile, configuration, prerender script, approved assets, license notices, `AGENTS.md`, and portable docs. Exclude raw `.codex-attachments/`, dependencies, build output, secrets, `.vercel/`, caches, logs, private game builds, and full private memories/chat history. No backend or environment secret is required.

## Create and save an environment

The official workflow uses the web or desktop app. Open `Work in`, choose `Cloud`, then `Select environment` and `Create environment`. Select the repository and ensure the approved target branch is selected before setup. Choose `Get started`, review the environment, use `Save/Publish`, and wait for `Environment published` before `Start new task`. Labels can vary with the account UI. See the official [cloud environments guide](https://learn.chatgpt.com/docs/environments/cloud-environments).

The current executor is running, but its environment status has no source configuration or published version ID. No save/publish tool is available in this task. Publish through the phone-accessible account UI below. Node.js 24.14.0 and npm 11.9.0 have now passed the actual Cloud checks.

Use the environment's reusable `Install script` field for dependency setup. The script below assumes the initial working directory is the repository root; confirm that in the environment UI:

```sh
git fetch origin refs/heads/codex/portfolio-cloud-handoff:refs/remotes/origin/codex/portfolio-cloud-handoff
git switch codex/portfolio-cloud-handoff
bash scripts/cloud-setup.sh
```

The tested installer resolves the repository root itself, verifies the official
Node download's checksum, and runs the four application commands plus the 40
separate legacy checks. It requires Linux x64 or arm64, Bash, curl, tar/xz,
sha256sum and access to nodejs.org and the package-lock registry hosts. The runtime
is kept in ignored `.cache/portfolio-cloud/`; it does not change the system Node.
Only Linux x64 was exercised in this pass.

Use the reusable `Start skill` field for these project instructions:

```text
Read AGENTS.md and docs/PROJECT_STATE.md first. Work on the active React app in
docs/redesign/prototypes/space-gallery, not the legacy root homepage. In each
shell, from the repository root, use:
export PATH="$(git rev-parse --show-toplevel)/.cache/portfolio-cloud/node/bin:$PATH"
Check node --version and npm --version. If the cached runtime is missing,
run bash scripts/cloud-setup.sh within the task's installation authorization.
Respect
the requested task's approval boundary and preserve unrelated changes. Run
npm test, npm run build, and npm run check:build from the active app directory for relevant React changes.
Report actual checks and remaining limits. Keep the existing GitHub Pages
deployment unchanged. Do not commit, push, deploy, change account access,
or install new dependencies without explicit authorization for that action.
For a Cloud-local preview, run npm run preview in the active app directory
after building, then verify http://127.0.0.1:8769/ from a Cloud browser. This
loopback address is not a persistent phone URL; use the verified Vercel URL
in PROJECT_STATE.md for phone viewing. Stop or rebuild the preview as needed.
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

## Use and update the separate hosted preview

A hosted preview supplies a persistent website URL for phone review while the laptop is off. It is separate from Codex Cloud and from the existing GitHub Pages site.

The approved target is a separate Vercel preview using John's own account. The connector's `jan-s-projects7` scope remains inaccessible and must not be used or authorized. In this Cloud pass John completed Vercel's device sign-in from Android. The separate CLI session identified his authorized own account as `jfmihoyofriends-9058` (Hobby). Project `portfolio-space-gallery` was created there. Check `PROJECT_STATE.md` for the actual deployed commit and URL.

The verified public phone URL is https://portfolio-space-gallery.vercel.app/.
The separate Preview is
https://portfolio-space-gallery-6yswp7340-jfmihoyofriends-9058.vercel.app/ and
requires sign-in to that Vercel account. Both currently serve source commit
`d4ddf1dbc2a39ced1e6d61cd871cec761974f255`. Vercel required the new project's
first deployment to be labelled Production; John separately approved it before
the Preview was created. That deployment belongs only to this new project.

For a future Cloud session without CLI authentication, use Vercel's normal
`vercel login` device flow. Open the displayed vercel.com OAuth/device link in
Android Chrome and approve there; never paste a token or password into chat.
Run `vercel whoami --format json` and verify the intended account, then inspect
the named project with `--scope jfmihoyofriends-9058` before deploying. Reusable
Cloud setup does not require, copy or publish this task's CLI authentication.

For a specifically authorized future Preview update, commit/push the reviewed
handoff branch, then run from the repository root using an available Vercel CLI:

```sh
vercel project inspect portfolio-space-gallery --scope jfmihoyofriends-9058 --non-interactive
vercel deploy --dry --project portfolio-space-gallery --scope jfmihoyofriends-9058 --json
vercel deploy --project portfolio-space-gallery --scope jfmihoyofriends-9058 --environment preview --yes
```

Confirm a clean checkout, the intended commit/account/project, and the upload
manifest before the final command. The committed `.vercelignore` limits uploads
to application source and curated assets; it excludes build output, dependencies,
captures and unrelated repository material. Record the new Preview URL and Git
commit, then verify hosted routes/assets. A Preview update does not update the
public production alias. Updating that alias needs an authorized deployment to
the same separate project's Production target.

GitHub linking is optional for manual Cloud deployments and is currently pending.
Vercel returned HTTP 400 because this account has no GitHub Login Connection.
To enable automatic previews from a phone: in Vercel select the authorized own
account, open **Account Settings > Authentication > Login Connections**, add
GitHub, and authorize `Jeyep18/portfolio-website` through GitHub's normal UI. Then
open **portfolio-space-gallery > Settings > Git > Connect Git Repository** (or
have a Cloud task run the already attempted `vercel git connect` for this named
project/scope). Confirm the nested root, install/build/output values and intended
branch deployment rules before enabling automatic builds. Do not choose
`jan-s-projects7`, create another project, or enable a paid plan. See [Vercel's
login connection guidance](https://vercel.com/docs/accounts/create-an-account#login-methods-and-connections).

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
4. Hosting already exists: open [portfolio-space-gallery in your own Vercel account](https://vercel.com/jfmihoyofriends-9058/portfolio-space-gallery). Use the verified public URL for phone review. If automatic Git previews are wanted, complete the Login Connection/Git steps above, then use the full [handoff branch URL](https://github.com/Jeyep18/portfolio-website/tree/codex/portfolio-cloud-handoff) for a Preview. Main does not contain this nested React app. Manual Cloud Preview deployment is already working; no new project or paid plan is needed.
5. This task already authorized a Preview deployment. For later work, authorize the specific Preview update on codex/portfolio-cloud-handoff, with the same root/build settings and no main/GitHub Pages changes or paid options. If authentication has expired, complete the device flow on the phone. Request the deployed commit, build result, URL, and live route/asset checks. Do not paste a Vercel token into chat.
6. Open the resulting Vercel URL in Android Chrome, test home/archive.html/cherit.html and motion controls, then reload with the laptop off. Separately reopen the Cloud task and confirm it runs in Cloud.

## Reopen from Android with the laptop off

1. In Android Chrome, open https://chatgpt.com/ with the same ChatGPT
   account/workspace and open this conversation from history. Bookmark its actual
   browser address; no conversation-specific URL is available to the agent.
2. Select **Work in > Cloud** and confirm the task uses the Cloud environment.
   This task's commands and Chromium ran in Cloud and did not use the laptop.
   Existing tasks retain their own files; verify branch and remote HEAD on resume.
3. To make the setup reusable, use **Settings > Codex Cloud > Environments >
   Create environment**, select `Jeyep18/portfolio-website`, and **Get started**.
   Set the Install script and Start skill above. Use Chrome **Desktop site** if
   controls are hidden. Review the setup, keep **Only me**, **Save draft**, then
   **Publish**. Wait for **Environment published** before **Start a new task**.
   If Cloud controls are absent, account/workspace access remains a platform
   blocker; this task cannot enable those controls for the account.
4. In a fresh task, use the first-task prompt above. Confirm Cloud, the handoff
   branch, latest remote commit, Node 24.14.0 and actual checks. No laptop process
   or private local memory is needed. Reauthorize provider access on the phone
   only when the requested work needs it.
5. Open the verified Vercel URL in `PROJECT_STATE.md`, then `/archive.html` and
   `/cherit.html`. Test touch anchors, all project dialogs, experience photos,
   résumé download, and Pause/Enable motion. Scroll through all About content.
6. With the laptop powered off, reload each URL. Separately reopen this Cloud
   conversation or start a task from the published environment. Report website
   reload and Cloud-task results separately; neither physical check has been
   performed by the agent.

The environment publication and physical-phone steps are pending user actions.
The completed Cloud browser checks are in `CLOUD_VERIFICATION.md`; local browser
settings no longer block them. The Vercel connector remains unusable for this
project, while the separately authorized Cloud CLI is the intended deployment
path for this task.
