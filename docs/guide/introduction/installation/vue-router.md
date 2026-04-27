# Vue Router

Flux is built to work hand-in-hand with [Vue Router](https://router.vuejs.org). All components that accept a `to` prop — such as `FluxLink`, `FluxPressable`, `FluxPrimaryLink`, `FluxSecondaryLink`, `FluxMenuItem` and `FluxMenuCollapsible` — forward it directly to a `<RouterLink>`. The same applies to the menu and navigation components inside `@flux-ui/dashboard` and `@flux-ui/application`.

This guide walks you through installing Vue Router and integrating it with Flux.

## Step 1

Open your project's root directory in your terminal and run the following command:

::: code-group

```shell [Bun]
bun add vue-router
```

```shell [PNPM]
pnpm install vue-router
```

```shell [Yarn]
yarn add vue-router
```

```shell [NPM]
npm install vue-router
```

:::

## Step 2

Create a `router.ts` file in your `src` directory and configure your routes:

```ts [router.ts]
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
```

## Step 3

Register the router in your `main.ts` file:

```ts [main.ts]
import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';

import '@flux-ui/components/style.css';

createApp(App)
    .use(router) // [!code focus]
    .mount('#app');
```

## Step 4

Add a `<RouterView/>` to your root component. When using `@flux-ui/application` or `@flux-ui/dashboard`, place the `<RouterView/>` inside the content slot of the layout:

```vue [App.vue]
<template>
    <FluxApplication>
        <template #menu>
            <FluxApplicationMenu>
                <!-- Menu items. -->
            </FluxApplicationMenu>
        </template>

        <FluxApplicationContent>
            <RouterView/> <!-- [!code focus] -->
        </FluxApplicationContent>
    </FluxApplication>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplication, FluxApplicationContent, FluxApplicationMenu } from '@flux-ui/application';
</script>
```

## Linking to routes

Every Flux component that accepts a `to` prop hands it off to Vue Router's `<RouterLink>`, so you can pass either a path string or a route location object.

```vue [Navigation.vue]
<template>
    <FluxStack>
        <FluxLink
            label="Home"
            :to="{name: 'home'}"/>

        <FluxSecondaryButton
            label="About"
            :to="{name: 'about'}"/>

        <FluxMenuItem
            icon="gear"
            label="Settings"
            :to="{name: 'settings'}"/>
    </FluxStack>
</template>

<script
    lang="ts"
    setup>
    import { FluxLink, FluxMenuItem, FluxSecondaryButton, FluxStack } from '@flux-ui/components';
</script>
```

## Animating route transitions

Flux ships with a [Route transition](../../transitions/route) that animates entering and leaving views. Wrap your `<RouterView/>` in a `<FluxRouteTransition>` to enable it:

```vue [App.vue]
<template>
    <FluxApplicationContent>
        <RouterView v-slot="{Component}"> <!-- [!code focus:5] -->
            <FluxRouteTransition>
                <component :is="Component"/>
            </FluxRouteTransition>
        </RouterView>
    </FluxApplicationContent>
</template>

<script
    lang="ts"
    setup>
    import { FluxApplicationContent } from '@flux-ui/application';
    import { FluxRouteTransition } from '@flux-ui/components';
</script>
```

## Named views

`@flux-ui/application` uses [named views](https://router.vuejs.org/guide/essentials/named-views.html) to render a context-specific menu next to each route. Add a `menu` named component to any route record that should expose its own menu:

```ts [router.ts]
const routes: RouteRecordRaw[] = [
    {
        path: '/projects/:id',
        components: {
            default: () => import('./views/ProjectOverview.vue'),
            menu: () => import('./views/ProjectMenu.vue') // [!code focus]
        }
    }
];
```

The matched menu components are then rendered through `<FluxApplicationMenuContextStack>`, so each level of a nested route tree can contribute its own menu.
