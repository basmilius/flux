# Installation

To start using Flux in your Vue application, you'll need to add it to your project. This section provides step-by-step instructions on how to install Flux, ensuring you can quickly integrate its components into your development workflow.

## Plain installation
::: tip
This is the most recommended way to use Flux. Use this form of installation if you don't need to customize the style of Flux or if you simply need to use the components without the source code.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [Bun]
bun add @flux-ui/components
```

```shell [PNPM]
pnpm install @flux-ui/components
```

```shell [Yarn]
yarn add @flux-ui/components
```

```shell [NPM]
npm install @flux-ui/components
```

:::

### Step 2
Once the installation is completed, you need to add the following to your `main.ts` file.

```ts [main.ts]
import '@flux-ui/components/style.css'
```

### Step 3
For setting up icons, please refer to [Font Awesome](./font-awesome).

### Step 4
Import the components you want to use, like this:

```vue [App.vue]
<template>
    <FluxPane> <!-- [!code focus:5] -->
        <FluxSecondaryButton
            href="https://flux.bas.dev"
            label="Button"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxSecondaryButton } from '@flux-ui/components'; // [!code focus]
</script>
```


## Vite-preset installation

::: tip
Only use this form of installation if you need more control of Flux and need the Flux source code injected into your own project.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [Bun]
bun add @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [PNPM]
pnpm install @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [Yarn]
yarn add @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [NPM]
npm install @flux-ui/components sass-embedded @basmilius/vite-preset
```

:::

### Step 2

Once the installation is completed, you need to configure your Vite config file to use Flux.

::: tip
For more information on the vite-preset package, please refer to [@basmilius/vite-preset](https://github.com/basmilius/packages/tree/main/packages/vite-preset)
:::

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { flux, preset } from '@basmilius/vite-preset'

export default defineConfig({
    plugins: [
        vue(),
        preset(),
        flux()
    ]
});
```

### Step 3

For setting up icons, please refer to [Font Awesome](./font-awesome).

### Step 4

Import the components you want to use, like this:

```vue [App.vue]
<template>
    <FluxPane> <!-- [!code focus:5] -->
        <FluxSecondaryButton
            href="https://flux.bas.dev"
            label="Button"/>
    </FluxPane>
</template>

<script
    lang="ts"
    setup>
    import { FluxPane, FluxSecondaryButton } from '@flux-ui/components'; // [!code focus]
</script>
```
