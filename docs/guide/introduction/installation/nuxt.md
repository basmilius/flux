# Nuxt

Flux works out of the box with [Nuxt](https://nuxt.com). The components are SSR-safe and gate any browser-only logic behind a runtime check, so you can render Flux on the server and hydrate it on the client without extra configuration.

This guide walks you through installing Flux in a Nuxt project.

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

Add the Flux stylesheet to your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
    css: [
        '@flux-ui/components/style.css' // [!code focus]
    ]
});
```

### Step 3

Register Font Awesome icons through a client-side Nuxt plugin. Create `plugins/flux.client.ts`:

```ts [plugins/flux.client.ts]
import { fluxRegisterIcons } from '@flux-ui/components';
import { faRocket, faUser } from '@fortawesome/pro-regular-svg-icons';

export default defineNuxtPlugin(() => {
    fluxRegisterIcons([
        faRocket,
        faUser
    ]);
});
```

For more information about icon usage, please refer to [Font Awesome](../font-awesome).

### Step 4

Use the components in your pages and layouts as you would in any Vue application:

```vue [app.vue]
<template>
    <FluxPane> <!-- [!code focus:5] -->
        <FluxSecondaryButton
            href="https://flux-ui.dev"
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

Configure the Vite plugins through Nuxt's `vite` option:

::: tip
For more information on the vite-preset package, please refer to [@basmilius/vite-preset](https://github.com/basmilius/packages/tree/main/packages/vite-preset).
:::

```ts [nuxt.config.ts]
import { flux, preset } from '@basmilius/vite-preset';

export default defineNuxtConfig({
    css: [
        '@flux-ui/components/style.css'
    ],
    vite: {
        plugins: [
            preset(),
            flux()
        ]
    }
});
```

### Step 3

For setting up icons, follow step 3 of the plain installation.

### Step 4

Import the components you want to use as shown in step 4 of the plain installation.

## Nuxt-specific notes

### Auto-imports

Nuxt does not auto-import components from external packages by default. Either import them explicitly in each `<script setup>` block, or register them globally through a plugin:

```ts [plugins/flux.ts]
import * as FluxComponents from '@flux-ui/components';

export default defineNuxtPlugin((nuxtApp) => {
    for (const [name, component] of Object.entries(FluxComponents)) {
        if (name.startsWith('Flux')) {
            nuxtApp.vueApp.component(name, component);
        }
    }
});
```

### `<FluxRoot>` placement

Place `<FluxRoot>` in your top-level `app.vue` so programmatic overlays such as [`showAlert`](../../components/attention/alert), [`showConfirm`](../../components/attention/confirm) and [`showSnackbar`](../../components/attention/snackbar) have a mounting point on every page:

```vue [app.vue]
<template>
    <FluxRoot>
        <NuxtPage/>
    </FluxRoot>
</template>

<script
    lang="ts"
    setup>
    import { FluxRoot } from '@flux-ui/components';
</script>
```
