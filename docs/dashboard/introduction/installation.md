# Installation

To start using Flux Dashboard in your Vue application, you'll need to add it to your project. This section provides step-by-step instructions on how to install Flux Dashboard, ensuring you can quickly integrate its components into your development workflow.

## Plain installation

::: tip
This is the most recommended way to use Flux Dashboard. Use this form of installation if you don't need to customize the style of Flux Dashboard or if you simply need to use the components without the source code.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/dashboard @flux-ui/components
```

```shell [pnpm]
pnpm install @flux-ui/dashboard @flux-ui/components
```

```shell [yarn]
yarn add @flux-ui/dashboard @flux-ui/components
```

```shell [npm]
npm install @flux-ui/dashboard @flux-ui/components
```

:::

### Step 2

Once the installation is complete, you need to add the following line to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/dashboard/style.css'
import '@flux-ui/components/style.css'
```

### Step 3

Import the components you want to use, like this:

```vue [App.vue]
<template>
    <FluxDashboard> <!-- [!code focus:7] -->
        <FluxDashboardContent>
            <FluxSecondaryButton
                href="https://flux-ui.dev"
                label="Button"/>
        </FluxDashboardContent>
    </FluxDashboard>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboard, FluxDashboardContent } from '@flux-ui/dashboard' // [!code focus:2]
    import { FluxButton } from '@flux-ui/components'
</script>
```

## Vite-preset installation

::: tip
Only use this form of installation if you need more control of Flux Dashboard and need the Flux Dashboard source code injected into your own project.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/dashboard @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [pnpm]
pnpm install @flux-ui/dashboard @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [yarn]
yarn add @flux-ui/dashboard @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [npm]
npm install @flux-ui/dashboard @flux-ui/components sass-embedded @basmilius/vite-preset
```

:::

### Step 2

Once the installation is complete, you need to configure your `vite.config.ts` file to use Flux Dashboard.

::: tip
For more information on the vite-preset package, please refer to [@basmilius/vite-preset](https://github.com/basmilius/packages/tree/main/packages/vite-preset).
:::

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { flux, fluxDashboard, preset } from '@basmilius/vite-preset'

export default defineConfig({
    plugins: [
        vue(),
        preset(),
        flux(),
        fluxDashboard()
    ]
});
```

### Step 3

Import the components you want to use, like this:

```vue [App.vue]
<template>
    <FluxDashboard> <!-- [!code focus:7] -->
        <FluxDashboardContent>
            <FluxSecondaryButton
                href="https://flux-ui.dev"
                label="Button"/>
        </FluxDashboardContent>
    </FluxDashboard>
</template>

<script
    setup
    lang="ts">
    import { FluxDashboard, FluxDashboardContent } from '@flux-ui/dashboard' // [!code focus:2]
    import { FluxButton } from '@flux-ui/components'
</script>
```
