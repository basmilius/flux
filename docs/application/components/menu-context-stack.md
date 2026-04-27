---
outline: deep

props:
    -   name: name
        description: The name of the named route view that holds the context menu component for each level of the route tree.
        type: string
        optional: true
        default: 'menu'
---

# Application menu context stack

The application menu context stack renders a context menu panel for every matched route record that exposes a named view. Each panel slides in horizontally as the user drills deeper into the route tree.

To use it, expose a `menu` named view on every route that should contribute a context menu:

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

The matched menu components are then rendered through `<FluxApplicationMenuContextStack>` in the order of their depth in `route.matched`.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/application/menu-context-stack/snippet.vue [FluxApplicationMenuContextStack.vue]

:::

## Used components

- [Application menu](./menu)
- [Menu](../../components/menu)
