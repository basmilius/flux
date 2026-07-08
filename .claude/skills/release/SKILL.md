---
name: release
description: >-
  Create a GitHub release for the Flux UI monorepo (basmilius/flux), then let CI
  publish. Use when the user runs /release <major|minor|patch|stable [beta]>
  or asks to release / cut / publish a Flux version. Derives the next version
  itself from the latest git tag: a bump keyword (major/minor/patch, optionally
  + beta) is resolved against the highest stable tag, beta bumps the existing
  pre-release counter, and `stable` finalises the running beta; an explicit
  semver argument is still accepted verbatim. Then runs safeguards (tag does not
  exist, clean working tree, local build), generates the changelog using the
  release-notes conventions. For a pre-release it diffs against the previous
  beta (falling back to the latest stable when none exists) rather than the
  latest stable. It shows the changelog for review, and only after explicit
  confirmation runs `gh release create`. It never bumps versions, commits,
  pushes, or publishes to npm; the released.yml workflow does all of that once
  the release exists.
argument-hint: "<major|minor|patch|stable [beta]> | <version>"
license: MIT
---

# Flux release

Cut a GitHub release for the Flux UI monorepo (`basmilius/flux`) from a bump
keyword (`major` / `minor` / `patch`, optionally `beta`, or `stable`), with an
explicit version number still accepted as an escape hatch. Creating the release
is the **only** action this skill performs; everything else is automated by CI.

## How releasing works in this repo (read first)

Publishing is **fully CI-driven**. `.github/workflows/released.yml` triggers on
`release: [prereleased, released]` and then, on its own:

- bumps every package's version to the release tag (`bun pm version`),
- replaces `workspace:*` deps with the version and stamps `plugin.json`,
- builds all packages + docs,
- runs `npm publish` (pre-release → `--tag next`, stable → default tag),
- deploys the docs to Cloudflare.

The versions in the repo are intentionally `0.0.0` and are bumped **only in CI**,
never committed back. Therefore this skill must **not** bump versions, create
commits, push tags, or publish to npm. It only creates the GitHub release; the
`prerelease` flag on that release is what CI reads to decide the npm dist-tag.

This skill **does** mutate remote state in exactly one place: `gh release create`
in step 6. It must not run that command before the user has confirmed in step 5.

## 1. Resolve the target version

`$ARGUMENTS` is parsed as a **spec** (first token) plus an optional second token
(`beta`). The spec is **required**; if empty, stop and ask the user what to
release.

Refresh the tags first so the computation reads the current state:

```bash
git fetch origin --tags --prune
```

Then resolve the spec to a concrete `<version>`:

1. **Explicit semver**: if the spec already matches the exact regex CI enforces
   (from `released.yml`):
   ```
   ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$
   ```
   use it **verbatim** as `<version>` (escape hatch for e.g. an `-rc.1` or a
   re-cut). A second token is ignored; warn briefly that it has no effect.

2. **`major` / `minor` / `patch`**, take the base = highest **pure stable** tag:
   ```bash
   git tag -l | grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1   # e.g. 3.1.12
   ```
   Parse it as `X.Y.Z` and bump:
   - `major` → `(X+1).0.0`
   - `minor` → `X.(Y+1).0`
   - `patch` → `X.Y.(Z+1)`

   This is the **target stable**. With no second token, that is `<version>`.

   With a second token `beta`, find the existing betas of that target and bump
   the counter:
   ```bash
   git tag -l "<target>-beta.*" | sed -E 's/.*-beta\.//' | sort -n | tail -1
   ```
   Highest `N` → `<version>` = `<target>-beta.<N+1>`; no matching tags →
   `<target>-beta.0`.

3. **`stable`** finalises the running beta: take the highest beta line and strip
   the pre-release part:
   ```bash
   git tag -l '*-beta.*' | sed -E 's/-beta\.[0-9]+$//' | sort -V | uniq | tail -1
   ```
   The result is `<version>` (the target stable). If there is **no** beta tag at
   all, stop and tell the user there is nothing to finalise (point them at
   `major|minor|patch`). A second token is not valid here. Known limitation: with
   parallel beta lines this picks the highest-overall line; not a concern for
   this repo's linear flow.

4. **Anything else** → invalid spec; stop and show the valid forms
   (`major|minor|patch [beta]`, `stable`, or an explicit semver).

Determine **pre-release** status from the resolved `<version>`: it is a
pre-release iff it contains a `-` (e.g. `-beta.0`, `-rc.1`). Remember this for
steps 4 and 6.

Finally, **log the resolution** for the user so the chosen version is visible
before the heavy work, e.g. `patch beta → 3.1.13-beta.0 (base: 3.1.12)` or
`stable → 3.2.0 (from 3.2.0-beta.1)`.

## 2. Run safeguards

The tags were already refreshed in step 1. Run all three safeguards. **Stop** on
a hard failure; **warn but continue** where noted.

1. **Tag / release must not exist** (hard stop), checked against the `<version>`
   resolved in step 1. If either resolves, a release with this version already
   exists, so stop and tell the user. (For a computed beta this should not happen,
   since step 1 picks the next free counter, but the check still guards races.)
   ```bash
   git rev-parse -q --verify "refs/tags/<version>"   # non-zero exit = good (absent)
   gh release view "<version>" >/dev/null 2>&1        # non-zero exit = good (absent)
   ```
