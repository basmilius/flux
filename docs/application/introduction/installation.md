# Installation

To start using Flux Application in your Vue application, you'll need to add it to your project. This section provides step-by-step instructions on how to install Flux Application, ensuring you can quickly integrate its components into your development workflow.

::: tip
Flux Application relies on [Vue Router](../../guide/introduction/installation/vue-router) for its named-view based context menus. Make sure Vue Router is installed and configured in your project before using the components.
:::

## Plain installation

::: tip
This is the most recommended way to use Flux Application. Use this form of installation if you don't need to customize the style of Flux Application or if you simply need to use the components without the source code.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [Bun]
bun add @flux-ui/application @flux-ui/components
```

```shell [PNPM]
pnpm install @flux-ui/application @flux-ui/components
```

```shell [Yarn]
yarn add @flux-ui/application @flux-ui/components
```

```shell [NPM]
npm install @flux-ui/application @flux-ui/components
```

:::

### Step 2

Once the installation is complete, you need to add the following line to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/application/style.css'
import '@flux-ui/components/style.css'
```

### Step 3

Import the components you want to use, like this:

```vue [App.vue]
<template>
    <FluxApplication> <!-- [!code focus:13] -->
        <template #menu>
            <FluxApplicationMenu>
                <!-- Menu items. -->
            </FluxApplicationMenu>
        </template>

        <FluxApplicationContent>
            <FluxApplicationHero
                title="Welcome"
                subtitle="Your application starts here."/>
        </FluxApplicationContent>
    </FluxApplication>
</template>

<script
    setup
    lang="ts">
    import { FluxApplication, FluxApplicationContent, FluxApplicationHero, FluxApplicationMenu } from '@flux-ui/application' // [!code focus]
</script>
```

## Vite-preset installation

::: tip
Only use this form of installation if you need more control of Flux Application and need the Flux Application source code injected into your own project.
:::

### Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [Bun]
bun add @flux-ui/application @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [PNPM]
pnpm install @flux-ui/application @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [Yarn]
yarn add @flux-ui/application @flux-ui/components sass-embedded @basmilius/vite-preset
```

```shell [NPM]
npm install @flux-ui/application @flux-ui/components sass-embedded @basmilius/vite-preset
```

:::

### Step 2

Once the installation is complete, you need to configure your `vite.config.ts` file to use Flux Application.

::: tip
For more information on the vite-preset package, please refer to [@basmilius/vite-preset](https://github.com/basmilius/packages/tree/main/packages/vite-preset).
:::

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { flux, fluxApplication, preset } from '@basmilius/vite-preset'

export default defineConfig({
    plugins: [
        vue(),
        preset(),
        flux(),
        fluxApplication()
    ]
});
```

### Step 3

Import the components you want to use as shown in step 3 of the plain installation.
