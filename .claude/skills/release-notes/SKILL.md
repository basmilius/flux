---
name: release-notes
description: >-
  Generate GitHub release notes / a changelog for the Flux UI monorepo by
  diffing a base ref against main. Use when the user runs /release-notes
  (optionally followed by a tag) or asks for a changelog / release notes for an
  upcoming or specific Flux version. With a tag argument that tag is the
  comparison base; with no argument the base is the latest published (non
  pre-release) GitHub release. The head is always origin/main. Output is
  copy-pasteable English markdown; it never creates or publishes the release.
argument-hint: "[base-tag]"
allowed-tools: Bash(git fetch:*), Bash(gh repo view:*), Bash(gh release view:*)
license: MIT
---

# Flux release notes

Produce release notes (a changelog) for the Flux UI monorepo (`basmilius/flux`)
by comparing a **base** ref against **`origin/main`**, classifying every change,
and rendering them in the house format below.

This skill is **read-only**: it gathers git/GitHub data and writes markdown to
the chat. It does **not** create tags, releases, commits, or publish anything.
The user does that themselves.

## Pre-loaded context

These values are gathered at load time, so reuse them instead of re-running the
commands:

- **Repo slug:** !`gh repo view --json nameWithOwner -q .nameWithOwner`
- **Latest published release (default base):** !`gh release view --json tagName -q .tagName 2>/dev/null || echo '(none published yet)'`
- **Tags refreshed:** !`git fetch origin --tags --prune 2>&1 | tail -1 || echo done`

## 1. Resolve the comparison range

Tags are already refreshed, and the repo slug and latest published release are in
the **Pre-loaded context** above. Reuse those; only re-run a command if its value
is missing or that step reported an error.

1. **Head** is always `origin/main`.
2. **Base**:
   - If `$ARGUMENTS` is non-empty, treat the first token as the base ref (a tag,
     e.g. `3.1.0`). Verify it resolves: `git rev-parse "<base>"`. If it fails,
     stop and tell the user the tag was not found.
   - Otherwise, use the **latest published release** from the Pre-loaded context
     (GitHub marks it "Latest"; pre-releases are excluded automatically).
3. The **repo slug** for the compare link is in the Pre-loaded context.
4. If `base` and `origin/main` point at the same commit, say there are no changes
   since the base and stop.

## 2. Gather the diff

Run these against `<base>..origin/main`:

```bash
git log --oneline --no-merges <base>..origin/main          # commit subjects
git diff --name-status <base>..origin/main -- 'packages/**' # added/removed/modified files
git diff --stat <base>..origin/main                          # scale
```

Then read the actual diff or files wherever a commit subject is ambiguous, and
**always** confirm the following from file status (don't trust messages alone):

- **New components** = added (`A`) `Flux*.vue` files under `packages/*/src/component/`.
- **Removed components** = deleted (`D`) `Flux*.vue` files → these are breaking.
- **Renamed/removed props** = inspect the diff of the touched component (and
  `packages/types/src/*` if present) to confirm prop additions/renames/removals.

For prop-level or behavioural breaking changes, open the component diff with
`git diff <base>..origin/main -- <file>` and read it; do not infer.

## 3. Classify

This repo uses **Conventional Commits**, and a single commit subject often
**concatenates several `type(scope): …` entries** on one line (squashed PRs).
Split each subject into individual entries before classifying, and **dedupe**
identical entries that appear across multiple commits.

Map each entry to a section:

| Signal | Section |
|---|---|
| Deleted component file; `chore`/`refactor` "remove …"/"rename …"; removed or renamed prop; a model/prop contract change | **⚠️ Breaking changes** |
| Added component file | **✨ New components** |
| `feat(scope): …` adding props/slots/methods/behaviour | **🚀 Features** (grouped by area) |
| Any entry about a11y, where scope or text mentions accessibility, aria, role, keyboard, focus, roving tabindex, screen reader | **♿ Accessibility** |
| `fix: …` | **🐛 Fixes** |
| `feat(styles)`/`chore` styling, tokens, `.scss`-only changes | **🎨 Styles** |
| Anything in `packages/statistics` | **📊 Statistics** |

Rules:
- An a11y-flavoured `feat` goes under **Accessibility**, not Features.
- Omit pure docs/examples/test/CI/dep-bump churn (`docs:`, `chore: bump deps`,
  changes only under `docs/`) unless it's user-facing.
- Prefix component names with `Flux` (e.g. `FluxTableGroup`) and prefer the
  PascalCase component name over the kebab scope.
- Lead the **Breaking changes** section with the highest-impact items
  (removed components first) and state the migration as a short follow-up sentence.

## 4. Render

Output **one fenced ` ```markdown ` code block** so it's copy-pasteable, in
**English**. Use only the sections that have content, in this order. Drop the
pre-release banner line when the target is a stable release.

````markdown
> Pre-release. Install with `@flux-ui/<pkg>@next` or `@<version>`.
> <one-sentence summary of the release's theme>. **Contains breaking changes** (see below).

## ⚠️ Breaking changes

- **`FluxX`** <what changed>. <Migration in one sentence>.

## ✨ New components

- **`FluxX`** <one-line purpose as a predicate>.

## 🚀 Features

**<Area, e.g. Tables & data>**
- `FluxX` now <change>.

**<Area, e.g. Forms>**
- <change>.

## ♿ Accessibility

- **<Component or group>** now <change>.

## 🐛 Fixes

- `FluxX` now <fixed behaviour>.

## 🎨 Styles

- <change>.

## 📊 Statistics

- **<Component>** now <change>.

**Full Changelog:** https://<owner>/<repo>/compare/<base>...origin/main
````

Notes for rendering:
- **Never use em-dashes (—) or en-dashes (–) anywhere in the output.** Phrase each
  entry as a complete sentence; do not separate the component name from its
  description with a dash. Use "now" for behavioural and fix entries (e.g.
  `` `FluxTable` now keeps tree lines correct ``), and use commas, parentheses or
  separate sentences elsewhere.
- Build the compare link from the repo slug and refs:
  `https://github.com/<owner>/<repo>/compare/<base>...origin/main`. If the user
  is preparing notes for a specific tag that already exists, use that tag instead
  of `origin/main` in the link.
- Omit the **Breaking changes** mention in the summary line if there are none,
  and drop the whole section.

## 5. After the block

Below the code block, add 2 to 4 short bullets (the user's language) covering: the
resolved range (`<base> → origin/main`), the most important breaking changes to
highlight, whether a11y items were summarised vs listed per component, and offer
to expand any section. Do **not** create the release.