2. **Clean working tree** (warn, do not block). The release is cut from
   `origin/main`, so uncommitted local changes are **not** included. If
   `git status --porcelain` is non-empty, tell the user which files are dirty and
   that they will not be part of the release, then continue.
3. **Local build sanity check**, see step 3.

Also capture the target commit and repo slug for later:

```bash
git rev-parse origin/main                       # target SHA the release is cut from
gh repo view --json nameWithOwner -q .nameWithOwner
```

## 3. Local build sanity check

Run the same build sequence CI runs, so a green local build means CI will build
green too. This tests the **local working tree** (assumed in sync with
`origin/main`); it can take a few minutes.

```bash
bun --cwd packages/internals build
bun --cwd packages/components build
bun --cwd packages/application build
bun --cwd packages/statistics build
node scripts/transform-dts.mjs
bun --cwd docs build
```

If any build fails, **stop** and show the failing output; do not create a
release on a broken build.

## 4. Generate the release notes

Produce the changelog by following the **release-notes** skill conventions
(`.claude/skills/release-notes/SKILL.md`), i.e. the same gathering,
classification, sectioning, and house format, with these release-specific
settings:

- **Base** depends on the pre-release status from step 1:
  - **Stable target** (no `-`) → the latest *published* (non pre-release) release:
    ```bash
    gh release view --json tagName -q .tagName
    ```
  - **Pre-release target** (contains `-`) → the most recently *published* release of
    **any** kind (pre-release or stable), so successive betas diff against the
    previous beta instead of re-listing everything since the last stable:
    ```bash
    gh release list --exclude-drafts --limit 1 --json tagName,isPrerelease,publishedAt -q '.[0].tagName'
    ```
    During a beta series this resolves to the previous beta; for the first beta of
    a new line it automatically falls back to the latest stable (no newer
    pre-release exists). `--exclude-drafts` keeps an unpublished draft from
    becoming the base; `gh release list` is ordered newest-first by publish date.
    Known limitation: with parallel/abandoned beta lines (e.g. a newer
    `4.0.0-beta.0` next to an in-progress `3.2.x` series) this picks the
    newest-overall release regardless of line, not a concern for this repo's
    linear flow.
- **Head** = `origin/main` (the target SHA from step 2).
- **Banner**: include the `> Pre-release. Install with @flux-ui/<pkg>@next …`
  banner **only** when this version is a pre-release (step 1). Drop it for stable.
- **Version in the body**: write `<version>` wherever the notes reference the
  release (banner install hint, compare link), not `origin/main`. The compare
  link is `https://github.com/<owner>/<repo>/compare/<base>...<version>`; that
  tag will exist immediately after step 6 and points at the target SHA.
- **No em/en dashes**: the changelog body must contain no `—` or `–`. Phrase each
  entry as a complete sentence (see the release-notes rendering rules).

Write the **raw changelog markdown** (the section content itself, not wrapped in
a ```` ```markdown ```` fence, and without the release-notes "After the
block" Dutch summary) to a temporary file, e.g.
`<scratchpad>/release-<version>.md`. That file becomes the release body via
`--notes-file` in step 6.

## 5. Review gate (mandatory)

Show the user the generated changelog for review (render it inside a
```` ```markdown ```` block in the chat so it reads cleanly), and state the
release plan in one line: **version**, **pre-release or stable**, **target SHA
(short)**, and **base** it was diffed against. Label the base so it is clear which
range was used, e.g. `base: 3.2.0-beta.1 (previous beta)` versus
`base: 3.1.12 (latest stable)`.

Then **ask for explicit confirmation** to create the release. Do **not** run
`gh release create` until the user clearly approves (e.g. "yes", "ja", "ship
it"). If they ask for edits, revise the notes file and show it again. If they
decline, stop; nothing has been created.

## 6. Create the release

Only after approval. Pick the flag from step 1's pre-release status:

```bash
# pre-release:
gh release create "<version>" \
    --target "<target-sha>" \
    --title "Release <version>" \
    --notes-file "<scratchpad>/release-<version>.md" \
    --prerelease

# stable:
gh release create "<version>" \
    --target "<target-sha>" \
    --title "Release <version>" \
    --notes-file "<scratchpad>/release-<version>.md" \
    --latest
```

Notes:
- `--target <sha>` pins the tag to the exact commit the notes were diffed
  against (the `origin/main` SHA from step 2), avoiding any race with new pushes.
- Title format is `Release <version>`, matching existing releases.
- `--notes-file` avoids shell-escaping the markdown body.

## 7. After creating

Creating the release **starts CI** (`released.yml`), which publishes to npm and
deploys the docs. Tell the user, in their language:

- the release URL (`gh release view <version> --json url -q .url`),
- that CI is now publishing (pre-release goes to npm under the `next` dist-tag,
  stable under the default tag) and a pointer to watch it
  (`gh run list --workflow=released.yml` or the Actions tab),
- a one-line reminder that no local versions/commits were changed.

Do **not** run `npm publish`, push tags, or create commits yourself; CI owns
that.
