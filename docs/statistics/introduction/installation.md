# Installation

To start using Flux Statistics in your Vue application, you'll need to add it to your project. This section provides step-by-step instructions on how to install Flux Statistics, ensuring you can quickly integrate its components into your development workflow.

## Plain installation

::: tip
This is the most recommended way to use Flux Statistics. Use this form of installation if you don't need to customize the style of Flux Statistics or if you simply need to use the components without the source code.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/statistics @flux-ui/components
```

```shell [pnpm]
pnpm install @flux-ui/statistics @flux-ui/components
```

```shell [yarn]
yarn add @flux-ui/statistics @flux-ui/components
```

```shell [npm]
npm install @flux-ui/statistics @flux-ui/components
```

:::

### Step 2

Once the installation is complete, you need to add the following line to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/statistics/style.css'
import '@flux-ui/components/style.css'
```

### Step 3

Import the components you want to use, like this:

```vue [Dashboard.vue]
<template>
    <FluxStatisticsGrid :md="3"> <!-- [!code focus:13] -->
        <FluxStatisticsKpi
            icon="users"
            title="Total users"
            value="12,430"
            :change="{color: 'success', icon: 'arrow-trend-up', value: '+8.2%'}"/>

        <FluxStatisticsKpi
            icon="cart-shopping"
            title="Orders"
            value="3,821"
            :change="{color: 'danger', icon: 'arrow-trend-down', value: '-1.4%'}"/>
    </FluxStatisticsGrid>
</template>

<script
    setup
    lang="ts">
    import { FluxStatisticsGrid, FluxStatisticsKpi } from '@flux-ui/statistics' // [!code focus:2]
</script>
```

## Vite-preset installation

::: tip
Only use this form of installation if you need more control of Flux Statistics and need the Flux Statistics source code injected into your own project.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/statistics @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [pnpm]
pnpm install @flux-ui/statistics @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [yarn]
yarn add @flux-ui/statistics @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [npm]
npm install @flux-ui/statistics @flux-ui/components sass-embedded @basmilius/vite-preset
```

:::

### Step 2

Once the installation is complete, you need to configure your `vite.config.ts` file to use Flux Statistics.

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { flux, fluxStatistics, preset } from '@basmilius/vite-preset'

export default defineConfig({
    plugins: [
        vue(),
        preset(),
        flux(),
        fluxStatistics()
    ]
});
```

### Step 3

Import the components you want to use as shown in step 3 of the plain installation.
