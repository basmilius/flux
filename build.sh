bun --cwd packages/internals build
bun --cwd packages/visuals build
bun --cwd packages/components build
bun --cwd packages/application build
bun --cwd packages/statistics build
bun --cwd packages/flow build
node scripts/transform-dts.mjs
