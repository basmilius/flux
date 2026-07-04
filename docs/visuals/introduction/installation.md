# Installation

To start using Flux Visuals in your Vue application, you'll need to add it to your project. This section provides step-by-step instructions on how to install Flux Visuals, ensuring you can quickly integrate its components into your development workflow.

::: tip
Flux Visuals relies on the Flux design tokens (`--gray-*`, `--radius`, …) for its colors and radii. Always install and load `@flux-ui/components` alongside it, otherwise the effects render without a theme.
:::

## Plain installation

::: tip
This is the most recommended way to use Flux Visuals. Use this form of installation if you don't need to customize the style of Flux Visuals or if you simply need to use the components without the source code.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/visuals @flux-ui/components
```

```shell [pnpm]
pnpm install @flux-ui/visuals @flux-ui/components
```

```shell [yarn]
yarn add @flux-ui/visuals @flux-ui/components
```

```shell [npm]
npm install @flux-ui/visuals @flux-ui/components
```

:::

### Step 2

Once the installation is complete, you need to add the following line to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/visuals/style.css'
import '@flux-ui/components/style.css'
```

### Step 3

Import the components you want to use, like this:

```vue [Hero.vue]
<template>
    <FluxVisualBorderBeam variant="md"> <!-- [!code focus:3] -->
        <FluxPane>...</FluxPane>
    </FluxVisualBorderBeam>
</template>

<script
    setup
    lang="ts">
    import { FluxPane } from '@flux-ui/components'
    import { FluxVisualBorderBeam } from '@flux-ui/visuals' // [!code focus]
</script>
```

## Vite-preset installation

::: tip
Only use this form of installation if you need more control of Flux Visuals and need the Flux Visuals source code injected into your own project.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/visuals @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [pnpm]
pnpm install @flux-ui/visuals @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [yarn]
yarn add @flux-ui/visuals @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [npm]
npm install @flux-ui/visuals @flux-ui/components sass-embedded @basmilius/vite-preset
```

:::

### Step 2

Once the installation is complete, you need to configure your `vite.config.ts` file to use Flux Visuals.

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { composeLibrary, flux, preset } from '@basmilius/vite-preset'

const fluxVisuals = composeLibrary({
    name: '@flux-ui/visuals',
    alias: '~flux/visuals'
});

export default defineConfig({
    plugins: [
        vue(),
        preset(),
        flux(),
        fluxVisuals()
    ]
});
```

### Step 3

Import the components you want to use as shown in step 3 of the plain installation.
