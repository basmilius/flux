# @flux-ui/skill

A [Claude Code](https://claude.com/claude-code) **Agent Skill** for building Vue 3
user interfaces with [Flux](https://flux-ui.dev) by Bas Milius — the
`@flux-ui/components` library and its siblings `@flux-ui/application` (app shell /
dashboards) and `@flux-ui/statistics` (KPIs / charts).

It teaches the agent to pick the right component, get imports and composition
right, register the necessary icons, and avoid the naming traps — deferring exact
prop/emit/slot tables to flux-ui.dev.

> This is the **Vue 3** Flux (basmilius), not the Livewire/Blade Flux from
> fluxui.dev and not the Flux web-components library.

## What's inside

This package is a Claude Code **plugin** containing a single skill:

```
.claude-plugin/plugin.json     # plugin manifest
skills/flux-ui/
  SKILL.md                     # the skill (entry point)
  references/*.md              # deep-dive references loaded on demand
```

## Installation

Skills are distributed through a Claude Code **plugin marketplace**. This repo
hosts a marketplace that points at the published `@flux-ui/skill` npm package:

```text
/plugin marketplace add basmilius/flux
/plugin install flux-ui
```

Once installed, the agent uses the skill automatically when you work with Flux,
or you can invoke it explicitly with `/flux-ui`.

## Local development (inside this monorepo)

The skill is symlinked into the repo's `.claude/skills/` during development, so
editing the files under `packages/skill/skills/flux-ui/` updates the live
`/flux-ui` skill directly. `packages/skill/` is the single source of truth.

## License

MIT — by [Bas Milius](https://github.com/basmilius).
