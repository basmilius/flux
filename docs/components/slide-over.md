---
outline: deep

emits:
    -   name: close
        description: Triggered when the slide over is closed.

props:
    -   name: is-closeable
        description: If the slide-over can be closed with the escape key.
        type: boolean
        optional: true

    -   name: view-key
        description: A unique key to identify the current view within the slide over. Used for view-based transitions.
        type: string
        optional: true

slots:
    -   name: default
        description: The content of the slide over.
---

# Slide over

A slide over is a modal-like interface that slides in from the side of the view to display additional content or options. It typically allows users to easily access important information without disrupting their current workflow. Slide overs are mostly used to reveal opions for an entity.

::: render
render=../code/components/slide-over/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A basic slide over.
example=../code/components/slide-over/basic.vue
:::

::: example Tabs || A slide over with tabs.
example=../code/components/slide-over/tabs.vue
:::

## Router-driven

Pair the slide over with [Vue Router](../guide/introduction/installation/vue-router) to open detail views through navigation. Define an `over` named view on every route that should appear inside the slide over, and render a single `<RouterView name="over"/>` from your top-level layout.

The layout watches `route.matched` for the first record that exposes the `over` view. When such a record is matched the `<RouterView>` renders inside the slide over; otherwise the slide over stays empty and the transition closes it. The matched route's `fullPath` is forwarded to the `view-key` prop so transitions are scoped to the active resource.

::: code-group

<<< @/code/components/slide-over/with-router/layout.vue [Layout.vue]
<<< @/code/components/slide-over/with-router/router.ts [router.ts]

:::

::: tip
Push to one of the named routes (e.g. `router.push({name: 'order', params: {id: 42}})`) to open the slide over, and call `router.back()` from inside it to close. The slide over also supports nested children (such as tabs), each with their own URL.
:::
