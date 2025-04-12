# Flux

This repository contains the source code for the basic components that are used throughout our front-end projects. It
targets Vue 3+. Please read the following instructions and checks in order to proceed.

## 📦 Registry

- The UI library package is available under `@flux-ui/components`.
- The Dashboard library package is available under `@flux-ui/dashboard`.
- The internal package is available under `@flux-ui/internals`.

## ⚠️ Requirements

- Install Node.js ^22
- Install pnpm using `npm i -g pnpm`.
- Configure a new environment variable `FONTAWESOME_NPM_AUTH_TOKEN`. This should be a valid Font Awesome private npm auth token.
- Use `pnpm install` to install the required packages.
- Use `pnpm dev` to start a build watcher for both targets.
- Use `pnpm build` to build a production bundle.
- Use `pnpm link` to link the dist folder of flux to your global node_modules.

## 🪵 Git

All commit messages and branches will be in English.

### Branches

- **Main** — Contains the latest stable release and is the exact source that is running in production.
- **Develop** — Contains the latest staging release that is marked for deployment and is the exact source that is running on staging.
- **Feature branches** — Any feature should have its own feature branch. Once complete, the branch should be merged into the _develop_ branch and the feature branch should be deleted.
- **Bugfix branches** — When a bug is found, it should be fixed within a bugfix branch. Once complete the branch should be merged into the _develop_ branch and the feature branch should be deleted.

### Commit messages

Commit messages are bound to the following templates:

- `<type>: <message> `
- `<type>(<feature>): <message>`
- `<type>(<feature>): <message> [<issue-number>]`

#### Examples

- `feat(expandable): adds header slot to expandable.`
- `feat(expandable): adds header slot to expandable. [FLUX-123]`
- `chore: adds vue 3 build target.`
