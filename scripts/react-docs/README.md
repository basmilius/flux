# React documentation

Run `bun run --cwd docs dev` from the repository root, then open `http://localhost:5174/react/`.

The React site reuses the VitePress theme, navigation, descriptions and examples in `docs/`. The generator reads the React package's TypeScript signatures for prop tables. React previews mount with `react-dom`; the documentation shell remains VitePress.

`bun run --cwd docs generate:react` regenerates the pages and examples. It runs automatically before docs development and production builds.

- `api.ts` reads the React exports and prop types.
- `convert.ts` converts supported template and script constructs to TSX.
- `examples.ts` formats and type-checks the examples. It rejects invalid imports and propagates dependency failures to parent examples. An unexplained conversion or type error fails generation.
- `generate.ts` builds the React pages and a manifest containing only checked examples.

For a manual example, put a self-contained TSX component in `docs/react-examples/` at the same relative path as its original example. For instance, `components/data-table/sortable.tsx` replaces `docs/code/components/data-table/sortable.vue`. Export the example as the default export. Manual examples pass through the same type check.

Put React-specific guide text in `docs/react-guide/` at the original page's relative path. These source files do not become separate public pages.

Generated files live in `docs/react/`, `docs/react-examples/generated/` and the JSON/manifest files in `docs/.vitepress/react/`. They are ignored by Git. Edit their sources instead.

Run `bun test scripts/react-docs/convert.test.ts` for conversion regressions, and `bun run --cwd docs build` for the complete site. The generator also rejects leftover Vue snippets and removes obsolete generated pages. `notes.ts` can record unsupported library variants and React compositions that use a different API. There are currently no unsupported referenced examples. These limitations appear inline and on `/react/status`; they are not conversion failures. Type checks do not establish visual or behavioral parity, so check changed interactions in a browser.

`bun run --cwd docs test:react-browser` runs the interaction comparisons. `audit:react-browser` inventories rendered examples; `test:react-performance` profiles dragging. Both frameworks run in the same browser against the local server. The SSR check is `NODE_ENV=production node scripts/react-docs/ssr.mjs` after building `packages/react`.
