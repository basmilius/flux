# Flux UI

Source repository for **Flux UI** — an opinionated component library for [Vue 3](https://vuejs.org).

Documentation, live examples, and the component API reference live at [flux-ui.dev](https://flux-ui.dev).

## 📦 Packages

This is a [Bun workspaces](https://bun.com/docs/install/workspaces) monorepo. All packages are published under the `@flux-ui` scope.

| Package                                          | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| [`@flux-ui/components`](packages/components)     | Main component library.                          |
| [`@flux-ui/types`](packages/types)               | Public TypeScript types (no build step).         |
| [`@flux-ui/internals`](packages/internals)       | Shared composables, utilities, and directives.   |
| [`@flux-ui/statistics`](packages/statistics)     | Chart components built on Apache ECharts.        |
| [`@flux-ui/dashboard`](packages/dashboard)       | Dashboard layout components.                     |
| [`@flux-ui/application`](packages/application)   | Application shell components.                    |

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node.js >= 23
- A FontAwesome Pro npm token in the `FONTAWESOME_NPM_AUTH_TOKEN` environment variable (configured via the root `.npmrc`).

## 🚀 Getting started

1. Clone the repository.
2. Run `bun install` in the project root.
3. Build all publishable packages with `./build.sh`, or build a single package with `bun run --cwd packages/<name> build`.

The documentation site can be developed against the local packages with `bun run --cwd docs dev`.

## 🪵 Git

All commit messages and branch names are in English.

### Branches

- **main** — Latest stable release; matches what is running in production.
- **develop** — Latest staging release; matches what is running on staging.
- **Feature branches** — Each feature gets its own branch. Merge into `develop` once complete, then delete the branch.
- **Bugfix branches** — Each bug fix gets its own branch. Merge into `develop` once complete, then delete the branch.

### Commit messages

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org):

- `<type>: <message>`
- `<type>(<scope>): <message>`
- `<type>(<scope>): <message> [<issue-number>]`

Examples:

- `feat(expandable): adds header slot to expandable.`
- `feat(expandable): adds header slot to expandable. [FLUX-123]`
- `chore: adds vue 3 build target.`
