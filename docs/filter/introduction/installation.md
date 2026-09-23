# Installation

To start using Flux Filter in your Vue application, add it to your project alongside `@flux-ui/components`, which provides the menus, flyouts and form controls the filters are built from.

## Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [bun]
bun add @flux-ui/filter @flux-ui/components
```

```shell [pnpm]
pnpm install @flux-ui/filter @flux-ui/components
```

```shell [yarn]
yarn add @flux-ui/filter @flux-ui/components
```

```shell [npm]
npm install @flux-ui/filter @flux-ui/components
```

:::

## Step 2

Once the installation is complete, add the following lines to your `main.ts` file:

```ts [main.ts]
import '@flux-ui/filter/style.css'
import '@flux-ui/components/style.css'
```

## Step 3

Writing a [filter of your own](../components/filter#custom-filter-types)? Add the `defineFilterMacro()` plugin to your Vite config. A filter registers itself through `defineFilter()`, a compile-time macro that this plugin compiles. The built-in filters ship compiled, so an app that only uses those can skip this step.

```ts [vite.config.ts]
import { defineFilterMacro } from '@flux-ui/filter/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        defineFilterMacro(),
        vue()
    ]
});
```

## Step 4

Import the components you want to use:

```vue [Filters.vue]
<template>
    <FluxFilter v-model="state"> <!-- [!code focus:7] -->
        <FluxFilterDate
            icon="calendar"
            label="Date"
            name="date"/>
    </FluxFilter>
</template>

<script
    setup
    lang="ts">
    import { FluxFilter, FluxFilterDate } from '@flux-ui/filter'; // [!code focus:4]
    import { ref } from 'vue';

    const state = ref({});
</script>
```
