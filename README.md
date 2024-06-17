# Flux

This repository contains the source code for the basic components that are used throughout our front-end projects. It
targets Vue 3+. Please read the following instructions and checks in order to proceed.

## 📦 Registry

- The Vue 3 package is available under `@basmilius/flux`.

## ⚠️ Requirements

- Install Node.js ^20
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
- `<type>(<feature>): <message> [<jira-issue>]`

#### Examples

- `feat(expandable): adds header slot to expandable.`
- `feat(expandable): adds header slot to expandable. [FAN-123]`
- `chore: adds vue 3 build target.`

#### Allowed types

| Type     | When to use                                                           |
|----------|-----------------------------------------------------------------------|
| feat     | Feature is added or adjusted.                                         |
| fix      | Bugfixes.                                                             |
| docs     | Working on documentation.                                             |
| style    | Code formatting, where no actual code functionality has been changed. |
| refactor | Code is refactored.                                                   |
| test     | Writing (unit) tests.                                                 |
| chore    | All other commits that do not fall within the above types.            |

## 🎨 Coding style

All code should be written in American English. This includes css classes and translation keys.

### Vue

- Components should be written using `<script lang="ts" setup>` where possible.
- Try to extract business logic from the components.
- Always use `:key` attribute with `v-for` directives.
- Always use unique values for the `:key` attribute.
- Don't use `v-if` and `v-for` in the same context as `v-for` has a higher priority.
- Always use the `required` property in Prop options to specify if a Prop is required.
- Both shorthands or fully written directives ar accepted, but should not be mixed and remain consistent.
- Use `kebab-case` when emitting events.
- Declare props with `camelCase` and use `kebab-case` in templates.
- Template expressions should only have basic javascript expressions, otherwise they should be extracted to a method.
- Use snake-case for emits.

### JavaScript / TypeScript

- Do **NOT** use `myInstance.class.name === MyClass.name` for type checking; this won't work in production builds. Always use instanceof checks, e.g. `myInstance instanceof MyClass`.
- Use `camelCase` for variable and function names.
- Use `PascalCase` for class names.
- Use `camelCase` of class members and methods.
- Use `PascalCase` for interface names.
- Use `camelCase` for interface members.
- Use `PascalCase` for type names.
- Use `camelCase` for type members.
- Use `PascalCase` for namespace names.
- Use `PascalCase` for enums.
- Use `PascalCase` for enum members.
- Use `camelCase` for file names.
- Use types wheresoever possible to denote the structure.
- Don’t ever use the types `Number`, `String`, `Boolean`, `Symbol`, or `Object` These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.
- Do use the types `number`, `string`, `boolean`, and `symbol`.
- Prefer using union types over overload implementations that only differ in argument position.
- Don’t ever have a generic type which doesn't use its type parameter.
- Prefer using single quotes ``'`` for strings unless escaping.
- Try not to use the `any` type.
- Sort overloads by putting the more specified signatures on top.
- Use single quotes ``'`` for imports and requires.
- Use 4 spaces, not tabs.
- Notate arrays as `Foo[]` instead of `Array<Foo>`.
- Define typed variables as ``const/let myVar: MyType = ...;`` and prevent casting.
- Use the standard code indentation present in Webstorm when pressing `ctrl + alt + l` or `command + option + l`.
- Classes should adhere to the following structure: getters & setters > properties > constructor.
- Classes should adhere to the following access modifier order: public > protected > private.
- Methods with nullable parameters should prioritise to have said parameter at the end of the method signature.
- Code and or assets for development should be removed from production builds.
- Always place named exports above default exports.

### HTML

- Use empty lines for better readability on your own account, but be consistent.
- Start on a new line for every attribute after the first one.
- Don't use inline style unless explicitly needed in a certain situation.
- All HTML entities should use the `kebab-case` naming scheme.
- HTML properties and attribute values like: id, name, label should use the `kebab-case` naming scheme.

### SCSS and other styling methods

- All styling should be done via SCSS.
- All classes should use the `kebab-case`.
- All styles regarding colors should consider the switch between light and dark mode and thus use the appropriate color variables.

## ✅ Definition of Done

- The deliverable adheres to all the requirements of the Coding style.
- The deliverable follows the provided GIT branching structure.
- The deliverable branch is up-to-date with its origin/parent branch.
- The deliverable should be production ready and not contain: (console logs, todo comments and/or other development related code).
- The deliverable branch should be attached to a corresponding Jira issue and only contain the needed changes as stated in said issue.
- The deliverable has no type errors in the build.
- The deliverable has a PR in BitBucket which is connected to a Jira issue.
- The deliverable PR has at least 1 approve of either 'Bas Milius (bas@tibbaa.com)', 'Jorden Willemsen(jorden@tibbaa.com)' or 'Martijn Woolschot (martijn@tibbaa.com)'.
- The deliverable PR passed all merge checks.
- The deliverable branch should be deleted after the PR is merged.
